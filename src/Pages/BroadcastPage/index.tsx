import { useEffect, useRef, useState } from 'react';
import NotifyMicPermission from '../../components/NotifyMicPermission';
import Broadcast from '../../components/Broadcast';

import logger from '../../util/logger';
import config from '../../config';
import { EMessageType } from '../../type';
import * as RecordRTC from 'recordrtc';
import BroadcastEnded from '../../components/BroadcastEnded';
import { Navigate, useLocation } from 'react-router-dom';
import ROUTES from '../../constants/ROUTES';
import ErrorPage from '../ErrorPage';

type TBroadcastState = 'initializing' | 'ready' | 'broadcasting' | 'error' | 'ended';

let globalStreamerCount = 0;

function BroadcastPageContent() {
  const [broadcastState, setBroadcastState] = useState<TBroadcastState>('initializing');
  const [audio, setAudio] = useState<Blob>();
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [latestText, setLatestText] = useState<string>('');
  const socketRef = useRef<WebSocket | null>(null);
  const recorderRef = useRef<RecordRTC.StereoAudioRecorder | null>(null);
  const stopSpeakingAnimationRef = useRef<number | null>(null);
  const handleBeforeUnloadRef = useRef((event: BeforeUnloadEvent) => {
    event.preventDefault();
    event.returnValue = '';
  });
  const onStopRecordingRef = useRef((blob: Blob) => {
    setAudio(blob);
    window.removeEventListener('beforeunload', handleBeforeUnloadRef.current);
  });
  const [micPermission, setMicPermission] = useState<boolean>(false);
  const [{ timeStarted, timeEnded }, setTime] = useState({
    timeStarted: 0,
    timeEnded: 0,
  });
  const [{ streamerCount, languages, code }, setBroadcastData] = useState({
    streamerCount: 0,
    languages: [],
    code: '',
  });

  useEffect(() => {
    globalStreamerCount = streamerCount;
  }, [streamerCount]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => {
        setMicPermission(true);
        setBroadcastState((current) => {
          if (current === 'initializing') {
            return 'ready';
          }
          return current;
        });
      })
      .catch(() => {
        setBroadcastState('error');
      });

    return () => {
      if (
        socketRef.current &&
        socketRef.current.readyState !== WebSocket.CLOSING &&
        socketRef.current.readyState !== WebSocket.CLOSED
      ) {
        socketRef.current.close();
      }
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        stream.getTracks().forEach((track) => {
          track.stop();
        });
      });

      recorderRef.current?.stop(onStopRecordingRef.current);
    };
  }, []);

  const onStopStream = () => {
    setTime((prev) => ({ ...prev, timeEnded: Date.now() }));
    socketRef.current?.send(JSON.stringify({ type: EMessageType.LEAVE }));
    if (
      socketRef.current &&
      socketRef.current.readyState !== WebSocket.CLOSING &&
      socketRef.current.readyState !== WebSocket.CLOSED
    ) {
      socketRef.current.close();
    }
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      stream.getTracks().forEach((track) => {
        track.stop();
        logger.log('track stopped');
      });
    });

    recorderRef.current?.stop(onStopRecordingRef.current);
    setBroadcastState('ended');
  };

  useEffect(() => {
    if (broadcastState === 'ready') {
      const handleSocketMessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data);
        switch (data.type) {
          case EMessageType.CREATED:
            {
              window.addEventListener('beforeunload', handleBeforeUnloadRef.current);
              logger.log('Stream created:', data);
              setBroadcastData({
                languages: [],
                streamerCount: 0,
                code: data.code,
              });
              setTime({ timeStarted: Date.now(), timeEnded: 0 });
            }
            break;
          case EMessageType.STREAMER_JOINED:
            {
              logger.log('Streamer Joined:', data);
              if (data.state.streamerCount > 0 && !recorderRef.current) {
                navigator.mediaDevices
                  .getUserMedia({
                    audio: {
                      channelCount: 2,
                      sampleRate: 16000,
                      sampleSize: 16,
                    },
                  })
                  .then((audioStream) => {
                    const audioContext = new AudioContext();
                    recorderRef.current = new RecordRTC.StereoAudioRecorder(audioStream, {
                      type: 'audio',
                      mimeType: 'audio/webm;codecs=pcm',
                      recorderType: RecordRTC.StereoAudioRecorder,
                      timeSlice: 250,
                      desiredSampRate: 16000,
                      numberOfAudioChannels: 1,
                      bufferSize: 2048,
                      audioBitsPerSecond: 128000,
                      ondataavailable: async (blob: Blob) => {
                        if (!globalStreamerCount) {
                          logger.warn('Streamer count is 0');
                          if (recorderRef.current) {
                            recorderRef.current.stop((blob) => {
                              setAudio(blob);
                              window.removeEventListener('beforeunload', handleBeforeUnloadRef.current);
                            });
                            recorderRef.current = null;
                          }
                          return;
                        }
                        const buffer = await blob.arrayBuffer();
                        socketRef.current?.send(buffer);
                        audioContext.decodeAudioData(buffer).then((audioBuffer) => {
                          const rawData = audioBuffer.getChannelData(0);
                          const peak = Math.max(...rawData.map(Math.abs));
                          if (peak > 0.02) {
                            setIsSpeaking(true);
                            if (stopSpeakingAnimationRef.current) {
                              clearTimeout(stopSpeakingAnimationRef.current);
                            }
                            stopSpeakingAnimationRef.current = window.setTimeout(() => {
                              setIsSpeaking(false);
                            }, 1000);
                          }
                        });
                      },
                    });
                    recorderRef.current.record();
                  });
              }
              setBroadcastData((prev) => ({ ...prev, ...data.state }));
            }
            break;
          case EMessageType.STREAMER_LEFT:
            {
              logger.log('Streamer Joined:', data);
              setBroadcastData((prev) => ({ ...prev, ...data.state }));
            }
            break;
          case EMessageType.ERROR:
            {
              logger.error('Error:', data);
              setBroadcastData((prev) => ({
                ...prev,
                status: 'error',
                errorMessage: data.message,
              }));
            }
            break;
          case EMessageType.PUB:
            {
              setLatestText(data.data?.original);
            }
            break;
          default:
            break;
        }
      };

      try {
        socketRef.current = new WebSocket(config.socketUrl);
        socketRef.current.onerror = (error) => {
          setBroadcastState('error');
          logger.error('WebSocket error:', error);
        };
        socketRef.current.onopen = () => {
          logger.log('WebSocket connected.');
          socketRef.current!.send(JSON.stringify({ type: EMessageType.CREATE }));
        };
        socketRef.current.onclose = () => logger.log('WebSocket closed.');

        socketRef.current.onmessage = (event) => {
          handleSocketMessage(event);
        };

        return () => {
          socketRef.current?.close();
          recorderRef.current?.stop(onStopRecordingRef.current);
        };
      } catch (error: unknown) {
        logger.error(error);
        setBroadcastState('error');
      }
    }
  }, [broadcastState]);
  logger.log({ streamerCount, languages, code, micPermission });

  const onPermissionGranted = () => {
    setMicPermission(true);
    setBroadcastState('ready');
  };

  if (broadcastState === 'error') {
    if (!micPermission) {
      return <NotifyMicPermission onPermissionGranted={onPermissionGranted} />;
    }
    return <ErrorPage />;
  }

  if (!code) {
    return null;
  }

  return (
    <div>
      {broadcastState === 'ready' && micPermission && (
        <Broadcast
          streamerCount={streamerCount}
          languages={languages}
          code={code}
          onStopStream={onStopStream}
          isSpeaking={isSpeaking}
          latestText={latestText}
        />
      )}
      {broadcastState === 'ended' && (
        <BroadcastEnded key={timeEnded} duration={timeEnded - timeStarted} audio={audio} />
      )}
    </div>
  );
}

const BroadcastPage = () => {
  const location = useLocation();
  if (!location.state?.traceId) {
    return <Navigate to={ROUTES.root} state={{ traceId: null }} />;
  }
  window.history.replaceState({}, '');
  return <BroadcastPageContent />;
};

export default BroadcastPage;

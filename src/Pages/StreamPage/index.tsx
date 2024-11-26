import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { EMessageType } from '../../type';
import StreamHeader from '../../components/StreamHeader';
import config from '../../config';
import { Box, Button, Callout, Card, Flex, Select, Separator, Text, TextField } from '@radix-ui/themes';
import { ArrowRightCircleIcon, InformationCircleIcon } from '@heroicons/react/16/solid';
import logger from '../../util/logger';
import ROUTES from '../../constants/ROUTES';
import { formatErrorMessage } from '../../util';
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline';

type TState = {
  status: 'connecting' | 'connected' | 'error';
  languages: string[];
  streamerCount: number;
  errorMessage?: string;
};

function StreamPage() {
  const audioContextRef = useRef<AudioContext>();
  const audioQueueRef = useRef<ArrayBuffer[]>([]);
  const isPlayingRef = useRef(false);

  const [shouldStreamAudio, setShouldStreamAudio] = useState(false);
  const shouldStreamAudioRef = useRef(shouldStreamAudio);
  useEffect(() => {
    shouldStreamAudioRef.current = shouldStreamAudio;
  }, [shouldStreamAudio]);

  const [language, setLanguage] = useState<{ code: string; name: string }>();

  const [latestTranslation, setLatestTranslation] = useState<{
    original: string;
    translation: string;
  }>();
  const [{ status, languages, streamerCount, errorMessage }, setState] = useState<TState>({
    status: 'connecting',
    languages: [],
    streamerCount: 0,
  });
  const { id: code } = useParams();
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!code || !language) {
      return;
    }
    const playAudioQueue = async () => {
      const audioContext = audioContextRef.current;
      if (!audioContext) {
        return;
      }
      isPlayingRef.current = true;
      while (audioQueueRef.current.length > 0) {
        const buffer = audioQueueRef.current.shift();
        if (!buffer) continue;
        const audioBuffer = await audioContext.decodeAudioData(buffer);
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContext.destination);
        source.start();
        await new Promise((resolve) => {
          source.onended = resolve;
        });
      }
      isPlayingRef.current = false;
    };

    const handleSocketMessage = async (event: MessageEvent) => {
      if (event.data instanceof Blob) {
        if (shouldStreamAudioRef.current) {
          const buffer = await event.data.arrayBuffer();
          audioQueueRef.current.push(buffer);
          if (!isPlayingRef.current) {
            playAudioQueue();
          }
        }
        return;
      }
      const data = JSON.parse(event.data);
      if (data.type === EMessageType.JOINED) {
        logger.log('Joined:', data);
        return setState({ status: 'connected', ...data.state });
      }
      if (data.type === EMessageType.STREAMER_JOINED) {
        logger.log('Streamer Joined:', data);
        return setState((prev) => ({ ...prev, ...data.state }));
      }
      if (data.type === EMessageType.STREAMER_LEFT) {
        logger.log('Streamer Joined:', data);
        return setState((prev) => ({ ...prev, ...data.state }));
      }
      if (data.type === EMessageType.ERROR) {
        logger.error('Error:', data);
        return setState((prev) => ({
          ...prev,
          status: 'error',
          errorMessage: data.message,
        }));
      }
      if (data.type === EMessageType.BROADCAST_CLOSED) {
        logger.log('Languages:', data);
        setState({
          status: 'error',
          errorMessage: 'STREAM_CLOSED',
          languages: [],
          streamerCount: 0,
        });
      }
      if (data.type === EMessageType.PUB) {
        setLatestTranslation(data.data);
      }
    };
    setState({
      status: 'connecting',
      errorMessage: '',
      languages: [],
      streamerCount: 0,
    });
    socketRef.current = new WebSocket(config.socketUrl);
    socketRef.current.onopen = () => {
      logger.log('WebSocket connected.');
      socketRef.current?.send(
        JSON.stringify({
          type: EMessageType.JOIN,
          code,
          language: language.code,
        })
      );
    };
    socketRef.current.onmessage = (event) => {
      handleSocketMessage(event);
    };
    socketRef.current.onerror = (event) => {
      logger.error('WebSocket error:', event);
      setState({ status: 'error', languages: [], streamerCount: 0 });
    };
    return () => {
      logger.log('cleanup');
      socketRef.current?.close();
      audioContextRef.current?.close();
    };
  }, [code, language]);

  const onLanguageChange = (code: string) => {
    const lang = config.languages.find((lang) => lang.code === code);
    setLanguage(lang);
  };

  const toggleAudioStream = () => {
    setShouldStreamAudio((prev) => {
      if (!audioContextRef.current && !prev) {
        audioContextRef.current = new AudioContext();
      } else {
        isPlayingRef.current = false;
        audioContextRef.current?.close();
        audioContextRef.current = undefined;
      }
      if (socketRef.current) {
        socketRef.current.send(
          JSON.stringify({
            type: prev ? EMessageType.LEAVE_AUDIO : EMessageType.JOIN_AUDIO,
            code,
          })
        );
      }
      return !prev;
    });
  };
  console.log('audio', audioContextRef.current);

  return (
    <>
      {!language && (
        <>
          <Flex direction="column" align="center" p="3">
            <Box minWidth="200px">
              <Text size="3" as="div" weight="bold">
                Stream Code
              </Text>
              <TextField.Root mb="4" size="3" value={code} />
              <Box minWidth="200px">
                <Text size="3" as="div" weight="bold">
                  Language
                </Text>
              </Box>
              <Select.Root size="3" onValueChange={onLanguageChange}>
                <Select.Trigger placeholder="Translation Language" />
                <Select.Content>
                  {config.languages.map((lang) => (
                    <Select.Item key={lang.code} value={lang.code}>
                      {lang.name}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </Box>
            <Separator size="4" my="4" />
            <Box>
              <Button size="4" disabled>
                Join Stream <ArrowRightCircleIcon height="24" />{' '}
              </Button>
            </Box>
          </Flex>
        </>
      )}
      {language && (
        <>
          <Flex justify="between" align="center" wrap="wrap">
            <Text size="3">
              Stream:
              <Text as="span" weight="bold">
                {code}
              </Text>
            </Text>
            <Box>
              <Button variant="soft" color={shouldStreamAudio ? undefined : 'red'} onClick={toggleAudioStream}>
                {shouldStreamAudio ? <SpeakerWaveIcon height="20" /> : <SpeakerXMarkIcon height="20" />}
              </Button>
            </Box>
          </Flex>
          <Box my="3">
            <Separator size="4" my="2" />
            <StreamHeader languagesCount={languages.length} streamerCount={streamerCount} status={status} />
            <Box my="3">
              <Card>
                <Text size="2" as="div" weight="bold">
                  {language.name} Translation
                </Text>
                <Text size="6" as="div" color="gray" highContrast={!!latestTranslation}>
                  {latestTranslation?.translation ||
                    (!errorMessage && 'Translations may take a while before they star appearing.') ||
                    '-'}
                </Text>
              </Card>
            </Box>
            <Box my="3">
              <Card>
                <Text size="2" as="div" weight="bold">
                  Original
                </Text>
                <Text size="2" as="div">
                  {latestTranslation?.original || '-'}
                </Text>
              </Card>
            </Box>
          </Box>
        </>
      )}
      <Box py="3">
        {errorMessage && (
          <>
            <Callout.Root variant="soft" color="amber" size={'1'}>
              <Callout.Icon>
                <InformationCircleIcon height="24" />
              </Callout.Icon>
              <Callout.Text>
                <Flex direction="column">{formatErrorMessage(errorMessage)}</Flex>
              </Callout.Text>
            </Callout.Root>
          </>
        )}
      </Box>
      <Box>
        <Button size="2" asChild>
          <Link to={ROUTES.root}>Go Home </Link>
        </Button>
      </Box>
    </>
  );
}

export default StreamPage;

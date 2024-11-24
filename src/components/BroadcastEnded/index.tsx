import { Box, Button, Flex, Separator, Text } from '@radix-ui/themes';
import { Link } from 'react-router-dom';
import ROUTES from '../../constants/ROUTES';
import { HandThumbUpIcon, HandThumbDownIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import config from '../../config';
import logger from '../../util/logger';

type Props = {
  duration: number;
  audio?: Blob;
};

const msToTime = (duration: number) => {
  const seconds = Math.floor((duration / 1000) % 60);
  const minutes = Math.floor((duration / (1000 * 60)) % 60);
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  return `${hours}h ${minutes}m ${seconds}s`;
};

const POSITIVE_RESPONSE_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSejCUXuseGAsR1R2H-Cckf6nSfF4OMHexQKATf6N3HmPpd3jw/viewform?usp=pp_url&entry.745597847=Good';

const NOT_POSITIVE_RESPONSE_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSejCUXuseGAsR1R2H-Cckf6nSfF4OMHexQKATf6N3HmPpd3jw/viewform?usp=pp_url&entry.745597847=Not+Great';

function BroadcastEnded({ duration, audio }: Props) {
  const [isTranscriptLoading, setIsTranscriptLoading] = useState(false);
  const downloadAudio = () => {
    if (!audio) {
      return;
    }
    const url = URL.createObjectURL(audio);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gt_reach_audio_${Date.now()}.wav`;
    a.click();
    window.setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
  };
  const downloadTranscript = () => {
    // Download transcript
    if (!audio) {
      return;
    }
    const formData = new FormData();
    formData.append('file', audio);
    setIsTranscriptLoading(true);
    fetch(`${config.apiUrl}/transcribe`, {
      method: 'POST',
      body: formData,
    })
      .then((res) => {
        if (res.ok) {
          return res.blob();
        }
        return res.json();
      })
      .then((data) => {
        const url = URL.createObjectURL(data);
        const a = document.createElement('a');
        a.href = url;
        a.download = `gt_reach_transcript_${Date.now()}.txt`;
        a.click();
        window.setTimeout(() => {
          URL.revokeObjectURL(url);
        }, 1000);
      })
      .catch((err) => {
        logger.error(err);
      })
      .finally(() => {
        setIsTranscriptLoading(false);
      });
  };

  return (
    <Flex direction="column" gap="3" align="center">
      <Text size="8">Broadcast Ended</Text>
      <Box my="1">
        <Text size="4">Duration: {msToTime(duration)} </Text>
      </Box>
      <Text size="4">The broadcast has ended. How was your experience?</Text>
      <Flex gap="2">
        <Button asChild variant="surface" size="3" color="green">
          <a href={POSITIVE_RESPONSE_URL} target="_blank" rel="noopener noreferrer">
            <HandThumbUpIcon height="32" />
          </a>
        </Button>
        <Button asChild variant="surface" size="3" color="amber">
          <a href={NOT_POSITIVE_RESPONSE_URL} target="_blank" rel="noopener noreferrer">
            <HandThumbDownIcon height="32" />
          </a>
        </Button>
      </Flex>
      <Separator my="4" size="3" />
      <Flex direction="column" gap="3">
        <Button size="3" asChild>
          <Link to={ROUTES.root}>Back to Home</Link>
        </Button>
        {Boolean(audio) && (
          <Button size="3" onClick={downloadAudio} variant="surface">
            Download Audio
          </Button>
        )}
        {Boolean(audio) && (
          <Button size="3" variant="surface" onClick={downloadTranscript} loading={isTranscriptLoading}>
            Download Transcript
          </Button>
        )}
      </Flex>
    </Flex>
  );
}

export default BroadcastEnded;

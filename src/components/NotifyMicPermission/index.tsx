import { ExclamationCircleIcon, MicrophoneIcon } from '@heroicons/react/16/solid';
import { Box, Button, Callout, Text } from '@radix-ui/themes';
import { useState } from 'react';
import logger from '../../util/logger';

interface Props {
  onPermissionGranted: () => void;
}

function NotifyMicPermission({ onPermissionGranted }: Props) {
  const [micPermission, setMicPermission] = useState<boolean>();

  const requestPermission = () => {
    setMicPermission(undefined);
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => {
        onPermissionGranted();
      })
      .catch(() => {
        setMicPermission(false);
        logger.log('Permission Denied');
      });
  };

  return (
    <Box p="3">
      <Text size="6">
        <MicrophoneIcon height="32" width="32" /> Microphone Permission Required
      </Text>
      <Box py="3">
        <Text>We need access to your microphone to start the broadcast. Please grant permission to continue.</Text>
      </Box>
      <Box>
        <Button onClick={requestPermission}>Grant Permission</Button>
        {micPermission === false && (
          <Box py="2">
            <Callout.Root color="red">
              <Callout.Icon>
                <ExclamationCircleIcon />
              </Callout.Icon>
              <Callout.Text>
                Permissions denied. Learn how to enable your microphone in your browser
                <a
                  href="https://www.lifewire.com/configure-camera-microphone-setting-in-google-chrome-4103623"
                  target="_blank"
                  rel="noopener noreferrer">
                  here
                </a>
              </Callout.Text>
            </Callout.Root>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default NotifyMicPermission;

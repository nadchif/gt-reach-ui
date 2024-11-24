import { AlertDialog, Box, Button, Card, Flex, Select, Separator, Text } from '@radix-ui/themes';
import StreamHeader from '../StreamHeader';
import ROUTES from '../../constants/ROUTES';
import ShareStreamPopover from '../ShareStreamPopover';
import { MicrophoneIcon, ShareIcon } from '@heroicons/react/24/outline';
import * as Toast from '@radix-ui/react-toast';
import { useState } from 'react';
import { broadcastLanguages } from '../../config';

type Props = {
  isSpeaking: boolean;
  streamerCount: number;
  languages: string[];
  code: string;
  latestText: string;
  onStopStream: () => void;
};

const getUrl = (code: string) => {
  const currentHost = window.location.origin;
  return `${currentHost}${ROUTES.stream.replace(':id', code)}`;
};

function Broadcast({ streamerCount, languages, code, latestText, onStopStream, isSpeaking }: Props) {
  const linkUrl = getUrl(code);
  const [isCopiedSnackbarOpen, setIsCopiedSnackbarOpen] = useState(false);

  return (
    <>
      <Flex justify="between" wrap="wrap">
        <Text size={{ initial: '3', sm: '6' }}>
          Stream:
          <Text as="span" weight="bold">
            {code}
          </Text>
        </Text>
        <ShareStreamPopover linkUrl={linkUrl} code={code}>
          <Button size={{ initial: '2', sm: '3' }}>
            Share Stream <ShareIcon width="24" height="24" />
          </Button>
        </ShareStreamPopover>
      </Flex>
      <Box my="3">
        <Separator size="4" my="2" />
        <StreamHeader
          languagesCount={languages.length}
          status={streamerCount > 0 ? 'live' : 'paused'}
          streamerCount={streamerCount}
        />
      </Box>
      {streamerCount > 0 && (
        <Flex direction="column" gap="4">
          <Card>
            <Flex gap="2" direction="column" justify="center" align="center">
              <Box>
                Broadcast Language:
                <Select.Root defaultValue="en">
                  <Select.Trigger />
                  <Select.Content>
                    {broadcastLanguages.map((lang) => (
                      <Select.Item key={lang.code} value={lang.code}>
                        {lang.name}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
              </Box>
              <Box py="5">
                <div className="mic">
                  {isSpeaking && (
                    <>
                      <div className="wave"></div>
                      <div className="wave"></div>
                      <div className="wave"></div>
                    </>
                  )}
                  <MicrophoneIcon className={!isSpeaking ? 'heartbeat' : ''} height="60" color={'var(--gray-9)'} />
                </div>
              </Box>
              <Box>
                <AlertDialog.Root>
                  <AlertDialog.Trigger>
                    <Button color="red">Stop Stream</Button>
                  </AlertDialog.Trigger>
                  <AlertDialog.Content maxWidth="450px">
                    <AlertDialog.Title>Stop Stream?</AlertDialog.Title>
                    <AlertDialog.Description size="2">
                      Are you sure? This will end the stream for all viewers.
                    </AlertDialog.Description>
                    <Flex gap="3" mt="4" justify="end">
                      <AlertDialog.Cancel>
                        <Button variant="soft" color="gray">
                          Cancel
                        </Button>
                      </AlertDialog.Cancel>
                      <AlertDialog.Action>
                        <Button variant="solid" color="red" onClick={onStopStream}>
                          Stop Stream
                        </Button>
                      </AlertDialog.Action>
                    </Flex>
                  </AlertDialog.Content>
                </AlertDialog.Root>
              </Box>
            </Flex>
            <Box my="2">
              <Text weight="bold" as="div">
                Preview:
              </Text>
              <Text>{latestText}</Text>
            </Box>
          </Card>
        </Flex>
      )}
      {streamerCount < 1 && (
        <Card>
          <Flex direction="column" minHeight="240px" justify="center" align="center">
            <Flex direction="column" gap="4">
              <Text size="3">Waiting for streamers to join...</Text>
              <Button size="3" variant="outline" color="red" onClick={onStopStream}>
                Cancel Stream
              </Button>
              <ShareStreamPopover linkUrl={linkUrl} code={code}>
                <Button size="3" variant="outline">
                  Invite Streamers
                </Button>
              </ShareStreamPopover>
            </Flex>
          </Flex>
        </Card>
      )}
      <Toast.Provider swipeDirection="right">
        <Toast.Root open={isCopiedSnackbarOpen} onOpenChange={setIsCopiedSnackbarOpen}>
          <Toast.Description></Toast.Description>
        </Toast.Root>
        <Toast.Viewport className="ToastViewport" />
      </Toast.Provider>
    </>
  );
}

export default Broadcast;

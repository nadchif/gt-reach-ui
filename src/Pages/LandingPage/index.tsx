import { PlusCircleIcon } from '@heroicons/react/16/solid';
import { Container, Text, Button, Flex, Separator, TextField, Box, Popover } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../constants/ROUTES';
import { createId } from '@paralleldrive/cuid2';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import config from '../../config';

function LandingPage() {
  const navigate = useNavigate();

  const createStream = () => {
    navigate(ROUTES.broadcast, {
      state: {
        traceId: createId(),
      },
    });
  };

  const handleJoinByCode = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const codeInput = formData.get('code') as string;
    navigate(ROUTES.stream.replace(':id', codeInput));
  };

  return (
    <Flex direction="column" align="center">
      <Box maxWidth="480px">
        <Container size="1">
          <Box py="4">
            <Text size="3" asChild>
              <div>
                Increase your reach by broadcasting with real-time translations for your audience. Featuring support for{' '}
                <b>over 100 languages</b>.
                <Popover.Root>
                  <Popover.Trigger>
                    <Button size="3" variant="ghost">
                      How it works <QuestionMarkCircleIcon height="16" />
                    </Button>
                  </Popover.Trigger>
                  <Popover.Content width="360px">
                    <Flex direction="column">
                      <Text size="5">How it Works</Text>
                      <ol>
                        <Text asChild>
                          <li>Create a new stream and share the code with your audience.</li>
                        </Text>
                        <Text asChild>
                          <li>Your audience can join the stream using the code.</li>
                        </Text>
                        <Text asChild>
                          <li>Start broadcasting and your audience will receive real-time translations.</li>
                        </Text>
                      </ol>
                    </Flex>
                  </Popover.Content>
                </Popover.Root>
              </div>
            </Text>
          </Box>
          <Flex direction="column" gap="2" my="2" asChild>
            <form onSubmit={handleJoinByCode}>
              <Button type="button" onClick={createStream} size="3">
                <PlusCircleIcon height="20" width="20" /> New Stream
              </Button>
              <Flex align="center" py="3" gap="3">
                <Separator orientation="horizontal" size="4" />
                <Text size="3"> or </Text>
                <Separator orientation="horizontal" size="4" />
              </Flex>
              <TextField.Root
                placeholder="Enter live stream code"
                size="3"
                name="code"
                required
                pattern={config.meetingCodePattern}></TextField.Root>
              <Button variant="surface" size="3">
                Join Stream
              </Button>
            </form>
          </Flex>
        </Container>
      </Box>
    </Flex>
  );
}

export default LandingPage;

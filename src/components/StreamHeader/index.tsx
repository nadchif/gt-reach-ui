import {
  BoltIcon,
  ExclamationCircleIcon,
  LanguageIcon,
  PauseIcon,
  QuestionMarkCircleIcon,
  UserGroupIcon,
} from '@heroicons/react/16/solid';
import { Box, Callout, Flex } from '@radix-ui/themes';

type Props = {
  status: 'paused' | 'live' | 'connecting' | 'connected' | 'error';
  streamerCount: number;
  languagesCount: number;
};

function StreamHeader({ languagesCount, status, streamerCount }: Props) {
  const getStatusIcon = () => {
    switch (status) {
      case 'live':
      case 'connected':
        return <BoltIcon height="24" color="green" />;
      case 'paused':
      case 'connecting':
        return <PauseIcon height="24" color="red" />;
      case 'error':
        return <ExclamationCircleIcon height="24" color="red" />;
      default:
        return <QuestionMarkCircleIcon height="24" color="blue" />;
    }
  };
  const getStatusText = () => {
    switch (status) {
      case 'live':
        return 'Live';
      case 'paused':
        return 'Paused';
      case 'connecting':
        return 'Connecting';
      case 'connected':
        return 'Connected';
      case 'error':
        return 'Error';
      default:
        return 'Unknown';
    }
  };
  return (
    <Flex gap="2">
      <Box maxWidth="200px" as="span">
        <Callout.Root variant="soft" color="gray" size="1">
          <Callout.Icon className={status === 'error' ? '' : 'heartbeat'}>{getStatusIcon()}</Callout.Icon>
          <Callout.Text>
            <Box as="span" display={{ initial: 'none', sm: 'inline' }}>
              Status:
            </Box>{' '}
            <b>{getStatusText()} </b>
          </Callout.Text>
        </Callout.Root>
      </Box>
      <Box maxWidth="200px" as="span">
        <Callout.Root variant="soft" color="gray" size={'1'}>
          <Callout.Icon>
            <UserGroupIcon height="24" />
          </Callout.Icon>
          <Callout.Text>
            <Box as="span" display={{ initial: 'none', sm: 'inline' }}>
              Streamers:
            </Box>
            <b>{streamerCount}</b>
          </Callout.Text>
        </Callout.Root>
      </Box>
      <Box maxWidth="200px" as="span">
        <Callout.Root variant="soft" color="gray" size={'1'}>
          <Callout.Icon>
            <LanguageIcon height="24" />
          </Callout.Icon>
          <Callout.Text>
            <Box as="span" display={{ initial: 'none', sm: 'inline' }}>
              Languages:
            </Box>
            {languagesCount}
          </Callout.Text>
        </Callout.Root>
      </Box>
    </Flex>
  );
}

export default StreamHeader;

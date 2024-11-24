import { LinkSlashIcon } from '@heroicons/react/16/solid';
import { Box, Button, Flex, Text } from '@radix-ui/themes';
import { Link } from 'react-router-dom';
import ROUTES from '../../constants/ROUTES';

function NotFoundPage() {
  return (
    <Flex direction="column" gap="4" align="center">
      <Text size="8">
        <LinkSlashIcon height="28" /> 404
      </Text>
      <Box>
        <Text size="4" weight="bold">
          Page Not Found
        </Text>
      </Box>
      <Box>
        <Text size="4">The page you are looking for does not exist.</Text>
      </Box>
      <Box>
        <Button size="3" asChild>
          <Link to={ROUTES.root}>Back to Home</Link>
        </Button>
      </Box>
    </Flex>
  );
}

export default NotFoundPage;

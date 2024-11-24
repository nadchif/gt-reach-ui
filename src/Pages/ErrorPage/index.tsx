import { FaceFrownIcon } from '@heroicons/react/24/outline';
import { Box, Flex, Text, Button } from '@radix-ui/themes';
import ROUTES from '../../constants/ROUTES';
import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <Flex direction="column" align="center" gap="3">
      <Box>
        <FaceFrownIcon height="40" />
      </Box>
      <Text size="7" align="center">
        Something not nice happened
      </Text>
      <Text as="div">An error occurred</Text>
      <Box my="4">
        <Button size="3" asChild>
          <Link to={ROUTES.root}>Back to Home</Link>
        </Button>
      </Box>
    </Flex>
  );
}

export default ErrorPage;

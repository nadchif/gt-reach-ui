import { SunIcon } from '@heroicons/react/24/outline';
import { Box, Button, Container, Separator, Text, Flex, Link as RadixLink, DropdownMenu } from '@radix-ui/themes';
import { Link, Outlet } from 'react-router-dom';
import { useAppearance } from './context/appearance';

function App() {
  const { applyAppearance } = useAppearance();
  return (
    <>
      <Flex asChild justify="between" align="center" p="3">
        <header>
          <Box>&nbsp;</Box>
          <Text size="8" asChild align="center">
            <h1>
              <Button asChild variant="ghost" size="4">
                <Link to="/">
                  <Text size="8">Gt.Reach</Text>
                </Link>
              </Button>
            </h1>
          </Text>
          <Box>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Button variant="ghost">
                  <SunIcon height="24" />
                  <DropdownMenu.TriggerIcon />
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item onClick={() => applyAppearance('light')}>Light</DropdownMenu.Item>
                <DropdownMenu.Item onClick={() => applyAppearance('dark')}>Dark</DropdownMenu.Item>
                <DropdownMenu.Item onClick={() => applyAppearance('inherit')}>System</DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </Box>
        </header>
      </Flex>
      <Separator size="4" my="4" />
      <Box asChild minHeight="80vh" px={{ initial: '3', sm: '0' }}>
        <Container asChild size="2">
          <main>
            <Outlet />
          </main>
        </Container>
      </Box>
      <footer>
        <Text size="2" asChild align="center">
          <div>
            © 2024 Gt.Reach |{' '}
            <RadixLink href="https://github.com/nadchif/gt-reach-ui" target="_blank">
              Source Code
            </RadixLink>
          </div>
        </Text>
      </footer>
    </>
  );
}

export default App;

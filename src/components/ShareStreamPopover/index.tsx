import { Box, Button, Callout, Flex, Popover, Text, TextField } from '@radix-ui/themes';
import React, { useEffect, useState } from 'react';
import logger from '../../util/logger';
import QRCode from 'qrcode';
import * as Toast from '@radix-ui/react-toast';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

type Props = {
  children: React.ReactNode;
  linkUrl: string;
  code: string;
};

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(() => {
    logger.log('Copied to clipboard');
  });
};

function ShareStreamPopover({ children, linkUrl, code }: Props) {
  const [isCopiedSnackbarOpen, setIsCopiedSnackbarOpen] = useState(false);
  const [qrCodeSrc, setQrCodeSrc] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
      const code = await QRCode.toDataURL(linkUrl);
      setQrCodeSrc(code);
    })();
  }, []);

  const handleCopy = (text: string) => () => {
    setIsCopiedSnackbarOpen(true);
    copyToClipboard(text);
  };

  return (
    <>
      <Popover.Root>
        <Popover.Trigger>{children}</Popover.Trigger>
        <Popover.Content width="360px">
          <Flex direction="column" gap="3">
            <div>
              <Text>Your audience can join the stream using the following link or code.</Text>
            </div>
            <div>
              <Text size="3" as="div" weight="bold">
                Link
              </Text>
              <TextField.Root value={linkUrl} readOnly size="1">
                <TextField.Slot side="right" pr="0">
                  <Popover.Close>
                    <Button variant="soft" size="1" onClick={handleCopy(linkUrl)}>
                      Copy
                    </Button>
                  </Popover.Close>
                </TextField.Slot>
              </TextField.Root>
            </div>
            <div>
              <Text size="3" as="div" weight="bold">
                Code
              </Text>
              <TextField.Root value={code} readOnly>
                <TextField.Slot side="right" pr="0">
                  <Popover.Close>
                    <Button variant="soft" onClick={handleCopy(code)}>
                      Copy
                    </Button>
                  </Popover.Close>
                </TextField.Slot>
              </TextField.Root>
            </div>
            {qrCodeSrc && (
              <Box display={{ initial: 'none', sm: 'block' }}>
                <Text size="3" as="div" weight="bold">
                  QR Code
                </Text>
                <img src={qrCodeSrc} alt="QR Code" />
              </Box>
            )}
          </Flex>
        </Popover.Content>
      </Popover.Root>
      <Box position="fixed" bottom="1" right="2">
        <Toast.Provider swipeDirection="right">
          <Toast.Root open={isCopiedSnackbarOpen} onOpenChange={setIsCopiedSnackbarOpen}>
            <Toast.Description>
              <Callout.Root color="green">
                <Callout.Icon>
                  <InformationCircleIcon height="24" />
                </Callout.Icon>
                <Callout.Text>Copied to Clipboard</Callout.Text>
              </Callout.Root>
            </Toast.Description>
          </Toast.Root>
          <Toast.Viewport className="ToastViewport" />
        </Toast.Provider>
      </Box>
    </>
  );
}

export default ShareStreamPopover;

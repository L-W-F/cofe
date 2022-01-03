import React, { useCallback, useState } from 'react';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  IconButton,
  Switch,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { DownloadIcon } from '@cofe/icons';
import {
  CHAR_COMMAND_KEY,
  CHAR_SHIFT_KEY,
  useShortcut,
} from '@/hooks/useShortcut';
import { useAppState } from '@/store/app';

export const DownloadDsl = () => {
  const { id, title, description, pages } = useAppState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [format, setFormat] = useState(true);

  useShortcut(
    `${CHAR_COMMAND_KEY}${CHAR_SHIFT_KEY}E`,
    useCallback(
      (e) => {
        e.preventDefault();
        onOpen();
      },
      [onOpen],
    ),
  );

  return (
    <>
      <Tooltip
        hasArrow
        label={`下载 DSL [${CHAR_COMMAND_KEY}${CHAR_SHIFT_KEY}E]`}
      >
        <IconButton
          aria-label="下载 DSL"
          icon={<DownloadIcon />}
          variant="ghost"
          onClick={onOpen}
        />
      </Tooltip>
      <Drawer isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>下载 DSL</DrawerHeader>
          <DrawerBody>
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="email-alerts" mb="0">
                格式化？
              </FormLabel>
              <Switch
                id="email-alerts"
                isChecked={format}
                onChange={(e) => {
                  setFormat(e.target.checked);
                }}
              />
            </FormControl>
          </DrawerBody>
          <DrawerFooter>
            <Button
              isFullWidth
              colorScheme="primary"
              loadingText="保存"
              onClick={() => {
                const anchor = document.createElement('a');

                const file = new Blob(
                  [
                    JSON.stringify(
                      { id, title, description, pages },
                      null,
                      format ? 4 : null,
                    ),
                  ],
                  {
                    type: 'text/plain',
                  },
                );

                const url = URL.createObjectURL(file);

                anchor.href = url;
                anchor.download = `app${id}.json`;
                document.body.appendChild(anchor);
                anchor.click();

                setTimeout(() => {
                  document.body.removeChild(anchor);
                  URL.revokeObjectURL(url);
                }, 0);

                onClose();
              }}
            >
              下载
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

if (process.env.NODE_ENV === 'development') {
  DownloadDsl.displayName = 'DownloadDsl';
}

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
  IconButton,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { Form } from '@cofe/form';
import { SaveTemplateIcon } from '@cofe/icons';
import { CofeTree } from '@cofe/types';
import { u } from 'unist-builder';
import { map } from 'unist-util-map';
import {
  CHAR_COMMAND_KEY,
  CHAR_SHIFT_KEY,
  useShortcut,
} from '@/hooks/useShortcut';
import { useSelectedTree } from '@/store/editor';
import { useTemplateActions } from '@/store/template';

export const SaveTemplate = () => {
  const selectedTree = useSelectedTree();
  const { create } = useTemplateActions();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState(null);

  useShortcut(
    `${CHAR_COMMAND_KEY}${CHAR_SHIFT_KEY}S`,
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
        label={`另存为模板 [${CHAR_COMMAND_KEY}${CHAR_SHIFT_KEY}S]`}
      >
        <IconButton
          aria-label="另存为模板"
          icon={<SaveTemplateIcon />}
          variant="ghost"
          onClick={onOpen}
        />
      </Tooltip>
      <Drawer isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>另存为模板</DrawerHeader>
          <DrawerBody>
            <Form
              formData={formData}
              schema={{
                type: 'object',
                properties: {
                  type: {
                    type: 'string',
                    title: '类型',
                  },
                  description: {
                    type: 'string',
                    title: '描述',
                  },
                },
                required: ['type'],
              }}
              onChange={(e) => {
                setFormData(e.formData);
              }}
            />
          </DrawerBody>
          <DrawerFooter>
            <Button
              isFullWidth
              colorScheme="teal"
              loadingText="保存"
              onClick={() => {
                create({
                  [`template:${formData.type}`]: {
                    type: `template:${formData.type}`,
                    template: map(
                      selectedTree,
                      ({ type, properties, actions }: CofeTree) => {
                        return u(type, { properties, actions });
                      },
                    ),
                  },
                });

                onClose();
              }}
            >
              保存
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

import React, { cloneElement, ReactElement } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { Form } from '@cofe/form';
import { EditIcon } from '@cofe/icons';
import { useAppActions, useAppValue } from '@/store/app';

interface EditAppProps {
  trigger?: ReactElement;
}

export const EditApp = ({ trigger }: EditAppProps) => {
  const { title, description, theme } = useAppValue();
  const { updateApp } = useAppActions();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {trigger ? (
        cloneElement(trigger, {
          onClick: onOpen,
        })
      ) : (
        <IconButton
          aria-label="编辑应用"
          size="xs"
          icon={<EditIcon />}
          variant="ghost"
          onClick={onOpen}
        />
      )}
      <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>编辑应用</DrawerHeader>
          <DrawerBody>
            <Form
              formData={{ title, description, theme }}
              schema={{
                type: 'object',
                properties: {
                  title: {
                    type: 'string',
                    title: '名称',
                  },
                  description: {
                    type: 'string',
                    title: '描述',
                  },
                  theme: {
                    type: 'object',
                    title: '主题',
                    properties: {
                      colors: {
                        type: 'object',
                        properties: {
                          brand: {
                            type: 'string',
                          },
                        },
                      },
                      shapes: {
                        type: 'object',
                        properties: {
                          radii: {
                            type: 'string',
                            enum: ['sm', 'md', 'lg'],
                            default: 'md',
                          },
                        },
                      },
                    },
                  },
                },
                required: ['title'],
              }}
              uiSchema-={{
                theme: {
                  colors: {
                    brand: {
                      'ui:widget': 'color',
                    },
                  },
                  shapes: {
                    radii: {
                      'ui:widget': 'radio',
                    },
                  },
                },
              }}
              onChange={(e) => {
                updateApp(e.formData);
              }}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

if (process.env.NODE_ENV === 'development') {
  EditApp.displayName = 'EditApp';
}

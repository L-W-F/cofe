import React from 'react';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { Form } from '@cofe/form';
import { EditIcon } from '@cofe/icons';
import { useAppState } from '@/store/app';

export const EditApp = () => {
  const { title, description, theme, updateApp } = useAppState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button leftIcon={<EditIcon />} onClick={onOpen}>
        编辑应用
      </Button>
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

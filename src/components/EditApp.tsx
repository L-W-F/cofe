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
  const { title, description } = useAppValue();
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
              formData={{ title, description }}
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
                },
                required: ['title'],
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

import React, { cloneElement, ReactElement, useState } from 'react';
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
  useDisclosure,
} from '@chakra-ui/react';
import { Form } from '@cofe/form';
import { EditIcon } from '@cofe/icons';
import { CofeApp } from '@cofe/types';
import { makeId } from '@cofe/utils';
import { useAppActions } from '@/store/app';

interface EditPageProps {
  trigger?: ReactElement;
  page: Partial<CofeApp['pages'][string]>;
}

export const EditPage = ({ trigger, page }: EditPageProps) => {
  const { createPage, updatePage } = useAppActions();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState(page);

  return (
    <>
      {trigger ? (
        cloneElement(trigger, {
          onClick: onOpen,
        })
      ) : (
        <IconButton
          aria-label={page.id ? '编辑页面' : '创建页面'}
          icon={<EditIcon />}
          variant="ghost"
          onClick={onOpen}
        />
      )}
      <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{page.id ? '编辑页面' : '创建页面'}</DrawerHeader>
          <DrawerBody>
            <Form
              formData={formData}
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
                setFormData(e.formData);
              }}
            />
          </DrawerBody>
          <DrawerFooter>
            <Button
              isFullWidth
              loadingText="保存"
              onClick={() => {
                if (page.id) {
                  updatePage({ ...page, ...formData });
                } else {
                  createPage({ id: makeId(), ...formData });
                }

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

if (process.env.NODE_ENV === 'development') {
  EditPage.displayName = 'EditPage';
}

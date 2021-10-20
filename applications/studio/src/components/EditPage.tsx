import React, { cloneElement, ReactElement, useEffect, useState } from 'react';
import { EditIcon } from '@chakra-ui/icons';
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
  useToast,
} from '@chakra-ui/react';
import { Form } from '@cofe/form';
import { patch, post, subscribe } from '@cofe/io';
import { useDispatch } from '@cofe/store';
import { CofeDbPage } from '@cofe/types';

interface EditPageProps {
  trigger?: ReactElement;
  page: Partial<CofeDbPage>;
  isDisabled?: boolean;
}

export const EditPage = ({ trigger, page, isDisabled }: EditPageProps) => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast({
    status: 'success',
    duration: 1000,
    position: 'bottom-left',
  });
  const [formData, setFormData] = useState(page);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return subscribe((type) => {
      setIsLoading(type === 'start');
    });
  }, []);

  return (
    <>
      {trigger ? (
        cloneElement(trigger, {
          onClick: onOpen,
          isDisabled,
        })
      ) : (
        <IconButton
          aria-label={page.id ? '编辑页面' : '创建新页面'}
          size="xs"
          icon={<EditIcon />}
          variant="ghost"
          isDisabled={isDisabled}
          onClick={onOpen}
        />
      )}
      <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{page.id ? '编辑页面' : '创建新页面'}</DrawerHeader>
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
              colorScheme="teal"
              isLoading={isLoading}
              isDisabled={isLoading}
              loadingText="保存"
              onClick={async () => {
                if (page.id) {
                  const page_ = await patch(`/api/pages/${page.id}`, formData);

                  toast({
                    title: '保存成功',
                  });

                  dispatch('UPDATE_PAGE')(page_);
                } else {
                  const page_ = await post('/api/pages', formData);

                  toast({
                    title: '创建成功',
                  });

                  dispatch('CREATE_PAGE')(page_);
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

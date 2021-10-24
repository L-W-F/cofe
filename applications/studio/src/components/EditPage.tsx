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
  useToast,
} from '@chakra-ui/react';
import { Form } from '@cofe/form';
import { EditIcon } from '@cofe/icons';
import { patch, post } from '@cofe/io';
import { useDispatch } from '@cofe/store';
import { CofeDbPage } from '@cofe/types';
import { useIsLoading } from '@/hooks/useIsLoading';

interface EditPageProps {
  trigger?: ReactElement;
  page: Partial<CofeDbPage>;
}

export const EditPage = ({ trigger, page }: EditPageProps) => {
  const is_loading = useIsLoading();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast({
    status: 'success',
    duration: 1000,
    position: 'bottom-left',
  });
  const [formData, setFormData] = useState(page);

  return (
    <>
      {trigger ? (
        cloneElement(trigger, {
          onClick: onOpen,
          isDisabled: is_loading,
        })
      ) : (
        <IconButton
          aria-label={page.id ? '编辑页面' : '创建新页面'}
          size="xs"
          icon={<EditIcon />}
          variant="ghost"
          isDisabled={is_loading}
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
              isLoading={is_loading}
              isDisabled={is_loading}
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

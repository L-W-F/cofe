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
import { CofeDbApp } from '@cofe/types';
import { useIsLoading } from '@/hooks/useIsLoading';

interface EditAppProps {
  trigger?: ReactElement;
  app: Partial<CofeDbApp>;
}

export const EditApp = ({ trigger, app }: EditAppProps) => {
  const is_loading = useIsLoading();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast({
    status: 'success',
    duration: 1000,
    position: 'bottom-left',
  });
  const [formData, setFormData] = useState(app);

  return (
    <>
      {trigger ? (
        cloneElement(trigger, {
          onClick: onOpen,
          isDisabled: is_loading,
        })
      ) : (
        <IconButton
          aria-label={app.id ? '编辑应用' : '创建新应用'}
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
          <DrawerHeader>{app.id ? '编辑应用' : '创建新应用'}</DrawerHeader>
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
                if (app.id) {
                  const app_ = await patch(`/api/apps/${app.id}`, formData);

                  toast({
                    title: '保存成功',
                  });

                  dispatch('UPDATE_APP')(app_);
                } else {
                  const app_ = await post('/api/apps', formData);

                  toast({
                    title: '创建成功',
                  });

                  dispatch('CREATE_APP')(app_);
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

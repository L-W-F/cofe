import React, { useState } from 'react';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useToast,
} from '@chakra-ui/react';
import { Form } from '@cofe/form';
import { post } from '@cofe/io';
import { useDispatch } from '@cofe/store';
import { CofeTree } from '@cofe/types';
import { map } from 'lodash';
import { u } from 'unist-builder';
import { useIsLoading } from '@/hooks/useIsLoading';
import { useSelectedTree } from '@/hooks/useSelectedTree';

export const SaveTemplate = ({ isOpen, onClose }) => {
  const is_loading = useIsLoading();
  const selectedTree = useSelectedTree();
  const dispatch = useDispatch();
  const toast = useToast({
    status: 'success',
    duration: 1000,
    position: 'bottom-left',
  });
  const [formData, setFormData] = useState(null);

  return (
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
            colorScheme="teal"
            isLoading={is_loading}
            isDisabled={is_loading}
            loadingText="保存"
            onClick={async () => {
              try {
                const template = await post('/api/templates', {
                  ...formData,
                  template: map(
                    selectedTree,
                    ({ type, properties }: CofeTree) => {
                      return u(type, { properties });
                    },
                  ),
                });

                toast({
                  title: '已保存为模板',
                });

                dispatch('CREATE_SCHEMA')({
                  type: `template:${template.type}`,
                  schema: {
                    type: `template:${template.type}`,
                    template: template.template,
                  },
                });

                onClose();
              } catch (error) {}
            }}
          >
            保存
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

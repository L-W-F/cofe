import React, { useCallback, useEffect, useState } from 'react';
import { HamburgerIcon, RepeatClockIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  IconButton,
  List,
  ListIcon,
  ListItem,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useToast,
} from '@chakra-ui/react';
import { Form } from '@cofe/form';
import { get, post, put } from '@cofe/io';
import { useDispatch, useStore } from '@cofe/store';
import { CofeTree } from '@cofe/types';
import { dt, isMac } from '@cofe/utils';
import { map } from 'lodash';
import { u } from 'unist-builder';
import { EditorState } from '@/store/editor';

export const DropMenu = () => {
  const { page_id, stack, cursor } = useStore<EditorState>('editor');
  const dispatch = useDispatch();
  const toast = useToast({
    status: 'success',
    duration: 1000,
    position: 'bottom-left',
  });
  const [open, setOpen] = useState<'template' | 'history'>(null);
  const [formData, setFormData] = useState(null);
  const [snapshots, setSnapshots] = useState(null);

  const saveCurrent = useCallback(async () => {
    if (stack.length > 1) {
      await post(`/api/pages/${page_id}/stack`, stack[cursor]);
    }

    toast({
      title: '所有更改已保存',
    });
  }, [stack, cursor, toast, page_id]);

  const restoreSnapshot = useCallback(
    async (index) => {
      await put(`/api/pages/${page_id}/stack`, snapshots[index]);

      dispatch('PUSH')(snapshots[index]);

      toast({
        title: '已还原指定版本',
      });
    },
    [page_id, snapshots, dispatch, toast],
  );

  const openTemplate = useCallback(() => {
    setOpen('template');
  }, []);

  const openHistory = useCallback(() => {
    get(`/api/pages/${page_id}/stack`).then(setSnapshots);

    setOpen('history');
  }, [page_id]);

  const keydown = useCallback(
    async (e: KeyboardEvent) => {
      if ((!isMac && e.ctrlKey) || (isMac && e.metaKey)) {
        if (e.key.toLowerCase() === 's') {
          e.preventDefault();

          // ctrl+⇧?+s, ⌘+⇧?+s
          if (e.shiftKey) {
            setOpen('template');
          } else {
            saveCurrent();
          }
        }

        // ctrl+h, ⌘+h
        if (e.key.toLowerCase() === 'h') {
          e.preventDefault();

          openHistory();
        }
      }
    },
    [saveCurrent, openHistory],
  );

  useEffect(() => {
    document.addEventListener('keydown', keydown, true);

    return () => {
      document.removeEventListener('keydown', keydown, true);
    };
  }, [keydown]);

  return (
    <>
      <Menu matchWidth size="small">
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          variant="ghost"
        />
        <MenuList minW="initial">
          <MenuItem
            command="⌘S"
            isDisabled={stack.length <= 1}
            onClick={saveCurrent}
          >
            保存
          </MenuItem>
          <MenuItem command="⌘⇧S" onClick={openTemplate}>
            保存为模板
          </MenuItem>
          <MenuDivider />
          <MenuItem command="⌘H" onClick={openHistory}>
            历史版本
          </MenuItem>
        </MenuList>
      </Menu>
      <Drawer
        isOpen={!!open}
        onClose={() => {
          setOpen(null);
        }}
      >
        <DrawerOverlay />
        {open === 'template' ? (
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
                onClick={async () => {
                  try {
                    const template = await post('/api/templates', {
                      ...formData,
                      template: map(
                        stack[cursor],
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

                    setOpen(null);
                  } catch (error) {}
                }}
              >
                保存
              </Button>
            </DrawerFooter>
          </DrawerContent>
        ) : (
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>历史版本</DrawerHeader>
            <DrawerBody>
              <List display="flex" flexDirection="column">
                {snapshots?.map(({ created_at }, index) => {
                  return (
                    <ListItem
                      as={HStack}
                      justifyContent="space-between"
                      key={created_at ?? index}
                    >
                      <Box>{dt(created_at).format('YYYY-MM-DD HH:mm:ss')}</Box>
                      <ListIcon
                        aria-label="还原"
                        as={RepeatClockIcon}
                        cursor="pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          restoreSnapshot(index);
                        }}
                      />
                    </ListItem>
                  );
                }) ?? null}
              </List>
            </DrawerBody>
          </DrawerContent>
        )}
      </Drawer>
    </>
  );
};

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EditIcon,
  HamburgerIcon,
  RepeatClockIcon,
  ViewIcon,
} from '@chakra-ui/icons';
import {
  Box,
  BoxProps,
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
  Tag,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { Form } from '@cofe/form';
import { post, put } from '@cofe/io';
import { getState, useDispatch, useStore } from '@cofe/store';
import { CofeConfig, CofeTree } from '@cofe/types';
import { Paper, Toolbar } from '@cofe/ui';
import { dt, isMac } from '@cofe/utils';
import { pick } from 'lodash';
import { u } from 'unist-builder';
import { map } from 'unist-util-map';
import { DesignCanvas } from './DesignCanvas';
import { PreviewCanvas } from './PreviewCanvas';
import { useSelectedNode } from '@/hooks/useSelectedNode';
import { useSelectedTree } from '@/hooks/useSelectedTree';
import { EDIT_MODE_DESIGN } from '@/store/config';
import { EditorState } from '@/store/editor';
import { supabase } from '@/utils/supabase';

const DropMenu = () => {
  const dispatch = useDispatch();
  const { query } = useRouter();
  const toast = useToast({
    status: 'success',
    duration: 1000,
    position: 'bottom-left',
  });
  const [open, setOpen] = useState<'template' | 'history'>(null);
  const [formData, setFormData] = useState(null);
  const [snapshots, setSnapshots] = useState(null);

  const saveCurrent = useCallback(async () => {
    const { stack, cursor } = getState().editor;

    await put(`/api/pages/${query.id}/stack`, stack[cursor]);

    toast({
      title: '已保存',
    });
  }, [toast, query.id]);

  const openTemplate = useCallback(() => {
    setOpen('template');
  }, []);

  const openHistory = useCallback(() => {
    supabase
      .from('snapshots')
      .select('stack')
      .eq('id', query.id)
      .then(({ data, error }) => {
        if (data) {
          setSnapshots(data[0]?.stack ?? []);
        }
      });

    setOpen('history');
  }, [query.id]);

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
          <MenuItem command="⌘S" onClick={saveCurrent}>
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
                  const { stack, cursor } = getState().editor;

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
              <List display="flex" flexDirection="column-reverse">
                {snapshots?.map(({ created_at }, index) => {
                  return (
                    <ListItem
                      as={HStack}
                      justifyContent="space-between"
                      key={created_at ?? index}
                      onClick={() => {
                        dispatch('JUMP')(index);
                      }}
                    >
                      <Box>{dt(created_at).format('YYYY-MM-DD HH:mm:ss')}</Box>
                      <ListIcon
                        aria-label="还原"
                        as={RepeatClockIcon}
                        cursor="pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch('RESTORE')(index);
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

const UndoRedo = () => {
  const { stack, cursor } = useStore<EditorState>('editor');
  const dispatch = useDispatch();

  useEffect(() => {
    const keydown = (e) => {
      // ctrl+z, ctrl+shift+z, ⌘+z, ⌘+shift+z
      if ((!isMac && e.ctrlKey) || (isMac && e.metaKey)) {
        if (e.key.toLowerCase() === 'z') {
          e.preventDefault();
          dispatch(e.shiftKey ? 'REDO' : 'UNDO')(null);
        } else if (e.key.toLowerCase() === 'y') {
          e.preventDefault();
          dispatch(!e.shiftKey ? 'REDO' : 'UNDO')(null);
        }
      }
    };

    document.addEventListener('keydown', keydown, true);

    return () => {
      document.removeEventListener('keydown', keydown, true);
    };
  }, [dispatch]);

  return (
    <>
      <IconButton
        aria-label="undo"
        variant="ghost"
        icon={<ChevronLeftIcon />}
        disabled={cursor === stack.length - 1}
        onClick={() => {
          dispatch('UNDO')(null);
        }}
      />
      <IconButton
        aria-label="redo"
        variant="ghost"
        icon={<ChevronRightIcon />}
        disabled={cursor === 0}
        onClick={() => {
          dispatch('REDO')(null);
        }}
      />
    </>
  );
};

const SelectedPath = () => {
  const selected = useSelectedNode();

  const dispatch = useDispatch();
  const nodes = [];

  const handleClick = (e) => {
    dispatch('SELECTED')(pick(e.target.dataset, ['type', 'id']));
  };

  let current = selected;

  console.log(current);

  while (current) {
    nodes.unshift(
      <ChevronRightIcon key={`icon-${current.id}`} />,
      <Tag
        key={current.id}
        data-type={current.type}
        data-id={current.id}
        cursor="default"
        textTransform="capitalize"
        size="sm"
        variant={current === selected ? 'solid' : 'outline'}
        onClick={handleClick}
      >
        {current.type}
      </Tag>,
    );

    current = current.parent;
  }

  return <>{nodes.slice(1)}</>;
};

const EditModeSwitch = () => {
  const editorMode = useStore<CofeConfig['editorMode']>('config.editorMode');
  const dispatch = useDispatch();

  return (
    <IconButton
      aria-label="Toggle edit mode"
      variant="ghost"
      icon={editorMode === EDIT_MODE_DESIGN ? <ViewIcon /> : <EditIcon />}
      onClick={() => {
        dispatch('TOGGLE_EDIT_MODE')(null);
      }}
    />
  );
};

export const CanvasPanel = (props: BoxProps) => {
  const tree = useSelectedTree();
  const editorMode = useStore<CofeConfig['editorMode']>('config.editorMode');

  const Canvas = editorMode === EDIT_MODE_DESIGN ? DesignCanvas : PreviewCanvas;

  return (
    <VStack alignItems="stretch" {...props}>
      <Toolbar size="sm">
        <DropMenu />
        <UndoRedo />
        <Box flex={1} />
        <EditModeSwitch />
      </Toolbar>
      <Paper flex={1} p={4}>
        <Canvas tree={tree} />
      </Paper>
      <Toolbar size="sm">
        <SelectedPath />
      </Toolbar>
    </VStack>
  );
};

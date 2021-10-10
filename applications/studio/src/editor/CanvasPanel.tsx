import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EditIcon,
  HamburgerIcon,
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
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { Form } from '@cofe/form';
import { post, put } from '@cofe/io';
import { getState, useDispatch, useStore } from '@cofe/store';
import { CofeConfig, CofeTree } from '@cofe/types';
import { Paper, Toolbar } from '@cofe/ui';
import { isMac } from '@cofe/utils';
import { u } from 'unist-builder';
import { map } from 'unist-util-map';
import { DesignCanvas } from './design/Canvas';
import { PreviewCanvas } from './preview/Canvas';
import { useSelectedTree } from '@/hooks/useSelectedTree';
import { EDIT_MODE_DESIGN } from '@/store/config';
import { EditorState } from '@/store/editor';

const DropMenu = () => {
  const dispatch = useDispatch();
  const { query } = useRouter();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState(null);

  const save = useCallback(async () => {
    const { stack } = getState().editor;

    await put(`/api/pages/${query.id}/tree`, stack[stack.length - 1]);

    toast({
      title: '已保存',
      status: 'success',
      duration: 1000,
      position: 'bottom-left',
    });
  }, [toast, query.id]);

  const keydown = useCallback(
    async (e: KeyboardEvent) => {
      // ctrl+⇧?+s, ⌘+⇧?+s
      if ((!isMac && e.ctrlKey) || (isMac && e.metaKey)) {
        if (e.key.toLowerCase() === 's') {
          e.preventDefault();

          if (e.shiftKey) {
            onOpen();
          } else {
            save();
          }
        }
      }
    },
    [onOpen, save],
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
          <MenuItem command="⌘S" onClick={save}>
            保存
          </MenuItem>
          <MenuItem command="⌘⇧S" onClick={onOpen}>
            保存为模板
          </MenuItem>
        </MenuList>
      </Menu>
      <Drawer isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>保存为模板</DrawerHeader>
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
                    status: 'success',
                    duration: 1000,
                    position: 'bottom-left',
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
        disabled={cursor === 0}
        onClick={() => {
          dispatch('UNDO')(null);
        }}
      />
      <IconButton
        aria-label="redo"
        variant="ghost"
        icon={<ChevronRightIcon />}
        disabled={cursor === stack.length - 1}
        onClick={() => {
          dispatch('REDO')(null);
        }}
      />
    </>
  );
};

const CurrentSelected = () => {
  const dragging = useStore('dnd.dragging');
  const selected = useStore('editor.selected');

  return (
    <Box textTransform="capitalize">{`<${
      dragging?.type ?? selected?.type ?? ''
    } />`}</Box>
  );
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
        <CurrentSelected />
        <Box flex={1} />
        <EditModeSwitch />
      </Toolbar>
      <Paper flex={1} p={4}>
        <Canvas tree={tree} />
      </Paper>
    </VStack>
  );
};

import React, { useCallback, useEffect, useState } from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EditIcon,
  ViewIcon,
} from '@chakra-ui/icons';
import {
  Accordion,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { Form } from '@cofe/form';
import { compose } from '@cofe/gssp';
import { useSplitPane } from '@cofe/hooks';
import { get, post, put } from '@cofe/io';
import { getState, useDispatch, useStore } from '@cofe/store';
import { CofeConfig, CofePage, CofeSnapshot } from '@cofe/types';
import { isMac, makeId } from '@cofe/utils';
import { u } from 'unist-builder';
import { Header } from '@/components/Header';
import { Root } from '@/components/Root';
import { ActionPanel } from '@/editor/ActionPanel';
import { AtomPanel } from '@/editor/AtomPanel';
import { CanvasPane } from '@/editor/CanvasPanel';
import { EventPanel } from '@/editor/EventPanel';
import { HistoryPanel } from '@/editor/HistoryPanel';
import { PropertyPanel } from '@/editor/PropertyPanel';
import { TemplatePanel } from '@/editor/TemplatePanel';
import { TreePanel } from '@/editor/TreePanel';
import { withGsspColorMode } from '@/gssp/withGsspColorMode';
import { withGsspWhoami } from '@/gssp/withGsspWhoami';
import { EDIT_MODE_DESIGN } from '@/store/config';
import { EditorState } from '@/store/editor';

// https://github.com/vercel/next.js/discussions/29315
require('@cofe/renderers');
require('@cofe/schemas');

const SplitHandle = (props: ReturnType<typeof useSplitPane>['handleProps']) => {
  return (
    <Box
      cursor="col-resize"
      px={0.5}
      width={2}
      flexGrow={0}
      flexShrink={0}
      flexBasis={2}
      userSelect="none"
      _hover={{
        '&:before': {
          content: '""',
          display: 'block',
          height: '100%',
          bgColor: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
        },
      }}
      _active={{
        '&:before': {
          bgColor: useColorModeValue('blackAlpha.400', 'whiteAlpha.400'),
        },
      }}
      {...props}
    />
  );
};

const DropMenu = () => {
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
          icon={<ChevronDownIcon />}
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

                await post('/api/templates', {
                  ...formData,
                  template: stack[cursor],
                });

                toast({
                  title: '已保存',
                  status: 'success',
                  duration: 1000,
                  position: 'bottom-left',
                });
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

const PageEditor = ({
  leftPaneSize,
  rightPaneSize,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const sp1 = useSplitPane({
    initialSize: leftPaneSize,
    maxSize: 400,
    onInit: (size, pane) => {
      pane.style.width = `${size}px`;
      pane.style.display = size ? 'block' : 'none';
    },
    onResize: (size, pane) => {
      pane.style.width = `${size}px`;
      pane.style.display = size ? 'block' : 'none';
    },
    onEnd: (size) => {
      document.cookie = `left_pane_size=${size}`;
    },
  });

  const sp2 = useSplitPane({
    direction: 'row-reverse',
    initialSize: rightPaneSize,
    maxSize: 400,
    onInit: (size, pane) => {
      pane.style.width = `${size}px`;
      pane.style.display = size ? 'block' : 'none';
    },
    onResize: (size, pane) => {
      pane.style.width = `${size}px`;
      pane.style.display = size ? 'block' : 'none';
    },
    onEnd: (size) => {
      document.cookie = `right_pane_size=${size}`;
    },
  });

  return (
    <Root>
      <Header>
        <DropMenu />
        <UndoRedo />
        <Box flex={1} />
        <CurrentSelected />
        <Box flex={1} />
        <EditModeSwitch />
      </Header>
      <Flex flex={1}>
        <Accordion
          ref={sp1.paneRef}
          allowMultiple
          defaultIndex={[0]}
          direction="column"
          gridGap={2}
          overflow="hidden"
        >
          <AtomPanel />
          <TemplatePanel />
          <TreePanel />
          <HistoryPanel />
        </Accordion>
        <SplitHandle {...sp1.handleProps} />
        <Flex flex={1}>
          <CanvasPane flex={1} />
          <SplitHandle {...sp2.handleProps} />
          <Accordion
            ref={sp2.paneRef}
            allowMultiple
            defaultIndex={[0]}
            direction="column"
            gridGap={2}
            overflow="hidden"
          >
            <PropertyPanel />
            <ActionPanel />
            <EventPanel />
          </Accordion>
        </Flex>
      </Flex>
    </Root>
  );
};

export const getServerSideProps = compose(
  [withGsspWhoami, withGsspColorMode],
  async (context: GetServerSidePropsContext<{ id: string }>) => {
    if (!context.req.cookies.token) {
      return {
        redirect: {
          destination: '/401',
          permanent: false,
        },
      };
    }

    const [page, stack]: [CofePage, CofeSnapshot['stack']] = await Promise.all([
      get(`${process.env.DB_URL}/api/pages/${context.params.id}`, {
        headers: {
          Authorization: `Bearer ${context.req.cookies.token}`,
        },
      }),
      get(`${process.env.DB_URL}/api/pages/${context.params.id}/snapshots`, {
        headers: {
          Authorization: `Bearer ${context.req.cookies.token}`,
        },
      }),
    ]);

    const { left_pane_size = 240, right_pane_size = 240 } = context.req.cookies;

    return {
      props: {
        leftPaneSize: +left_pane_size,
        rightPaneSize: +right_pane_size,
        initialStates: {
          editor: {
            stack: [
              ...stack,
              page.tree ??
                u('fragment', {
                  id: makeId(),
                }),
            ],
            cursor: stack.length ?? 0,
          },
        },
      },
    };
  },
);

export default PageEditor;

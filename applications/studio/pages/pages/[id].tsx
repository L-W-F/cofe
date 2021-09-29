import React, { useCallback, useEffect } from 'react';
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
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
} from '@chakra-ui/react';
import { compose } from '@cofe/gssp';
import { useSplitPane } from '@cofe/hooks';
import { get, put } from '@cofe/io';
import { getState, useDispatch, useStore } from '@cofe/store';
import { CofePage, CofeSnapshot } from '@cofe/types';
import { isMac } from '@cofe/utils';
import { Header } from '@/components/Header';
import { Root } from '@/components/Root';
import { withGsspColorMode } from '@/gssp/withGsspColorMode';
import { withGsspWhoami } from '@/gssp/withGsspWhoami';
import { EditorState } from '@/store/editor';
import { ActionPanel } from '@/views/page/ActionPanel';
import { AtomPanel } from '@/views/page/AtomPanel';
import { CanvasPane } from '@/views/page/CanvasPanel';
import { EventPanel } from '@/views/page/EventPanel';
import { HistoryPanel } from '@/views/page/HistoryPanel';
import { PropertyPanel } from '@/views/page/PropertyPanel';
import { TreePanel } from '@/views/page/TreePanel';

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

  const save = useCallback(async () => {
    const { stack } = getState().editor;

    await put(`/api/pages/${query.id}/tree`, stack[stack.length - 1]);
  }, [query.id]);

  const keydown = useCallback(
    async (e) => {
      // ctrl+s, ⌘+s
      if ((!isMac && e.ctrlKey) || (isMac && e.metaKey)) {
        if (e.key.toLowerCase() === 's') {
          e.preventDefault();
          await save();
        }
      }
    },
    [save],
  );

  useEffect(() => {
    document.addEventListener('keydown', keydown, true);

    return () => {
      document.removeEventListener('keydown', keydown, true);
    };
  }, [keydown]);

  return (
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
      </MenuList>
    </Menu>
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

  return <Box>{`<${dragging?.type ?? selected?.type ?? ''} />`}</Box>;
};

const EditModeSwitch = () => {
  const isEditorMode = useStore<boolean>('config.editMode');
  const dispatch = useDispatch();

  return (
    <IconButton
      aria-label="Toggle edit mode"
      variant="ghost"
      icon={isEditorMode ? <ViewIcon /> : <EditIcon />}
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
          allowMultiple
          ref={sp1.paneRef}
          direction="column"
          gridGap={2}
          overflow="hidden"
        >
          <AtomPanel />
          <TreePanel />
          <HistoryPanel />
        </Accordion>
        <SplitHandle {...sp1.handleProps} />
        <Flex flex={1}>
          <CanvasPane flex={1} />
          <SplitHandle {...sp2.handleProps} />
          <Accordion
            ref={sp2.paneRef}
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
            stack: [...stack, page.tree],
            cursor: stack.length ?? 0,
          },
        },
      },
    };
  },
);

export default PageEditor;

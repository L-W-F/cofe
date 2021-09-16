import React from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { Accordion, Box, Flex, useColorModeValue } from '@chakra-ui/react';
import { compose } from '@cofe/gssp';
import { useSplitPane } from '@cofe/hooks';
import { useDispatch } from '@cofe/store';
import { CofePage, CofeSnapshot } from '@cofe/types';
import { Header } from '@/components/Header';
import { Container } from '@/components/layout/Container';
import { withGsspColorMode } from '@/gssp/withGsspColorMode';
import { withGsspWhoami } from '@/gssp/withGsspWhoami';
import { get } from '@/utils/io';
import { ActionPanel } from '@/views/page/ActionPanel';
import { AtomPanel } from '@/views/page/AtomPanel';
import { CanvasPane } from '@/views/page/CanvasPanel';
import { EventPanel } from '@/views/page/EventPanel';
import { DropMenu } from '@/views/page/header/DropMenu';
import { EditModeSwitch } from '@/views/page/header/EditModeSwitch';
import { InteractionIndicator } from '@/views/page/header/InteractionIndicator';
import { UndoRedo } from '@/views/page/header/UndoRedo';
import { HistoryPanel } from '@/views/page/HistoryPanel';
import { PropertyPanel } from '@/views/page/PropertyPanel';
import { TreePanel } from '@/views/page/TreePanel';

const SplitHandle = (props: ReturnType<typeof useSplitPane>['handleProps']) => {
  const [hoverColor, activeColor] = useColorModeValue(
    ['blackAlpha.200', 'blackAlpha.400'],
    ['whiteAlpha.200', 'whiteAlpha.400'],
  );

  return (
    <Box
      cursor="col-resize"
      px={0.5}
      width={2}
      flexGrow={0}
      flexShrink={0}
      flexBasis={2}
      userSelect="none"
      _before={{
        content: '""',
        display: 'block',
        height: '100%',
      }}
      _hover={{
        '&:before': {
          bgColor: hoverColor,
        },
      }}
      _active={{
        '&:before': {
          bgColor: activeColor,
        },
      }}
      {...props}
    />
  );
};

const PageEditor = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const dispatch = useDispatch();

  const sp1 = useSplitPane({
    initialSize: props.initialStates.whoami.config.leftPaneSize,
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
      dispatch('SET_LEFT_PANE_SIZE')(size);
    },
  });

  const sp2 = useSplitPane({
    direction: 'row-reverse',
    initialSize: props.initialStates.whoami.config.rightPaneSize,
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
      dispatch('SET_RIGHT_PANE_SIZE')(size);
    },
  });

  return (
    <Container>
      <Header>
        <DropMenu />
        <UndoRedo />
        <Box flex={1} />
        <InteractionIndicator />
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
    </Container>
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

    return {
      props: {
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

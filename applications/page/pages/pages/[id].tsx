import React from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import { useSplitPane } from '@cofe/hooks';
import { useDispatch } from '@cofe/store';
import { CofePage, CofeSnapshot } from '@cofe/types';
import { CanvasPane } from 'components/CanvasPane';
import { Header } from 'components/Header';
import { DropMenu } from 'components/header/DropMenu';
import { EditModeSwitch } from 'components/header/EditModeSwitch';
import { InteractionIndicator } from 'components/header/InteractionIndicator';
import { UndoRedo } from 'components/header/UndoRedo';
import { Container } from 'components/layout/Container';
import { LeftPane } from 'components/LeftPane';
import { RightPane } from 'components/RightPane';
import { get } from 'utils/io';

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
    // initialSize: props.initialStates.config.leftPaneSize,
    maxSize: 400,
    onEnd: (size) => {
      dispatch('SET_LEFT_PANE_SIZE')(size);
    },
  });

  const sp2 = useSplitPane({
    direction: 'row-reverse',
    // initialSize: props.initialStates.config.rightPaneSize,
    maxSize: 400,
    onEnd: (size) => {
      dispatch('SET_RIGHT_PANE_SIZE')(size);
    },
  });

  return (
    <Container
      minWidth="100vw"
      minHeight="100vh"
      direction="column"
      p={2}
      gridGap={2}
    >
      <Header>
        <DropMenu />
        <UndoRedo />
        <Box flex={1} />
        <InteractionIndicator />
        <Box flex={1} />
        <EditModeSwitch />
      </Header>
      <Flex flex={1}>
        <Flex
          ref={sp1.paneRef}
          direction="column"
          gridGap={2}
          width={`${sp1.size}px`}
          overflow="hidden"
        >
          {sp1.size ? <LeftPane /> : null}
        </Flex>
        <SplitHandle {...sp1.handleProps} />
        <Flex flex={1}>
          <CanvasPane flex={1} />
          <SplitHandle {...sp2.handleProps} />
          <Flex
            ref={sp2.paneRef}
            direction="column"
            gridGap={2}
            width={`${sp2.size}px`}
            overflow="hidden"
          >
            {sp2.size ? <RightPane /> : null}
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext<{ id: string }>,
) => {
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
};

export default PageEditor;

import React from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import { useSplitPane } from '@cofe/hooks';
import { useDispatch } from '@cofe/store';
import { DbData } from '@cofe/types';
import { CanvasPane } from '../src/components/CanvasPane';
import { Header } from '../src/components/Header';
import { DropMenu } from '../src/components/header/DropMenu';
import { EditModeSwitch } from '../src/components/header/EditModeSwitch';
import { InteractionIndicator } from '../src/components/header/InteractionIndicator';
import { UndoRedo } from '../src/components/header/UndoRedo';
import { Container } from '../src/components/layout/Container';
import { LeftPane } from '../src/components/LeftPane';
import { RightPane } from '../src/components/RightPane';

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

const Editor = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const dispatch = useDispatch();

  const sp1 = useSplitPane({
    initialSize: props.initialStates.config.leftPaneSize,
    maxSize: 400,
    onEnd: (size) => {
      dispatch('SET_LEFT_PANE_SIZE')(size);
    },
  });

  const sp2 = useSplitPane({
    direction: 'row-reverse',
    initialSize: props.initialStates.config.rightPaneSize,
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
  if (!context.req.cookies.user) {
    return {
      redirect: {
        destination: '/401',
        permanent: false,
      },
    };
  }

  const { config, pages }: DbData = await fetch(
    `${process.env.DB_URL}/api/store`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: context.req.headers.cookie,
      },
    },
  ).then((response) => response.json());

  return {
    props: {
      initialStates: {
        config,
        editor: {
          stack: pages,
          cursor: 0,
        },
      },
    },
  };
};

export default Editor;

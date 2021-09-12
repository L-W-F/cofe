import React from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import { CanvasPane } from '../components/CanvasPane';
import { Header } from '../components/header/Header';
import { Container } from '../components/layout/Container';
import { LeftPane } from '../components/LeftPane';
import { RightPane } from '../components/RightPane';
import { db } from '../db';
import { useSplitPane } from '../hooks/useSplitPane';
import { useDispatch } from '../store';
import { test } from '../templates/test';

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

const Index = (
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
      <Header />
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
  context: GetServerSidePropsContext,
) => {
  await db.read();

  if (db.data === null) {
    db.data = {
      page: {
        stack: [test],
        cursor: 0,
      },
      config: {
        leftPaneSize: 240,
        rightPaneSize: 240,
      },
    };

    // skip await for performance
    db.write();
  }

  return {
    props: {
      initialStates: db.data,
    },
  };
};

export default Index;

import React from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { Accordion, Box, Flex, useColorModeValue } from '@chakra-ui/react';
import { Renderer } from '@cofe/core';
import { compose } from '@cofe/gssp';
import { useSplitPane } from '@cofe/hooks';
import { renderers } from '@cofe/renderers';
import { schemas } from '@cofe/schemas';
import { makeId } from '@cofe/utils';
import { u } from 'unist-builder';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Root } from '@/components/Root';
import { ActionPanel } from '@/editor/ActionPanel';
import { AtomPanel } from '@/editor/AtomPanel';
import { CanvasPanel } from '@/editor/CanvasPanel';
import { EventPanel } from '@/editor/EventPanel';
import { HistoryPanel } from '@/editor/HistoryPanel';
import { PropertyPanel } from '@/editor/PropertyPanel';
import { TemplatePanel } from '@/editor/TemplatePanel';
import { TreePanel } from '@/editor/TreePanel';
import { withGsspColorMode } from '@/gssp/withGsspColorMode';
import { withGsspWhoami } from '@/gssp/withGsspWhoami';
import { supabase } from '@/utils/supabase';

Renderer.register(renderers);

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
      <Header />
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
          <CanvasPanel flex={1} />
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
      <Footer />
    </Root>
  );
};

export const getServerSideProps = compose(
  [withGsspWhoami, withGsspColorMode],
  async (context: GetServerSidePropsContext<{ id: string }>) => {
    const [{ data: trees }, { data: snapshots }, { data: templates }] =
      await Promise.all([
        supabase.from('trees').select('tree').eq('id', context.params.id),
        supabase.from('snapshots').select('stack').eq('id', context.params.id),
        supabase.from('templates').select('type,template,description'),
      ]);

    const { left_pane_size = 240, right_pane_size = 240 } = context.req.cookies;

    return {
      props: {
        leftPaneSize: +left_pane_size,
        rightPaneSize: +right_pane_size,
        initialStates: {
          editor: {
            stack: [
              ...(snapshots?.[0]?.stack ?? []),
              trees?.[0]?.tree ??
                u('fragment', {
                  id: makeId(),
                }),
            ],
            cursor: snapshots?.[0]?.stack.length ?? 0,
          },
          schema: templates.reduce((o, { type, template }) => {
            return {
              ...o,
              [`template:${type}`]: {
                type: `template:${type}`,
                template,
              },
            };
          }, schemas),
        },
      },
    };
  },
);

export default PageEditor;

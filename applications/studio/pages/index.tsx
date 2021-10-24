import React from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { Accordion, Box, Flex } from '@chakra-ui/react';
import { Renderer, Tree } from '@cofe/core';
import { compose } from '@cofe/gssp';
import { useSplitPane } from '@cofe/hooks';
import { renderers } from '@cofe/renderers';
import { schemas } from '@cofe/schemas';
import { AppManager } from '@/components/AppManager';
import { ColorModeSwitch } from '@/components/ColorModeSwitch';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Root } from '@/components/Root';
import { SplitHandle } from '@/components/SplitHandle';
import { Whoami } from '@/components/Whoami';
import { withGsspCatch } from '@/gssp/withGsspCatch';
import { withGsspColorMode } from '@/gssp/withGsspColorMode';
import { withGsspPanelSize } from '@/gssp/withGsspPanelSize';
import { withGsspWhoami } from '@/gssp/withGsspWhoami';
import { ActionPanel } from '@/pageEditor/ActionPanel';
import { AtomPanel } from '@/pageEditor/AtomPanel';
import { CanvasPanel } from '@/pageEditor/CanvasPanel';
import { PropertyPanel } from '@/pageEditor/PropertyPanel';
import { TemplatePanel } from '@/pageEditor/TemplatePanel';
import { TreePanel } from '@/pageEditor/TreePanel';
import { a2m } from '@/utils/a2m';
import { supabase } from '@/utils/supabase';

Renderer.register(renderers);

const Index = ({
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
        <AppManager />
        <Box flex={1} />
        <ColorModeSwitch />
        <Whoami />
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
            <TreePanel />
            <PropertyPanel />
            <ActionPanel />
          </Accordion>
        </Flex>
      </Flex>
      <Footer />
    </Root>
  );
};

export const getServerSideProps = compose(
  [withGsspCatch, withGsspPanelSize, withGsspColorMode, withGsspWhoami],
  async (context: GetServerSidePropsContext<{ id: string }>) => {
    const { data: apps } = await supabase
      .from('apps')
      .select()
      .order('updated_at', { ascending: false });

    const firstAppId = apps?.[0]?.id;

    if (!firstAppId) {
      return {
        redirect: {
          destination: '/apps/create',
          permanent: false,
        },
      };
    }

    const { data: pages } = await supabase
      .from('pages')
      .select()
      .eq('app_id', firstAppId)
      .order('updated_at', { ascending: false });

    const firstPageId = pages?.[0]?.id;

    if (!firstPageId) {
      return {
        redirect: {
          destination: `/apps/${firstAppId}/pages/create`,
          permanent: false,
        },
      };
    }

    const { data: trees } = await supabase
      .from('trees')
      .select('tree')
      .eq('id', firstPageId);

    const app = a2m(apps);

    app[firstAppId].pages = a2m(pages);

    return {
      props: {
        initialStates: {
          app,
          editor: {
            app_id: firstAppId,
            page_id: firstPageId,
            stack: [trees?.[0]?.tree ?? Tree.create('fragment')],
          },
          schema: schemas,
        },
      },
    };
  },
);

export default Index;

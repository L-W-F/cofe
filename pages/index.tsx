import React, { useEffect } from 'react';
import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { Accordion, Flex } from '@chakra-ui/react';
import { compose } from '@cofe/gssp';
import { useSplitPane } from '@cofe/hooks';
import { isEmpty } from 'lodash-es';
import { ActionPanel } from '@/components/ActionPanel';
import { AtomPanel } from '@/components/AtomPanel';
import { CanvasPanel } from '@/components/CanvasPanel';
import { CanvasToolbar } from '@/components/CanvasToolbar';
import { ColorModeSwitch } from '@/components/ColorModeSwitch';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { HomeEntry } from '@/components/HomeEntry';
import { PropertyPanel } from '@/components/PropertyPanel';
import { Root } from '@/components/Root';
import { SplitHandle } from '@/components/SplitHandle';
import { TemplatePanel } from '@/components/TemplatePanel';
import { TreePanel } from '@/components/TreePanel';
import { withGsspCatch } from '@/gssp/withGsspCatch';
import { withGsspColorMode } from '@/gssp/withGsspColorMode';
import { withGsspPanelSize } from '@/gssp/withGsspPanelSize';
import { useApp } from '@/hooks/useApp';

import '@cofe/renderers';
import '@cofe/schemas';

const Studio = ({
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
        <HomeEntry />
        <CanvasToolbar />
        <ColorModeSwitch />
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

const Index = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const { id, pages } = useApp();
  const { push } = useRouter();
  const isAppEmpty = !id;
  const isPagesEmpty = isEmpty(pages);

  useEffect(() => {
    if (isAppEmpty) {
      push('/createApp');
    } else if (isPagesEmpty) {
      push('/createPage');
    }
  }, [isAppEmpty, isPagesEmpty, push]);

  return !isPagesEmpty ? <Studio {...props} /> : null;
};

export const getServerSideProps = compose([
  withGsspCatch(),
  withGsspColorMode(),
  withGsspPanelSize(),
]);

export default Index;

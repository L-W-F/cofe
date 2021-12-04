import React, { useEffect, useState } from 'react';
import { InferGetServerSidePropsType } from 'next';
import {
  Accordion,
  Alert,
  AlertIcon,
  ChakraProvider,
  cookieStorageManager,
  Flex,
} from '@chakra-ui/react';
import { compose } from '@cofe/gssp';
import { useSplitPane } from '@cofe/hooks';
import { debug } from '@cofe/logger';
import { get } from 'idb-keyval';
import { RecoilRoot } from 'recoil';
import { ActionPanel } from '@/components/ActionPanel';
import { AtomPanel } from '@/components/AtomPanel';
import { CanvasPanel } from '@/components/CanvasPanel';
import { CanvasToolbar } from '@/components/CanvasToolbar';
import { ColorModeSwitch } from '@/components/ColorModeSwitch';
import { Header } from '@/components/Header';
import { HomeEntry } from '@/components/HomeEntry';
import { PropertyPanel } from '@/components/PropertyPanel';
import { RepoEntry } from '@/components/RepoEntry';
import { Root } from '@/components/Root';
import { SplitHandle } from '@/components/SplitHandle';
import { StateObserver } from '@/components/StateObserver';
import { TemplatePanel } from '@/components/TemplatePanel';
import { ThemePanel } from '@/components/ThemePanel';
import { TreePanel } from '@/components/TreePanel';
import { withGsspCatch } from '@/gssp/withGsspCatch';
import { withGsspColorMode } from '@/gssp/withGsspColorMode';
import { withGsspPaneSize } from '@/gssp/withGsspPaneSize';
import { withGsspPermit } from '@/gssp/withGsspPermit';
import { appState, createDefaultValues } from '@/store/app';
import { templateState } from '@/store/template';
import { theme } from '@/theme';

import '@cofe/atoms';
import '@cofe/mixins';
import '@cofe/renderers';

const Studio = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const sp1 = useSplitPane({
    initialSize: props.lps,
    maxSize: 240,
    onInit: (size, pane) => {
      pane.style.width = `${size}px`;
      pane.style.display = size ? 'block' : 'none';
    },
    onResize: (size, pane) => {
      pane.style.width = `${size}px`;
      pane.style.display = size ? 'block' : 'none';
    },
    onEnd: (size) => {
      document.cookie = `lps=${size}`;
    },
  });

  const sp2 = useSplitPane({
    direction: 'row-reverse',
    initialSize: props.rps,
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
      document.cookie = `rps=${size}`;
    },
  });

  return (
    <Root>
      <Header>
        <HomeEntry />
        <CanvasToolbar />
        <ColorModeSwitch />
        <RepoEntry />
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
            <ThemePanel />
            <TreePanel />
            <PropertyPanel />
            <ActionPanel />
          </Accordion>
        </Flex>
      </Flex>
    </Root>
  );
};

const Index = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const colorModeManager = cookieStorageManager(props.colorMode);

  const [appInitialStates, setAppInitialStates] = useState(null);
  const [templateInitialStates, setTemplateInitialStates] = useState(null);

  useEffect(() => {
    const dbKey = 'app';

    // fetch from local
    get(dbKey)
      .then((v) => {
        setAppInitialStates(v ?? createDefaultValues());

        debug('db')('[%s] ⏫ %O', dbKey, v);
      })
      .catch((e) => {
        setAppInitialStates(createDefaultValues());

        debug('db')('[%s] ⛔ %O', dbKey, e);
      });
  }, []);

  useEffect(() => {
    const dbKey = 'template';

    // fetch from local
    get(dbKey)
      .then((v) => {
        setTemplateInitialStates(v ?? {});

        debug('db')('[%s] ⏫ %O', dbKey, v);
      })
      .catch((e) => {
        setTemplateInitialStates({});
        debug('db')('[%s] ⛔ %O', dbKey, e);
      });
  }, []);

  return appInitialStates && templateInitialStates ? (
    <ChakraProvider resetCSS theme={theme} colorModeManager={colorModeManager}>
      <RecoilRoot
        initializeState={({ set: _set }) => {
          _set(appState, appInitialStates);
          _set(templateState, templateInitialStates);
        }}
      >
        {props.err ? (
          <Alert status="error">
            <AlertIcon />
            {props.err.message}
          </Alert>
        ) : null}
        <Studio {...props} />
        <StateObserver />
      </RecoilRoot>
    </ChakraProvider>
  ) : null;
};

export const getServerSideProps = compose([
  withGsspPermit(),
  withGsspCatch(),
  withGsspColorMode(),
  withGsspPaneSize(),
]);

export default Index;

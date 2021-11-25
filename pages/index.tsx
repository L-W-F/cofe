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
import { get, set } from 'idb-keyval';
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
import { withGsspPaneSize } from '@/gssp/withGsspPaneSize';
import { withGsspPermit } from '@/gssp/withGsspPermit';
import { appStore, studioStore, templateStore } from '@/store';
import { createDefaultValues } from '@/store/app';
import { theme } from '@/theme';

import '@cofe/atoms';
import '@cofe/mixins';
import '@cofe/renderers';

const Index = ({
  cmc,
  lps,
  rps,
  err,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const colorModeManager = cookieStorageManager(cmc);

  const sp1 = useSplitPane({
    initialSize: lps,
    maxSize: 240,
    step: 240,
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
    initialSize: rps,
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

  const [appInitialStates, setAppInitialStates] = useState(null);
  const [templateInitialStates, setTemplateInitialStates] = useState(null);

  useEffect(() => {
    const dbKey = 'app-store';

    // fetch from local
    get(dbKey)
      .then((v) => {
        setAppInitialStates(
          v ?? {
            app: createDefaultValues(),
          },
        );

        debug('db')('[%s] ⏫ %O', dbKey, v);
      })
      .catch((e) => {
        setAppInitialStates({
          app: createDefaultValues(),
        });

        debug('db')('[%s] ⛔ %O', dbKey, e);
      });

    // save to local
    return appStore.subscribe(() => {
      set(dbKey, appStore.getState());

      debug('db')('[%s] ⏬', dbKey);
    });
  }, []);

  useEffect(() => {
    const dbKey = 'template-store';

    // fetch from local
    get(dbKey)
      .then((v) => {
        setTemplateInitialStates(v ?? {});

        debug('db')('[%s] ⏫ %O', dbKey, v);
      })
      .catch((e) => {
        debug('db')('[%s] ⛔ %O', dbKey, e);
      });

    // save to local
    return templateStore.subscribe(() => {
      set(dbKey, templateStore.getState());

      debug('db')('[%s] ⏬', dbKey);
    });
  }, []);

  return appInitialStates ? (
    <ChakraProvider resetCSS theme={theme} colorModeManager={colorModeManager}>
      <appStore.Store initialStates={appInitialStates}>
        <studioStore.Store>
          <templateStore.Store initialStates={templateInitialStates}>
            {err ? (
              <Alert status="error">
                <AlertIcon />
                {err.message}
              </Alert>
            ) : null}
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
          </templateStore.Store>
        </studioStore.Store>
      </appStore.Store>
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

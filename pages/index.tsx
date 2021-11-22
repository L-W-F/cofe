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
import { getState, Store, subscribe } from '@cofe/store';
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
import { modules } from '@/store';
import { createDefaultValues } from '@/store/app';
import { theme } from '@/theme';
import '@cofe/renderers';
import '@cofe/schemas';

const dbKey = 'studio';

const Index = ({
  colorModeCookie,
  leftPaneSize,
  rightPaneSize,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const colorModeManager = cookieStorageManager(colorModeCookie);

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

  const [initialStates, setInitialStates] = useState(null);

  useEffect(() => {
    let unsubscribe: ReturnType<typeof subscribe>;

    // fetch from local
    get(dbKey)
      .then((v) => {
        setInitialStates(
          v ?? {
            app: createDefaultValues(),
          },
        );

        debug('db')('[%s] ⏫ %O', dbKey, v);

        // save to local
        unsubscribe = subscribe(() => {
          set(dbKey, getState());

          debug('db')('[%s] ⏬', dbKey);
        });
      })
      .catch((e) => {
        setInitialStates({
          app: createDefaultValues(),
        });

        debug('db')('[%s] ⛔ %O', dbKey, e);
      });

    return unsubscribe;
  }, []);

  return initialStates ? (
    <ChakraProvider resetCSS theme={theme} colorModeManager={colorModeManager}>
      <Store modules={modules} initialStates={initialStates}>
        {error ? (
          <Alert status="error">
            <AlertIcon />
            {error.message}
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
      </Store>
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

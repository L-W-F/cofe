import React, { useEffect, useState } from 'react';
import { InferGetServerSidePropsType } from 'next';
import {
  Alert,
  AlertIcon,
  ChakraProvider,
  cookieStorageManager,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { compose } from '@cofe/gssp';
import { debug } from '@cofe/logger';
import { get } from 'idb-keyval';
import { RecoilRoot } from 'recoil';
import { CanvasPanel } from '@/components/CanvasPanel';
import { CanvasToolbar } from '@/components/CanvasToolbar';
import { ColorModeSwitch } from '@/components/ColorModeSwitch';
import { Header } from '@/components/Header';
import { HomeEntry } from '@/components/HomeEntry';
import { PropertyPanel } from '@/components/PropertyPanel';
import { RepoEntry } from '@/components/RepoEntry';
import { StateObserver } from '@/components/StateObserver';
import { TreePanel } from '@/components/TreePanel';
import { withGsspCatch } from '@/gssp/withGsspCatch';
import { withGsspColorMode } from '@/gssp/withGsspColorMode';
import { withGsspPermit } from '@/gssp/withGsspPermit';
import { appState } from '@/store/app';
import { moleculeState } from '@/store/molecule';
import { theme } from '@/theme';
import { createDefaultValues } from '@/utils/createDefaultValues';

const Studio = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  return (
    <>
      {props.err ? (
        <Alert status="error">
          <AlertIcon />
          {props.err.message}
        </Alert>
      ) : null}
      <Grid gridTemplate="48px minmax(0, 1fr) / 1fr" h="100vh">
        <Header>
          <HomeEntry />
          <CanvasToolbar />
          <ColorModeSwitch />
          <RepoEntry />
        </Header>
        <GridItem as={Grid} rowStart={2} gridTemplate="1fr / 280px 1fr">
          <GridItem as={TreePanel} colStart={1} rowStart={1} pos="relative" />
          <GridItem
            as={PropertyPanel}
            colStart={1}
            rowStart={1}
            pos="relative"
          />
          <GridItem as={CanvasPanel} colStart={2} rowStart={1} pos="relative" />
        </GridItem>
      </Grid>
    </>
  );
};

const Index = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const colorModeManager = cookieStorageManager(props.colorMode);

  const [appInitialStates, setAppInitialStates] = useState(null);
  const [moleculeInitialStates, setMoleculeInitialStates] = useState(null);

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
    const dbKey = 'molecule';

    // fetch from local
    get(dbKey)
      .then((v) => {
        setMoleculeInitialStates(v ?? {});

        debug('db')('[%s] ⏫ %O', dbKey, v);
      })
      .catch((e) => {
        setMoleculeInitialStates({});
        debug('db')('[%s] ⛔ %O', dbKey, e);
      });
  }, []);

  return appInitialStates && moleculeInitialStates ? (
    <RecoilRoot
      initializeState={({ set: _set }) => {
        _set(appState, appInitialStates);
        _set(moleculeState, moleculeInitialStates);
      }}
    >
      <ChakraProvider
        resetCSS
        theme={theme}
        colorModeManager={colorModeManager}
      >
        <Studio {...props} />
      </ChakraProvider>
      <StateObserver />
    </RecoilRoot>
  ) : null;
};

export const getServerSideProps = compose([
  withGsspPermit(),
  withGsspCatch(),
  withGsspColorMode(),
]);

export default Index;

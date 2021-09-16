import React from 'react';
import App, { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider, cookieStorageManager } from '@chakra-ui/react';
import { Store } from '@cofe/store';
import { CofeWhoami } from '@cofe/types';
import { parse } from 'cookie';
import { modules } from 'store';
import { theme } from 'theme';
import { get } from 'utils/io';

const cmKey = 'chakra-ui-color-mode';

const MyApp = ({
  Component,
  pageProps,
  colorMode,
  initialStates,
}: AppProps & { colorMode: string; initialStates: any }) => {
  const colorModeManager = cookieStorageManager(`${cmKey}=${colorMode}`);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>COFE</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/public/favicon.svg" />
      </Head>
      <Store
        modules={modules}
        initialStates={{ ...initialStates, ...pageProps.initialStates }}
      >
        <ChakraProvider
          resetCSS
          theme={theme}
          colorModeManager={colorModeManager}
        >
          <Component
            // suppressHydrationWarning
            {...pageProps}
          />
        </ChakraProvider>
      </Store>
    </>
  );
};

MyApp.getInitialProps = async (appContext: AppContext) => {
  const { pageProps } = await App.getInitialProps(appContext);

  if (!appContext.ctx.req) {
    return {
      pageProps,
    };
  }

  const cookies = parse(appContext.ctx.req.headers.cookie ?? '');

  const colorMode = cookies[cmKey] ?? '';

  if (!cookies.token) {
    return {
      pageProps,
      colorMode,
    };
  }

  const whoami: CofeWhoami = await get(`${process.env.DB_URL}/api/whoami`, {
    headers: {
      Authorization: `Bearer ${cookies.token}`,
    },
  });

  return {
    pageProps,
    colorMode,
    initialStates: {
      whoami,
    },
  };
};

export default MyApp;

import React from 'react';
import App, { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import { Store } from '@cofe/store';
import { DbData } from '@cofe/types';
import { modules } from '../src/store';
import { theme } from '../src/theme';

const MyApp = ({
  Component,
  pageProps,
  initialStates,
}: AppProps & { initialStates: any }) => {
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
        <ChakraProvider resetCSS theme={theme}>
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
  const appProps = await App.getInitialProps(appContext);

  if (!appContext.ctx.req) {
    return {
      ...appProps,
    };
  }

  if (!appContext.ctx.req.headers.cookie?.match(/(^|; )user=\d+(; |$)/)) {
    // if (!appContext.ctx.req.url.match(/^\/40(1|3|4)/)) {
    //   appContext.ctx.res.writeHead(307, '/401');
    // }

    return {
      ...appProps,
    };
  }

  const { config, whoami }: DbData = await fetch(
    `${process.env.DB_URL}/api/store`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: appContext.ctx.req.headers.cookie,
      },
    },
  ).then((response) => response.json());

  return {
    initialStates: {
      config,
      whoami,
    },
    ...appProps,
  };
};

export default MyApp;

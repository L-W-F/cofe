import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import { Store } from '../store';
import { theme } from '../theme';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>COFE</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="favicon.svg" />
      </Head>
      <Store initialStates={pageProps.initialStates}>
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

export default MyApp;

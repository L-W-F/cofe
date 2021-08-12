import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { Store } from '../store';
import { Theme } from '../theme';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>COFE</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Store initialStates={pageProps.initialStates}>
        <Theme>
          <Component
            // suppressHydrationWarning
            {...pageProps}
          />
        </Theme>
      </Store>
    </>
  );
};

export default MyApp;

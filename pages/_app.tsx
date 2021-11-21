import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { ChakraProvider, cookieStorageManager } from '@chakra-ui/react';
import { Store } from '@cofe/store';
import { modules } from 'store';
import { theme } from 'theme';

// https://github.com/visionmedia/debug#browser-support
if (process.env.NEXT_PUBLIC_DEBUG && typeof localStorage !== 'undefined') {
  localStorage.setItem('debug', process.env.NEXT_PUBLIC_DEBUG);
}

const MyApp = ({
  Component,
  pageProps: { colorModeCookie, ...pageProps },
}: AppProps<{
  colorModeCookie: string;
  initialStates: any;
}>) => {
  const colorModeManager = cookieStorageManager(colorModeCookie);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>COFE</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/public/favicon.svg" />
      </Head>
      <Store modules={modules} initialStates={pageProps.initialStates}>
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
      <Script
        src={`https://sdk.talkingdata.com/app/h5/v1?appid=${process.env.NEXT_PUBLIC_TALKINGDATA_APPID}`}
      />
    </>
  );
};

export default MyApp;

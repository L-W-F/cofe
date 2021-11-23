import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';

// https://github.com/visionmedia/debug#browser-support
if (process.env.NEXT_PUBLIC_DEBUG && typeof localStorage !== 'undefined') {
  localStorage.setItem('debug', process.env.NEXT_PUBLIC_DEBUG);
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>COFE</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Component
        // suppressHydrationWarning
        {...pageProps}
      />
      <Script
        src={`https://jic.talkingdata.com/app/h5/v1?appid=${process.env.NEXT_PUBLIC_TALKINGDATA_APPID}`}
      />
    </>
  );
};

export default MyApp;

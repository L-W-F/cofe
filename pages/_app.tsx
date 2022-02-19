import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';

// https://github.com/visionmedia/debug#browser-support
if (process.env.NEXT_PUBLIC_DEBUG && typeof localStorage !== 'undefined') {
  localStorage.setItem('debug', process.env.NEXT_PUBLIC_DEBUG);
}

const pageview = (url: string) => {
  (window as any).dataLayer.push({
    event: 'pageview',
    page: url,
  });
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeComplete', pageview);

    return () => {
      router.events.off('routeChangeComplete', pageview);
    };
  }, [router.events]);

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
    </>
  );
};

export default MyApp;

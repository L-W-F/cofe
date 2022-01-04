import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
// import Script from 'next/script';

// https://github.com/visionmedia/debug#browser-support
if (process.env.NEXT_PUBLIC_DEBUG && typeof localStorage !== 'undefined') {
  localStorage.setItem('debug', process.env.NEXT_PUBLIC_DEBUG);
}

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
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', 'GTM-5QT3RBV');
          `,
        }}
      />
      <Component
        // suppressHydrationWarning
        {...pageProps}
      />
    </>
  );
};

export default MyApp;

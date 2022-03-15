import type { AppProps } from "next/app";

import Head from "next/head";
import BrandingProvider from "../components/BrandingProvider";
import AppHeader from "../components/AppHeader/AppHeader";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <BrandingProvider>
      <Head>
        <title>mooc helper</title>
        <meta name="referrer" content="no-referrer" />
        <meta name="description" content="mooc helper" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppHeader />
      <main>
        <Component {...pageProps} />
      </main>
    </BrandingProvider>
  );
}

export default MyApp;

import React from 'react';
import Head from 'next/head';

import Layout from '../components/layout/layout.component';

import '../styles/globals.css'

const MyApp = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Head>
        {/* General Title */}
        <title>Next Events</title>
        <meta name='description' content='NextJS Events' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;

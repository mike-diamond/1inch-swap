import React from 'react'
import cx from 'classnames'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import localFont from 'next/font/local'

import '../scss/globals.scss'

import favicon from './static/favicon.ico'


const font = localFont({
  src: [
    {
      path: './static/fonts/CircularStd-Book.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './static/fonts/CircularStd-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './static/fonts/CircularStd-Bold.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
})

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>1inch swap</title>
      <meta content="1inch swap - react app" name="description" />
      <link href={favicon.src} rel="shortcut icon" />
    </Head>
    <div className={cx('bg-raven flex items-center justify-center', font.className)}>
      <Component {...pageProps} />
    </div>
  </>
)


export default App

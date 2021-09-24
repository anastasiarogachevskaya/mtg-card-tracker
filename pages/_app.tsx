import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react'
import { Provider } from 'next-auth/client'
import Header from '../components/Header/Header'

function MyApp({ Component, pageProps: { session, ...pageProps }, }: AppProps) {
  return (
    <Provider session={session}>
      <Header />
      <Component {...pageProps} />
    </Provider>
  )
}
export default MyApp

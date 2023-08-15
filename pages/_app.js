import Head from 'next/head'
import { Space_Mono, Work_Sans, Roboto_Mono } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import Layout from 'components/layout/layout'
import { NotificationContextProvider } from 'store/notification-context'
import 'styles/globals.css'

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--workSans-font',
  display: 'swap',
})
const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--spaceMono-font',
  display: 'swap',
})

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <NotificationContextProvider>
      <SessionProvider session={session}>
        <Head>
          <title>Partage NFTs</title>
          <meta
            name="description"
            content="Shared NFT Utilities built on the Bitcoin blockchain"
          />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <main className={`${workSans.variable} ${spaceMono.variable}`}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </main>
      </SessionProvider>
    </NotificationContextProvider>
  )
}

export default MyApp

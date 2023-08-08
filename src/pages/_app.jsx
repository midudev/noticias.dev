import Head from 'next/head'
import { ThemeProvider } from 'next-themes'
import { MDXProvider } from '@mdx-js/react'

import { Layout } from '@/components/Layout'
import * as mdxComponents from '@/components/mdx'
import {useOpenAllLinksInNewTab} from "@/hooks/useOpenAllLinksInNewTab";

import '@/styles/tailwind.css'
import 'focus-visible'


export default function App({ Component, pageProps }) {
  useOpenAllLinksInNewTab();

  return (
    <>
      <Head>
        <title>noticias.dev - Noticias y recursos de Programación Web</title>
        <meta
          name="description"
          content="Newsletter para programadores y desarrolladores web. 100% gratis. Todos los martes."
        />
        <meta property="og:url" content="https://noticias.dev" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="noticias.dev - Noticias y recursos de Programación Web"
        />
        <meta
          property="og:description"
          content="Newsletter para programadores y desarrolladores web. 100% gratis. Todos los martes."
        />
        <meta property="og:image" content="https://noticias.dev/og.jpg" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="noticias.dev" />
        <meta property="twitter:url" content="https://noticias.dev" />
        <meta
          name="twitter:title"
          content="noticias.dev - Noticias y recursos de Programación Web"
        />
        <meta
          name="twitter:description"
          content="Newsletter para programadores y desarrolladores web. 100% gratis. Todos los martes."
        />
        <meta name="twitter:image" content="https://noticias.dev/og.jpg" />

        <link rel="icon" href="/favicon.png" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </Head>

      <ThemeProvider attribute="class" disableTransitionOnChange>
        <MDXProvider components={mdxComponents}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MDXProvider>
      </ThemeProvider>
    </>
  )
}

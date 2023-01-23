import { ThemeProvider } from '@/components'
import { CacheProvider, EmotionCache } from '@emotion/react'
import createEmotionCache from '@/lib/createEmotionCache'
import { ReactNode } from 'react'
import { AppProps } from 'next/app'
import { NextPage } from 'next'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Head from 'next/head'

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache

  Component: NextPage & {
    getLayout?: (page: ReactNode) => ReactNode
  }
}

const clientSideEmotionCache = createEmotionCache()

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5 * 1000, cacheTime: 0, retry: false } }
})

export default function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps
}: MyAppProps) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <style jsx global>
            {`
              body {
                background-color: #fbfbfb;
              }
            `}
          </style>
          <Head>
            <title>rAPId</title>
          </Head>
          {getLayout(<Component {...pageProps} />)}
        </QueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}

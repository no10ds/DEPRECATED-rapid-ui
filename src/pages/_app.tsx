import { ThemeProvider } from '@/components'
import { CacheProvider, EmotionCache } from '@emotion/react'
import createEmotionCache from '@/lib/createEmotionCache'
import { ReactNode } from 'react'
import { AppProps } from 'next/app'
import { NextPage } from 'next'

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache

  Component: NextPage & {
    getLayout?: (page: ReactNode) => ReactNode
  }
}

const clientSideEmotionCache = createEmotionCache()

export default function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps
}: MyAppProps) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider>{getLayout(<Component {...pageProps} />)}</ThemeProvider>
    </CacheProvider>
  )
}

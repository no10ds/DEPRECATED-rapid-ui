import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentInitialProps
} from 'next/document'
import createEmotionServer from '@emotion/server/create-instance'
import theme from '@/style/theme'
import createEmotionCache from '@/lib/createEmotionCache'
import { ReactNode } from 'react'

type DocumentProps = {
  emotionStyleTags: ReactNode
} & DocumentInitialProps

export default class MyDocument extends Document<DocumentProps> {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link rel="icon" href="/images/favicon.ico?v=0" sizes="any" />
          <link rel="icon" href="/images/favicon.svg?v=0" type="image/svg+xml" />
          <meta charSet="UTF-8" />

          {this.props.emotionStyleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage
  const cache = createEmotionCache()
  const { extractCriticalToChunks } = createEmotionServer(cache)

  ctx.renderPage = () =>
    originalRenderPage({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      enhanceApp: (App: any) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />
        }
    })

  const initialProps = await Document.getInitialProps(ctx)
  const emotionStyles = extractCriticalToChunks(initialProps.html)
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ))

  return {
    ...initialProps,
    emotionStyleTags
  }
}

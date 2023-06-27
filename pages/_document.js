import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="A simple workout app" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

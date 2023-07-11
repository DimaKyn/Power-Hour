import { Html, Head, Main, NextScript } from 'next/document'

// Define the Document component as the default export
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

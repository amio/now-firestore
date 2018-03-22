import Document_, { Head, Main, NextScript } from 'next/document'
import htmlescape from 'htmlescape'

const { API_URL, NODE_ENV } = process.env
const env = { API_URL, NODE_ENV }
const envSetupScript = '__ENV__ = ' + htmlescape(env)

export default class Document extends Document_ {
  static async getInitialProps (ctx) {
    const props = await Document_.getInitialProps(ctx)
    return props
  }

  render () {
    return (
      <html>
        <Head />
        <body>
          <Main />
          <script dangerouslySetInnerHTML={{ __html: envSetupScript }} />
          <NextScript />
        </body>
      </html>
    )
  }
}

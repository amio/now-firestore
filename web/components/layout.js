import Head from 'next/head'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import blue from 'material-ui/colors/blue'

/* eslint-disable max-len */
export default ({children, title, style, className}) => (
  <div id='main' className={className} style={style}>
    <Head>
      <title>{title || 'Forms'}</title>
      <meta name='viewport' content='initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width' />
    </Head>
    <style jsx global>{globalStyles}</style>
    <MuiThemeProvider theme={theme}>
      {children}
    </MuiThemeProvider>
  </div>
)

const globalStyles = `
html, body { margin: 0; height: 100% }
body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif }
h1, h2, h3, h4, h5, ul, ol { margin: 0 }

#main { max-height: 100vh; display: flex; flex-direction: column }
`

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[600]
    }
  }
})

const micro = require('micro')
const apiRoutes = require('./api/index.js')
const { nextApp, nextAppRoute } = require('./web/index.js')
const { router, get, post, options, del } = require('microrouter')

const host = 'localhost:3000'
const port = 3000

const routes = router(
  get('/api/*', apiRoutes),
  post('/api/*', apiRoutes),
  options('/api/*', apiRoutes),
  del('/api/*', apiRoutes),
  get('/*', nextAppRoute)
)

nextApp.prepare().then(() => {
  micro(routes).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on ${host}`)
  })
}, err => { throw err.toString() })

process.on('unhandledRejection', (reason, p) => {
  console.error('\nUnhandled:', p, '\nReason:', reason)
})

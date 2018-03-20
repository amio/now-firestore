const { router, get, post } = require('microrouter')
const cors = require('micro-cors')

const forms = require('./forms.js')

const routes = router(
  get('/api/forms/:fid', forms.list),
  post('/api/signup', forms.signup)
)

module.exports = cors()(routes)

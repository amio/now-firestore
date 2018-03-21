const { router, get, post } = require('microrouter')
const cors = require('micro-cors')

const forms = require('./forms.js')

const routes = router(
  get('/api/forms/:topic', forms.list),
  post('/api/signup', forms.signup),
  get('/api/signup/:sid', forms.signupInfo)
)

module.exports = cors()(routes)

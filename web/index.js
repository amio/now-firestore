const next = require('next')

const nextApp = next({
  dev: process.env.NODE_ENV !== 'production',
  dir: __dirname
})

const nextAppHandler = nextApp.getRequestHandler()

const nextAppRoute = async (req, res) => {
  return nextAppHandler(req, res)
}

module.exports = {
  nextApp,
  nextAppRoute
}

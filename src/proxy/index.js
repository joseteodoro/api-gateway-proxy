const logger = require('../logger').configure()
const path = require('path')
const proxy = require('http-proxy-middleware')

const loader = require('./json-loader')

const logProvider = () => logger

// if generic comes first it resolves the url
// before we reach the specific ones
const genericComesLast = (l, r) => (r.prefix).localeCompare(l.prefix)

const listServices = () => loader.loadFiles(path.join(__dirname, 'services'))
  .sort(genericComesLast)

const reducer = (app) => (_, nxt) => {
  logger.info(`Configuring ${nxt.prefix} ~> ${nxt.route.target}`)
  if (!nxt.skip) {
    app.use(nxt.prefix, proxy.createProxyMiddleware({...nxt.route, logProvider}))
  }
  return _
}

// configure proxy with json files from 'services' directory
// refer to https://github.com/chimurai/http-proxy-middleware/tree/master/recipes
// to configure the route entry
const configure = (app) => listServices().reduce(reducer(app), {})

module.exports = { configure }

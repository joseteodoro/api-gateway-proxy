const logger = require('./logger').configure()
const server = require('./server')

const WEBSERVICE_HML = 'https://dev.azure-api.net/webservice'
process.env.SERVER_WEBSERVICE = process.env.SERVER_WEBSERVICE || WEBSERVICE_HML

const app = server.createServer()

const PORT = process.env.PORT || 3000
const ENV = process.env.NODE_ENV || process.env.ENV || 'local'

app.listen(PORT, () => {
  logger.info(`Starting WEBSERVICE looking at ${process.env.SERVER_WEBSERVICE}`)
  logger.info(`Starting Proxy [${ENV}] at ${PORT}`)
})

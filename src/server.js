const express = require('express')
const app = express()
const logger = require('./logger').configure()
const pino = require('express-pino-logger')({ logger })

const proxy = require('./proxy')

const health = (req, res, _) => {
  res.json({status: 'up'})
}

const notfound = (req, res, _) => {
  res.sendStatus(403)
}

const createServer = () => {
  app.use(pino)
  app.get('/health', health)

  proxy.configure(app)

  // non-existent routes will recieve Forbidden
  app.use(notfound)
  return app
}

module.exports = { createServer }

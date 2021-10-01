const fs = require('fs')
const path = require('path')

const logger = require('../logger').configure()
const replacer = require('./replacer')

const listFiles = (servicePath) => fs.readdirSync(servicePath)

const REGEX = /.json$/i

const onlyJSON = (f) => REGEX.test(f)

const loadJson = (contents) => {
  try {
    return JSON.parse(contents)
  } catch (ex) {
    logger.error(ex)
    return null
  }
}

const loadContent = (servicePath) => (f) => {
  try {
    return fs.readFileSync(path.join(servicePath, f), 'utf8')
  } catch (ex) {
    logger.error(ex)
    return null
  }
}

const notNull = (service) => !!service

const loadFiles = (servicePath) => listFiles(servicePath)
  .filter(onlyJSON)
  .map(loadContent(servicePath))
  .filter(notNull)
  .map(replacer.replace)
  .map(loadJson)
  .filter(notNull)

module.exports = { loadFiles }

const pino = require('pino')
const { name } = require('../package.json')

const isDevEnvironment = () => ['local', 'dev', 'development', 'test', 'debug', 'homolog'].includes(process.env.NODE_ENV || 'local')

const configure = () => {
  const [level, prettyPrint] = isDevEnvironment() ? ['debug', true] : ['info', false]
  return pino({ name, level, prettyPrint })
}

module.exports = { configure }

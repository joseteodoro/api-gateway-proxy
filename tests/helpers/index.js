const chai = require('chai')
const promised = require('chai-as-promised')
const sinonChai = require('sinon-chai')

chai.use(promised)
chai.use(sinonChai)
chai.should()
global.expect = chai.expect
global.assert = chai.assert

const WEBSERVICE_HML = 'https://dev.azure-api.net/webservice'
process.env.SERVER_WEBSERVICE = process.env.SERVER_WEBSERVICE || WEBSERVICE_HML

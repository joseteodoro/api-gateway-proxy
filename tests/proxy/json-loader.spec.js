const { expect } = require('chai')
const path = require('path')
const loader = require('../../src/proxy/json-loader')

const sample0 = require('./samples/apython.json')

process.env.TEST_ENV = 'JSON_LOADER'

describe(`loader test`, () => {
  context('when loading files', () => {
    it(`Should load properly`, () => {
      const jsons = loader.loadFiles(path.join(__dirname, 'samples'))
      // eslint-disable-next-line no-unused-expressions
      expect(jsons).to.not.be.undefined
      expect(jsons.length).to.be.deep.equals(5)
      expect(jsons[0]).to.be.deep.equals(sample0)
      expect(jsons[4].prefix).to.be.deep.equals('JSON_LOADER')
    })
  })
})

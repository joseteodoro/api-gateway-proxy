const replacer = require('../../src/proxy/replacer')

describe(`replacer test`, () => {
  context('when replacing var envs', () => {
    it(`Should replace single var`, () => {
      process.env.TEST_NAME = 'banana'
      const res = replacer.replace('{{ TEST_NAME }}')
      expect(res).to.be.deep.equals('banana')
    })
    it(`Should replace non exitent var with empty`, () => {
      const res = replacer.replace('{{ NON_EXISTENT }}')
      expect(res).to.be.deep.equals('')
    })
    it(`Should replace multiple vars`, () => {
      process.env.BANANA = 'banana'
      process.env.PHONE = 'phone'
      process.env.RING_RING_RING = 'ring ring ring'
      const res = replacer.replace('{{ BANANA }} {{ PHONE }} {{ RING_RING_RING }}')
      expect(res).to.be.deep.equals('banana phone ring ring ring')
    })
  })
})

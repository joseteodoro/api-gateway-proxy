const supertest = require('supertest')
const { createServer } = require('../../src/server')

describe('src/index express server suite', () => {
  describe('Given express server is up', () => {
    const app = createServer()

    it('when I call /health should return 200', () => supertest(app)
      .get('/health')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200, { status: 'up' })
    )
    it('when I call non-existent endpoint should return 403', () => supertest(app)
      .get('/notfound')
      .expect(403)
    )
  })
})

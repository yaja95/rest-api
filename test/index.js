import Clients from 'restify-clients'
import assert from 'assert'
import Mocha from 'mocha'

import '../src/app.js'

const client = Clients.createJsonClient({
  url: 'http://localhost:5000',
  version: '~1.0'
})

Mocha.describe('REST API', () => {
  Mocha.it('should return 200', done => {
    client.get('/', (err, req, res, obj) => {
      assert.ifError(err)
      assert.equal(200, res.statusCode)
      done()
    })
  })
})
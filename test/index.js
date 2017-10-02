import '../src/app.js'

import Assert from 'assert'
import Clients from 'restify-clients'
import Mocha from 'mocha'
import Password from '../src/password'

Mocha.describe('REST API', () => {
  const client = Clients.createJsonClient({
    url: 'http://localhost:5000'
  })

  Mocha.it('should return 200 OK', done => {
    client.get('/', (err, req, res, obj) => {
      Assert.ifError(err)
      Assert.equal(200, res.statusCode)
      done()
    })
  })
})

Mocha.describe('Password module', function () {
  const expectedHashTime = 100
  this.slow(expectedHashTime * 2)

  Mocha.it('should round-trip passwords correctly', async () => {
    const password = 'Correct Horse Battery Staple'
    const hash = await Password.hash(password)
    const theyMatch = await Password.verify(password, hash)
    Assert.ok(theyMatch)
  })

  Mocha.it('does not truncate long passwords', async () => {
    const password = 'Sed accumsan, eros nec tempor lacinia, odio lacus iaculis neque, id gravida leo dui sit amet nullam.'
    const truncated = password.slice(0, 80)
    const hash = await Password.hash(password)
    const theyMatch = await Password.verify(truncated, hash)
    Assert.ok(!theyMatch)
  })
})

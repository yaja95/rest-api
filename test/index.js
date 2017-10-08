import './env'
import 'babel-polyfill'
// import '../src/app'

import Assert from 'assert'
// import Clients from 'restify-clients'
import Mocha from 'mocha'
import Password from '../src/password'
import { functions as Utils } from '../src/database/data'

// TODO: Get this test working again
// Mocha.describe('API', () => {
//   const client = Clients.createJsonClient({
//     url: 'http://localhost:' + process.env.PORT
//   })

//   Mocha.it('should return 200 OK', done => {
//     client.get('/', (err, req, res, obj) => {
//       Assert.ifError(err)
//       Assert.equal(200, res.statusCode)
//       done()
//     })
//   })
// })

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

Mocha.describe('Database UUID functions', function () {
  Mocha.it('should mangle correctly', () => {
    const before = Utils.uuid.fromString('6ccd780c-baba-1026-9564-0040f4311e29')
    const after = Utils.uuid.fromString('1026-baba-6ccd780c-9564-0040f4311e29')
    Assert.ok(Utils.uuid.mangle(before).equals(after), `${before} -> ${after}`)
  })

  Mocha.it('should demangle correctly', () => {
    const before = Utils.uuid.fromString('1026-baba-6ccd780c-9564-0040f4311e29')
    const after = Utils.uuid.fromString('6ccd780c-baba-1026-9564-0040f4311e29')
    Assert.ok(Utils.uuid.demangle(before).equals(after), `${before} -> ${after}`)
  })

  Mocha.it('should from/to string reflexively', () => {
    const uuid = '6ccd780c-baba-1026-9564-0040f4311e29'
    Assert.equal(uuid, Utils.uuid.toString(Utils.uuid.fromString(uuid)))
  })
})

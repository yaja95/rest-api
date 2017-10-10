import * as App from '../src/app'
import Assert from 'assert'
import Clients from 'restify-clients'
import Mocha from 'mocha'
import Password from '../src/password'
import { functions as Utils } from '../src/database/data'

Mocha.before(async function () {
  this.timeout(0)
  await App.start()
  console.log('\n')
})

Mocha.after(function () {
  App.stop()
})

Mocha.describe('API', async function () {
  const client = Clients.createJsonClient({
    url: 'http://localhost:' + (process.env.PORT || 5000)
  })

  Mocha.after(function () {
    client.close()
  })

  Mocha.it('should return 200 OK', function (done) {
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

  Mocha.it('should round-trip passwords correctly', async function () {
    const password = 'Correct Horse Battery Staple'
    const hash = await Password.hash(password)
    const theyMatch = await Password.verify(password, hash)
    Assert.ok(theyMatch)
  })

  Mocha.it('does not truncate long passwords', async function () {
    const password = 'Sed accumsan, eros nec tempor lacinia, odio lacus iaculis neque, id gravida leo dui sit amet nullam.'
    const truncated = password.slice(0, 80)
    const hash = await Password.hash(password)
    const theyMatch = await Password.verify(truncated, hash)
    Assert.ok(!theyMatch)
  })
})

Mocha.describe('Database UUID functions', function () {
  Mocha.it('should mangle correctly', function () {
    const before = Utils.uuid.fromString('6ccd780c-baba-1026-9564-0040f4311e29')
    const after = Utils.uuid.fromString('1026-baba-6ccd780c-9564-0040f4311e29')
    Assert.ok(Utils.uuid.mangle(before).equals(after), `${before} -> ${after}`)
  })

  Mocha.it('should demangle correctly', function () {
    const before = Utils.uuid.fromString('1026-baba-6ccd780c-9564-0040f4311e29')
    const after = Utils.uuid.fromString('6ccd780c-baba-1026-9564-0040f4311e29')
    Assert.ok(Utils.uuid.demangle(before).equals(after), `${before} -> ${after}`)
  })

  Mocha.it('should from/to string reflexively', function () {
    const uuid = '6ccd780c-baba-1026-9564-0040f4311e29'
    Assert.equal(uuid, Utils.uuid.toString(Utils.uuid.fromString(uuid)))
  })
})

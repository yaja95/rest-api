import * as App from '../src/app'
import Assert from 'assert'
import Clients from 'restify-clients'
import Mocha from 'mocha'
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

Mocha.describe('Database UUID functions', function () {
  Mocha.it('should from/to string reflexively', function () {
    const uuid = '110ec58a-a0f2-4ac4-8393-c866d813b8d1'
    Assert.equal(uuid, Utils.uuid.toString(Utils.uuid.fromString(uuid)))
  })
})

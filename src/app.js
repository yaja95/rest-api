import 'babel-polyfill'
import '../scripts/env'

import Restify from 'restify'
import Sessions from 'client-sessions'
import Passport from './passport'
import * as Database from './database'
import * as Paths from './paths'
import { SESSION_SECRET } from './secrets'
import { InternalServerError } from 'restify-errors'

const server = Restify.createServer({
  name: ''
})

server.pre([
  Restify.plugins.pre.userAgentConnection(),
  Restify.plugins.pre.sanitizePath()
])

server.use([
  Restify.plugins.acceptParser(server.acceptable),
  Restify.plugins.queryParser(),
  Restify.plugins.bodyParser({ rejectUnknown: true }),
  Restify.plugins.fullResponse(),
  Passport.initialize(),
  Passport.session()
])

server.use(Sessions({
  requestKey: 'session',
  secret: SESSION_SECRET
}))

server.use(function cors (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  next()
})

function wrapInternalError (cb) {
  if (cb instanceof Array) {
    return cb.map(cb => async (req, res, next) => {
      try {
        await cb(req, res, next)
      } catch (e) {
        console.error(e)
        res.send(new InternalServerError(e))
        next()
      }
    })
  } else {
    return async (req, res, next) => {
      try {
        await cb(req, res, next)
      } catch (e) {
        console.error(e)
        res.send(new InternalServerError(e))
        next()
      }
    }
  }
}

Paths.gets.forEach(({ path, handler }) => server.get(path, wrapInternalError(handler)))
Paths.posts.forEach(({ path, handler }) => server.post(path, wrapInternalError(handler)))
Paths.puts.forEach(({ path, handler }) => server.put(path, wrapInternalError(handler)))
Paths.patches.forEach(({ path, handler }) => server.patch(path, wrapInternalError(handler)))
Paths.deletes.forEach(({ path, handler }) => server.del(path, wrapInternalError(handler)))

export async function start () {
  try {
    await Database.init()
  } catch (err) {
    throw err
  }
  return new Promise(resolve => {
    server.listen(process.env.PORT || 5000, () => resolve(server.url))
  })
}

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development') {
  start()
    .then(url => console.log(`listening at ${url}`))
    .catch(err => {
      console.error(`Error during startup: ${err}`)
      process.abort()
    })
}

export function stop () {
  server.close()
  Database.close()
}

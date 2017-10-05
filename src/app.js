import 'babel-polyfill'

import Restify from 'restify'
import Sessions from 'client-sessions'
import { SESSION_SECRET } from './secrets'
import * as paths from './paths'

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
  Restify.plugins.fullResponse()
])

server.use(Sessions({
  requestKey: 'session',
  secret: SESSION_SECRET
}))

server.use(function cors (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  next()
})

paths.gets.forEach(({path, handler}) => server.get(path, handler))
paths.posts.forEach(({path, handler}) => server.post(path, handler))
paths.puts.forEach(({path, handler}) => server.put(path, handler))
paths.patches.forEach(({path, handler}) => server.patch(path, handler))
paths.deletes.forEach(({path, handler}) => server.del(path, handler))

server.listen(process.env.PORT || 5000, () => console.log(`listening at ${server.url}`))

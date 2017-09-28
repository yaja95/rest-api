import Restify from 'restify'
import Sessions from 'client-sessions'
import { SESSION_SECRET } from './secrets'
import { gets } from './paths'

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
  Restify.plugins.bodyParser({ rejectUnknown: true })
])

server.use(Sessions({
  requestKey: 'session',
  secret: SESSION_SECRET
}))

server.use(function sessionDemo (req, res, next) {
  req.session.toggle = !req.session.toggle
  next()
})

gets.forEach(({path, handler}) => server.get(path, handler))

server.listen(process.env.PORT || 5000, () => console.log(`listening at ${server.url}`))

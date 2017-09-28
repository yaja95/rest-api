import Restify from 'restify'
import { Gets } from './paths'

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
  Restify.plugins.bodyParser()
])

Gets.forEach(({path, handler}) => server.get(path, handler))

server.listen(process.env.PORT || 5000, () => console.log(`listening at ${server.url}`))

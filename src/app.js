import Restify from 'restify'

const server = Restify.createServer({
  name: '',
  version: '0.0.0'
})

server.pre(Restify.plugins.pre.userAgentConnection())

server.use(Restify.plugins.acceptParser(server.acceptable))
server.use(Restify.plugins.queryParser())
server.use(Restify.plugins.bodyParser())

server.get('/echo', (req, res, next) => {
  const response = {req, res}
  res.send(response)
  return next()
})

server.get('/', (req, res, next) => {
  const response = {}
  res.send(response)
  return next()
})

const port = process.env.PORT || 5000
server.listen(port, () => console.log(`${server.name} listening at ${server.url}`))

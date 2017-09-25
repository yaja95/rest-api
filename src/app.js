import Restify from 'restify'

const server = Restify.createServer({
  name: 'node-restify-test',
  version: '1.0.0'
})

server.pre(Restify.plugins.pre.userAgentConnection())

server.use(Restify.plugins.acceptParser(server.acceptable))
server.use(Restify.plugins.queryParser())
server.use(Restify.plugins.bodyParser())

server.get('/echo/:name', (req, res, next) => {
  res.send(req.params)
  return next()
})

server.get('/', (req, res, next) => {
  res.send('Hello, world')
  return next()
})

const port = process.env.PORT || 5000
server.listen(port, () => console.log(`${server.name} listening at ${server.url}`))

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

server.listen(8080, () => console.log(`${server.name} listening at ${server.url}`))

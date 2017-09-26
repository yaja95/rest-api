export default [
  {
    path: '/echo',
    handler (req, res, next) {
      // I can't just pass through req here because of circular structure
      // So I've selected out some of the main properties that aren't
      res.send({
        httpVersionMajor: req.httpVersionMajor,
        httpVersionMinor: req.httpVersionMinor,
        httpVersion: req.httpVersion,
        headers: req.headers,
        params: req.params,
        context: req.context,
        query: req.query
      })
      return next()
    }
  },
  {
    path: '/',
    handler (req, res, next) {
      res.send({})
      return next()
    }
  }
]

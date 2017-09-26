export default [
  {
    path: '/echo',
    handler (req, res, next) {
      res.send({req, res})
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

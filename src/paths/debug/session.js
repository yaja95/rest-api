export const gets = [
  {
    path: '/debug/session',
    handler (req, res, next) {
      res.send(req.session)
      next()
    }
  },
  {
    path: '/debug/session/clean',
    handler (req, res, next) {
      Object.keys(req.session).forEach((key) => {
        delete req.session[key]
      })
      res.send(req.session)
      next()
    }
  }
]

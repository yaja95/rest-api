import * as debug from './debug'

export const gets = [
  ...debug.gets,
  {
    path: '/',
    handler (req, res, next) {
      res.send({})
      return next()
    }
  }
]

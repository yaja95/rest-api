import { authenticate } from '../passport'

export const get = {
  path: '/login',
  handler: [
    (req, res, next) => {
      req.session.return = req.query.return || '/'
      next()
    },
    authenticate,
    (req, res, next) => {
      let ret = req.session.return || '/'
      req.session.return = undefined
      res.redirect(ret, next)
    }
  ]
}

export const post = {
  path: '/login',
  authenticate,
  handler (req, res, next) {
    let ret = req.session.return || '/'
    req.session.return = undefined
    res.redirect(ret, next)
  }
}

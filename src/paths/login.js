import { authenticate } from '../passport'

export const gets = [
  {
    path: '/login',
    handler: [
      (req, res, next) => {
        req.session.return = req.query.return || '/'
        next()
      },
      authenticate(),
      (req, res, next) => {
        let ret = req.session.return || '/'
        req.session.return = undefined
        delete req.session.return
        res.redirect(ret, next)
      }
    ]
  },
  {
    path: '/logout',
    handler (req, res, next) {
      req.logout()
      res.send({})
      next()
    }
  }
]

export const post = {
  path: '/login/azure/return',
  handler: [
    authenticate(),
    (req, res, next) => {
      let ret = req.session.return || '/'
      req.session.return = undefined
      delete req.session.return
      res.redirect(ret, next)
    }
  ]
}

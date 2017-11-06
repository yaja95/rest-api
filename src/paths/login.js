import { authenticate } from '../passport'

export const get = {
  path: '/login',
  handler: [
    (req, res, next) => {
      console.log('before get')
      req.session.return = req.query.return || '/'
      next()
    },
    authenticate(),
    (req, res, next) => {
      console.log('after get')
      let ret = req.session.return || '/'
      req.session.return = undefined
      delete req.session.return
      res.redirect(ret, next)
    }
  ]
}

export const post = {
  path: '/login',
  handler: [
    (req, res, next) => {
      console.log('before post')
      next()
    },
    authenticate(),
    (req, res, next) => {
      console.log('after post')
      let ret = req.session.return || '/'
      req.session.return = undefined
      delete req.session.return
      res.redirect(ret, next)
    }
  ]
}

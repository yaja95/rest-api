export const get = {
  path: '/debug/session',
  handler (req, res, next) {
    res.send(req.session)
    next()
  }
}

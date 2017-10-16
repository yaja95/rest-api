export const get = {
  path: '/login',
  handler (req, res, next) {
    res.send({})
    next()
  }
}

export const post = {
  path: '/login',
  handler (req, res, next) {
    console.log(req.query)
    res.send({})
    next()
  }
}

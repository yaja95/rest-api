import Password from '../../password'

export const get = {
  path: '/debug/hash/:password',
  handler (req, res, next) {
    const password = req.params.password
    Password.hash(password).then(hash => {
      res.send({ password, hash })
      next()
    })
  }
}

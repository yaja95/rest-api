import echo from './echo'

export const Gets = [
  echo.get,
  {
    path: '/',
    handler (req, res, next) {
      res.send({})
      return next()
    }
  }
]

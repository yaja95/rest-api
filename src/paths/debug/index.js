import * as echo from './echo'
import * as hash from './hash'
import * as session from './session'

export const gets = [
  session.get,
  hash.get,
  echo.get
]

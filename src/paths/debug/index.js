import * as echo from './echo'
import * as session from './session'

export const gets = [
  ...session.gets,
  echo.get
]

import DotEnv from 'dotenv-safe'
import Nodemon from 'nodemon'

DotEnv.load()
Nodemon({
  script: 'src/app.js',
  exec: 'babel-node'
})

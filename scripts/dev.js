import DotEnv from 'dotenv-safe'
import Nodemon from 'nodemon'

process.env.RUN = true
DotEnv.load()
Nodemon({
  script: 'src/app.js',
  exec: 'babel-node'
})

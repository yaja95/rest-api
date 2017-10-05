import Nodemon from 'nodemon'
import Read from 'read'

function run () {
  Nodemon({
    script: 'src/app.js',
    exec: 'babel-node'
  })
}

process.env.SESSION_SECRET = process.env.SESSION_SECRET || 's3cr3t'
if (!process.env.DB_PASSWORD) {
  Read({
    prompt: 'DB Password: ',
    silent: true,
    replace: '*'
  }, (error, password) => {
    if (error) {
      console.error(error)
      process.abort()
    }
    process.env.DB_PASSWORD = password.trim()
    run()
  })
} else {
  run()
}

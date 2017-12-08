import { BadRequestError } from 'restify-errors'
import SFTP from 'promise-sftp'
import UUID from 'uuid'
import { SFTP_PASSWORD } from '../secrets'

const sftp = new SFTP()

export const post = {
  path: '/upload',
  async handler (req, res, next) {
    if (!req.files) {
      return new BadRequestError('No files were uploaded')
    }

    let file = req.files.file
    if (!file) {
      return new BadRequestError('No file `file` was uploaded')
    }

    await sftp.connect({
      host: 'cs.furman.edu',
      username: 'cdurham',
      password: SFTP_PASSWORD
    })

    const filename = `cinc/${UUID.v1()}-${file.name}`
    try {
      await sftp.put(file.path, 'www/' + filename)
    } catch (exception) {
      console.log(exception)
      throw exception
    }
    sftp.end()
    res.send('cs.furman.edu/~cdurham/' + filename)
    next()
  }
}

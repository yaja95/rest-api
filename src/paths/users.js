import * as Database from '../database'
import { functions } from '../database/data'
import { NotFoundError } from 'restify-errors'
import { authenticate } from '../passport'

async function users (req, res, next) {
  if (req.query.faculty !== undefined) {
    const isFaculty = req.query.faculty && req.query.faculty !== 'false'
    res.send(await Database.User.findAll({ where: { isFaculty } }))
  } else {
    res.send(await Database.User.all())
  }
  next()
}

async function userOID (req, res, next) {
  // HACK don't dig around in database internals
  const oid = functions.uuid.fromString(req.params.oid)
  const user = await Database.User.findById(oid)
  if (user) {
    res.send(user)
  } else {
    res.send(new NotFoundError('OID not found'))
  }
  next()
}

async function userMe (req, res, next) {
  console.log(req.user)
  res.send(req.user)
  next()
}

export const gets = [
  {
    path: '/users',
    handler: users
  },
  {
    path: '/users/me',
    handler: [
      authenticate(),
      userMe
    ]
  },
  {
    path: '/users/:oid',
    handler: userOID
  }
]

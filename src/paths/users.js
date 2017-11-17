import * as Database from '../database'
import UUID from '../types/UUID'
import { NotFoundError } from 'restify-errors'

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
  const oid = new UUID(req.params.oid)
  const user = await Database.User.findById(oid)
  if (user) {
    res.send(user)
  } else {
    res.send(new NotFoundError('OID not found'))
  }
  next()
}

async function userMe (req, res, next) {
  res.send(req.user || null)
  next()
}

export const gets = [
  {
    path: '/users',
    handler: users
  },
  {
    path: '/users/me',
    handler: userMe
  },
  {
    path: '/users/:oid',
    handler: userOID
  }
]

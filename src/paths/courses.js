import * as Database from '../database'
import { NotFoundError, InvalidArgumentError } from 'restify-errors'

async function coursesByID (req, res, next) {
  const id = parseInt(req.params.id)
  if (id) {
    const course = await Database.Course.findById(id)
    if (course) {
      res.send(course)
    } else {
      res.send(new NotFoundError('Course not found'))
    }
  } else {
    res.send(new InvalidArgumentError('Course id must be an int'))
  }
  next()
}

async function courses (req, res, next) {
  if (req.query.onlyReal !== undefined) {
    const isReal = req.query.onlyReal && req.query.onlyReal !== 'false'
    res.send(await Database.User.findAll({ where: { isReal } }))
  } else {
    res.send(await Database.User.all())
  }
  next()
}

export const gets = [
  {
    path: '/courses/:id',
    handler: coursesByID
  },
  {
    path: '/courses',
    handler: courses
  }
]

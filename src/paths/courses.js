import * as Database from '../database'
import { NotFoundError, InvalidArgumentError, MissingParameterError } from 'restify-errors'

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
  if (req.query.real !== undefined) {
    const isReal = req.query.real !== 'false'
    res.send(await Database.Course.findAll({ where: { isReal } }))
  } else {
    res.send(await Database.Course.all())
  }
  next()
}

const requiredFields = [ 'description' ]
const courseFields = [ 'description', 'isReal' ]

async function putCourses (req, res, next) {
  for (const field in requiredFields) {
    if (!req.body.hasOwnProperty(field)) {
      res.send(new MissingParameterError(field))
      return next()
    }
  }
  const created = await Database.Course.create(req.body, { fields: courseFields })
  res.send(created)
  next()
}

async function updateCourses (req, res, next) {
  const id = parseInt(req.params.id)
  if (id) {
    const course = await Database.Course.findById(id)
    if (course) {
      await course.update(req.body, { fields: courseFields })
      res.send(course)
    } else {
      res.send(new NotFoundError('Course not found'))
    }
  } else {
    res.send(new InvalidArgumentError('Course id must be an int'))
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

export const puts = [
  {
    path: '/courses',
    handler: putCourses
  },
  {
    path: 'courses/:id',
    handler: updateCourses
  }
]

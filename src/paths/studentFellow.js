import * as Database from '../database'
import { NotFoundError, InvalidArgumentError } from 'restify-errors'

async function getFellows (req, res, next) {
  const fellows = await Database.StudentFellow.all()
  res.send(fellows)
  next()
}

async function getFellowById (req, res, next) {
  const id = parseInt(req.params.id)
  if (id) {
    const fellow = await Database.StudentFellow.findById(id)
    if (fellow) {
      res.send(fellow)
    } else {
      res.send(new NotFoundError('Fellow not found'))
    }
  } else {
    res.send(new InvalidArgumentError('Fellow id must be an int'))
  }
  next()
}

async function addFellow (req, res, next) {
  const created = await Database.StudentFellow.create(req.body)
  res.send(created)
  next()
}

async function updateFellow (req, res, next) {
  const id = parseInt(req.params.id)
  if (id) {
    const fellow = await Database.StudentFellow.findById(id)
    if (fellow) {
      await fellow.update(req.body)
      res.send(fellow)
    } else {
      res.send(new NotFoundError('Fellow not found'))
    }
  } else {
    res.send(new InvalidArgumentError('Fellow id must be an int'))
  }
  next()
}

export const gets = [
  {
    path: '/fellow/student',
    handler: getFellows
  },
  {
    path: '/fellow/student/:id',
    handler: getFellowById
  }
]

export const puts = [
  {
    path: '/fellow/student',
    handler: addFellow
  },
  {
    path: '/fellow/student/:id',
    handler: updateFellow
  }
]

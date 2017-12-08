import * as Database from '../database'
import { NotFoundError, InvalidArgumentError, MissingParameterError } from 'restify-errors'

async function getFellows (req, res, next) {
  const fellows = await Database.FacutlyFellow.all()
  res.send(fellows)
  next()
}

async function getFellowById (req, res, next) {
  const id = parseInt(req.params.id)
  if (id) {
    const fellow = await Database.FacutlyFellow.findById(id)
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

const fellowFields = [ 'name', 'email', 'department', 'application' ]

async function addFellow (req, res, next) {
  for (const field in fellowFields) {
    if (!req.body.hasOwnProperty(field)) {
      res.send(new MissingParameterError(field, { field: fellowFields }))
      return next()
    }
  }
  const created = await Database.FacutlyFellow.create(req.body, { field: fellowFields })
  res.send(created)
  next()
}

async function updateFellow (req, res, next) {
  const id = parseInt(req.params.id)
  if (id) {
    const fellow = await Database.FacutlyFellow.findById(id)
    if (fellow) {
      await fellow.update(req.body, { field: fellowFields })
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
    path: '/fellow/faculty',
    handler: getFellows
  },
  {
    path: '/fellow/faculty/:id',
    handler: getFellowById
  }
]

export const puts = [
  {
    path: '/fellow/faculty',
    handler: addFellow
  },
  {
    path: '/fellow/faculty/:id',
    handler: updateFellow
  }
]

import * as Database from '../database'
import { NotFoundError, InvalidArgumentError } from 'restify-errors'

async function getAwards (req, res, next) {
  const awards = await Database.Award.all()
  res.send(awards)
  next()
}

async function getAwardById (req, res, next) {
  const id = parseInt(req.params.id)
  if (id) {
    const award = await Database.Award.findById(id)
    if (award) {
      res.send(award)
    } else {
      res.send(new NotFoundError('Award not found'))
    }
  } else {
    res.send(new InvalidArgumentError('Award id must be an int'))
  }
  next()
}

async function addAward (req, res, next) {
  const created = await Database.Award.create(req.body)
  res.send(created)
  next()
}

async function updateAward (req, res, next) {
  const id = parseInt(req.params.id)
  if (id) {
    const award = await Database.Award.findById(id)
    if (award) {
      await award.update(req.body)
      res.send(award)
    } else {
      res.send(new NotFoundError('Award not found'))
    }
  } else {
    res.send(new InvalidArgumentError('Award id must be an int'))
  }
  next()
}

export const gets = [
  {
    path: '/awards',
    handler: getAwards
  },
  {
    path: '/awards/:id',
    handler: getAwardById
  }
]

export const puts = [
  {
    path: '/awards',
    handler: addAward
  },
  {
    path: '/awards/:id',
    handler: updateAward
  }
]

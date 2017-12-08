import * as Database from '../database'
import { NotFoundError, InvalidArgumentError } from 'restify-errors'

async function getExperiences (req, res, next) {
  const experiences = await Database.Experience.all()
  res.send(experiences)
  next()
}

async function getExperienceById (req, res, next) {
  const id = parseInt(req.params.id)
  if (id) {
    const experience = await Database.Experience.findById(id)
    if (experience) {
      res.send(experience)
    } else {
      res.send(new NotFoundError('Experience not found'))
    }
  } else {
    res.send(new InvalidArgumentError('Experience id must be an int'))
  }
  next()
}

async function addExperience (req, res, next) {
  const created = await Database.Experience.create(req.body)
  res.send(created)
  next()
}

async function updateExperience (req, res, next) {
  const id = parseInt(req.params.id)
  if (id) {
    const experience = await Database.Experience.findById(id)
    if (experience) {
      await experience.update(req.body)
      res.send(experience)
    } else {
      res.send(new NotFoundError('Blog not found'))
    }
  } else {
    res.send(new InvalidArgumentError('Blog id must be an int'))
  }
  next()
}

export const gets = [
  {
    path: '/experiences',
    handler: getExperiences
  },
  {
    path: '/experiences/:id',
    handler: getExperienceById
  }
]

export const puts = [
  {
    path: '/experiences',
    handler: addExperience
  },
  {
    path: '/experiences/:id',
    handler: updateExperience
  }
]

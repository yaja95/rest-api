import * as Database from '../database'
import { NotFoundError, InvalidArgumentError, MissingParameterError } from 'restify-errors'

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

const requiredFields = [ 'company', 'dateStart', 'description' ]
const experienceFields = [ 'company', 'dateStart', 'dateEnd', 'description', 'image' ]

async function addExperience (req, res, next) {
  for (const field in requiredFields) {
    if (!req.body.hasOwnProperty) {
      res.send(new MissingParameterError(field))
    }
  }
  const created = await Database.Experience.create(req.body, { fields: experienceFields })
  res.send(created)
  next()
}

async function updateExperience (req, res, next) {
  const id = parseInt(req.params.id)
  if (id) {
    const experience = await Database.Experience.findById(id)
    if (experience) {
      await experience.update(req.body, { fields: experienceFields })
      res.send(experience)
    } else {
      res.send(new NotFoundError('Experience not found'))
    }
  } else {
    res.send(new InvalidArgumentError('Experience id must be an int'))
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

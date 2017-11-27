import * as Database from '../database'
import { NotFoundError, InvalidArgumentError } from 'restify-errors'

async function eventByID (req, res, next) {
  const id = parseInt(req.params.id)
  if (id) {
    const event = await Database.Event.findById(id)
    if (event) {
      res.send(event)
    } else {
      res.send(new NotFoundError('Event not found'))
    }
  } else {
    res.send(new InvalidArgumentError('Event id must be an int'))
  }
  next()
}

async function updateEvents (req, res, next) {
  const id = parseInt(req.params.id)
  if (id) {
    const event = await Database.Event.findById(id)
    if (event) {
      await event.update(req.body)
      res.send(event)
    } else {
      res.send(new NotFoundError('Event not found'))
    }
  } else {
    res.send(new InvalidArgumentError('Event id must be an int'))
  }
  next()
}

async function tags (req, res, next) {
  const tags = await Database.EventTag.all()
  res.send(tags)
  next()
}

async function eventTagsByID (req, res, next) {
  const id = parseInt(req.params.id)
  if (id) {
    const eventTagsByID = await Database.EventTag.findById(id)
    if (eventTagsByID) {
      res.send(eventTagsByID)
    } else {
      res.send(new NotFoundError('Event tags not found'))
    }
  } else {
    res.send(new InvalidArgumentError('Event tag id must be an int'))
  }
  next()
}

async function events (req, res, next) {
  res.send(await Database.Event.all())
  next()
}

async function putEvents (req, res, next) {
  const created = await Database.Event.create(req.body)
  res.send(created)
  next()
}

export const gets = [
  {
    path: '/events/:id',
    handler: eventByID
  },
  {
    path: '/events',
    handler: events
  },
  {
    path: '/events/tags',
    handler: tags
  },
  {
    path: '/events/eventTagsByID',
    handler: eventTagsByID
  }
]

export const puts = [
  {
    path: 'events/putEvents',
    handler: putEvents
  },
  {
    path: 'events/:id',
    handler: updateEvents
  }
]

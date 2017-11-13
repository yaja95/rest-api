import * as Database from '../database'
import { functions } from '../database/data'
import { NotFoundError, InvalidArgumentError } from 'restify-errors'

async function blogByID (req, res, next) {
  const id = parseInt(req.params.id)
  if (id) {
    const blog = await Database.BlogEntry.findById(id)
    if (blog) {
      res.send(blog)
    } else {
      res.send(new NotFoundError('Blog not found'))
    }
  } else {
    res.send(new InvalidArgumentError('Blog id must be an int'))
  }
  next()
}

async function drafts (req, res, next) {
  const oid = req.user.oid
  const user = await Database.User.findById(oid)
  const posts = user.authoredBlogEntries
  res.send(posts)
  next()
}

async function authorOID (req, res, next) {
  const oid = functions.uuid.fromString(req.params.oid)
  const author = await Database.User.findById(oid)
  if (author) {
    res.send(await author.getAuthoredBlogEntries())
  } else {
    res.send(new NotFoundError('Author OID not found'))
  }
  next()
}

async function blogTags (req, res, next) {
  const blogTags = await Database.BlogTag.all()
  res.send(blogTags)
  next()
}

async function blogTagsByID (req, res, next) {
  const id = parseInt(req.params.id)
  if (id) {
    const blogTagsByID = await Database.BlogTag.findById(id)
    if (blogTagsByID) {
      res.send(blogTagsByID)
    } else {
      res.send(new NotFoundError('Blog tags not found'))
    }
  } else {
    res.send(new InvalidArgumentError('Blog tag id must be an int'))
  }
  next()
}

export const gets = [
  {
    path: '/blog/drafts',
    handler: drafts
  },
  {
    path: '/blog/author/:oid',
    handler: authorOID
  },
  {
    path: '/blog/tags',
    handler: blogTags
  },
  {
    path: '/blog/tags/:id',
    handler: blogTagsByID
  },
  {
    path: '/blog/:id',
    handler: blogByID
  }
]

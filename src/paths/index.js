import * as awards from './awards'
import * as blog from './blog'
import * as courses from './courses'
import * as debug from './debug'
import * as events from './events'
import * as experiences from './experiences'
import * as fileUpload from './file_upload'
import * as login from './login'
import * as users from './users'

/**
 * GET collection => Retrieve all resources in a collection
 *
 * GET resource => Retrieve a single resource
 */
export const gets = [
  ...awards.gets,
  ...blog.gets,
  ...courses.gets,
  ...debug.gets,
  ...events.gets,
  ...experiences.gets,
  ...login.gets,
  ...users.gets,
  {
    path: '/',
    handler (req, res, next) {
      res.send({})
      return next()
    }
  }
]

/**
 * POST collection => Create a new resource in a collection
 */
export const posts = [
  fileUpload.post,
  login.post
]

/**
 * PUT resource => Update a resource (replace)
 */
export const puts = [
  ...awards.puts,
  ...blog.puts,
  ...courses.puts,
  ...events.puts,
  ...experiences.puts
]

/**
 * PATCH resource => Update a resource (delta)
 */
export const patches = [
]

/**
 * DELETE resource => Delete a resource
 */
export const deletes = [
]

import * as debug from './debug'
import * as login from './login'

/**
 * GET collection => Retrieve all resources in a collection
 *
 * GET resource => Retrieve a single resource
 */
export const gets = [
  ...debug.gets,
  login.get,
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
]

/**
 * PUT resource => Update a resource (replace)
 */
export const puts = [
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

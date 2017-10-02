import BCrypt from 'bcrypt'
import Crypto from 'crypto'

const loadFactor = 10

/**
 * Compress a string to a size that BCrypt will not truncate using a cryptographically secure hash.
 * @see {@link https://security.stackexchange.com/q/61595/134378} for security of this approach
 * @param {string} s
 * @returns {string} a string <= 72 bytes in UTF-8
 */
function compress (s) {
  return Crypto.createHash('sha384').update(s).digest('base64')
}

/**
 * Create a new password hash using a cryptographically securepppppp one-way hashing algorithm.
 * @param {string} password a plaintext password of arbitrary length
 * @returns {Promise<string>} a 60 character hash
 */
export function hash (password) {
  return BCrypt.hash(compress(password), loadFactor)
}

/**
 * Verify a password against its hashed form.
 * @param {string} password
 * @param {string} hash the hash as output by {@link hash}
 * @returns {Promise<boolean>}
 */
export function verify (password, hash) {
  return BCrypt.compare(compress(password), hash)
}

export default {
  hash, verify
}

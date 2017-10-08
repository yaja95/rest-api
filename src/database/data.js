import UUID from 'uuid'

export const types = {
  BINARY: width => `BINARY${width}`,
  UUID: 'BINARY(16)',
  BCRYPT_HASH: 'CHAR(60) CHARSET ascii BINARY'
}

// See <https://mariadb.com/kb/en/library/guiduuid-performance/> for why we do this
// <https://dev.mysql.com/doc/refman/8.0/en/miscellaneous-functions.html#function_uuid-to-bin>
function mangle (uuid) {
  let buffer = Buffer.alloc(8)
  uuid.copy(buffer, 0, 0, 8)
  buffer.copy(uuid, 0, 6, 8)
  buffer.copy(uuid, 2, 4, 6)
  buffer.copy(uuid, 4, 0, 4)
  return uuid
}

export const functions = {
  uuid: {
    mangled: () => mangle(UUID.v1(null, Buffer.alloc(16))),
    random: () => UUID.v4(null, Buffer.alloc(16)),
    mangle,
    demangle (uuid) {
      let buffer = Buffer.alloc(8)
      uuid.copy(buffer, 0, 0, 8)
      buffer.copy(uuid, 0, 4, 8)
      buffer.copy(uuid, 4, 2, 4)
      buffer.copy(uuid, 6, 0, 2)
      return uuid
    },
    toString (uuid) {
      return [
        uuid.slice(0, 4).toString('hex'),
        uuid.slice(4, 6).toString('hex'),
        uuid.slice(6, 8).toString('hex'),
        uuid.slice(8, 10).toString('hex'),
        uuid.slice(10, 16).toString('hex')
      ].join('-')
    },
    fromString (uuid) {
      return Buffer.from(uuid.replace(/-/g, ''), 'hex')
    }
  }
}

export default { types, functions }

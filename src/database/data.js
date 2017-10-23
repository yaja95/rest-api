import UUID from 'uuid'

export const types = {
  BINARY: width => `BINARY(${width})`,
  UUID: 'BINARY(16)'
}

export const functions = {
  uuid: {
    random: () => UUID.v4(null, Buffer.alloc(16)),
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

import UUID from 'uuid'

export const types = {
  BINARY: width => `BINARY(${width})`,
  UUID: 'BINARY(16)'
}

export const functions = {
  uuid: {
    random: () => UUID.v4(null, Buffer.alloc(16)),
    toString: (uuid) => UUID.v4({random: uuid}),
    fromString: (uuid) => Buffer.from(uuid.replace(/-/g, ''), 'hex')
  }
}

export default { types, functions }

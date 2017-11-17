import uuid from 'uuid'

export default class UUID extends Buffer {
  constructor (s) {
    if (s === undefined) {
      super(16)
      uuid.v4(null, this)
    } else if (typeof s === 'string') {
      super(s.replace(/-/g, ''), 'hex')
    } else {
      super(s)
    }
  }

  toString () {
    return uuid.v4({random: this.buffer})
  }
}

export const type = 'BINARY(16)'
export const defaultValue = () => new UUID()
export const allowNull = false
export const primaryKey = true

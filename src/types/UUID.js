import uuid from 'uuid/v4'
import { DataTypes } from 'sequelize'

export default class UUID {
  constructor (s) {
    if (s === undefined) {
      this.buffer = Buffer.alloc(16)
      uuid(null, this.buffer)
    } else if (typeof s === 'string') {
      this.buffer = Buffer.from(s.replace(/-/g, ''), 'hex')
    } else {
      this.buffer = Buffer.from(s)
    }
  }

  toString () {
    return uuid({random: this.buffer})
  }

  toSql () {
    return this.buffer
  }
}

export class UUIDType extends DataTypes.ABSTRACT {
  constructor () {
    super()
    this.key = 'UUID'
  }

  toSql () {
    return 'BINARY(16)'
  }

  validate (value) {
    if (!(value instanceof UUID)) {
      throw new TypeError()
    }
    return true
  }

  _sanitize (value) {
    return UUID(value)
  }
}

export const type = 'BINARY(16)'
export const defaultValue = () => new UUID()
export const allowNull = false
export const primaryKey = true
export function toSql () {
  return this.buffer
}

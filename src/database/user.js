import Password from '../password'
import Data from './data'

export default (sequelize, DataTypes) => sequelize.define('user', {
  uuid: {
    type: Data.types.UUID,
    allowNull: false,
    // Use mangled form for higher effeciency index caching
    defaultValue: Data.functions.uuid.mangled,
    set (value) {
      this.setDataValue('uuid', Data.functions.uuid.mangle(value))
    },
    get () {
      return Data.functions.uuid.demangle(this.getDataValue('uuid'))
    },
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.VIRTUAL,
    allowNull: false,
    set (val) {
      this.setDataValue('password', val)
      this.passwordHash = '<WILL BE REPLACED>'
    }
  },
  passwordHash: {
    type: DataTypes.CHAR(60) + ' CHARSET ascii BINARY',
    allowNull: false
  },
  token: {
    type: Data.types.UUID,
    allowNull: false,
    // Use random version for less predictable tokens
    defaultValue: Data.functions.uuid.random
  },
  tokenExpiry: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  hooks: {
    async beforeCreate (model, options) {
      model.passwordHash = await Password.hash(model.password)
    }
  },
  instanceMethods: {
    async validatePassword (password) {
      return Password.verify(password, this.passwordHash)
    }
  }
})

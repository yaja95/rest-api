import Password from '../password'

export default (sequelize, DataTypes) => sequelize.define('user', {
  uuid: {
    type: DataTypes.CHAR(36) + ' CHARSET ascii BINARY',
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  username: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  password: {
    type: DataTypes.VIRTUAL,
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
    type: DataTypes.CHAR(36) + ' CHARSET ascii BINARY',
    allowNull: true,
    defaultValue: null
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

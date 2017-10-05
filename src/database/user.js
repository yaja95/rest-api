import Password from '../password'

export default (sequelize, DataTypes) => sequelize.define('user', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  password: {
    type: DataTypes.VIRTUAL,
    set (val) {
      this.setDataValue('password', val)
      this.passwordHash = '<WILL BE REPLACED>'
    }
  },
  passwordHash: {
    type: DataTypes.CHAR(60),
    allowNull: false
  },
  token: {
    type: DataTypes.CHAR(36),
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

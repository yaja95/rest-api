import Password from '../password'
import Sequelize from 'sequelize'

export default sequelize => sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  password: {
    type: Sequelize.VIRTUAL,
    set (val) {
      this.setDataValue('password', val)
      this.passwordHash = '<WILL BE REPLACED>'
    }
  },
  passwordHash: {
    type: Sequelize.CHAR(60),
    allowNull: false
  },
  token: {
    type: Sequelize.CHAR(36),
    allowNull: true,
    defaultValue: null
  },
  tokenExpiry: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  admin: {
    type: Sequelize.BOOLEAN,
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

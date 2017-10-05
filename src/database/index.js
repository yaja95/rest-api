import Sequelize from 'sequelize'
import { DB_PASSWORD } from '../secrets'
import Password from '../password'

const sequelize = new Sequelize({
  host: 'cs.furman.edu',
  username: 'cdurham',
  password: DB_PASSWORD,
  database: 'cdurham',
  dialect: 'mysql',
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci'
  },
  typeValidation: true,
  operatorsAliases: Sequelize.Op.Aliases
})

export async function init () {
  try {
    await sequelize.authenticate()
    console.log('Connection to database established successfully')
  } catch (err) {
    console.error('Unable to connet to database: ', err)
  }
}

// TODO: Figure out how these definitions can be nicely spread accross files

export const User = sequelize.define('user', {
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

User.sync({force: true}).then(() => {
  return User.create({
    username: 'test',
    password: 'test'
  })
})

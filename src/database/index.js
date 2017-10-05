import Sequelize from 'sequelize'
import { DB_PASSWORD } from '../secrets'

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
    await Promise.all([
      User.sync()
    ])
  } catch (err) {
    console.error('Unable to connet to database: ', err)
  }
}

export const User = sequelize.import('./user')

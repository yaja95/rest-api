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
  operatorsAliases: false
})

export const User = sequelize.import('./user')

export async function init () {
  try {
    await sequelize.sync()
    console.log('Connection to database established successfully')
  } catch (err) {
    console.error('Unable to connect to database: ', JSON.stringify(err, null, 2))
  }
}

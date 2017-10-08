import Sequelize from 'sequelize'
import { JAWSDB_MARIA_URL } from '../secrets'

const sequelize = new Sequelize(JAWSDB_MARIA_URL, {
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci'
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

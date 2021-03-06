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
export const Event = sequelize.import('./event')
export const EventTag = sequelize.import('./eventTag')
export const BlogEntry = sequelize.import('./blogEntry')
export const BlogTag = sequelize.import('./blogTag')
export const ProjectOpportunity = sequelize.import('./projectOpportunity')
export const ProjectTag = sequelize.import('./projectTag')
export const Course = sequelize.import('./course')
export const Experience = sequelize.import('./experience')
export const Award = sequelize.import('./award')
export const StudentFellow = sequelize.import('./studentFellow.js')
export const FacutlyFellow = sequelize.import('./facultyFellow.js')

Event.belongsToMany(EventTag, { through: 'events/eventTags' })
EventTag.belongsToMany(Event, { through: 'events/eventTags' })

BlogEntry.belongsTo(User, { as: 'author' })
User.hasMany(BlogEntry, { as: 'authoredBlogEntries', foreignKey: 'authorOid' })

BlogEntry.belongsToMany(BlogTag, { through: 'blogEntries/blogTags' })
BlogTag.belongsToMany(BlogEntry, { through: 'blogEntries/blogTags' })

ProjectOpportunity.belongsToMany(ProjectTag, { through: 'projectOpportunities/projectTags' })
ProjectTag.belongsToMany(ProjectOpportunity, { through: 'projectOpportunities/projectTags' })

Course.belongsTo(User, { as: 'suggester' })
User.hasMany(Course, { as: 'suggestedCourses', foreignKey: 'suggesterOid' })

Course.belongsToMany(User, { through: 'courseApprovers', as: 'approver' })
User.belongsToMany(Course, { through: 'courseApprovers', as: 'approvedCourse' })

Experience.belongsTo(User, { as: 'author' })
User.hasMany(Experience, { as: 'experiences', foreignKey: 'authorOid' })

export async function init () {
  try {
    await sequelize.sync()
    console.log('Connection to database established successfully')
  } catch (err) {
    console.error('Unable to connect to database: ', JSON.stringify(err, null, 2))
    throw err
  }
}

export function close () {
  sequelize.close()
}

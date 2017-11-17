import * as UUID from '../types/UUID'

export default (sequelize, DataTypes) => sequelize.define('user', {
  oid: UUID,
  displayName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isFaculty: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
})

import Data from './data'

export default (sequelize, DataTypes) => sequelize.define('user', {
  oid: {
    type: Data.types.UUID,
    allowNull: false,
    set (value) {
      this.setDataValue('oid', Data.functions.uuid.fromString(value))
    },
    get () {
      return Data.functions.uuid.toString(this.getDataValue('oid'))
    },
    primaryKey: true
  },
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

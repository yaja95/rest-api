export default (sequelize, DataTypes) => sequelize.define('course', {
  isReal: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  }
})

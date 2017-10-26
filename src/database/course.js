export default (sequelize, DataTypes) => sequelize.define('course', {
  isReal: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  }
})

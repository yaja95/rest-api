export default (sequelize, DataTypes) => sequelize.define('eventTag', {
  name: {
    type: DataTypes.STRING(32),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  }
})

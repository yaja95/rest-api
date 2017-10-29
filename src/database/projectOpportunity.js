export default (sequelize, DataTypes) => sequelize.define('projectOpportunity', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  applyAt: {
    type: DataTypes.STRING(2048),
    allowNull: true
  }
})

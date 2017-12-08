export default (sequelize, DataTypes) => sequelize.define('award', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  winner: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

export default (sequelize, DataTypes) => sequelize.define('studentFellow', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  application: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

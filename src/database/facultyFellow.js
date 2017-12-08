export default (sequelize, DataTypes) => sequelize.define('facultyFellow', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false
  },
  application: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

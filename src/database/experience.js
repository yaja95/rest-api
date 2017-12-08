export default (sequelize, DataTypes) => sequelize.define('experience', {
  company: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dateStart: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  dateEnd: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  }
})

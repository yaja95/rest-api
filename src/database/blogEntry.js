export default (sequelize, DataTypes) => sequelize.define('blogEntry', {
  contents: {
    type: DataTypes.TEXT('long'),
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  publishedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
})

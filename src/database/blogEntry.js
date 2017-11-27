export default (sequelize, DataTypes) => sequelize.define('blogEntry', {
  contents: {
    type: DataTypes.TEXT('long'),
    allowNull: false
  },
  disclaimer: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  hasDisclaimed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  isFinished: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  isApproved: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  publishedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
})

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
    allowNull: false
  },
  isFinished: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  isApproved: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  publishedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
})

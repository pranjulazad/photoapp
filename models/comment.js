'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Comment.belongsTo(models.user, {
        foreignKey: 'commentableId',
        constraints: false
      });
      Comment.belongsTo(models.post, {
        foreignKey: 'commentableId',
        constraints: false
      });
    }
  }
  Comment.init({
    text: DataTypes.STRING,
    commentableId: DataTypes.INTEGER,
    commentableType: DataTypes.STRING,
    userName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'comment',
    timestamps: true
  });
  return Comment;
};
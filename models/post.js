'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.user, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      })

      Post.hasMany(models.comment, {
        foreignKey: 'commentableId',
        constraints: false,
        scope: {
          commentableType: 'post'
        }
      })
    }
  }
  Post.init({
    imageUrl: DataTypes.STRING,
    caption: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'post',
    timestamps: true,
  });

  // Post.addHook('afterFind', (result) => {
  //   if (!Array.isArray(result)) result = [result];

  //   result.getComments
  // })

  return Post;
};
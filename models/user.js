'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.post, {
        foreignKey: 'userId'
      })



      User.hasMany(models.comment, {
        foreignKey: 'commentableId',
        constraints: false,
        scope: {
          commentableType: 'user'
        }
      })
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
    timestamps: true
  });
  return User;
};
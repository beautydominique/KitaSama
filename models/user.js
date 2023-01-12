'use strict';
const {
  Model
} = require('sequelize');

const { hash } = require('../helpers/bcyrpt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Post),
      User.hasOne(models.Profile)
    }
  }
  User.init({
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(user=>{
    user.password = hash(user.password)
  })
  return User;
};
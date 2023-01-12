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
      Post.belongsTo(models.User)
    }
  }
  Post.init({
    title:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: "Fill the title"
        },
        notEmpty:{
          msg:"Title cannot be empty"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: "Fill the description"
        },
        notEmpty:{
          msg:"Description cannot be empty"
        }
      }
    },
    donation: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notNull: {
          msg: "Fill the donation"
        },
        notEmpty:{
          msg:"Donation cannot be empty"
        }
      }
    },
    isClose:DataTypes.BOOLEAN,

    isUrgent: DataTypes.BOOLEAN,
    imageURL:  DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};
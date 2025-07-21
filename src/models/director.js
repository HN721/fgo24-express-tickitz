"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class director extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      director.belongsToMany(models.movies, {
        through: models.movies_director,
        foreignKey: "id_director",
        otherKey: "id_movie",
        as: "movies",
      });
    }
  }
  director.init(
    {
      fullname: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "director",
    }
  );
  return director;
};

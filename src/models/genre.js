"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class genre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      genre.belongsToMany(models.movies, {
        through: models.movies_genre,
        foreignKey: "id_genre",
        otherKey: "id_movie",
        as: "movies",
      });
    }
  }
  genre.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "genre",
    }
  );
  return genre;
};

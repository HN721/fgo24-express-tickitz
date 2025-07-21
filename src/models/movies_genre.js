"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class movies_genre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      movies_genre.belongsTo(models.movies, {
        foreignKey: "id_movie",
        as: "movie",
      });

      movies_genre.belongsTo(models.genre, {
        foreignKey: "id_genre",
        as: "genre",
      });
    }
  }
  movies_genre.init(
    {
      id_movie: DataTypes.INTEGER,
      id_genre: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "movies_genre",
    }
  );
  return movies_genre;
};

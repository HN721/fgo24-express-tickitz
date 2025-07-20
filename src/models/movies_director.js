"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class movies_director extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      movies_director.belongsTo(models.Movie, {
        foreignKey: "id_movie",
        as: "movie",
      });

      // Relasi ke Genre
      movies_director.belongsTo(models.director, {
        foreignKey: "id_director",
        as: "director",
      });
    }
  }
  movies_director.init(
    {
      id_movie: DataTypes.INTEGER,
      id_director: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "movies_director",
    }
  );
  return movies_director;
};

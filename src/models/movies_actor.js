"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class movies_actor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      movies_actor.belongsTo(models.movies, {
        foreignKey: "id_movie",
        as: "movie",
      });

      // Relasi ke Genre
      movies_actor.belongsTo(models.actors, {
        foreignKey: "id_actor",
        as: "actor",
      });
    }
  }
  movies_actor.init(
    {
      id_movie: DataTypes.INTEGER,
      id_actor: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "movies_actor",
    }
  );
  return movies_actor;
};

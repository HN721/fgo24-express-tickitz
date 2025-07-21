"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class movies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      movies.belongsToMany(models.genre, {
        through: models.movies_genre,
        foreignKey: "id_movie",
        otherKey: "id_genre",
        as: "genres",
      });
      movies.belongsToMany(models.actors, {
        through: models.movies_actor,
        foreignKey: "id_movie",
        otherKey: "id_actor",
        as: "actors",
      });
      movies.belongsToMany(models.director, {
        through: models.movies_director,
        foreignKey: "id_movie",
        otherKey: "id_director",
        as: "directors",
      });
      movies.hasMany(models.transaction, {
        foreignKey: "id_movies",
        as: "transactions",
      });
    }
  }
  movies.init(
    {
      title: DataTypes.STRING,
      synopsis: DataTypes.STRING,
      background: DataTypes.STRING,
      poster: DataTypes.STRING,
      duration: DataTypes.INTEGER,
      releaseDate: DataTypes.STRING,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "movies",
    }
  );
  return movies;
};

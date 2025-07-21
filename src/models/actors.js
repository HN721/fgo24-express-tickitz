"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class actors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      actors.belongsToMany(models.movies, {
        through: models.movies_actor,
        foreignKey: "id_actor",
        otherKey: "id_movie",
        as: "movies",
      });
    }
  }
  actors.init(
    {
      fullname: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "actors",
    }
  );
  return actors;
};

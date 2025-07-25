"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class cinema extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      cinema.hasMany(models.transaction, {
        foreignKey: "id_cinema",
        as: "transactions",
      });
    }
  }
  cinema.init(
    {
      name: DataTypes.STRING,
      logo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "cinema",
    }
  );
  return cinema;
};

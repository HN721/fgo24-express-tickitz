"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transaction.belongsTo(models.User, {
        foreignKey: "id_user",
        as: "user",
      });

      transaction.belongsTo(models.Movie, {
        foreignKey: "id_movie",
        as: "movie",
      });

      transaction.belongsTo(models.Cinema, {
        foreignKey: "id_cinema",
        as: "cinema",
      });

      transaction.belongsTo(models.Payment, {
        foreignKey: "id_payment",
        as: "payment",
      });
    }
  }
  transaction.init(
    {
      time: DataTypes.DATE,
      date_booking: DataTypes.DATEONLY,
      priceTotal: DataTypes.INTEGER,
      id_user: DataTypes.INTEGER,
      id_movie: DataTypes.INTEGER,
      id_cinema: DataTypes.INTEGER,
      id_payment: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "transaction",
    }
  );
  return transaction;
};

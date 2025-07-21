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

      transaction.belongsTo(models.movies, {
        foreignKey: "id_movie",
        as: "movie",
      });

      transaction.belongsTo(models.cinema, {
        foreignKey: "id_cinema",
        as: "cinema",
      });

      transaction.belongsTo(models.payment, {
        foreignKey: "id_payment",
        as: "payment",
      });
      transaction.hasMany(models.transaction_detail, {
        foreignKey: "id_transaction",
        as: "details",
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

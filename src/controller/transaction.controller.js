const {
  Transaction,
  TransactionDetail,
  payment,
  Cinema,
  Movie,
} = require("../models");

exports.createTrans = async (req, res) => {
  const t = await Transaction.sequelize.transaction();

  try {
    const {
      time,
      date_booking,
      price_total,
      id_movie,
      id_cinema,
      id_payment_method,
      seats,
    } = req.body;

    const id_user = req.user.id;

    if (
      !time ||
      !date_booking ||
      !price_total ||
      !id_movie ||
      !id_cinema ||
      !id_payment_method ||
      !seats ||
      seats.length === 0
    ) {
      return res
        .status(400)
        .json({ message: "Semua field dan seat wajib diisi" });
    }

    const newTransaction = await Transaction.create(
      {
        time,
        date_booking,
        price_total,
        id_user,
        id_movie,
        id_cinema,
        id_payment_method,
      },
      { transaction: t }
    );

    const detailData = seats.map((seat) => ({
      id_transaction: newTransaction.id,
      seat,
      status: "booked",
    }));

    await TransactionDetail.bulkCreate(detailData, { transaction: t });

    await t.commit();
    return res.status(201).json({
      message: "Transaksi dan detail berhasil dibuat",
      data: newTransaction,
    });
  } catch (error) {
    await t.rollback();
    console.error("Error create transaction:", error);
    return res.status(500).json({ message: "Gagal membuat transaksi" });
  }
};
exports.getTransactionByUserId = async (req, res) => {
  try {
    const id_user = req.user.id;

    const transactions = await Transaction.findAll({
      where: { id_user },
      include: [
        {
          model: TransactionDetail,
          as: "details",
          attributes: ["seat", "status"],
        },
        {
          model: Movie,
          as: "movie",
          attributes: ["title", "price", "poster"],
        },
        {
          model: Cinema,
          as: "cinema",
          attributes: ["name", "location"],
        },
        {
          model: payment,
          as: "paymentMethod",
          attributes: ["method_name"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      message: "Transaksi ditemukan",
      data: transactions,
    });
  } catch (error) {
    console.error("Error get transaction by user:", error);
    return res.status(500).json({ message: "Gagal mengambil transaksi" });
  }
};

const { Transaction, TransactionDetail } = require("../models");

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

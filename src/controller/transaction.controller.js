const { Transaction } = require("../models");

exports.createTrans = async (req, res) => {
  try {
    const {
      time,
      date_booking,
      price_total,
      id_movie,
      id_cinema,
      id_payment_method,
    } = req.body;
    const id = req.user.id;

    if (
      !time ||
      !date_booking ||
      !price_total ||
      !id_movie ||
      !id_cinema ||
      !id_payment_method
    ) {
      return res.status(400).json({ message: "Semua field wajib diisi" });
    }

    const newTransaction = await Transaction.create({
      time,
      date_booking,
      price_total,
      id_user: id,
      id_movie,
      id_cinema,
      id_payment_method,
    });

    return res.status(201).json({
      message: "Transaksi berhasil dibuat",
      data: newTransaction,
    });
  } catch (error) {
    console.error("Error create transaction:", error);
    return res.status(500).json({ message: "Gagal membuat transaksi" });
  }
};

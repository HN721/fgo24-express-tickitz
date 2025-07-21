const {
  Transaction,
  TransactionDetail,
  payment,
  Cinema,
  Movie,
} = require("../models");
const { constants: http } = require("http2");

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
      return res.status(http.HTTP_STATUS_BAD_REQUEST).json({
        message: "Semua field dan seat wajib diisi",
      });
    }

    const existing = await Transaction.findAll({
      where: {
        id_movie,
        id_cinema,
        date_booking,
        time,
      },
      include: [
        {
          model: TransactionDetail,
          as: "details",
          where: {
            seat: seats,
          },
        },
      ],
    });

    if (existing.length > 0) {
      const bookedSeats = existing.flatMap((trx) =>
        trx.details.map((d) => d.seat)
      );
      return res.status(http.HTTP_STATUS_BAD_REQUEST).json({
        message: `Kursi ${bookedSeats.join(
          ", "
        )} sudah dibooking untuk film, tanggal, dan jam tersebut`,
      });
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
    return res.status(http.HTTP_STATUS_CREATED).json({
      message: "Transaksi dan detail berhasil dibuat",
      data: newTransaction,
    });
  } catch (error) {
    await t.rollback();
    console.error("Error create transaction:", error);
    return res.status(http.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      message: "Gagal membuat transaksi",
      error: error.message,
    });
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

    return res.status(http.HTTP_STATUS_OK).json({
      message: "Transaksi ditemukan",
      data: transactions,
    });
  } catch (error) {
    console.error("Error get transaction by user:", error);
    return res.status(http.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      message: "Gagal mengambil transaksi",
      error: error.message,
    });
  }
};
exports.getAllTransaction = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
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
        {
          model: User,
          as: "user",
          attributes: ["id", "username", "email"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return res.status(http.HTTP_STATUS_OK).json({
      message: "Berhasil mengambil semua transaksi",
      data: transactions,
    });
  } catch (error) {
    console.error("Error getAllTransaction (admin):", error);
    return res.status(http.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      message: "Gagal mengambil data transaksi",
      error: error.message,
    });
  }
};

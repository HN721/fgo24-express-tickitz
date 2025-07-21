const transactionRoute = require("express").Router();
const transactionController = require("../controller/transaction.controller");
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");

transactionRoute.post("/", authMiddleware, transactionController.createTrans);
transactionRoute.get("/", transactionController.getTransactionByUserId);
transactionRoute.get(
  "/details",
  isAdmin,
  transactionController.getAllTransaction
);

module.exports = transactionRoute;

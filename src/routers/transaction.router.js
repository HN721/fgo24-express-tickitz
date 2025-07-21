const transactionRoute = require("express").Router();
const transactionController = require("../controller/transaction.controller");
const authMiddleware = require("../middleware/authMiddleware");
transactionRoute.post("/", authMiddleware, transactionController.createTrans);
transactionRoute.get("/", transactionController.getTransactionByUserId);
module.exports = transactionRoute;

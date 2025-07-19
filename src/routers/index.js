const router = require("express").Router();

router.use("/auth", require("./users.router"));

module.exports = router;

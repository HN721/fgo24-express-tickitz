const router = require("express").Router();

router.use("/auth", require("./users.router"));
router.use("/genre", require("./genre.router"));
router.use("/actor", require("./actor.router"));
router.use("/director", require("./director.router"));

module.exports = router;

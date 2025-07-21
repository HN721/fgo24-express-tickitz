const router = require("express").Router();

router.use("/auth", require("./users.router"));
router.use("/genre", require("./genre.router"));
router.use("/actor", require("./actor.router"));
router.use("/director", require("./director.router"));
router.use("/movie", require("./movie.router"));
router.use("/cinema", require("./cinema.router"));

module.exports = router;

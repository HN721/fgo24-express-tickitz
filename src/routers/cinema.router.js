const cinemaRoute = require("express").Router();
const cinemaController = require("../controller/cinema.controller");
const isAdmin = require("../middleware/adminMiddleware");

cinemaRoute.post("/", isAdmin, cinemaController.createCinema);
cinemaRoute.get("/", cinemaController.getCinema);
module.exports = cinemaRoute;

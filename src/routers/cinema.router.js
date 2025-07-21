const cinemaRoute = require("express").Router();
const cinemaController = require("../controller/cinema.controller");
cinemaRoute.post("/", cinemaController.createCinema);
cinemaRoute.get("/", cinemaController.getCinema);

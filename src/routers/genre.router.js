const genreRoute = require("express").Router();
const genreController = require("../controller/genre.controller");
const isAdmin = require("../middleware/adminMiddleware");

genreRoute.post("/", isAdmin, genreController.createGenre);
genreRoute.get("/", genreController.getGenre);
module.exports = genreRoute;

const genreRoute = require("express").Router();
const genreController = require("../controller/genre.controller");
genreRoute.post("/", genreController.createGenre);
genreRoute.get("/", genreController.getGenre);

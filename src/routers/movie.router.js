const movieRoute = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");
const multer = require("multer");
const path = require("node:path");
const { v4: uuid } = require("uuid");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join("uploads", "movie-picture"));
  },
  filename: function (req, file, cb) {
    const filename = file.originalname;
    const ext = filename.split(".")[1];
    const savedFile = `${uuid()}.${ext}`;
    cb(null, savedFile);
  },
});
const movieController = require("../controller/movie.controller");
const moviePicture = multer({ storage });

movieRoute.post(
  "/",
  authMiddleware,
  isAdmin,
  moviePicture.single("picture"),
  movieController.createMovie
);
movieRoute.get("/", movieController.getAllMovies);
movieRoute.get("/coming-soon", movieController.getComingSoonMovies);
movieRoute.get("/now-showing", movieController.getNowShowingMovies);

module.exports = movieRoute;

const directorRoute = require("express").Router();
const directorController = require("../controller/director.controller");
const isAdmin = require("../middleware/adminMiddleware");

directorRoute.post("/", isAdmin, directorController.createDicrector);
directorRoute.get("/", directorController.getDirector);
module.exports = directorRoute;

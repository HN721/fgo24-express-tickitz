const directorRoute = require("express").Router();
const directorController = require("../controller/director.controller");
directorRoute.post("/", directorController.createDicrector);
directorRoute.get("/", directorController.getDirector);

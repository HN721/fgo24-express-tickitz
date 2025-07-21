const actorsRoute = require("express").Router();
const actorController = require("../controller/actor.controller");
actorsRoute.post("/", actorController.createActor);
actorsRoute.get("/", actorController.getActor);
module.exports = actorsRoute;

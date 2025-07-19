const userRoute = require("express").Router();
// const multer = require("multer");
// const path = require("node:path");
// const { v4: uuid } = require("uuid");
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join("uploads", "profile-picture"));
//   },
//   filename: function (req, file, cb) {
//     const filename = file.originalname;
//     const ext = filename.split(".")[1];
//     const savedFile = `${uuid()}.${ext}`;
//     cb(null, savedFile);
//   },
// });
const userController = require("../controller/users.controller");

userRoute.post(
  "/register",
  // profilePicture.single("picture"),
  userController.regsiter
);
userRoute.post(
  "/login",
  // profilePicture.single("picture"),
  userController.login
);
module.exports = userRoute;

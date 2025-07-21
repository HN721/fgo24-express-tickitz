const userRoute = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("node:path");
const { v4: uuid } = require("uuid");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join("uploads", "profile-picture"));
  },
  filename: function (req, file, cb) {
    const filename = file.originalname;
    const ext = filename.split(".")[1];
    const savedFile = `${uuid()}.${ext}`;
    cb(null, savedFile);
  },
});
const userController = require("../controller/users.controller");
const profilePicture = multer({ storage });

userRoute.post("/register", userController.regsiter);
userRoute.post("/login", userController.login);
userRoute.post("/forgot", userController.forgotPassword);

userRoute.put(
  "/user/update",
  authMiddleware,
  profilePicture.single("picture"),
  userController.updateUser
);
module.exports = userRoute;

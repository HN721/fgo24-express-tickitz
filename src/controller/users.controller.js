const jwt = require("jsonwebtoken");
const { User, Profile } = require("../models");
const bcrypt = require("bcrypt");
exports.regsiter = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email Sudah Ada" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);
    const user = await User.create({
      email,
      password: hashPass,
      role: "user",
      username,
    });

    await Profile.create({
      id_user: user.id,
      fullname: username,
      phone_number: "",
      profile_image: "",
    });
    return res.status(201).json(user);
  } catch (error) {
    console.error("Error in register:", error.message);
    res.status(500).json({ message: error.message });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email Tidak Ada" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password Salah" });
    }
    const token = jwt.sign({ id: user._id }, "hosea123", { expiresIn: "1h" });
    return res.status(200).json({
      success: true,
      message: "Login successful",
      role: user.role,
      nama: user.username,
      token,
      id: user.id,
      email: user.email,
    });
  } catch (err) {
    console.log(err);
  }
};

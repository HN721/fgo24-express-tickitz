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
exports.updateUser = async (req, res) => {
  try {
    const { username, email, password, fullname, phone_number } = req.body;
    const id = req.user.id; // ambil dari token di middleware

    const profile_image = req?.file?.filename || null;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    let newPassword = user.password;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      newPassword = await bcrypt.hash(password, salt);
    }

    await User.update(
      {
        username: username || user.username,
        email: email || user.email,
        password: newPassword,
      },
      { where: { id } }
    );

    await Profile.update(
      {
        fullname: fullname || username,
        phone_number,
        profile_image: profile_image || undefined,
      },
      { where: { id_user: id } }
    );

    return res
      .status(200)
      .json({ message: "User & profile berhasil diupdate" });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Update gagal" });
  }
};

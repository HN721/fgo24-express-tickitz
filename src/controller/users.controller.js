const jwt = require("jsonwebtoken");
const { User, Profile } = require("../models");
const bcrypt = require("bcrypt");
const redis = require("../utils/redis");
const { sendEmailRegister, sendOtp } = require("../utils/sendEmail");
const { constants: http } = require("http2");

exports.regsiter = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res.status(http.HTTP_STATUS_BAD_REQUEST).json({
        message: "All fields are required",
      });
    }

    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(http.HTTP_STATUS_BAD_REQUEST).json({
        message: "Email sudah terdaftar",
      });
    }

    const hashPass = await bcrypt.hash(password, 10);
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

    await sendEmailRegister(email);

    return res.status(http.HTTP_STATUS_CREATED).json({
      success: true,
      message: "Success register",
      result: user,
    });
  } catch (error) {
    console.error("Error in register:", error.message);
    return res.status(http.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(http.HTTP_STATUS_BAD_REQUEST).json({
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(http.HTTP_STATUS_NOT_FOUND).json({
        message: "Email tidak ditemukan",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(http.HTTP_STATUS_UNAUTHORIZED).json({
        message: "Password salah",
      });
    }

    const token = jwt.sign({ id: user.id }, "hosea123", { expiresIn: "1h" });

    return res.status(http.HTTP_STATUS_OK).json({
      success: true,
      message: "Login berhasil",
      role: user.role,
      nama: user.username,
      token,
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(http.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { username, email, password, fullname, phone_number } = req.body;
    const id = req.user.id;
    const profile_image = req?.file?.filename || null;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(http.HTTP_STATUS_NOT_FOUND).json({
        message: "User tidak ditemukan",
      });
    }

    let newPassword = user.password;
    if (password) {
      newPassword = await bcrypt.hash(password, 10);
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

    return res.status(http.HTTP_STATUS_OK).json({
      message: "User & profile berhasil diupdate",
    });
  } catch (error) {
    console.error("Error updating user:", error.message);
    return res.status(http.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      message: "Gagal update user",
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(http.HTTP_STATUS_NOT_FOUND).json({
        message: "Email tidak ditemukan",
      });
    }

    await sendOtp(email);

    return res.status(http.HTTP_STATUS_OK).json({
      success: true,
      message: `Kode OTP telah dikirim ke ${email}`,
    });
  } catch (error) {
    console.error("Forgot password error:", error.message);
    return res.status(http.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      message: "Gagal mengirim OTP",
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, newPassword, otp } = req.body;

    if (!email || !newPassword || !otp) {
      return res.status(http.HTTP_STATUS_BAD_REQUEST).json({
        message: "Email, OTP, dan password baru wajib diisi",
      });
    }

    const savedOtp = await redis.get(`otp:${email}`);
    if (!savedOtp || savedOtp !== otp) {
      return res.status(http.HTTP_STATUS_BAD_REQUEST).json({
        message: "OTP tidak valid atau sudah kedaluwarsa",
      });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(http.HTTP_STATUS_NOT_FOUND).json({
        message: "Pengguna tidak ditemukan",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashedPassword });

    await redis.del(`otp:${email}`);

    return res.status(http.HTTP_STATUS_OK).json({
      message: "Password berhasil direset",
    });
  } catch (error) {
    console.error("Reset password error:", error.message);
    return res.status(http.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      message: "Gagal reset password",
    });
  }
};

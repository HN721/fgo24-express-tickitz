const nodemailer = require("nodemailer");
const emails = process.env.GMAIL;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emails,
    pass: process.env.PW_EMAIL,
  },
});

async function sendEmailRegister(email) {
  try {
    const mailOptions = {
      from: `"Movxtar App" <${emails}>`,
      to: email,
      subject: "Terima Kasih Telah Mendaftar 🎬",
      html: `
        <h2>Halo!</h2>
        <p>Terima kasih telah mendaftar di aplikasi Movxtar.</p>
        <p>Selamat menikmati layanan kami.</p>
        <br>
        <small>Pesan ini dikirim otomatis oleh sistem.</small>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("📧 Email terkirim:", info.messageId);
  } catch (error) {
    console.error("❌ Gagal mengirim email:", error);
  }
}

async function sendOtp(email) {
  try {
    const otp = Math.floor(100000 + Math.random() * 900000);

    const mailOptions = {
      from: `"Movxtar OTP" <${emails}>`,
      to: email,
      subject: "Kode OTP Anda ",
      html: `
        <h2>Verifikasi Email Anda</h2>
        <p>Gunakan kode OTP berikut untuk verifikasi akun Anda:</p>
        <h1 style="letter-spacing: 4px;">${otp}</h1>
        <p>Kode ini hanya berlaku selama 5 menit.</p>
        <br>
        <small>Jangan bagikan kode ini ke siapapun.</small>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("📧 OTP terkirim:", info.messageId);

    return otp;
  } catch (error) {
    console.error("❌ Gagal mengirim OTP:", error);
  }
}

module.exports = { sendEmailRegister, sendOtp };

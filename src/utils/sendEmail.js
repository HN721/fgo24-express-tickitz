const nodemailer = require("nodemailer");
const emails = process.env.GMAIL;
async function sendEmailRegister(email) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emails,
        pass: process.env.PW_EMAIL,
      },
    });

    const mailOptions = {
      from: `"Movxtar App" ${email}`,
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

module.exports = { sendEmailRegister };

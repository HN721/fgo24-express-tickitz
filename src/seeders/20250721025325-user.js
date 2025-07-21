"use strict";
const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("password123", 10);

    await queryInterface.bulkInsert("Users", [
      {
        username: "hosea",
        email: "hosea@example.com",
        password: hashedPassword,
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "admin",
        email: "admin@example.com",
        password: hashedPassword,
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    //  Ambil ID user berdasarkan email
    const users = await queryInterface.sequelize.query(
      `SELECT id, email FROM "Users" WHERE email IN (:emails);`,
      {
        type: Sequelize.QueryTypes.SELECT,
        replacements: { emails: ["hosea@example.com", "admin@example.com"] },
      }
    );

    const hoseaUser = users.find((u) => u.email === "hosea@example.com");
    const adminUser = users.find((u) => u.email === "admin@example.com");

    // Insert profiles dengan id_user dari hasil query
    await queryInterface.bulkInsert("Profiles", [
      {
        id_user: hoseaUser.id,
        fullname: "Hosea Simorangkir",
        phone_number: "08123456789",
        profile_image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_user: adminUser.id,
        fullname: "Admin Tiket",
        phone_number: "08987654321",
        profile_image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Profiles", null, {});
    await queryInterface.bulkDelete("Users", {
      email: ["hosea@example.com", "admin@example.com"],
    });
  },
};

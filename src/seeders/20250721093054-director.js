"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   fullname: 'John Doe',
     *   isBetaMember: false
     * }], {});
     *
     */
    await queryInterface.bulkInsert("directors", [
      {
        fullname: "Christopher Nolan",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullname: "Steven Spielberg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullname: "Quentin Tarantino",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullname: "James Cameron",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullname: "Greta Gerwig",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("directors", null, {});
  },
};

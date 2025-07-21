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
    await queryInterface.bulkInsert("Directors", [
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
        name: "Quentin Tarantino",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "James Cameron",
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
  },
};

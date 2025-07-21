"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */ await queryInterface.bulkInsert("genres", [
      {
        name: "Horor",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Adventure",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Action",
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
    await queryInterface.bulkDelete("genres", null, {});
  },
};

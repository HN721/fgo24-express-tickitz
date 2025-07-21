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
     */ await queryInterface.bulkInsert("actors", [
      {
        fullname: "Robert Downey Jr.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullname: "Scarlett Johansson",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullname: "Chris Evans",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullname: "Zendaya",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullname: "Tom Holland",
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
    await queryInterface.bulkDelete("actors", null, {});
  },
};

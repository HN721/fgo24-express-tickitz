"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("movies_actors", {
      fields: ["id_movie"],
      type: "foreign key",
      name: "fk_movies_actors_movie",
      references: {
        table: "movies",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    await queryInterface.addConstraint("movies_actors", {
      fields: ["id_actor"],
      type: "foreign key",
      name: "fk_movies_actors_actor",
      references: {
        table: "actors",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "movies_actors",
      "fk_movies_actors_movie"
    );
    await queryInterface.removeConstraint(
      "movies_actors",
      "fk_movies_actors_actor"
    );
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};

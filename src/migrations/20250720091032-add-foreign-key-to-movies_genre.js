"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("movies_genres", {
      fields: ["id_movie"],
      type: "foreign key",
      name: "fk_movies_genres_moviev2", // optional, biar nama constraint-nya rapi
      references: {
        table: "movies",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    await queryInterface.addConstraint("movies_genres", {
      fields: ["id_genre"],
      type: "foreign key",
      name: "fk_movies_genres_genrev2",
      references: {
        table: "genres",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "movies_genres",
      "fk_movies_genres_moviev2"
    );
    await queryInterface.removeConstraint(
      "movies_genres",
      "fk_movies_genres_genrev2"
    );
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};

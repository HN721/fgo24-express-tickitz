"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("movies_genres", {
      fields: ["id_movie"],
      type: "foreign key",
      name: "fk_movies_genres_movie",
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
      name: "fk_movies_genres_genre",
      references: {
        table: "genres",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "movies_genres",
      "fk_movies_genres_movie"
    );
    await queryInterface.removeConstraint(
      "movies_genres",
      "fk_movies_genres_genre"
    );
  },
};

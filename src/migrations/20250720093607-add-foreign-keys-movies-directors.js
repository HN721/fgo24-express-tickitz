"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("movies_directors", {
      fields: ["id_movie"],
      type: "foreign key",
      name: "fk_movies_directors_movie",
      references: {
        table: "movies",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    await queryInterface.addConstraint("movies_directors", {
      fields: ["id_director"],
      type: "foreign key",
      name: "fk_movies_directors_director",
      references: {
        table: "directors",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "movies_directors",
      "fk_movies_directors_movie"
    );
    await queryInterface.removeConstraint(
      "movies_directors",
      "fk_movies_directors_director"
    );
  },
};

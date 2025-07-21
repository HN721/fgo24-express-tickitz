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
     */
    const [genres, directors, actors] = await Promise.all([
      queryInterface.sequelize.query(`SELECT id FROM "genres"`, {
        type: Sequelize.QueryTypes.SELECT,
      }),
      queryInterface.sequelize.query(`SELECT id FROM "directors"`, {
        type: Sequelize.QueryTypes.SELECT,
      }),
      queryInterface.sequelize.query(`SELECT id FROM "actors"`, {
        type: Sequelize.QueryTypes.SELECT,
      }),
    ]);

    const movies = [
      {
        title: "Inception",
        synopsis: "A thief who steals corporate secrets through dream-sharing.",
        duration: 148,
        releaseDate: new Date("2010-07-16"),
        price: 45000,
        poster: "inception.jpg",
        background: "inception-bg.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Avatar 2",
        synopsis: "Jake Sully and Ney'tiri live with their family on Pandora.",
        duration: 190,
        releaseDate: new Date("2025-12-18"),
        price: 50000,
        poster: "avatar2.jpg",
        background: "avatar2-bg.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("movies", movies, { returning: true });

    const movieRecords = await queryInterface.sequelize.query(
      `SELECT id FROM "movies"`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const movieGenres = [
      {
        id_movie: movieRecords[0].id,
        id_genre: genres[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_movie: movieRecords[1].id,
        id_genre: genres[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const movieDirectors = [
      {
        id_movie: movieRecords[0].id,
        id_director: directors[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_movie: movieRecords[1].id,
        id_director: directors[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const movieActors = [
      {
        id_movie: movieRecords[0].id,
        id_actor: actors[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_movie: movieRecords[1].id,
        id_actor: actors[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("movies_genres", movieGenres);
    await queryInterface.bulkInsert("movies_directors", movieDirectors);
    await queryInterface.bulkInsert("movies_actors", movieActors);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("movies_genres", null, {});
    await queryInterface.bulkDelete("movies_directors", null, {});
    await queryInterface.bulkDelete("movies_actors", null, {});
    await queryInterface.bulkDelete("movies", null, {});
  },
};

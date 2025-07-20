const { Movie, Genre, Director, Actor } = require("../models");

exports.createMovie = async (req, res) => {
  try {
    const {
      title,
      synopsis,
      duration,
      releaseDate,
      price,
      genres,
      directors,
      actors,
    } = req.body;

    const poster = req.files?.filename || null;
    const background = req.files?.filename || null;

    const newMovie = await Movie.create({
      title,
      synopsis,
      duration,
      releaseDate,
      price,
      poster,
      background,
    });

    if (genres && genres.length > 0) {
      await newMovie.setGenres(genres);
    }

    if (directors && directors.length > 0) {
      await newMovie.setDirectors(directors);
    }

    if (actors && actors.length > 0) {
      await newMovie.setActors(actors);
    }

    return res.status(201).json({
      message: "Movie created successfully",
      data: newMovie,
    });
  } catch (error) {
    console.error("Error creating movie:", error);
    return res.status(500).json({ error: "Failed to create movie" });
  }
};
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.findAll({
      include: [
        {
          model: Genre,
          as: "genres",
          through: { attributes: [] },
        },
        {
          model: Director,
          as: "directors",
          through: { attributes: [] },
        },
        {
          model: Actor,
          as: "actors",
          through: { attributes: [] },
        },
      ],
      order: [["releaseDate", "DESC"]],
    });

    return res.status(200).json({
      message: "All movies retrieved",
      data: movies,
    });
  } catch (error) {
    console.error("Error getting all movies:", error);
    return res.status(500).json({ error: "Failed to get movies" });
  }
};
exports.getComingSoonMovies = async (req, res) => {
  try {
    const today = new Date();

    const comingSoon = await Movie.findAll({
      where: {
        releaseDate: {
          [require("sequelize").Op.gt]: today,
        },
      },
      include: [
        {
          model: Genre,
          as: "genres",
          through: { attributes: [] },
        },
        {
          model: Director,
          as: "directors",
          through: { attributes: [] },
        },
        {
          model: Actor,
          as: "actors",
          through: { attributes: [] },
        },
      ],
      order: [["releaseDate", "ASC"]],
    });

    return res.status(200).json({
      message: "Coming soon movies retrieved",
      data: comingSoon,
    });
  } catch (error) {
    console.error("Error getting coming soon movies:", error);
    return res.status(500).json({ error: "Failed to get coming soon movies" });
  }
};

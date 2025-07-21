const { Movie, Genre, Director, Actor } = require("../models");
const redis = require("../utils/redis");
const { Op } = require("sequelize");
const { constants: http } = require("http2");

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

    await redis.del("all_movies");
    await redis.del("coming_soon_movies");

    return res.status(201).json({
      message: "Movie created successfully",
      data: newMovie,
    });
  } catch (error) {
    console.error("Error creating movie:", error);
    return res
      .status(http.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to create movie" });
  }
};

exports.getAllMovies = async (req, res) => {
  try {
    const search = req.query.search?.toLowerCase() || "";
    const genreId = req.query.genre || null;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    const cacheKey = `movies:search=${search}&genre=${genreId}&page=${page}&limit=${limit}`;
    const cached = await redis.get(cacheKey);
    if (cached) {
      console.log("📦 getAllMovies from Redis:", cacheKey);
      return res.status(http.HTTP_STATUS_OK).json({
        message: "Movies retrieved (cached)",
        ...JSON.parse(cached),
      });
    }

    const whereClause = search
      ? {
          title: {
            [Op.iLike]: `%${search}%`,
          },
        }
      : {};

    const genreInclude = {
      model: Genre,
      as: "genres",
      through: { attributes: [] },
    };

    if (genreId) {
      genreInclude.where = { id: genreId };
    }

    // Total data (untuk pagination)
    const totalData = await Movie.count({
      where: whereClause,
      include: genreId ? [genreInclude] : [],
      distinct: true,
    });

    const totalPages = Math.ceil(totalData / limit);

    const movies = await Movie.findAll({
      where: whereClause,
      include: [
        genreInclude,
        { model: Director, as: "directors", through: { attributes: [] } },
        { model: Actor, as: "actors", through: { attributes: [] } },
      ],
      order: [["releaseDate", "DESC"]],
      offset,
      limit,
      distinct: true,
    });

    const response = {
      message: "Movies retrieved",
      page,
      limit,
      totalData,
      totalPages,
      data: movies,
    };

    //  Simpan ke Redis cache (5 menit)
    await redis.set(cacheKey, JSON.stringify(response), "EX", 300);

    return res.status(http.HTTP_STATUS_OK).json(response);
  } catch (error) {
    console.error("Error getting all movies:", error);
    return res
      .status(http.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to get movies" });
  }
};

exports.getComingSoonMovies = async (req, res) => {
  try {
    const cached = await redis.get("coming_soon_movies");
    if (cached) {
      console.log("getComingSoonMovies: from Redis");
      return res.status(http.HTTP_STATUS_OK).json({
        message: "Coming soon movies retrieved (cached)",
        data: JSON.parse(cached),
      });
    }

    const today = new Date();

    const comingSoon = await Movie.findAll({
      where: {
        releaseDate: { [Op.gt]: today },
      },
      include: [
        { model: Genre, as: "genres", through: { attributes: [] } },
        { model: Director, as: "directors", through: { attributes: [] } },
        { model: Actor, as: "actors", through: { attributes: [] } },
      ],
      order: [["releaseDate", "ASC"]],
    });

    await redis.set(
      "coming_soon_movies",
      JSON.stringify(comingSoon),
      "EX",
      300
    );

    return res.status(http.HTTP_STATUS_OK).json({
      message: "Coming soon movies retrieved",
      data: comingSoon,
    });
  } catch (error) {
    console.error("Error getting coming soon movies:", error);
    return res
      .status(http.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to get coming soon movies" });
  }
};
exports.getNowShowingMovies = async (req, res) => {
  try {
    const cached = await redis.get("now_showing_movies");
    if (cached) {
      console.log("getNowShowingMovies: from Redis");
      return res.status(http.HTTP_STATUS_OK).json({
        message: "Now showing movies retrieved (cached)",
        data: JSON.parse(cached),
      });
    }

    const today = new Date();

    const nowShowing = await Movie.findAll({
      where: {
        releaseDate: {
          [Op.lte]: today,
        },
      },
      include: [
        { model: Genre, as: "genres", through: { attributes: [] } },
        { model: Director, as: "directors", through: { attributes: [] } },
        { model: Actor, as: "actors", through: { attributes: [] } },
      ],
      order: [["releaseDate", "DESC"]],
    });

    await redis.set(
      "now_showing_movies",
      JSON.stringify(nowShowing),
      "EX",
      300
    );

    return res.status(http.HTTP_STATUS_OK).json({
      message: "Now showing movies retrieved",
      data: nowShowing,
    });
  } catch (error) {
    console.error("Error getting now showing movies:", error);
    return res
      .status(http.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to get now showing movies" });
  }
};
exports.updateMovies = async (req, res) => {
  try {
    const { id } = req.params;
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
    const poster = req.files?.poster?.[0]?.filename || null;
    const background = req.files?.background?.[0]?.filename || null;

    const movie = await Movie.findByPk(id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    await movie.update({
      title: title || movie.title,
      synopsis: synopsis || movie.synopsis,
      duration: duration || movie.duration,
      releaseDate: releaseDate || movie.releaseDate,
      price: price || movie.price,
      poster: poster || movie.poster,
      background: background || movie.background,
    });

    if (genres) await movie.setGenres(genres);
    if (directors) await movie.setDirectors(directors);
    if (actors) await movie.setActors(actors);

    await redis.del("all_movies");
    await redis.del("coming_soon_movies");
    await redis.del("now_showing_movies");

    return res
      .status(http.HTTP_STATUS_OK)
      .json({ message: "Movie updated successfully", data: movie });
  } catch (error) {
    console.error("Error updating movie:", error);
    return res
      .status(http.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to update movie" });
  }
};
exports.deleteMovies = async (req, res) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findByPk(id);
    if (!movie) {
      return res.status(404).json({ message: "Movie tidak ditemukan" });
    }

    await movie.destroy();

    await redis.del("all_movies");
    await redis.del("coming_soon_movies");
    await redis.del("now_showing_movies");

    return res
      .status(http.HTTP_STATUS_OK)
      .json({ message: "Movie berhasil dihapus" });
  } catch (error) {
    console.error("Error deleting movie:", error);
    return res
      .status(http.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json({ error: "Gagal menghapus movie" });
  }
};

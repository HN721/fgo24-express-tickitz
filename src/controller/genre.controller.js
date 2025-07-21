const { Genre } = require("../models");
const { constants: http } = require("http2");

exports.createGenre = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(http.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "Name cannot be empty",
      });
    }

    const results = await Genre.create({ name });

    return res.status(http.HTTP_STATUS_CREATED).json({
      success: true,
      message: "Successfully created genre",
      result: results,
    });
  } catch (error) {
    console.error("Error in createGenre:", error.message);
    return res.status(http.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to create genre",
      error: error.message,
    });
  }
};

exports.getGenre = async (req, res) => {
  try {
    const results = await Genre.findAll();

    return res.status(http.HTTP_STATUS_OK).json({
      success: true,
      message: "Successfully fetched all genres",
      result: results,
    });
  } catch (error) {
    console.error("Error in getGenre:", error.message);
    return res.status(http.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to fetch genres",
      error: error.message,
    });
  }
};

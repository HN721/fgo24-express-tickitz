const { constants: http } = require("http2");
const { Cinema } = require("../models");

exports.createCinema = async (req, res) => {
  try {
    const { name, logo } = req.body;

    if (!name) {
      return res.status(http.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "Cinema name is required",
      });
    }

    const results = await Cinema.create({ name, logo });

    return res.status(http.HTTP_STATUS_CREATED).json({
      success: true,
      message: "Successfully created cinema",
      result: results,
    });
  } catch (error) {
    console.error("Error in createCinema:", error.message);
    return res.status(http.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getCinema = async (req, res) => {
  try {
    const results = await Cinema.findAll();

    return res.status(http.HTTP_STATUS_OK).json({
      success: true,
      message: "Successfully fetched all cinemas",
      result: results,
    });
  } catch (error) {
    console.error("Error in getCinema:", error.message);
    return res.status(http.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

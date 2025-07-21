const { Director } = require("../models");
const { constants: http } = require("http2");

exports.createDirector = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(http.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "Name cannot be empty",
      });
    }

    const results = await Director.create({ name });

    return res.status(http.HTTP_STATUS_CREATED).json({
      success: true,
      message: "Successfully created director",
      result: results,
    });
  } catch (error) {
    console.error("Error in createDirector:", error.message);
    return res.status(http.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to create director",
      error: error.message,
    });
  }
};

exports.getDirector = async (req, res) => {
  try {
    const results = await Director.findAll();

    return res.status(http.HTTP_STATUS_OK).json({
      success: true,
      message: "Successfully fetched all directors",
      result: results,
    });
  } catch (error) {
    console.error("Error in getDirector:", error.message);
    return res.status(http.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to fetch directors",
      error: error.message,
    });
  }
};

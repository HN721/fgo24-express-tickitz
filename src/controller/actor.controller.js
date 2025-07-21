const { Actor } = require("../models");
const { constants: http } = require("http2");

exports.createActor = async (req, res) => {
  try {
    const { fullname } = req.body;

    if (!fullname) {
      return res.status(http.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "Fullname cannot be empty",
      });
    }

    const results = await Actor.create({ fullname });

    return res.status(http.HTTP_STATUS_CREATED).json({
      success: true,
      message: "Successfully created actor",
      result: results,
    });
  } catch (error) {
    console.error("Error in createActor:", error.message);
    return res.status(http.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to create actor",
      error: error.message,
    });
  }
};

exports.getActor = async (req, res) => {
  try {
    const results = await Actor.findAll();

    return res.status(http.HTTP_STATUS_OK).json({
      success: true,
      message: "Successfully fetched all actors",
      result: results,
    });
  } catch (error) {
    console.error("Error in getActor:", error.message);
    return res.status(http.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to fetch actors",
      error: error.message,
    });
  }
};

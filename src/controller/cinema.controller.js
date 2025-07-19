const { Cinema } = require("../models");
exports.createCinema = async (req, res) => {
  try {
    const { name, logo } = req.body;
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "fullname cant be Empty",
        error: error.message,
      });
    }
    const results = await Cinema.create(name, logo);
    if (!results) {
      return res.status(400).json({
        success: false,
        message: "Error Cant Insert Data",
        error: error.message,
      });
    }
    return res.status(201).json({
      success: true,
      message: "Successfully Create Cinema",
      result: results,
    });
  } catch (error) {
    console.error("Error in create genre:", error.message);
    return res.status(500).json({ message: error.message });
  }
};
exports.getCinema = async (req, res) => {
  const results = await Cinema.findAll();
  return res.status(201).json({
    success: true,
    message: "Success fully Get All Actor",
    result: results,
  });
};

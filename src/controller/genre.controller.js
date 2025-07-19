const { Genre } = require("../models");
exports.createGenre = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name cant be Empty",
        error: error.message,
      });
    }
    const results = await Genre.create(name);
    if (!results) {
      return res.status(400).json({
        success: false,
        message: "Error Cant Insert Data",
        error: error.message,
      });
    }
    return res.status(201).json({
      success: true,
      message: "Successfully Create Genre",
      result: results,
    });
  } catch (error) {
    console.error("Error in create genre:", error.message);
    return res.status(500).json({ message: error.message });
  }
};
exports.getGenre = async (req, res) => {
  const results = await Genre.findAll();
  return res.status(201).json({
    success: true,
    message: "Success fully Get All Genres",
    result: results,
  });
};

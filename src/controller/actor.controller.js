const { Actor } = require("../models");
exports.createActor = async (req, res) => {
  try {
    const { fullname } = req.body;
    if (!fullname) {
      return res.status(400).json({
        success: false,
        message: "fullname cant be Empty",
        error: error.message,
      });
    }
    const results = await Actor.create(fullname);
    if (!results) {
      return res.status(400).json({
        success: false,
        message: "Error Cant Insert Data",
        error: error.message,
      });
    }
    return res.status(201).json({
      success: true,
      message: "Successfully Create Actor",
      result: results,
    });
  } catch (error) {
    console.error("Error in create genre:", error.message);
    return res.status(500).json({ message: error.message });
  }
};
exports.getActor = async (req, res) => {
  const results = await Actor.findAll();
  return res.status(201).json({
    success: true,
    message: "Success fully Get All Actor",
    result: results,
  });
};

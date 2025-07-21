const { User } = require("../models");

const isAdmin = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: user ID not found" });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }

    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Access denied: only admin can access" });
    }

    next();
  } catch (error) {
    console.error("Error in isAdmin middleware:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = isAdmin;

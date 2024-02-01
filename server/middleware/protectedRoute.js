import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/userModel.js";
dotenv.config();

const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No Token Provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }

    // payload se data extract
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({
        error:"user not found"
      });
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export default protectedRoute;

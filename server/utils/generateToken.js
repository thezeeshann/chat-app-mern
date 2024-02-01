import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateJwtToken = (userId,username,res) => {
  const token = jwt.sign({ userId,username }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("token", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
  });
};

export default generateJwtToken;

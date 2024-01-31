import bcryptjs from "bcryptjs";
import User from "../models/userModel.js";
import generateJwtToken from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (!fullName || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "password does not match",
      });
    }

    const existUser = await User.findOne({ username });
    if (existUser) {
      return res.status(400).json({
        success: false,
        message: "User alredy exist",
      });
    }

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);
    const user = new User({
      fullName,
      username,
      password: hashPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (user) {
      await user.save();
      return res.status(201).json({
        success: true,
        message: "user created successfully",
        user,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "invalid user data",
      });
    }
  } catch (error) {
    return res.status(405).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user does not exist",
      });
    }

    if (await bcryptjs.compare(password, user.password)) {
      generateJwtToken(user._id, res);
      return res.status(200).json({
        success: true,
        message: "Login successfull",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid username and password",
      });
    }
  } catch (error) {
    return res.status(405).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const logout = async (req,res) => {
  try {
   res.cookie("token","",{maxAge:0})
   res.status(200).json({
      success:true,
      message:"Login successfull"
   })
  } catch (error) {
   return res.status(405).json({
      success: false,
      message: "Internal server error",
    });
  }
};

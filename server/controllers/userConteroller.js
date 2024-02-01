import User from "../models/userModel.js";

export const getUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const users = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    if (!users) {
      return res.status(404).json({
        success: false,
        message: "Users not found",
      });
    }
    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    return res.status(405).json({
      success: false,
      message: "Internal server error",
    });
  }
};

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected successfully... ✅");
  } catch (error) {
    console.log("Error while connecting database...", error);
    process.exit(1);
  }
};

export default connectDB;

import express from "express";
import connectDB from "./db/index.js";
import authRoutes from "./routes/authRoute.js";
import messageRoute from "./routes/messageRoute.js";
import UserRoute from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 5000;
connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoute);
app.use("/api/users", UserRoute);

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "server is running up 🚀",
  });
});

app.listen(PORT, () => {
  console.log(`server is running http://localhost:${PORT}`);
});

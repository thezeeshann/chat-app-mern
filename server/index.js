import express from "express";
import authRoutes from "./routes/authRoute.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json())
const PORT = process.env.PORT || 5000;
connectDB();

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "server is running up 🚀",
  });
});


app.listen(PORT, () => {
  console.log(`server is running http://localhost:${PORT}`);
});

import express from "express";
import protectedRoute from "../middleware/protectedRoute.js";
import { sendMessage,getMessages } from "../controllers/messageController.js";

const router = express.Router();

router.post("/send/:id", protectedRoute, sendMessage);
router.get("/:id", protectedRoute, getMessages);

export default router;

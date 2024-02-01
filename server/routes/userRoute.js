import express from "express";
import { getUsers } from "../controllers/userConteroller.js";
import protectedRoute from "../middleware/protectedRoute.js";

const router = express.Router();

router.get("/", protectedRoute, getUsers);

export default router;

import express from "express"
import { isAdminRoute, protectRoute } from "../middleware/authMiddleware.js";
import { createTask } from "../controllers/taskController.js";


const router = express.Router()

router.post("/create", protectRoute, isAdminRoute, createTask);

export default router;
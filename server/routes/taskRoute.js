import express from "express"
import { isAdminRoute, protectRoute } from "../middleware/authMiddleware.js";
import { createTask, dashboardStatistics, duplicateTask, postTaskActivity,getTask,getTasks } from "../controllers/taskController.js";


const router = express.Router()

router.post("/create", protectRoute, isAdminRoute, createTask);
router.post("/duplicate/:id", protectRoute, isAdminRoute, duplicateTask);
router.post("/activity/:id", protectRoute, postTaskActivity);

router.get("/dashboard", protectRoute, dashboardStatistics);
router.get("/", protectRoute, getTasks);
router.get("/:id", protectRoute, getTask);

export default router;
import express from  "express"
import { loginUser, logoutUser, registerUser,getTeamList } from "../controllers/userController.js"
import { isAdminRoute,protectRoute } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/logout", logoutUser);

router.get("/get-team",protectRoute,isAdminRoute,getTeamList)


export default router
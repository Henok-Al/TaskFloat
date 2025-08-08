import express from  "express"
import { loginUser, logoutUser, registerUser,getTeamList, getNotificationsList, markNotificationRead, getUserTaskStatus, updateUserProfile, changeUserPassword, activateUserProfile, deleteUserProfile } from "../controllers/userController.js"
import { isAdminRoute,protectRoute } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/logout", logoutUser);

router.get("/get-team",protectRoute,isAdminRoute,getTeamList)
router.get("/notifications", protectRoute, getNotificationsList);
router.get("/get-status", protectRoute, isAdminRoute, getUserTaskStatus);


router.put("/read-noti", protectRoute, markNotificationRead);
router.put("/profile", protectRoute, updateUserProfile);
router.put("/change-password", protectRoute, changeUserPassword);

//   FOR ADMIN ONLY - ADMIN ROUTES
router
  .route("/:id")
  .put(protectRoute, isAdminRoute, activateUserProfile)
  .delete(protectRoute, isAdminRoute, deleteUserProfile);

export default router;


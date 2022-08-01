const express = require("express");
const router = express.Router();

const {
  login,
  register,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updateUserDetails,
  updateUserPassword,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUsersRole,
} = require("../Controllers/UserController.js");

const { authMiddleware, authRoles } = require("../Middlewares/auth");

// -------------------Routes accessed by any User -------------------
router.route("/login").post(login);
router.route("/register").post(register);
router.route("/logout").get(logout);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").post(resetPassword);

// -------------------Routes Accessed by Users who logged IN -------------------
router.route("/me").get(authMiddleware, getUserDetails);
router.route("/me/update").put(authMiddleware, updateUserDetails);
router.route("/password/update").put(authMiddleware, updateUserPassword);

// -------------------Routes Accessed by Admin Only -------------------
router
  .route("/admin/users")
  .get(authMiddleware, authRoles("admin"), getAllUsers);
router
  .route("/admin/users/:id")
  .get(authMiddleware, authRoles("admin"), getSingleUser)
  .delete(authMiddleware, authRoles("admin"), deleteUser)
  .patch(authMiddleware, authRoles("admin"), updateUsersRole);

module.exports = router;

const express = require("express");
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUser, getSingleUser, deleteUser, updateUserRole } = require("../controller/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

//Routes

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logout);

router.route("/forgotpassword").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/me").get(isAuthenticatedUser, getUserDetails);

router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router.route("/update/profile").put(isAuthenticatedUser, updateProfile);

router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);

router.route("/admin/user/:id")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser)
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole);

module.exports = router;
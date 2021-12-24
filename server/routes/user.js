const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");

// Validations
const validator = require("../validations");

// Get signedIn User
router.get("/user", authController.requireSignin, userController.getUser);

// Follow a User
router.patch(
  "/user/follow",
  authController.requireSignin,
  validator.addFollowerValidator,
  userController.addFollower,
  userController.addFollowing
);

// Unfollow a User
router.patch(
  "/user/unfollow",
  authController.requireSignin,
  validator.removeFollowingValidator,
  userController.removeFollower,
  userController.removeFollowing
);

// Get any user by ID
router.get(
  "/user/:userId",
  authController.requireSignin,
  userController.userById,
  userController.getUserById
);

// Update a User
router.patch(
  "/user/:userId",
  authController.requireSignin,
  userController.userById,
  validator.updateUserValidator,
  userController.updateUser
);

// Delete a User
router.delete("/user", authController.requireSignin, userController.deleteUser);

module.exports = router;

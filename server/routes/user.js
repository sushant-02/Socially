const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");

// Get signedIn User
router.get("/user", authController.requireSignin, userController.getUser);

// Get any user by ID
router.get(
  "/user/:userId",
  authController.requireSignin,
  userController.getUserById
);

// Update a User
router.patch(
  "/user/:userId",
  authController.requireSignin,
  userController.updateUser
);

// Delete a User
router.delete(
  "/user/:userId",
  authController.requireSignin,
  userController.deleteUser
);

// Follow a User
router.patch(
  "/user/follow",
  authController.requireSignin,
  userController.addFollowing,
  userController.addFollower
);

// Unfollow a User
router.patch(
    "/user/unfollow",
    authController.requireSignin,
    userController.removeFollowing,
    userController.removeFollower
);

// if URL parameter has userId, then first userById is executed and it attaches user to the req object
router.param("userId", userController.userById);

module.exports = router;

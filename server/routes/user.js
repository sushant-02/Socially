const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");

// Get signedIn User
router.get("/user", authController.requireSignin, userController.getUser);

// Follow a User
router.patch(
  "/user/follow",
  authController.requireSignin,
  userController.addFollower,
  userController.addFollowing
);

// Unfollow a User
router.patch(
    "/user/unfollow",
    authController.requireSignin,
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
  userController.updateUser
);

// Delete a User
router.delete(
  "/user/:userId",
  authController.requireSignin,
  userController.userById,
  userController.deleteUser
);

// // if URL parameter has userId, then first userById is executed and it attaches user to the req object
// router.param("userId", userController.userById);

module.exports = router;

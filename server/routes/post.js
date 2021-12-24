const express = require("express");

const validator = require("../validations");
const postController = require("../controllers/post.controller");
const authController = require("../controllers/auth.controller");

const router = express.Router();

// Get all Posts
router.get("/posts", authController.requireSignin, postController.getAllPosts);

// Like a Post
router.patch(
  "/post/like",
  authController.requireSignin,
  postController.likePost
);

// Unlike a Post
router.patch(
  "/post/unlike",
  authController.requireSignin,
  postController.unlikePost
);

// Get a Post
router.get(
  "/post/:postId",
  authController.requireSignin,
  postController.postById,
  postController.getPost
);

// Create a new post
router.post(
  "/post/new",
  authController.requireSignin,
  validator.createPostValidator,
  postController.createPost
);

// Delete a Post
router.delete(
  "/post/:postId",
  authController.requireSignin,
  postController.postById,
  postController.hasUserCreatedPost,
  postController.deletePost
);

// Update a Post
router.patch(
  "/post/:postId",
  authController.requireSignin,
  postController.postById,
  postController.hasUserCreatedPost,
  postController.updatePost
);

module.exports = router;

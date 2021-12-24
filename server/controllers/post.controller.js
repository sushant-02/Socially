const { validationResult } = require("express-validator");

const Post = require("../models/Post");

module.exports.getAllPosts = async (req, res) => {
  const { id: userId } = req.auth;

  try {
    const posts = await Post.find({ postedBy: userId });
    return res.status(200).send({ posts });
  } catch (err) {
    return res.status(500).json({
      errors: {
        msg: "We're sorry! The server encountered an internal error and was unable to complete the request",
        serverMsg: err.message,
      },
    });
  }
};

// Get all Posts by a User

module.exports.getAllUserPosts = async (req, res) => {
  const { userId } = req.params;
  try {
    const posts = await Post.find({ postedBy: userId });
    return res.status(200).send({ posts });
  } catch (err) {
    return res.status(500).json({
      errors: {
        msg: "We're sorry! The server encountered an internal error and was unable to complete the request",
        serverMsg: err.message,
      },
    });
  }
};

module.exports.getPost = async (req, res) => {
  try {
    const post = req.post;
    return res.status(200).json({ post });
  } catch (err) {
    return res.status(500).json({
      errors: {
        msg: "We're sorry! The server encountered an internal error and was unable to complete the request",
        serverMsg: err.message,
      },
    });
  }
};

module.exports.createPost = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0] });
  }

  const { id: userId } = req.auth;

  try {
    const post = new Post({ ...req.body, postedBy: userId });
    const savedPost = await post.save();

    return res.status(201).json({ post: savedPost });
  } catch (err) {
    return res.status(500).json({
      errors: {
        msg: "We're sorry! The server encountered an internal error and was unable to complete the request",
        serverMsg: err.message,
      },
    });
  }
};

module.exports.postById = async (req, res, next) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);
    req.post = post;

    next();
  } catch (err) {
    return res.status(500).json({
      errors: {
        msg: "We're sorry! The server encountered an internal error and was unable to complete the request",
        serverMsg: err.message,
      },
    });
  }
};

// has logged in user created the post which is going to be deleted.
module.exports.hasUserCreatedPost = (req, res, next) => {
  const sameIds = String(req.post.postedBy) === String(req.auth.id);
  const hasLoggedInUserCreatedPost = req.post && req.auth && sameIds;

  if (!hasLoggedInUserCreatedPost) {
    return res.status(403).json({
      errors: {
        msg: "User is not authorized to perform this action.",
      },
    });
  }

  next();
};

module.exports.deletePost = async (req, res) => {
  const post = req.post;

  try {
    await Post.findByIdAndDelete(post._id);
    return res.status(200).json({
      msg: "Post deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      errors: {
        msg: "We're sorry! The server encountered an internal error and was unable to complete the request",
        serverMsg: err.message,
      },
    });
  }
};

module.exports.updatePost = async (req, res, next) => {
  const post = req.post;

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      post._id,
      { ...req.body },
      { returnDocument: "after" }
    );

    return res.status(200).json({ post: updatedPost });
  } catch (err) {
    return res.status(500).json({
      errors: {
        msg: "We're sorry! The server encountered an internal error and was unable to complete the request",
        serverMsg: err.message,
      },
    });
  }
};

module.exports.likePost = async (req, res) => {
  const { id: userId } = req.auth;
  const { postId } = req.body;

  try {
    const post = await Post.findByIdAndUpdate(
      postId,
      { $push: { likes: userId } },
      { returnDocument: "after" }
    );

    return res.status(200).json({ post });
  } catch (err) {
    return res.status(500).json({
      errors: {
        msg: "We're sorry! The server encountered an internal error and was unable to complete the request",
        serverMsg: err.message,
      },
    });
  }
};

module.exports.unlikePost = async (req, res) => {
  const { id: userId } = req.auth;
  const { postId } = req.body;

  try {
    const post = await Post.findByIdAndUpdate(
      postId,
      { $pull: { likes: userId } },
      { returnDocument: "after" }
    );

    return res.status(200).json({ post });
  } catch (err) {
    return res.status(500).json({
      errors: {
        msg: "We're sorry! The server encountered an internal error and was unable to complete the request",
        serverMsg: err.message,
      },
    });
  }
};

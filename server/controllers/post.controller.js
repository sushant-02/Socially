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

module.exports.getPost = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId);
    return res.status(200).json(post);
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


module.exports.postById = async (req, res, next, postId) => {
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
}

// has logged in user created the post which is going to be deleted.

// module.exports.hasUserCreatedPost = (req, res, next) => {
//   const userCreatedPost = 
// }
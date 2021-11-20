const { validationResult } = require("express-validator");
const Post = require("../models/Post");

module.exports.createPost = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const post = new Post(req.body);
    const savedPost = await post.save();
    res.status(200).json({ savedPost });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

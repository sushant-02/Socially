const fs = require("fs");
const formidable = require("formidable");
const { validationResult } = require("express-validator");

const Post = require("../models/Post");

module.exports.createPost = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async (err, fields, files) => {
      if (err)
        return res.status(400).json({ error: "Image could not be uploaded" });

      const post = new Post(fields);
      post.postedBy = req.profile;

      if (files.image) {
        post.image.data = fs.readFileSync(files.image.path);
        post.image.contentType = files.image.type;
      }

      const savedPost = await post.save();
      return res.status(200).json({ post: savedPost });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

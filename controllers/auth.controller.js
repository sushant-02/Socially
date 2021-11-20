const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

module.exports.signup = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const userExists = await User.findOne({ email: req.body.email });

  if (userExists) {
    return res.status(400).json({ error: "User already exists." });
  }

  try {
    const user = new User(req.body);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    const savedUser = await user.save();
    const { password, ...createdUser } = savedUser._doc;

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30 days",
    });

    return res.status(201).json({ user: createdUser, token });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports.signin = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(401).json({ error: "Invalid Credentials." });
  }

  const isMatch = await bcrypt.compare(req.body.password, user.password);

  if (!isMatch) {
    return res.status(401).json({ error: "Invalid Credentials." });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30 days",
  });

  const { password, ...responseUser } = user._doc;

  return res.status(200).json({ user: responseUser, token });
};

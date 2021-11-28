const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJWT = require("express-jwt");

const User = require("../models/User");
const {
  sendSignupEmail,
  sendResetPasswordEmail,
} = require("../utils/sendMail");

module.exports.signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Only send the first error message
    return res.status(400).json({ errors: errors.array()[0] });
  }

  // Check if user already exists
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    return res
      .status(400)
      .json({ errors: { msg: "Sorry, this email already exists!" } });
  }

  // Create a new user
  try {
    const user = new User(req.body);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    const savedUser = await user.save();

    sendSignupEmail(savedUser);

    return res.status(201).json({ msg: "User created successfully." });
  } catch (err) {
    return res.status(500).json({
      errors: {
        msg: "We're sorry! The server encountered an internal error and was unable to complete the request",
        serverMsg: err.message,
      },
    });
  }
};

module.exports.signin = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Only send the first error message
    return res.status(400).json({ errors: errors.array()[0] });
  }

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(401).json({
      errors: {
        msg: `Sorry, we could not find a user with the email '${req.body.email}'`,
      },
    });
  }

  const isMatch = await bcrypt.compare(req.body.password, user.password);

  if (!isMatch) {
    return res.status(401).json({ errors: { msg: "Invalid Credentials." } });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30 days",
  });

  const { password, ...responseUser } = user._doc;

  // If user is not confirmed, then only send user details
  if (!responseUser.confirmed) {
    return res.status(200).json({ user: responseUser });
  }

  return res.status(200).json({ user: responseUser, token });
};

module.exports.confirmUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Only send the first error message
    return res.status(400).json({ errors: errors.array()[0] });
  }

  const { token } = req.body;
  try {
    const { id: userId } = jwt.verify(token, process.env.JWT_SECRET);
    await User.findByIdAndUpdate(userId, { confirmed: true });

    return res.status(200).json({ msg: "Email confirmed!" });
  } catch (err) {
    return res.status(500).json({
      errors: {
        msg: "We're sorry! The server encountered an internal error and was unable to complete the request",
        serverMsg: err.message,
      },
    });
  }
};

module.exports.getUser = async (req, res) => {
  const { id: userId } = req.auth;

  try {
    const user = await User.findById(userId);
    const { password, ...responseUser } = user._doc;

    return res.status(200).json({ user: responseUser });
  } catch (err) {
    return res.status(500).json({
      errors: {
        msg: "We're sorry! The server encountered an internal error and was unable to complete the request",
        serverMsg: err.message,
      },
    });
  }
};

module.exports.resetPasswordForm = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Only send the first error message
    return res.status(400).json({ errors: errors.array()[0] });
  }

  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({
        errors: {
          msg: `Sorry, we could not find a user with the email '${req.body.email}'`,
        },
      });
    }

    sendResetPasswordEmail(user);

    return res.status(200).json({ msg: "Password reset email sent!" });
  } catch (err) {
    return res.status(500).json({
      errors: {
        msg: "We're sorry! The server encountered an internal error and was unable to complete the request",
        serverMsg: err.message,
      },
    });
  }
};

module.exports.resetPassword = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Only send the first error message
    return res.status(400).json({ errors: errors.array()[0] });
  }

  const { token, newPassword } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const { id: userId } = jwt.verify(token, process.env.JWT_SECRET);
    await User.findByIdAndUpdate(userId, { password: hashedPassword });

    return res.status(200).json({ msg: "Password changed successfully!" });
  } catch (err) {
    return res.status(500).json({
      errors: {
        msg: "We're sorry! The server encountered an internal error and was unable to complete the request",
        serverMsg: err.message,
      },
    });
  }
};

module.exports.requireSignin = expressJWT({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

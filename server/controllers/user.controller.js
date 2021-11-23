const User = require("../models/User");

module.exports.userById = async (req, res, next, id) => {
  try {
    const user = await User.findById(id);
    req.profile = user;
    next();
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports.hasAuthorization = (req, res, next) => {
  const authorized =
    req.profile && req.auth && req.profile._id === req.auth._id;
  if (!authorized) {
    return res.status(403).json({
      error: "User is not authorized to perform this action.",
    });
  }

  next();
};

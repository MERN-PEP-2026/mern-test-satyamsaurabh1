const jwt = require("jsonwebtoken");
const User = require("../models/User");

// FIXME: need a better way to handle secrets in prod
const createJwt = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

const formatUser = (userDoc) => ({
  id: userDoc._id,
  name: userDoc.name,
  email: userDoc.email,
});

const cleanEmail = (value = "") => value.trim().toLowerCase();

// standard function for registration
async function registerUser(req, res) {
  const { name, email, password } = req.body;
  const userEmail = cleanEmail(email);

  // basic validation
  if (!name?.trim() || !userEmail || !password) {
    return res.status(400).json({ message: "name, email and password are required" });
  }

  const duplicate = await User.findOne({ email: userEmail });
  if (duplicate) {
    return res.status(409).json({ message: "User already exists" });
  }

  const createdUser = await User.create({
    name: name.trim(),
    email: userEmail,
    password,
  });

  // TODO: send welcome email here

  return res.status(201).json({
    token: createJwt(createdUser._id),
    user: formatUser(createdUser),
  });
}

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const userEmail = cleanEmail(email);

  if (!userEmail || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }

  const user = await User.findOne({ email: userEmail });
  const validPassword = user ? await user.matchPassword(password) : false;

  if (!user || !validPassword) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  return res.json({
    token: createJwt(user._id),
    user: formatUser(user),
  });
};

module.exports = { registerUser, loginUser };

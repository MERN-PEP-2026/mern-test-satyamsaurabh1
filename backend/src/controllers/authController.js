const jwt = require("jsonwebtoken");
const User = require("../models/User");

const createJwt = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

const toPublicUser = (userDoc) => ({
  id: userDoc._id,
  name: userDoc.name,
  email: userDoc.email,
});

const normalizeEmail = (value = "") => value.trim().toLowerCase();

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const normalizedEmail = normalizeEmail(email);

  if (!name?.trim() || !normalizedEmail || !password) {
    return res.status(400).json({ message: "name, email and password are required" });
  }

  const duplicate = await User.findOne({ email: normalizedEmail });
  if (duplicate) {
    return res.status(409).json({ message: "User already exists" });
  }

  const createdUser = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    password,
  });

  return res.status(201).json({
    token: createJwt(createdUser._id),
    user: toPublicUser(createdUser),
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }

  const user = await User.findOne({ email: normalizedEmail });
  const validPassword = user ? await user.matchPassword(password) : false;

  if (!user || !validPassword) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  return res.json({
    token: createJwt(user._id),
    user: toPublicUser(user),
  });
};

module.exports = { registerUser, loginUser };

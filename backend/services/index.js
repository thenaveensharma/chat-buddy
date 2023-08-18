// create password hash
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const signToken = (user) => {
  return jwt.sign(user, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });
};
const verifyToken = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY);
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};
const checkPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = { signToken, verifyToken, hashPassword, checkPassword };

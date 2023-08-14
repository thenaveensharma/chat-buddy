const asyncHandler = require("express-async-handler");
const UserModel = require("../models/userModel");
const {
  signToken,
  verifyToken,
  hashPassword,
  checkPassword,
} = require("../services");
const signup = asyncHandler(async function (req, res, next) {
  console.log(req.body);
  const { Name, Email, Password } = req.body;
  const isExist = await UserModel.exists({ email: Email });
  if (isExist) {
    res.status(409).send({ errorMessage: "User already exists" });
    return;
  }

  const hashedPassword = await hashPassword(Password);
  const token = signToken({ name: Name, email: Email });

  const newUser = new UserModel({
    name: Name,
    email: Email,
    password: hashedPassword,
    accessToken: token,
    refreshToken: token,
  });
  await newUser.save();
  res.status(201).send({
    name: Name,
    email: Email,
    accessToken: token,
    refreshToken: token,
  });
});

const login = asyncHandler(async function (req, res) {
  const { Email: email, Password: password } = req.body;
  const isExists = await UserModel.exists({ email });
  console.log(isExists);
  if (!isExists) {
    res.status(404).send({ errorMessage: "Email does not exists" });
    return;
  }
  const user = await UserModel.findOne({ email });
  const isPasswordValid = await checkPassword(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).send({ errorMessage: "Invalid email/password" });
  }
  const token = signToken({ name: user.name, email });
  user.refreshToken = token;
  user.accessToken = token;
  await user.save();

  res.status(200).send({
    name: user.name,
    email,
    accessToken: token,
    refreshToken: token,
  });
});
module.exports = { signup, login };

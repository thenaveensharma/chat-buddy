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
  console.log(req.body);
  res.send(req.body);
});
module.exports = { signup, login };

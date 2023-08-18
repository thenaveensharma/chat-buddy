const asyncHandler = require("express-async-handler");
const UserModel = require("../models/userModel");
const { signToken, hashPassword, checkPassword } = require("../services");
const signup = asyncHandler(async function (req, res, next) {
  console.log(req.body);
  const { Name, Email, Password } = req.body;
  const isExist = await UserModel.exists({ email: Email });
  if (isExist) {
    res.status(409).send({ errorMessage: "User already exists" });
    return;
  }

  const hashedPassword = await hashPassword(Password);

  const newUser = new UserModel({
    name: Name,
    email: Email,
    password: hashedPassword,
  });
  const token = signToken({ name: Name, email: Email, _id: newUser._id });
  await newUser.save({ accessToken: token, refreshToken: token });
  res.status(201).send({
    _id: newUser._id,
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
  const token = signToken({ name: user.name, email, _id: user._id });
  user.refreshToken = token;
  user.accessToken = token;
  await user.save();

  res.status(200).send({
    _id: user._id,
    name: user.name,
    email,
    accessToken: token,
    refreshToken: token,
  });
});
const allUsers = asyncHandler(async function (req, res) {
  const user = req.user;
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await UserModel.find(keyword)
    .find({ _id: { $ne: user._id } })
    .select(["_id", "email", "name"]);
  res.status(200).json(users);
});
module.exports = { signup, login, allUsers };

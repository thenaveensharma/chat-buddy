const asyncHandler = require("express-async-handler");
const UserModel = require("../models/userModel");
const signup = asyncHandler(async function (req, res, next) {
  console.log(req.body);
  const user = req.body;
  const isExist = await UserModel.exists({ email: user.Email });
  console.log("🚀 ~ file: userController.js:7 ~ signup ~ isExist:", isExist);
  if (isExist) {
    res.status(409).send({ ErrorMessage: "User already exists" });
    return;
  }
  const newUser = new UserModel({
    name: user.Name,
    email: user.Email,
    password: user.Password,
    accessToken: "a",
    refreshToken: "a",
  });
  console.log("🚀 ~ file: userController.js:13 ~ signup ~ newUser:", newUser);
  newUser.save();
  res.send(newUser);
  //   next();
});

const login = asyncHandler(async function (req, res) {
  console.log(req.body);
  res.send(req.body);
});
module.exports = { signup, login };

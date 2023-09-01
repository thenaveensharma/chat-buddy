const asyncHandler = require("express-async-handler");
const ChatModel = require("../models/chatModel");
const UserModel = require("../models/userModel");
const { signToken, hashPassword, checkPassword } = require("../services");
const messageModel = require("../models/messageModel");
const accessChat = asyncHandler(async function (req, res, next) {
  const { userId } = req.body;
  if (!userId) {
    return res.status(404).send({ message: "User Id not available" });
  }
  let isChat = await ChatModel.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "_id name email")
    .populate("latestMessage");

  isChat = await messageModel.populate(isChat, {
    path: "latestMessage.sender",
    select: "name email",
  });
  if (isChat.length > 0) {
    res.status(200).send(isChat);
  } else {
    const chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };
    try {
      const createdChat = await ChatModel.create(chatData);

      const fullChat = await ChatModel.findOne({
        _id: createdChat._id,
      }).populate("users", "-password");
      res.status(201).send(fullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

const fetchChat = asyncHandler(async function (req, res, next) {
  try {
    ChatModel.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "_id name email")
      .populate("groupAdmin", "_id name email")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (result) => {
        console.log(
          "🚀 ~ file: chatControllers.js:55 ~ .then ~ result:",
          result,
        );
        result = await UserModel.populate(result, {
          path: "latestMessage.sender",
          select: "name email",
        });
        res.status(200).send(result);
      });
  } catch (error) {
    console.log("🚀 ~ file: chatControllers.js:52 ~ fetchChat ~ error:", error);
    throw new Error(error.message);
  }
});
module.exports = { accessChat, fetchChat };

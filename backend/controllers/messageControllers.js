const asyncHandler = require("express-async-handler");
const ChatModel = require("../models/chatModel");
const UserModel = require("../models/userModel");
const MessageModel = require("../models/messageModel");
const sendMessage = asyncHandler(async function (req, res, next) {
  try {
    const { content, chatId } = req.body;
    if (!content || !chatId) {
      console.log("invalid data passed into request");
      return res.sendStatus(400);
    }
    const sender = req.user._id;

    let newMessage = {
      sender: sender,
      content: content,
      chat: chatId,
    };

    let message = await MessageModel.create(newMessage);

    message = await message.populate("sender", "name email");
    message = await message.populate("chat");
    message = await UserModel.populate(message, {
      path: "chat.users",
      select: "name email",
    });

    await ChatModel.findByIdAndUpdate(chatId, { latestMessage: message });
    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
const allMessages = asyncHandler(async function (req, res, next) {
  try {
    const { chatId } = req.params;
    let messages = await MessageModel.find({
      chat: chatId,
    })
      .populate("sender", "name email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { sendMessage, allMessages };

"use strict";
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const auth = require("../../backend/middleware/authentication.js");
// Controllers
const user = require("../controllers/userControllers.js");
const chat = require("../controllers/chatControllers.js");
const message = require("../controllers/messageControllers.js");

// create application/json parser
const jsonParser = bodyParser.json({
  limit: "5000mb",
  parameterLimit: 1000000,
  extended: true,
});

// Registration , Login API
router.post("/user/signup", [jsonParser], user.signup);
router.post("/user/login", [jsonParser], user.login);
router.get("/user", [jsonParser, auth], user.allUsers);

// chat apis
router.post("/chat", [jsonParser, auth], chat.accessChat);
router.get("/chat", [jsonParser, auth], chat.fetchChat);
router.post("/chat/group", [jsonParser, auth], chat.createGroupChat);
router.put("/chat/grouprename", [jsonParser, auth], chat.renameGroup);
router.put("/chat/groupremove", [jsonParser, auth], chat.removeFromGroup);
router.put("/chat/groupadd", [jsonParser, auth], chat.addToGroup);

router.post("/message", [jsonParser, auth], message.sendMessage);
router.get("/message/:chatId", [jsonParser, auth], message.allMessages);

module.exports = router;

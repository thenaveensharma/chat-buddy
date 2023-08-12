"use strict";
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
// const authentication = require("../../middleware/authentication.js");
// Controllers
const user = require("../controllers/userController.js");

// create application/json parser
const jsonParser = bodyParser.json({
  limit: "5000mb",
  parameterLimit: 1000000,
  extended: true,
});

// Registration , Login API
router.post("/signup", [jsonParser], user.signup);
router.post("/login", [jsonParser], user.login);

module.exports = router;

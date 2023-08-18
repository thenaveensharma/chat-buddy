const expressAsyncHandler = require("express-async-handler");
const { verifyToken } = require("../services/index.js");
const userModel = require("../models/userModel.js");
const auth = expressAsyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = verifyToken(token);
      req.user = await userModel.findById(decoded._id).select("-password");
      next();
    } catch (error) {
      console.log("🚀 ~ file: authentication.js:17 ~ auth ~ error:", error);
      res.status(401);
      throw new Error("Not authorized, token failed to be verified");
    }
  } else {
    throw new Error("authentication header not present");
  }
});

module.exports = auth;

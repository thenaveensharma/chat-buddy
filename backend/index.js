const express = require("express");
const cors = require("cors");
const app = express();
// connection to db is defined here
const { dbConnection } = require("./config");
dbConnection();
//routes defined here
const routes = require("./api/routes.js");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const allowedOrigins = ["*"];
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  return next();
});
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5173"); // Replace with your React client URL
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  next();
});
app.use(
  cors({
    origin: allowedOrigins,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204 || 200,
  }),
);

const io = new Server(server, {
  cors: {
    origin: ["http://127.0.0.1:5173"],
    methods: ["GET", "POST"],
  },
});
app.use(cors());
const dotenv = require("dotenv");
dotenv.config();
const chats = require("./data/data");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

app.get("/", (req, res) => {
  console.log("I'm Active");
  res.send("I'm Active");
});
app.use("/api", routes);

//socket code
io.on("connection", (socket) => {
  // for the setup
  socket.on("setup", (user) => {
    console.log(" User connected");
    socket.join(user._id);
    socket.emit("connected");
  });
  // to join room
  socket.on("join room", (room) => {
    socket.join(room);

    console.log("User joined this room:--", room);
  });

  // to send new message
  socket.on("send message", (message) => {
    if (!message?.chat?.users)
      return console.log("Chat does not have any user");

    message?.chat.users.forEach((user) => {
      if (user._id === message.sender._id) return;
      socket.in(user._id).emit("message recieved", message);
    });
  });

  //typing indicator
  socket.on("start typing", ({ chat, user }) => {
    if (!chat?.users) return console.log("Chat does not have any user");

    chat.users.forEach((userInUsers) => {
      if (userInUsers._id === user._id) return;
      socket.in(userInUsers._id).emit("recieve typing", { chat, user });
    });
  });
  socket.on("send stop typing", ({ chat }) => {
    if (!chat?.users) return console.log("Chat does not have any user");

    chat.users.forEach((userInUsers) => {
      socket.in(userInUsers._id).emit("recieve stop typing", { chat });
    });
  });

  socket.off("setup", (user) => {
    socket.leave(user._id);
    console.log("User disconnected");
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err); // Log the error
  res.status(500).json({ error: "An error occurred" });
});

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("app is listening on port " + PORT);
});
server.listen(3000, () => {
  console.log("socket is listening on port " + 3000);
});

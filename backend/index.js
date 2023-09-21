const express = require("express");
const cors = require("cors");
const app = express();
// connection to db is defined here
const { dbConnection } = require("./config");
dbConnection();
//routes defined here
const routes = require("./api/routes.js");
const http = require("http");
// const server = http.createServer(app);
const { Server } = require("socket.io");
const path = require("path");
const allowedOrigins = ["*"];
const PORT = process.env.PORT || 8080;
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
  res.header(
    "Access-Control-Allow-Origin",
    "https://chat-buddy-fo2j.onrender.com/",
  ); // Replace with your React client URL
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

app.use(cors());
const dotenv = require("dotenv");
dotenv.config();
// const chats = require("./data/data");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

// app.get("/", (req, res) => {
//   console.log("I'm Active");
//   res.send("I'm Active");
// });
app.use("/api", routes);

// --------------------------deployment------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "dist", "index.html")),
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// --------------------------deployment------------------------------

// -------------------------------------Error handling middleware----------------------------------------------------
app.use((err, req, res, next) => {
  console.error(err); // Log the error
  res.status(500).json({ error: "An error occurred" });
});

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);
const server = app.listen(PORT, () => {
  console.log("app is listening on port " + PORT);
});
//----------------------------------------socket code---------------------------------------------
const io = new Server(server, {
  cors: {
    origin: [
      "http://127.0.0.1:5173",
      "http://localhost:5173",
      "http://127.0.0.1:8080",
      "http://localhost:8080",
      "https://chat-buddy-fo2j.onrender.com",
    ],
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  // for the setup
  socket.on("setup", (user) => {
    console.log("User connected");
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

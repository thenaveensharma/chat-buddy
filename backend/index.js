const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5173"); // Replace with your React client URL
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  next();
});
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

app.get("/", (req, res) => {
  res.send("Welcome");
});

io.on("connection", (socket) => {
  console.log("a user connected" + socket.id);
});

app.get("/api/chat", (req, res) => {
  res.send(chats);
});
app.get("/api/chat/:id", (req, res) => {
  const { id } = req.params;
  const singleChat = chats.find((chat) => chat._id === id);
  res.send(singleChat);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("app is listening on port " + PORT);
});
server.listen(3000, () => {
  console.log("socket is listening on port " + 3000);
});

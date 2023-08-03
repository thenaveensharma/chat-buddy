import React, { useEffect } from "react";
import { io } from "socket.io-client";
const Login = () => {
  useEffect(() => {
    const socket = io("http://localhost:3000/");
    console.log("🚀 ~ file: Login.jsx:4 ~ socket:", socket);
    socket.on("connection", (socket) => {
      console.log("🚀 ~ file: Login.jsx:9 ~ socket.on ~ socket:", socket);
    });
  }, []);
  return <div>Login</div>;
};

export default Login;

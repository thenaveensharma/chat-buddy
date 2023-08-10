import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import routes from "./router";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={routes}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </RouterProvider>
  </React.StrictMode>,
);

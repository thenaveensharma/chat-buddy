import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import routes from "./router";
import { ChatProvider } from "./Context/ChatProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <ChatProvider>
      <RouterProvider router={routes}>
        <App />
      </RouterProvider>
    </ChatProvider>
  </ChakraProvider>,
);

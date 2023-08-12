import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Auth/Login";
import SignUp from "../pages/Auth/SignUp";
import Chats from "../pages/Chats/Chats.jsx";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <SignUp />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/chats",
    element: <Chats />,
  },
]);
export default routes;

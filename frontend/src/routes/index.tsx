import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import { ChatPage } from "../pages/ChatPage";
import { PrivateRoute } from "./PrivateRoute";

const room = "general";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/login", element: <LoginPage /> },
  {
    path: "/chat",
    element: (
      <PrivateRoute>
        <ChatPage room={room} />
      </PrivateRoute>
    ),
  },
]);

export default router;

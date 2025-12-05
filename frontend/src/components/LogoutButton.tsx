import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useSocket } from "../context/SocketContext";

export const LogoutButton = () => {
  const navigate = useNavigate();
  const socket = useSocket();

  const handleLogout = () => {
    Cookies.remove("token");
    socket.disconnect();
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
    >
      Logout
    </button>
  );
};

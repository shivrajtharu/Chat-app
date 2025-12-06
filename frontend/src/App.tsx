import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { SocketProvider } from "./providers/SocketProvider";
import router from "./routes";
import { ToastProvider } from "./providers/ToastProvider";
import { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";

function App() {
  const [token, setToken] = useState(Cookies.get("token") || "");

  useEffect(() => {
    const interval = setInterval(() => {
      const newToken = Cookies.get("token") || "";
      setToken((prev) => (prev !== newToken ? newToken : prev));
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <SocketProvider token={token}>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
      <Toaster />
    </SocketProvider>
  );
}

export default App;

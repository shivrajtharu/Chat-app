import { RouterProvider } from "react-router-dom";
import { SocketProvider } from "./providers/SocketProvider";
import router from "./routes";
import { ToastProvider } from "./providers/ToastProvider";
import { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";

function App() {
  const token = Cookies.get("token") || "";

  return (
    <>
      <SocketProvider token={token}>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
        <Toaster />
      </SocketProvider>
    </>
  );
}

export default App;

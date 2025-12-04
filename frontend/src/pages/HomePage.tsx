import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@mui/material";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800 relative">
      {/* Top Navbar */}
      <header className="w-full flex justify-between items-center px-6 py-4 shadow-sm bg-white">
        <h1 className="text-2xl font-bold">ChatApp</h1>
        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button className="rounded-2xl px-5 py-2 font-medium">Login</Button>
          </Link>
          <Link to="/register">
            <Button
              className="rounded-2xl px-5 py-2 font-medium"
              variant="outlined"
            >
              Sign Up
            </Button>
          </Link>
        </div>
      </header>

      {/* Center Content */}
      <main className="flex-1 flex flex-col justify-center items-center text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold mb-4"
        >
          Welcome to <span className="text-blue-600">ChatApp</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg md:text-xl text-gray-600 max-w-xl"
        >
          Connect instantly with friends, family, and your community — fast,
          secure, and easy to use.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-8"
        >
          <Link to="/register">
            <Button className="rounded-2xl text-lg px-8 py-3">
              Get Started
            </Button>
          </Link>
        </motion.div>
      </main>
    </div>
  );
}

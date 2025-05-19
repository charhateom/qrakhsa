import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // Import AuthContext

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    try {
      const response = await axios.post("https://qrakhsa-backend.onrender.com/api/employees/login", {
        username,
        password,
      });

      console.log("Login API Response:", response.data); // Debugging log

      const { token, userId } = response.data;

      if (!userId) {
        console.error("Error: userId is missing from API response!");
        setError("Login failed. Invalid user data.");
        return;
      }

      login(userId, token); // Store in Context API
      navigate("/user");
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
    }
  };


  return (
    <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="hidden lg:flex lg:flex-col justify-center items-start pr-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome to <span className="text-blue-600">QRaksha</span>
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Your emergency QR code generator.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-6">Login</h2>

        {error && <p className="text-red-500 text-center mb-3">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded w-full mb-3 dark:bg-gray-700 dark:text-white"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded w-full mb-5 dark:bg-gray-700 dark:text-white"
        />

        <button onClick={handleLogin} className="btn-primary w-full">Login</button>

        <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
          New user?
          <Link to="/signup" className="text-blue-500 hover:underline ml-1">Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

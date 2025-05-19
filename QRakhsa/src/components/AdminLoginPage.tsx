import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface AdminLoginPageProps {
  onAdminLogin: () => void; // Callback function to update adminLoggedIn state in App
}

const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onAdminLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Send login request to the backend
      const res = await axios.post("https://qrakhsa-backend.onrender.com/api/admin/login", {
        username,
        password,
      });

      // If login is successful
      if (res.data.token) {
        localStorage.setItem("adminToken", res.data.token); // Store the token in localStorage
        onAdminLogin(); // Call the callback to update adminLoggedIn state in App
        navigate("/admindashboard"); // Redirect to the admin dashboard
      }
    } catch (err) {
      // Handle login errors
      setError("Invalid credentials. Try again!");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      {/* Welcome to QRaksha Section */}
      <div className="hidden lg:flex lg:flex-col justify-center items-start pr-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome to <span className="text-blue-600">QRaksha</span>
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Your emergency QR code generator.
        </p>
      </div>

      {/* Admin Login Form */}
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-6">
          Admin Login
        </h2>

        {/* Display error message if login fails */}
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        {/* Username input */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded w-full mb-3 text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />

        {/* Password input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded w-full mb-5 text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />

        {/* Login button */}
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default AdminLoginPage;

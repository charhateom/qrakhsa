// components/LoginType.tsx
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShieldHalved } from "@fortawesome/free-solid-svg-icons";

const LoginType = () => {
  const navigate = useNavigate();

  const handleUserLogin = () => {
    navigate("/login");
  };

  const handleAdminLogin = () => {
    navigate("/adminlogin");
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
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-6">
          Login
        </h2>

        <div className="flex flex-col space-y-5">
          <button
            onClick={handleUserLogin}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
          >
            <FontAwesomeIcon icon={faUser} className="text-lg" />
            <span>User Login</span>
          </button>
          <button
            onClick={handleAdminLogin}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
          >
            <FontAwesomeIcon icon={faShieldHalved} className="text-lg" />
            <span>Admin Login</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default LoginType;
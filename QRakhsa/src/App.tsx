// App.tsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Layout from "./components/Layout";
import EmployeeCard from "./components/EmployeeCard";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import UserSignupForm from "./components/UserSignupForm";
import UserProfile from "./components/UserProfile";
import type { Employee, Alert } from "./types";
import Homepage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import UserLayout from "./components/UserLayout";
import AdminLoginPage from "./components/AdminLoginPage";
import LoginType from "./components/LoginTypes"; 
import { useAuth } from "./context/AuthContext"; 

const mockEmployees: Employee[] = [
  {
    id: "EMP001",
    name: "John Doe",
    bloodType: "O+",
    department: "Engineering",
    emergencyContacts: [
      { name: "Jane Doe", relationship: "Spouse", phone: "+1-555-0123" },
      { name: "James Doe", relationship: "Brother", phone: "+1-555-0124" },
    ],
    medicalConditions: ["Asthma", "Penicillin Allergy"],
    location: { lat: 40.7128, lng: -74.006 },
  },
];

const mockAlerts: Alert[] = [];

function App() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee>(mockEmployees[0]);
  const { isAuthenticated } = useAuth(); // Use isAuthenticated from AuthContext
  const [adminLoggedIn, setAdminLoggedIn] = useState<boolean>(localStorage.getItem("adminLoggedIn") === "true");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("adminLoggedIn") === "true") {
      setAdminLoggedIn(true);
    }
  }, []);

  const handleSOS = () => {
    const newAlert: Alert = {
      id: `ALERT${Math.random().toString(36).substr(2, 9)}`,
      employeeId: selectedEmployee.id,
      timestamp: new Date(),
      status: "active",
      location: selectedEmployee.location,
    };
    setAlerts((prev) => [...prev, newAlert]);
    alert("Emergency alert sent!");
  };

  const handleResolveAlert = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId ? { ...alert, status: "resolved" } : alert
      )
    );
  };

  const handleAdminLogin = () => {
    setAdminLoggedIn(true);
    localStorage.setItem("adminLoggedIn", "true");
    console.log("Admin logged in");
    navigate("/admindashboard");
  };

  const handleAdminLogout = () => {
    setAdminLoggedIn(false);
    localStorage.removeItem("adminLoggedIn");
    navigate("/adminlogin");
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Homepage
            loggedInUser={isAuthenticated}
            adminLoggedIn={adminLoggedIn}
            onLogout={() => {
              localStorage.removeItem("userId");
              localStorage.removeItem("authToken");
              window.location.href = "/login"; // Force reload to clear context state
            }}
            onAdminLogout={handleAdminLogout}
          />
        }
      />
      <Route path="/signup" element={<UserSignupForm />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/adminlogin"
        element={<AdminLoginPage onAdminLogin={handleAdminLogin} />}
      />
      <Route path="/user-profile/:employeeId" element={<UserProfile />} />
      <Route path="/logintype" element={<LoginType />} /> {/* Add LoginType Route */}


      {/* Admin Routes */}
      <Route
        path="/admindashboard"
        element={adminLoggedIn ? <Layout /> : <Navigate to="/adminlogin" replace />}
      >
        <Route
          index
          element={<AdminDashboard alerts={alerts} employees={mockEmployees} onResolveAlert={handleResolveAlert} />}
        />
        <Route
          path="employee-card"
          element={
            <div className="container mx-auto px-4 py-8">
              <h2 className="text-xl font-bold mb-4">Select Employee (Admin View):</h2>
              <select
                className="border p-2 rounded"
                onChange={(e) => {
                  const employee = mockEmployees.find((emp) => emp.id === e.target.value);
                  if (employee) setSelectedEmployee(employee);
                }}
                value={selectedEmployee.id}
              >
                {mockEmployees.map((emp) => (
                  <option key={emp.id} value={emp.id}>{emp.name}</option>
                ))}
              </select>
              <EmployeeCard employee={selectedEmployee} onSOS={handleSOS} />
            </div>
          }
        />
      </Route>

      {/* User Routes */}
      <Route path="/user" element={isAuthenticated ? <UserLayout /> : <Navigate to="/login" replace />}>
        <Route index element={<UserDashboard user={selectedEmployee} onSOS={handleSOS} />} />
      </Route>
      <Route path="/user-profile/:employeeId" element={<UserProfile />} />
    </Routes>
  );
}

export default App;
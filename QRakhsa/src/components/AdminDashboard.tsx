import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Search, MapPin, Bell, CheckCircle } from "lucide-react";
import type { Alert, Employee } from "../types";
import EmployeeCard from "./EmployeeCard";

const API_BASE_URL = "https://qrakhsa-backend.onrender.com/api/admin";

const AdminDashboard: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const prevAlertsCount = useRef(0); // Track previous alerts count

  // ✅ Fetch employees and alerts initially & poll for new SOS alerts
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchAlerts, 5000); // Poll alerts every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Fetch employees and alerts
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) throw new Error("No adminToken found");

      // Fetch employees
      const employeesResponse = await axios.get(`${API_BASE_URL}/employees`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(Array.isArray(employeesResponse.data) ? employeesResponse.data : []);

      // Fetch alerts
      fetchAlerts();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // ✅ Fetch only SOS alerts (polling)
  const fetchAlerts = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) throw new Error("No adminToken found");

      const alertsResponse = await axios.get(`${API_BASE_URL}/sos-alerts`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (Array.isArray(alertsResponse.data)) {
        if (alertsResponse.data.length > prevAlertsCount.current) {
          playAlertSound(); // Play sound if new alert is detected
        }
        setAlerts(alertsResponse.data);
        prevAlertsCount.current = alertsResponse.data.length; // Update previous count
      }
    } catch (error) {
      console.error("Error fetching alerts:", error);
    }
  };

  // ✅ Function to play the alert sound
  const playAlertSound = () => {
    setTimeout(() => {
      const alertSound = new Audio("../../assets/alarm.mp3"); // Ensure the file is in the 'public/assets' folder
      alertSound.play().catch((err) => console.error("Error playing sound:", err));
    }, 3000); // 3-second delay
  };

  // ✅ Resolve alert without refreshing page
  const onResolveAlert = async (alertId: string) => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) throw new Error("No adminToken found");

      await axios.delete(`${API_BASE_URL}/resolve-sos/${alertId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Remove resolved alert from state
      setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert._id !== alertId));
      prevAlertsCount.current -= 1; // Decrease alert count to keep track
    } catch (error) {
      console.error("Error resolving alert:", error);
    }
  };

  // Filter employees based on search term
  const filteredEmployees = employees.filter((employee) =>
    (employee.name?.toLowerCase() ?? "").includes(searchTerm.toLowerCase()) ||
    (employee.medicalConditions ?? []).some((condition) =>
      (condition?.toLowerCase() ?? "").includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="space-y-6">
      {/* Alerts Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
          <Bell className="h-6 w-6 text-red-600 mr-2" />
          Active Alerts ({alerts.length})
        </h2>
        <div className="space-y-4">
          {alerts.map((alert) => {
            const employee = employees.find((emp) => emp._id === alert.employeeId);
            if (!employee) return null;

            return (
              <div key={alert._id} className="flex items-center justify-between bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{employee.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {employee.department} • {new Date(alert.timestamp).toLocaleTimeString()}
                  </p>
                  {alert.location?.lat && alert.location?.lng && (
                    <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>
                        Lat: {alert.location.lat.toFixed(6)}, Lng: {alert.location.lng.toFixed(6)}
                      </span>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => onResolveAlert(alert._id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center"
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Resolve
                </button>
              </div>
            );
          })}
          {alerts.length === 0 && (
            <p className="text-center text-gray-600 dark:text-gray-400">No active alerts</p>
          )}
        </div>
      </div>

      {/* Employee Directory */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Employee Directory</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or medical condition..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {filteredEmployees.map((employee) => (
            <div
              key={employee._id}
              className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg cursor-pointer hover:shadow-md transition-shadow duration-150"
              onClick={() => setSelectedEmployee(employee)}
            >
              <h3 className="font-medium text-gray-900 dark:text-white">{employee.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{employee.department}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Blood Type: {employee.bloodType}</p>
            </div>
          ))}
        </div>
      </div>

      {selectedEmployee && (
        <EmployeeCard employee={selectedEmployee} onSOS={() => alert("SOS function in Admin Dashboard")} />
      )}
    </div>
  );
};

export default AdminDashboard;

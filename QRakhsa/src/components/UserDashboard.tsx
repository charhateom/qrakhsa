import React, { useState, useRef, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useAuth } from "../context/AuthContext"; // Adjust the import path as necessary

interface UserDashboardProps {
  user: {
    name: string;
    department: string;
    bloodType: string;
    medicalConditions: string[];
    emergencyContacts: { name: string; phone: string }[];
  };
}

const UserDashboard: React.FC<UserDashboardProps> = ({ user: initialUser }) => {
  const [updatedUser, setUpdatedUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [qrData, setQrData] = useState<string>("");
  const [qrError, setQrError] = useState<string | null>(null);
  const qrRef = useRef<HTMLDivElement>(null);
  const { userId } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://qrakhsa-backend.onrender.com/api/employees/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        setUpdatedUser(userData);

        // Generate a link to the user profile page using localhost
        const userProfileLink = `https://qrakhsa-backend.onrender.com/user-profile/${userId}`; // Adjust the port if necessary
        setQrData(userProfileLink);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleEmergencyContactChange = (index: number, field: string, value: string) => {
    const updatedContacts = [...updatedUser.emergencyContacts];
    updatedContacts[index] = { ...updatedContacts[index], [field]: value };
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      emergencyContacts: updatedContacts,
    }));
  };

  const handleMedicalConditionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      medicalConditions: value.split(",").map((condition) => condition.trim()),
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`https://qrakhsa-backend.onrender.com/api/employees/edit/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        throw new Error("Failed to update user data");
      }

      const updatedData = await response.json();
      setUpdatedUser(updatedData.employee);
      setIsEditing(false);
      generateUpdatedQR();
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const generateUpdatedQR = () => {
    try {
      // Generate a link to the user profile page using localhost
      const userProfileLink = `https://qrakhsa-backend.onrender.com/user-profile/${userId}`; // Adjust the port if necessary
      setQrData(userProfileLink);
      setQrError(null); // Clear any previous errors
    } catch (error) {
      setQrError("Failed to generate QR code: Data too large.");
    }
  };

  const downloadHighResQR = () => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector("canvas");
      if (canvas) {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "qraksha-qr.png";
        link.click();
      }
    }
  };

  const handleSOSCall = () => {
    // Call emergency services or send SOS alert
    alert("SOS call initiated!");
  };

  return (
    <div className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">User Dashboard</h2>

      <div className="space-y-2">
        {!isEditing ? (
          <>
            <p className="text-gray-700 dark:text-gray-300"><strong>Name:</strong> {updatedUser.name}</p>
            <p className="text-gray-700 dark:text-gray-300"><strong>Department:</strong> {updatedUser.department}</p>
            <p className="text-gray-700 dark:text-gray-300"><strong>Blood Type:</strong> {updatedUser.bloodType}</p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Medical Conditions:</strong> {updatedUser.medicalConditions.length > 0 ? updatedUser.medicalConditions.join(", ") : "None"}
            </p>
            <div>
              <strong className="text-gray-700 dark:text-gray-300">Emergency Contacts:</strong>
              <ul className="list-disc ml-4 text-gray-600 dark:text-gray-400">
                {updatedUser.emergencyContacts.map((contact, index) => (
                  <li key={index}>
                    {contact.name}: {contact.phone}
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <>
            {/* Edit Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300">Name</label>
                <input
                  type="text"
                  name="name"
                  value={updatedUser.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300">Department</label>
                <input
                  type="text"
                  name="department"
                  value={updatedUser.department}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300">Blood Type</label>
                <input
                  type="text"
                  name="bloodType"
                  value={updatedUser.bloodType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300">Medical Conditions (comma-separated)</label>
                <input
                  type="text"
                  value={updatedUser.medicalConditions.join(", ")}
                  onChange={handleMedicalConditionsChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300">Emergency Contacts</label>
                {updatedUser.emergencyContacts.map((contact, index) => (
                <div key={index} className="space-y-2">
                  <input
                    type="text"
                    value={contact.name}
                    onChange={(e) => handleEmergencyContactChange(index, "name", e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Name"
                  />
                  {/* Add this input field for relationship */}
                  <input
                    type="text"
                    value={contact.relationship || ""}
                    onChange={(e) => handleEmergencyContactChange(index, "relationship", e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Relationship"
                  />
                  <input
                    type="text"
                    value={contact.phone}
                    onChange={(e) => handleEmergencyContactChange(index, "phone", e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Phone"
                  />
                </div>
              ))}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="flex justify-between">
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
          >
            Edit Info
          </button>
        ) : (
          <div className="flex">
            <button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg mr-2"
            >
              Save & Generate New QR
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-row items-center justify-center gap-8">
        {/* QR Code Section */}
        <div className="flex flex-col items-center">
          {qrError ? (
            <p className="text-red-500">{qrError}</p>
          ) : (
            <div ref={qrRef}>
              <QRCodeCanvas
                value={qrData}
                size={150}
                level="H"
                includeMargin={true}
              />
            </div>
          )}
          <button
            onClick={downloadHighResQR}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Download QR Code
          </button>
        </div>

        {/* SOS Button Section */}
        <div className="flex flex-col items-center">
          <button
            onClick={handleSOSCall}
            className="w-36 h-36 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xl shadow-md transition-all duration-300 active:translate-y-1 active:shadow-sm flex items-center justify-center relative animate-pulse"
            style={{
              boxShadow: `
                0 4px 6px rgba(0, 0, 0, 0.2),
                0 1px 3px rgba(0, 0, 0, 0.08),
                0 8px 12px -4px rgba(0, 0, 0, 0.3),
                inset 0 -3px 0 rgba(0, 0, 0, 0.2)
              `,
            }}
          >
            SOS
            <div
              className="absolute top-0 left-0 w-full h-full rounded-full pointer-events-none"
              style={{
                background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3), transparent)`,
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

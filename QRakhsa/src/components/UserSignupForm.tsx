import React, { useState } from "react"; // Removed useRef
import axios from "axios";
// Removed QRCodeCanvas and related imports as they are no longer displayed here
// If QRCode is used elsewhere, keep 'import QRCode from "qrcode.react";'

const UserSignupForm: React.FC = () => {
  // Form state (remains the same)
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [medicalConditions, setMedicalConditions] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  // Emergency contacts state (remains the same)
  const [emergencyContacts, setEmergencyContacts] = useState<
    { name: string; phone: string }[]
  >([]);
  const [newContactName, setNewContactName] = useState("");
  const [newContactPhone, setNewContactPhone] = useState("");

  // Submission state (removed qrData and qrRef)
  const [submitted, setSubmitted] = useState(false);

  // Add emergency contact (remains the same)
  const addEmergencyContact = () => {
    if (newContactName.trim() && newContactPhone.trim()) {
      setEmergencyContacts([
        ...emergencyContacts,
        { name: newContactName.trim(), phone: newContactPhone.trim() },
      ]);
      setNewContactName("");
      setNewContactPhone("");
    }
  };

  // Handle user signup (modified)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !department || !bloodType || !password || !username) {
      alert("Please fill in all required fields.");
      return;
    }

    const userData = {
      name,
      department,
      bloodType,
      medicalConditions: medicalConditions
        .split(",")
        .map((cond) => cond.trim())
        .filter(Boolean),
      emergencyContacts,
      password,
      username,
    };

    try {
      const response = await axios.post(
        "https://qrakhsa-backend.onrender.com/api/employees/register",
        userData
      );

      if (response.status === 201) {
        alert("Registration successful!");
        setSubmitted(true); // Set submitted to true to show the success message

        // --- REMOVED QR CODE FETCHING LOGIC ---
        // const employeeId = response.data.employee._id;
        // try {
        //   const qrResponse = await axios.get(
        //     `http://localhost:5000/api/employees/${employeeId}`
        //   );
        //   if (qrResponse.status === 200 && qrResponse.data.qrCode) {
        //     // setQrData(qrResponse.data.qrCode); // No longer setting QR data here
        //   } else {
        //     alert("Failed to fetch QR code after registration.");
        //     // setQrData(null);
        //   }
        // } catch (qrError: any) {
        //   console.error("Error fetching QR code:", qrError);
        //   alert("Error fetching QR code after registration.");
        //   // setQrData(null);
        // }
        // --- END OF REMOVED LOGIC ---

      }
    } catch (error: any) {
      // Improved error handling slightly
      const errorMessage = error.response?.data?.error || "Registration failed. Please check your details or try again later.";
      alert(errorMessage);
      console.error("Registration error:", error.response || error);
    }
  };

  // --- REMOVED downloadHighResQR FUNCTION ---
  // const downloadHighResQR = () => { ... };

  return (
    <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        User Signup
      </h2>

      {!submitted ? (
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Form fields remain the same */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
               className="w-full border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
               className="w-full border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="Enter your password"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Department
            </label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
               className="w-full border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="Enter your department"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Blood Type
            </label>
            <input
              type="text"
              value={bloodType}
              onChange={(e) => setBloodType(e.target.value)}
               className="w-full border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="Enter your blood type"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Medical Conditions (Optional)
            </label>
            <input
              type="text"
              value={medicalConditions}
              onChange={(e) => setMedicalConditions(e.target.value)}
               className="w-full border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="e.g., Asthma, Diabetes (comma-separated)"
            />
          </div>

          {/* Emergency Contacts */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Emergency Contacts (Optional)
            </label>
             {/* Display existing contacts */}
             <ul className="mb-2 space-y-1">
              {emergencyContacts.map((contact, index) => (
                <li key={index} className="text-sm text-gray-600 dark:text-gray-400">
                  {contact.name} - {contact.phone}
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-2 mb-2">
              <input
                type="text"
                value={newContactName}
                onChange={(e) => setNewContactName(e.target.value)}
                 className="border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none flex-1"
                placeholder="Contact Name"
              />
              <input
                type="tel" // Use type="tel" for phone numbers
                value={newContactPhone}
                onChange={(e) => setNewContactPhone(e.target.value)}
                 className="border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none flex-1"
                placeholder="Contact Phone"
              />
              <button
                type="button"
                onClick={addEmergencyContact}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition duration-150 ease-in-out"
                disabled={!newContactName.trim() || !newContactPhone.trim()} // Disable if fields are empty
              >
                Add Contact
              </button>
            </div>

          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-3 rounded-lg w-full transition duration-150 ease-in-out"
          >
            Register
          </button>
        </form>
      ) : (
        // --- MODIFIED SUCCESS MESSAGE ---
        <div className="text-center mt-6">
          <h3 className="text-xl font-bold text-green-600 dark:text-green-400">
            Registration Successful!
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Thank you for registering. Please log in to your account to view and download your QR code.
          </p>
           {/* Optionally add a link to the login page */}
           {/* <a href="/login" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-150 ease-in-out">
             Go to Login
           </a> */}
        </div>
        // --- END OF MODIFIED SUCCESS MESSAGE ---
      )}
    </div>
  );
};

export default UserSignupForm;

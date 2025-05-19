import React, { useState } from 'react';
import axios from 'axios';
import { Phone, Heart, Building2, AlertTriangle, CheckCircle } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import type { Employee } from '../types';

interface EmployeeCardProps {
  employee: Employee;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [sosSent, setSosSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSOSClick = () => {
    setShowConfirm(true);
    setError(null);
  };

  const handleConfirm = async () => {
    setShowConfirm(false);
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `https://qrakhsa-backend.onrender.com/api/sos/${employee.id}`,
        {}, // No body needed
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setSosSent(true);
      } else {
        setError('Failed to send SOS alert. Please try again.');
      }
    } catch (err) {
      console.error('Error sending SOS:', err);
      setError('An error occurred while sending the SOS.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{employee.name}</h2>
          <p className="text-gray-600 dark:text-gray-400 flex items-center mt-1">
            <Building2 className="h-4 w-4 mr-1" />
            {employee.department}
          </p>
        </div>
        <div className="flex flex-col items-center">
          <QRCodeSVG
            value={`https://emergency-qr.app/profile/${employee.id}`}
            size={100}
            level="H"
            includeMargin={true}
          />
          <span className="text-sm text-gray-500 dark:text-gray-400 mt-2">ID: {employee.id}</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <Heart className="h-5 w-5 text-red-500 mr-2" />
          <span className="font-medium text-gray-700 dark:text-gray-300">Blood Type: {employee.bloodType}</span>
        </div>

        <div>
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">Medical Conditions</h3>
          <div className="flex flex-wrap gap-2">
            {employee.medicalConditions.map((condition, index) => (
              <span
                key={index}
                className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-sm px-3 py-1 rounded-full"
              >
                {condition}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">Emergency Contacts</h3>
          <div className="space-y-2">
            {employee.emergencyContacts.map((contact, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">{contact.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{contact.relationship}</p>
                </div>
                <a
                  href={`tel:${contact.phone}`}
                  className="inline-flex items-center text-blue-600 dark:text-blue-500 hover:text-blue-800 dark:hover:text-blue-400"
                >
                  <Phone className="h-4 w-4 mr-1" />
                  {contact.phone}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6">
        {sosSent ? (
          <div className="flex items-center justify-center bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 py-3 px-4 rounded-lg">
            <CheckCircle className="h-5 w-5 mr-2" />
            SOS Alert Sent Successfully
          </div>
        ) : !showConfirm ? (
          <button
            onClick={handleSOSClick}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-colors"
            disabled={loading}
          >
            {loading ? "Sending..." : (
              <>
                <AlertTriangle className="h-5 w-5 mr-2" />
                SOS Emergency Alert
              </>
            )}
          </button>
        ) : (
          <div className="space-y-2">
            <p className="text-center text-red-600 dark:text-red-500 font-medium">
              Are you sure you want to send an emergency alert?
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleConfirm}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
                disabled={loading}
              >
                {loading ? "Sending..." : "Confirm SOS"}
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-bold py-2 px-4 rounded-lg"
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {error && <p className="text-center text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default EmployeeCard;

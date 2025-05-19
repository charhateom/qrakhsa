const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Added username field
  name: { type: String, required: true },
  bloodType: { type: String, required: true },
  department: { type: String, required: true },
  emergencyContacts: [
    { name: String, relationship: String, phone: String }
  ],
  medicalConditions: [String], 
  qrCode: { type: String, default: "" }, 
  password: { type: String, required: true } // Password for authentication
});

module.exports = mongoose.model("Employee", EmployeeSchema);

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const QRCode = require("qrcode");
const Employee = require("../models/Employee");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Register Employee & Generate QR Code
router.post("/register", async (req, res) => {
  try {
    const { username, name, bloodType, department, emergencyContacts, medicalConditions, password } = req.body;

    console.log(req.body);

    // Validate required fields
    if (!username || !name || !bloodType || !department || !Array.isArray(emergencyContacts) || emergencyContacts.length === 0 || !password) {
      return res.status(400).json({ error: "All fields are required, and emergencyContacts must be a non-empty array." });
    }

    // Check if username already 
    const existingEmployee = await Employee.findOne({ username });
    if (existingEmployee) {
      return res.status(400).json({ error: "Username already taken. Please choose a different one." });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new employee
    const employee = new Employee({
      username,
      name,
      bloodType,
      department,
      emergencyContacts,
      medicalConditions,
      password: hashedPassword // Save hashed password
    });

    await employee.save(); // Save employee first to get the ID

    // Generate QR Code using Employee ID
    const qrCodeURL = await QRCode.toDataURL(`https://qrakhsa-backend.onrender.com/user-profile/${employee._id}`);
    employee.qrCode = qrCodeURL;
    console.log(employee.qrCode)
    
    await employee.save(); // Save QR Code in DB

    res.status(201).json({
      message: "Employee Registered Successfully!",
      employee: { ...employee.toObject(), password: undefined } // Exclude password
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Employee Login
// Employee Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required." });
    }

    // Find Employee by username
    const employee = await Employee.findOne({ username });
    if (!employee) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Check Password
    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: employee._id, username: employee.username }, JWT_SECRET, { expiresIn: "1h" });

    // ✅ Include `userId` in response
    res.json({ message: "Login successful!", token, userId: employee._id });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Edit Employee Details by ID
router.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { username, name, bloodType, department, emergencyContacts, medicalConditions, password } = req.body;

    // Validate required fields
    if (!username || !name || !bloodType || !department || !Array.isArray(emergencyContacts) || emergencyContacts.length === 0) {
      return res.status(400).json({ error: "All fields are required, and emergencyContacts must be a non-empty array." });
    }

    // Validate emergencyContacts structure
    if (!emergencyContacts.every(contact => 
      typeof contact === "object" && 
      contact.name && 
      contact.relationship && 
      contact.phone
    )) {
      return res.status(400).json({ error: "Each emergency contact must be an object with 'name', 'relationship', and 'phone' fields." });
    }

    // Find the employee by ID
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found." });
    }

    // Check if the new username is already taken by another employee
    if (username !== employee.username) {
      const existingEmployee = await Employee.findOne({ username });
      if (existingEmployee) {
        return res.status(400).json({ error: "Username already taken. Please choose a different one." });
      }
    }

    // Update employee details
    employee.username = username;
    employee.name = name;
    employee.bloodType = bloodType;
    employee.department = department; 
    employee.emergencyContacts = emergencyContacts; // Ensure this matches the schema
    employee.medicalConditions = medicalConditions;

    // Update password if provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      employee.password = hashedPassword;
    }

    // Save the updated employee
    await employee.save();

    res.status(200).json({
      message: "Employee details updated successfully!",
      employee: { ...employee.toObject(), password: undefined } // Exclude password
    });
  } catch (error) {
    console.error("Edit Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Get Employee by ID (for QR Code Scanning)
router.get("/user-profile/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).lean();
    if (!employee) return res.status(404).json({ message: "Employee Not Found" });

    res.json(employee);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

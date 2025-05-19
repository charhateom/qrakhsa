const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Employee = require("../models/Employee");
const SOSAlert = require("../models/SOSAlert");
const authMiddleware = require("../middleware/auth");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    // Check if the admin already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ error: "Admin already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password.trim(), salt);

    // Create new admin
    const newAdmin = new Admin({ username, password: hashedPassword });
    await newAdmin.save();

    // Generate JWT token
    const token = jwt.sign({ id: newAdmin._id, username: newAdmin.username }, JWT_SECRET, { expiresIn: "10d" });

    res.status(201).json({ message: "Admin registered successfully", token });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// ✅ Admin Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const trimmedPassword = password.trim(); // Trim the password
    console.log("Login Attempt:", { username, password: trimmedPassword });

    const admin = await Admin.findOne({ username });
    console.log("Found Admin:", admin);

    if (!admin) {
      return res.status(401).json({ error: "Invalid credentials - User not found" });
    }

    console.log("Stored Hashed Password:", admin.password);
    console.log("Provided Password:", trimmedPassword);

    const isMatch = await bcrypt.compare(trimmedPassword, admin.password);
    console.log("Password Match:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials - Incorrect password" });
    }

    const token = jwt.sign({ id: admin._id, username: admin.username }, JWT_SECRET, { expiresIn: "10d" });

    res.json({ message: "Login successful!", token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Fetch All Employees (Protected)
router.get("/employees", authMiddleware, async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Fetch All SOS Alerts (Protected)
router.get("/sos-alerts", authMiddleware, async (req, res) => {
  try {
    const alerts = await SOSAlert.find().sort({ timestamp: -1 });
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Fetch Employee by ID (Protected)
router.get("/employee/:id", authMiddleware, async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json(employee);
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Delete Employee by ID (Protected)
router.delete("/del/employee/:id", authMiddleware, async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Resolve SOS Alert (Protected)
router.delete("/resolve-sos/:id", authMiddleware, async (req, res) => {
  try {
    const alert = await SOSAlert.findById(req.params.id);
    if (!alert) {
      return res.status(404).json({ error: "SOS Alert not found" });
    }

    await SOSAlert.findByIdAndDelete(req.params.id);
    res.json({ message: "SOS Alert resolved and removed" });
  } catch (error) {
    console.error("Error resolving SOS alert:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

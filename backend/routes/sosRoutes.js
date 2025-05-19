const express = require("express");
const twilio = require("twilio");
const Employee = require("../models/Employee");
const SOSAlert = require("../models/SOSAlert");

const router = express.Router();
const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// Trigger SOS Alert
// Trigger SOS Alert & Save in DB
router.post("/:id/sos", async (req, res) => {
    try {
      const employee = await Employee.findById(req.params.id);
      if (!employee) return res.status(404).json({ message: "Employee Not Found" });
  
      const message = `🚨 SOS Alert! ${employee.name} needs help! Contact: ${employee.emergencyContacts[0].phone}`;
  
      // Save SOS alert
      const alert = new SOSAlert({ employeeId: employee._id, employeeName: employee.name });
      await alert.save();
  
      res.json({ message: "SOS Alert Sent & Logged!" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

module.exports = router;

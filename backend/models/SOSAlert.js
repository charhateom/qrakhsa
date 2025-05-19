const mongoose = require("mongoose");
const SOSAlertSchema = new mongoose.Schema({
  employeeId: String,
  employeeName: String,
  timestamp: { type: Date, default: Date.now },
});
module.exports = mongoose.model("SOSAlert", SOSAlertSchema);
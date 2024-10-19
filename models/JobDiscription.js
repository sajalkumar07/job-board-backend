const mongoose = require("mongoose");

const JobDescriptionSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  jobDescription: { type: String, required: true },
  experienceLevel: { type: String, required: true },
  addCandidate: { type: [String], required: true }, // Changed to an array of strings
  endDate: { type: String, required: true },
});

module.exports = mongoose.model("JobDescription", JobDescriptionSchema);

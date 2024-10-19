const JobDescription = require("../models/JobDiscription");

// Controller to handle posting a job
exports.postJob = async (req, res) => {
  const { jobTitle, jobDescription, experienceLevel, addCandidate, endDate } =
    req.body;

  // Validate required fields
  if (
    !jobTitle ||
    !jobDescription ||
    !experienceLevel ||
    !addCandidate ||
    !endDate
  ) {
    return res.status(400).send({ error: "All fields are required" });
  }

  // Validate addCandidate to ensure it's an array of emails
  if (
    !Array.isArray(addCandidate) ||
    !addCandidate.every((email) => typeof email === "string")
  ) {
    return res
      .status(400)
      .send({ error: "addCandidate must be an array of email addresses" });
  }

  try {
    const newJob = new JobDescription({
      jobTitle,
      jobDescription,
      experienceLevel,
      addCandidate, // Store the array of emails
      endDate,
    });

    await newJob.save();
    res.status(201).send({ message: "Job posted successfully", job: newJob });
  } catch (error) {
    res.status(500).send({ error: "Error posting job: " + error.message });
  }
};

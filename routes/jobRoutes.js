const express = require("express");
const router = express.Router();
const { postJob } = require("../controllers/jobController");
const authenticateCompany = require("../middleware/authenticateCompany");

// POST route to create a job
router.post("/postJob", authenticateCompany, postJob);

module.exports = router;

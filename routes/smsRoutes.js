const express = require("express");
const router = express.Router();

const { sendSMS } = require("../controllers/smsContorller");

router.post("/sendsms", sendSMS);

module.exports = router;

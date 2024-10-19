const express = require("express");
const router = express.Router();

const mailController = require("../controllers/mailController");

router.post("/sendmail", mailController.sendMail);

module.exports = router;

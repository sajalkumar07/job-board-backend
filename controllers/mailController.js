const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const expressAsyncHandler = require("express-async-handler"); // Assuming this is correctly imported
const otpGenerator = require("./otpConttoller");
dotenv.config();

// Create the transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // set to true for 465, false for other ports
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});
console.log(
  process.env.SMTP_HOST,
  process.env.SMTP_PORT,
  process.env.SMTP_MAIL,
  process.env.SMTP_PASSWORD
);

// Define the sendMail function
const sendMail = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;
  console.log(email);

  const otp = otpGenerator();
  console.log("Generated OTP:", otp);

  // Construct mail options
  const mailOptions = {
    from: process.env.EMAIL, // sender address
    to: email, // receiver's email
    subject: "Your Otp For Verification", // Subject line
    text: `Your Otp is ${otp}`, // Plain text body
  };
  console.log(email);
  // Send the email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return res.status(500).send("Failed to send email.");
    } else {
      console.log("Email sent successfully:", info.response);
      return res.status(200).send("Email sent successfully!");
    }
  });
});

module.exports = { sendMail };

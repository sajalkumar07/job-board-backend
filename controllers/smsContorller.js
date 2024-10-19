const twilio = require("twilio");
const generateOTP = require("./otpConttoller");

// Twilio configuration
const twilioClient = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

// Helper function to format phone number
const formatPhoneNumber = (phoneNumber) => {
  // Remove any non-digit characters
  const cleanNumber = phoneNumber.replace(/\D/g, "");

  // Assume it's an Indian number if it doesn't start with '+' or '91'
  if (!cleanNumber.startsWith("91") && !phoneNumber.startsWith("+")) {
    return `+91${cleanNumber}`;
  } else if (cleanNumber.startsWith("91")) {
    return `+${cleanNumber}`;
  } else {
    return phoneNumber; // Already in international format
  }
};

const sendSMS = async (req, res) => {
  let { phoneNumber } = req.body;

  console.log("Original phone number:", phoneNumber);

  if (!phoneNumber) {
    return res.status(400).json({ error: "Phone number is required" });
  }

  // Format the phone number
  phoneNumber = formatPhoneNumber(phoneNumber);
  console.log("Formatted phone number:", phoneNumber);

  const otp = generateOTP();
  console.log("Generated OTP:", otp);

  try {
    const result = await twilioClient.messages.create({
      body: `Your OTP for verification is: ${otp}`,
      from: twilioPhoneNumber,
      to: phoneNumber,
    });

    console.log("SMS sent successfully. Message SID:", result.sid);
    res.json({ success: true, messageSid: result.sid });
  } catch (error) {
    console.error("Error sending SMS:", error.message, error.code);
    res.status(500).json({
      error: "Failed to send SMS",
      details: error.message,
      code: error.code,
    });
  }
};

module.exports = { sendSMS };

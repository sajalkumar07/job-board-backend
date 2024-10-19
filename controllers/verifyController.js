const crypto = require("crypto");
const User = require("./models/User");

function generateOtp() {
  // Generate a random 6-digit OTP
  return crypto.randomInt(100000, 999999).toString();
}

async function sendOtpToUser(email, phone) {
  const otp = generateOtp();

  // Find the user by email or phone
  let user = await User.findOne({ $or: [{ email }, { phone }] });

  if (!user) {
    // If the user doesn't exist, create a new one (optional based on your logic)
    user = new User({ email, phone });
  }

  // Update user with new OTP, OTP created time, and reset attempts
  user.otp = otp;
  user.otpCreatedAt = new Date(); // Record when the OTP was created
  user.otpAttempts = 0; // Reset OTP attempts

  // Save the user
  await user.save();

  // Send OTP to the user (via email or phone)
  // For example: sendEmail(user.email, `Your OTP is: ${otp}`);
  // Or use a phone service to send SMS
}

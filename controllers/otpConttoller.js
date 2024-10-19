// otpGenerator.js
const otpGenerator = require("otp-generator");

const generateOTP = () => {
  return otpGenerator.generate(4, {
    upperCaseAlphabets: false,
    specialChars: false,
    digits: true, // Ensure only digits are used
    lowerCaseAlphabets: false, // No lowercase letters
  });
};

module.exports = generateOTP;

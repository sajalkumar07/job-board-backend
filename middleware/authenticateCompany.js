const jwt = require("jsonwebtoken");

// Middleware to authenticate the company
const authenticateCompany = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Get token after "Bearer"

  if (!token) {
    console.log("No token provided");
    return res.status(401).send("Access Denied: No Token Provided");
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.company = verified; // Attach company info to the request
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Token verification error:", error.message);
    res.status(400).send("Invalid Token");
  }
};

module.exports = authenticateCompany;

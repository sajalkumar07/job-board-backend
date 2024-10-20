const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const mailRoutes = require("./routes/mailRoutes");
const smsRoutes = require("./routes/smsRoutes");
const jobRoutes = require("./routes/jobRoutes");

const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:3000", // Allow localhost during development
      "https://job-board-frontend-3zcxq4qpf-sajalkumar07s-projects.vercel.app", // Allow your deployed frontend
    ], // Your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const PORT = process.env.PORT || 8080;

// Connect to MongoDB
connectDB();

// Use user routes
app.use("/api/users", userRoutes);
app.use("/api/mail", mailRoutes);
app.use("/api/sms", smsRoutes);
app.use("/api/jobs", jobRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

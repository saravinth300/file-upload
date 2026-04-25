require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// DB Connect
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Static folder for images
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/images", require("./routes/imageRoutes"));

// Server Start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
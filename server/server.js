const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const rideRoutes = require("./routes/rideRoutes");
const rideRequestRoutes = require("./routes/rideRequestRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/rides", rideRoutes);
app.use("/api/ride-requests", rideRequestRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "UniVah API is running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`UniVah server running on port ${PORT}`);
});
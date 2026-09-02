const express = require("express");

const {
  createRide,
  getRides,
  getRideById,
} = require("../controllers/rideController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Get all available rides
router.get("/", getRides);

// Get a single ride
router.get("/:id", getRideById);

// Create a new ride
router.post("/", protect, createRide);

module.exports = router;
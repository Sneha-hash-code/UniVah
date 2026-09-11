const express = require("express");
 
const {
  createRide,
  getRides,
  getRideById,
  getMyRides,
  completeRide,
  updateRideStatus,
} = require("../controllers/rideController");
 
const protect = require("../middleware/authMiddleware");
 
const router = express.Router();
 
// Get all available rides
router.get("/", getRides);
 
// Get rides created by logged-in driver
router.get("/my-rides", protect, getMyRides);
 
// Get a single ride
router.get("/:id", getRideById);
 
// Create a new ride
router.post("/", protect, createRide);
 
// Mark ride as completed
router.patch("/:id/complete", protect, completeRide);
 
// Update ride status
router.patch("/:id/status", protect, updateRideStatus);
 
module.exports = router;
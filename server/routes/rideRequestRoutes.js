const express = require("express");

const {
  createRideRequest,
  getRideRequests,
  getMyRideRequests,
  updateRideRequestStatus,
} = require("../controllers/rideRequestController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Passenger sends request
router.post("/", protect, createRideRequest);

// Driver gets requests for their ride
router.get("/ride/:rideId", protect, getRideRequests);

// Passenger gets their own requests
router.get("/my", protect, getMyRideRequests);

// Driver accepts/rejects request
router.patch("/:requestId/status", protect, updateRideRequestStatus);

module.exports = router; 
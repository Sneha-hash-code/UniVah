const mongoose = require("mongoose");
const RideRequest = require("../models/RideRequest");
const Ride = require("../models/Ride");

// @desc    Send a request to join a ride
// @route   POST /api/ride-requests
// @access  Private
const createRideRequest = async (req, res) => {
  try {
    const { rideId } = req.body;

    if (!rideId) {
      return res.status(400).json({
        message: "Ride ID is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(rideId)) {
      return res.status(400).json({
        message: "Invalid ride ID format",
      });
    }

    const ride = await Ride.findById(rideId);

    if (!ride) {
      return res.status(404).json({
        message: "Ride not found",
      });
    }

    // Make sure ride is still available
    if (ride.status !== "Published") {
      return res.status(400).json({
        message: "This ride is no longer available",
      });
    }

    // Make sure seats are available
    if (ride.availableSeats < 1) {
      return res.status(400).json({
        message: "No seats are available on this ride",
      });
    }

    // Prevent driver from requesting own ride
    if (ride.driver.toString() === req.userId.toString()) {
      return res.status(400).json({
        message: "You cannot request your own ride",
      });
    }

    // Check duplicate request
    const existingRequest = await RideRequest.findOne({
      ride: rideId,
      passenger: req.userId,
    });

    if (existingRequest) {
      return res.status(409).json({
        message: "You have already requested this ride",
        request: existingRequest,
      });
    }

    const request = await RideRequest.create({
      ride: rideId,
      passenger: req.userId,
      status: "Pending",
    });

    const populatedRequest = await RideRequest.findById(request._id)
      .populate("passenger", "name email phone role")
      .populate("ride");

    res.status(201).json({
      message: "Ride request sent successfully",
      request: populatedRequest,
    });
  } catch (error) {
    console.error("Create ride request error:", error);

    // Handle duplicate-key race condition
    if (error.code === 11000) {
      return res.status(409).json({
        message: "You have already requested this ride",
      });
    }

    res.status(500).json({
      message: "Something went wrong while sending the ride request",
    });
  }
};

// @desc    Get requests for a ride
// @route   GET /api/ride-requests/ride/:rideId
// @access  Private
const getRideRequests = async (req, res) => {
  try {
    const { rideId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(rideId)) {
      return res.status(400).json({
        message: "Invalid ride ID format",
      });
    }

    const ride = await Ride.findById(rideId);

    if (!ride) {
      return res.status(404).json({
        message: "Ride not found",
      });
    }

    // Only the driver who owns the ride can see requests
    if (ride.driver.toString() !== req.userId.toString()) {
      return res.status(403).json({
        message: "You are not authorized to view these requests",
      });
    }

    const requests = await RideRequest.find({
      ride: rideId,
    })
      .populate("passenger", "name email phone role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      requests,
    });
  } catch (error) {
    console.error("Get ride requests error:", error);

    res.status(500).json({
      message: "Something went wrong while fetching ride requests",
    });
  }
};

// @desc    Get passenger's own ride requests
// @route   GET /api/ride-requests/my
// @access  Private
const getMyRideRequests = async (req, res) => {
  try {
    const requests = await RideRequest.find({
      passenger: req.userId,
    })
      .populate({
        path: "ride",
        populate: {
          path: "driver",
          select: "name email phone role",
        },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      requests,
    });
  } catch (error) {
    console.error("Get my ride requests error:", error);

    res.status(500).json({
      message: "Something went wrong while fetching your requests",
    });
  }
};

// @desc    Accept or reject a passenger request
// @route   PATCH /api/ride-requests/:requestId/status
// @access  Private
const updateRideRequestStatus = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body;

    if (!["Accepted", "Rejected"].includes(status)) {
      return res.status(400).json({
        message: "Status must be Accepted or Rejected",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(requestId)) {
      return res.status(400).json({
        message: "Invalid request ID format",
      });
    }

    const request = await RideRequest.findById(requestId).populate("ride");

    if (!request) {
      return res.status(404).json({
        message: "Ride request not found",
      });
    }

    const ride = request.ride;

    if (!ride) {
      return res.status(404).json({
        message: "Associated ride not found",
      });
    }

    // Make sure this driver owns the ride
    if (ride.driver.toString() !== req.userId.toString()) {
      return res.status(403).json({
        message: "You are not authorized to manage this request",
      });
    }

    // Only pending requests can be changed
    if (request.status !== "Pending") {
      return res.status(400).json({
        message: `This request has already been ${request.status.toLowerCase()}`,
      });
    }

    // Reject request
    if (status === "Rejected") {
      request.status = "Rejected";
      await request.save();

      const populatedRequest = await RideRequest.findById(request._id)
        .populate("passenger", "name email phone role")
        .populate("ride");

      return res.status(200).json({
        message: "Ride request rejected",
        request: populatedRequest,
      });
    }

    // Accept request
    // Atomically reserve one available seat.
    const updatedRide = await Ride.findOneAndUpdate(
      {
        _id: ride._id,
        status: "Published",
        availableSeats: { $gt: 0 },
      },
      {
        $inc: { availableSeats: -1 },
      },
      {
        new: true,
      }
    );

    // If no ride was updated, there were no seats available
    if (!updatedRide) {
      return res.status(400).json({
        message: "No seats are available on this ride",
      });
    }

    request.status = "Accepted";
    await request.save();

    const populatedRequest = await RideRequest.findById(request._id)
      .populate("passenger", "name email phone role")
      .populate("ride");

    return res.status(200).json({
      message: "Ride request accepted successfully",
      request: populatedRequest,
      ride: updatedRide,
    });
  } catch (error) {
    console.error("Update ride request status error:", error);

    res.status(500).json({
      message: "Something went wrong while updating the ride request",
    });
  }
};

module.exports = {
  createRideRequest,
  getRideRequests,
  getMyRideRequests,
  updateRideRequestStatus,
};
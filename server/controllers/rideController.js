const mongoose = require("mongoose");
const Ride = require("../models/Ride");
const User = require("../models/User");

// @desc    Create a new ride
// @route   POST /api/rides
// @access  Private
const createRide = async (req, res) => {
  try {
    const {
      from,
      to,
      date,
      departureTime,
      availableSeats,
      price,
      vehicle,
      description,
    } = req.body;

    if (
      !from ||
      !to ||
      !date ||
      !departureTime ||
      !availableSeats ||
      price === undefined ||
      !vehicle
    ) {
      return res.status(400).json({
        message: "Please provide all required ride details",
      });
    }

    if (req.user && req.user.role !== "driver") {
      await User.findByIdAndUpdate(req.userId, { role: "driver" });
    }

    const ride = await Ride.create({
      driver: req.userId,
      from,
      to,
      date,
      departureTime,
      availableSeats,
      price,
      vehicle,
      description: description || "",
    });

    const populatedRide = await Ride.findById(ride._id).populate(
      "driver",
      "name email phone role"
    );

    res.status(201).json({
      message: "Ride published successfully",
      ride: populatedRide,
    });
  } catch (error) {
    console.error("Create ride error:", error);
    res.status(500).json({
      message: "Something went wrong while publishing the ride",
    });
  }
};

// @desc    Get all available rides
// @route   GET /api/rides
// @access  Public
const getRides = async (req, res) => {
  try {
    const rides = await Ride.find({
      status: "Published",
    })
      .populate("driver", "name email phone role")
      .sort({
        date: 1,
        departureTime: 1,
      });

    res.status(200).json({
      rides,
    });
  } catch (error) {
    console.error("Get rides error:", error);
    res.status(500).json({
      message: "Something went wrong while fetching rides",
    });
  }
};

// @desc    Get rides created by the logged-in driver
// @route   GET /api/rides/my-rides
// @access  Private
const getMyRides = async (req, res) => {
  try {
    const rides = await Ride.find({
      driver: req.userId,
    })
      .populate("driver", "name email phone role")
      .sort({
        date: 1,
        departureTime: 1,
      });

    res.status(200).json({
      rides,
    });
  } catch (error) {
    console.error("Get my rides error:", error);
    res.status(500).json({
      message: "Something went wrong while fetching your rides",
    });
  }
};

// @desc    Get a single ride
// @route   GET /api/rides/:id
// @access  Public
const getRideById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        message: "Ride not found",
      });
    }

    const ride = await Ride.findById(id).populate(
      "driver",
      "name email phone role"
    );

    if (!ride) {
      return res.status(404).json({
        message: "Ride not found",
      });
    }

    res.status(200).json({
      ride,
    });
  } catch (error) {
    console.error("Get ride error:", error);
    res.status(500).json({
      message: "Something went wrong while fetching the ride",
    });
  }
};

// @desc    Mark ride as completed
// @route   PATCH /api/rides/:id/complete
// @access  Private
const completeRide = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid ride ID format",
      });
    }

    const ride = await Ride.findById(id);

    if (!ride) {
      return res.status(404).json({
        message: "Ride not found",
      });
    }

    // Only the driver who created the ride can complete it
    if (ride.driver.toString() !== req.userId.toString()) {
      return res.status(403).json({
        message: "You are not authorized to complete this ride",
      });
    }

    // Only published rides can be completed
    if (ride.status !== "Published") {
      return res.status(400).json({
        message: `This ride has already been ${ride.status.toLowerCase()}`,
      });
    }

    ride.status = "Completed";
    await ride.save();

    const updatedRide = await Ride.findById(ride._id).populate(
      "driver",
      "name email phone role"
    );

    res.status(200).json({
      message: "Ride marked as completed",
      ride: updatedRide,
    });
  } catch (error) {
    console.error("Complete ride error:", error);
    res.status(500).json({
      message: "Something went wrong while completing the ride",
    });
  }
};

// @desc    Update ride status
// @route   PATCH /api/rides/:id/status
// @access  Private
const updateRideStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid ride ID format",
      });
    }

    if (!["Completed", "Cancelled"].includes(status)) {
      return res.status(400).json({
        message: "Status must be Completed or Cancelled",
      });
    }

    const ride = await Ride.findById(id);

    if (!ride) {
      return res.status(404).json({
        message: "Ride not found",
      });
    }

    // Only the driver who created the ride can change its status
    if (ride.driver.toString() !== req.userId.toString()) {
      return res.status(403).json({
        message: "You are not authorized to update this ride",
      });
    }

    // Only published rides can be completed or cancelled
    if (ride.status !== "Published") {
      return res.status(400).json({
        message: `This ride has already been ${ride.status.toLowerCase()}`,
      });
    }

    ride.status = status;
    await ride.save();

    const updatedRide = await Ride.findById(ride._id).populate(
      "driver",
      "name email phone role"
    );

    res.status(200).json({
      message:
        status === "Completed"
          ? "Ride marked as completed"
          : "Ride cancelled successfully",
      status: updatedRide.status,
      ride: updatedRide,
    });
  } catch (error) {
    console.error("Update ride status error:", error);
    res.status(500).json({
      message: "Something went wrong while updating ride status",
    });
  }
};

module.exports = {
  createRide,
  getRides,
  getRideById,
  getMyRides,
  completeRide,
  updateRideStatus,
};
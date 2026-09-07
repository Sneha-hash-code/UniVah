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

    // Validate required fields
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

    // Ensure user role reflects driver status if they are publishing
    if (req.user && req.user.role !== "driver") {
      await User.findByIdAndUpdate(req.userId, { role: "driver" });
    }

    // Create ride
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

    // Return populated driver information
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

module.exports = {
  createRide,
  getRides,
  getRideById,
  getMyRides,
};
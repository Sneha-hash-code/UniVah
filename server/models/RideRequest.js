const mongoose = require("mongoose");

const rideRequestSchema = new mongoose.Schema(
  {
    ride: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ride",
      required: true,
    },

    passenger: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected", "Cancelled"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent the same passenger from requesting the same ride twice
rideRequestSchema.index(
  { ride: 1, passenger: 1 },
  { unique: true }
);

module.exports = mongoose.model("RideRequest", rideRequestSchema);
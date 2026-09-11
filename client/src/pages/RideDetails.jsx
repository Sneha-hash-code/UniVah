import { useEffect, useState } from "react";
import { useRide } from "../context/RideContext";
import { useAuth } from "../context/AuthContext";

import {
  AlertTriangle,
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Star,
  Users,
  X,
} from "lucide-react";

import { Link, useParams } from "react-router-dom";
import RideMap from "../components/rides/RideMap";

function RideDetails() {
  const { id } = useParams();
  const { user } = useAuth();

  const { requestRide, loading: requestLoading } = useRide();

  const [ride, setRide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [requestError, setRequestError] = useState("");

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [actionError, setActionError] = useState("");
  const [actionSuccess, setActionSuccess] = useState("");

  // Fetch ride details
  useEffect(() => {
    const fetchRide = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:5000/api/rides/${id}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Ride not found");
        }

        setRide(data.ride);
      } catch (err) {
        console.error("Fetch ride error:", err);
        setError(err.message || "Unable to load ride details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRide();
    }
  }, [id]);

  // Check if current user is the driver
  const isDriver = Boolean(
    user &&
    ride?.driver &&
    (user._id === ride.driver?._id ||
     user._id === ride.driver ||
     user.id === ride.driver?._id ||
     user.id === ride.driver)
  );

  // Send real ride request
  const handleRequestRide = async () => {
    try {
      setRequestError("");

      await requestRide(ride);

      setRequestSent(true);
    } catch (err) {
      console.error("Ride request error:", err);

      setRequestError(
        err.message || "Unable to send ride request"
      );
    }
  };

  // Driver Cancel Ride handler
  const handleCancelRide = async () => {
    try {
      setCancelLoading(true);
      setActionError("");
      setActionSuccess("");

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please log in to cancel this ride.");
      }

      const response = await fetch(
        `http://localhost:5000/api/rides/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: "Cancelled",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to cancel ride.");
      }

      if (data?.ride) {
        setRide(data.ride);
      } else {
        setRide((prev) => (prev ? { ...prev, status: "Cancelled" } : prev));
      }

      setActionSuccess("Ride successfully cancelled!");
      setShowCancelModal(false);
    } catch (err) {
      console.error("Cancel ride error:", err);
      setActionError(err.message || "Failed to cancel ride.");
    } finally {
      setCancelLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

          <p className="mt-4 font-medium text-slate-600">
            Loading ride details...
          </p>
        </div>
      </main>
    );
  }

  // Error state
  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
            <MapPin size={26} className="text-red-600" />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-slate-900">
            Ride Not Found
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {error}
          </p>

          <Link
            to="/find-ride"
            className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Back to Find a Ride
          </Link>
        </div>
      </main>
    );
  }

  if (!ride) {
    return null;
  }

  const driverName = ride.driver?.name || "Driver";
  const driverInitial =
    driverName.charAt(0).toUpperCase() || "D";

  const formattedDate = ride.date
    ? new Date(ride.date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Date unavailable";

  const getStatusBadgeClasses = (status) => {
    if (status === "Completed") {
      return "bg-emerald-50 text-emerald-700 border border-emerald-200";
    }
    if (status === "Cancelled") {
      return "bg-red-50 text-red-700 border border-red-200";
    }
    return "bg-blue-50 text-blue-700 border border-blue-200";
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-4xl">

        {/* Back */}
        <Link
          to={isDriver ? "/my-rides" : "/find-ride"}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600"
        >
          <ArrowLeft size={18} />
          {isDriver ? "Back to My Rides" : "Back to Find a Ride"}
        </Link>

        {/* Action Error / Success alerts */}
        {actionError && (
          <div className="mb-6 flex items-center justify-between rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 shadow-sm">
            <div className="flex items-center gap-2">
              <X size={18} className="text-red-600" />
              <span>{actionError}</span>
            </div>
            <button
              type="button"
              onClick={() => setActionError("")}
              className="text-red-500 hover:text-red-700"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {actionSuccess && (
          <div className="mb-6 flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700 shadow-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-emerald-600" />
              <span>{actionSuccess}</span>
            </div>
            <button
              type="button"
              onClick={() => setActionSuccess("")}
              className="text-emerald-500 hover:text-emerald-700"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Main Card */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          {/* Header */}
          <div className="border-b border-slate-200 p-6 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2.5">
                  <p className="text-sm font-medium text-blue-600">
                    Ride Details
                  </p>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusBadgeClasses(
                      ride.status,
                    )}`}
                  >
                    {ride.status || "Published"}
                  </span>
                </div>

                <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
                  {ride.from} → {ride.to}
                </h1>
              </div>

              <div className="rounded-2xl bg-blue-50 px-5 py-3 text-center">
                <p className="text-xs font-medium text-slate-500">
                  Price per seat
                </p>

                <p className="text-2xl font-bold text-blue-600">
                  ${ride.price}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">

            {/* Driver */}
            <section>
              <h2 className="text-lg font-bold text-slate-900">
                Your Driver
              </h2>

              <div className="mt-4 flex items-center justify-between gap-4 rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-600">
                    {driverInitial}
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {driverName} {isDriver && "(You)"}
                    </h3>

                    <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                      <Star
                        size={15}
                        className="fill-current text-yellow-500"
                      />

                      <span>5.0</span>
                    </div>
                  </div>
                </div>

                {!isDriver && (
                  <button
                    type="button"
                    className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-600 sm:flex"
                  >
                    <MessageCircle size={17} />
                    Message
                  </button>
                )}
              </div>
            </section>

            {/* Journey */}
            <section className="mt-8">
              <h2 className="text-lg font-bold text-slate-900">
                Journey
              </h2>

              <div className="mt-4 rounded-2xl border border-slate-200 p-5">
                <div className="flex gap-4">

                  <div className="flex flex-col items-center">
                    <MapPin size={20} className="text-blue-600" />

                    <div className="my-2 h-12 border-l border-dashed border-slate-300" />

                    <MapPin size={20} className="text-red-500" />
                  </div>

                  <div className="flex flex-1 flex-col justify-between gap-8">
                    <div>
                      <p className="text-xs font-medium text-slate-500">
                        PICKUP
                      </p>

                      <p className="mt-1 font-semibold text-slate-900">
                        {ride.from}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-slate-500">
                        DESTINATION
                      </p>

                      <p className="mt-1 font-semibold text-slate-900">
                        {ride.to}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* Route Map */}
            <section className="mt-8">
              <div className="mb-4">
                <h2 className="text-lg font-bold text-slate-900">
                  Route Map
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  View the journey from pickup to destination.
                </p>
              </div>

              <RideMap
                pickup={{
                  name: ride.from,
                  position: [32.5232, -92.6379],
                }}
                destination={{
                  name: ride.to,
                  position: [32.5093, -92.1193],
                }}
              />
            </section>

            {/* Ride Information */}
            <section className="mt-8">
              <h2 className="text-lg font-bold text-slate-900">
                Ride Information
              </h2>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">

                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
                  <CalendarDays
                    size={20}
                    className="text-blue-600"
                  />

                  <div>
                    <p className="text-xs text-slate-500">
                      Date
                    </p>

                    <p className="font-semibold text-slate-900">
                      {formattedDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
                  <Clock3
                    size={20}
                    className="text-blue-600"
                  />

                  <div>
                    <p className="text-xs text-slate-500">
                      Departure
                    </p>

                    <p className="font-semibold text-slate-900">
                      {ride.departureTime}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
                  <Users
                    size={20}
                    className="text-blue-600"
                  />

                  <div>
                    <p className="text-xs text-slate-500">
                      Available Seats
                    </p>

                    <p className="font-semibold text-slate-900">
                      {ride.availableSeats} seats
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
                  <ShieldCheck
                    size={20}
                    className="text-green-600"
                  />

                  <div>
                    <p className="text-xs text-slate-500">
                      Vehicle
                    </p>

                    <p className="font-semibold text-slate-900">
                      {ride.vehicle}
                    </p>
                  </div>
                </div>

              </div>
            </section>

            {/* Payment */}
            <section className="mt-8">
              <h2 className="text-lg font-bold text-slate-900">
                Payment
              </h2>

              <div className="mt-4 flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5">
                <div>
                  <p className="text-sm text-slate-500">
                    Payment Method
                  </p>

                  <p className="mt-1 font-semibold text-slate-900">
                    Cash on Delivery
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Pay the driver when your ride is completed.
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-slate-500">
                    Amount
                  </p>

                  <p className="text-xl font-bold text-blue-600">
                    ${ride.price}
                  </p>
                </div>
              </div>
            </section>

            {/* Description */}
            <section className="mt-8">
              <h2 className="text-lg font-bold text-slate-900">
                About This Ride
              </h2>

              <p className="mt-3 leading-7 text-slate-600">
                {ride.description ||
                  "The driver has not added a description for this ride."}
              </p>
            </section>

            {/* Action Section */}
            <div className="mt-8 border-t border-slate-200 pt-6">
              {isDriver ? (
                /* Driver Actions */
                ride.status === "Published" ? (
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-slate-500">Driver Controls</p>
                      <p className="text-base font-semibold text-slate-900">
                        Manage or Cancel this published ride
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <Link
                        to={`/manage-ride/${ride._id}`}
                        className="rounded-xl bg-slate-900 px-6 py-3.5 text-center font-semibold text-white transition hover:bg-slate-800"
                      >
                        Manage Ride
                      </Link>

                      <button
                        type="button"
                        onClick={() => setShowCancelModal(true)}
                        disabled={cancelLoading}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-6 py-3.5 text-center font-semibold text-red-600 shadow-sm transition hover:bg-red-50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <X size={18} />
                        {cancelLoading ? "Cancelling..." : "Cancel Ride"}
                      </button>
                    </div>
                  </div>
                ) : ride.status === "Cancelled" ? (
                  <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-center">
                    <p className="font-semibold text-red-800">
                      This ride has been cancelled
                    </p>
                    <p className="mt-1 text-sm text-red-600">
                      No passengers can join this ride.
                    </p>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-center">
                    <p className="font-semibold text-emerald-800">
                      This ride is marked as completed
                    </p>
                  </div>
                )
              ) : (
                /* Passenger Actions */
                ride.status === "Published" ? (
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-slate-500">Your seat</p>
                      <p className="text-2xl font-bold text-slate-900">
                        ${ride.price}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setRequestError("");
                        setRequestSent(false);
                        setShowRequestModal(true);
                      }}
                      disabled={ride.availableSeats <= 0}
                      className="rounded-xl bg-blue-600 px-8 py-3.5 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-slate-300"
                    >
                      {ride.availableSeats > 0
                        ? "Request to Join"
                        : "No Seats Available"}
                    </button>
                  </div>
                ) : ride.status === "Cancelled" ? (
                  <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-center">
                    <p className="font-semibold text-red-800">
                      This ride has been cancelled by the driver
                    </p>
                    <p className="mt-1 text-sm text-red-600">
                      Joining requests are closed for this ride.
                    </p>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-center">
                    <p className="font-semibold text-emerald-800">
                      This ride has already been completed
                    </p>
                  </div>
                )
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
              <AlertTriangle size={28} />
            </div>

            <div className="mt-4 text-center">
              <h2 className="text-xl font-bold text-slate-900">
                Cancel this ride?
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Are you sure you want to cancel the ride from{" "}
                <span className="font-semibold text-slate-700">{ride.from}</span>{" "}
                to{" "}
                <span className="font-semibold text-slate-700">{ride.to}</span>?
                This action cannot be undone.
              </p>
            </div>

            {actionError && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3">
                <p className="text-sm font-medium text-red-700">{actionError}</p>
              </div>
            )}

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowCancelModal(false);
                  setActionError("");
                }}
                disabled={cancelLoading}
                className="flex-1 rounded-xl border border-slate-200 px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
              >
                Keep Ride
              </button>

              <button
                type="button"
                onClick={handleCancelRide}
                disabled={cancelLoading}
                className="flex-1 rounded-xl bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-700 disabled:bg-red-400"
              >
                {cancelLoading ? "Cancelling..." : "Cancel Ride"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4">

          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8">

            {!requestSent ? (
              <>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-slate-900">
                    Request to Join?
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Your request will be sent to{" "}
                    <span className="font-semibold text-slate-700">
                      {driverName}
                    </span>
                    .
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="font-semibold text-slate-900">
                    {ride.from} → {ride.to}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {formattedDate} • {ride.departureTime}
                  </p>

                  <p className="mt-3 text-lg font-bold text-slate-900">
                    ${ride.price} / seat
                  </p>
                </div>

                {/* Backend Error */}
                {requestError && (
                  <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3">
                    <p className="text-sm font-medium text-red-700">
                      {requestError}
                    </p>
                  </div>
                )}

                <div className="mt-6 flex gap-3">

                  <button
                    type="button"
                    onClick={() => {
                      setShowRequestModal(false);
                      setRequestError("");
                    }}
                    disabled={requestLoading}
                    className="flex-1 rounded-xl border border-slate-200 px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleRequestRide}
                    disabled={requestLoading}
                    className="flex-1 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
                  >
                    {requestLoading
                      ? "Sending..."
                      : "Send Request"}
                  </button>

                </div>
              </>
            ) : (
              <div className="text-center">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <ShieldCheck
                    size={32}
                    className="text-green-600"
                  />
                </div>

                <h2 className="mt-5 text-2xl font-bold text-slate-900">
                  Request Sent
                </h2>

                <div className="mt-5 rounded-2xl border border-yellow-200 bg-yellow-50 p-4 text-left">
                  <p className="text-sm font-semibold text-yellow-800">
                    Ride Status
                  </p>

                  <p className="mt-1 text-sm text-yellow-700">
                    Your request is pending. The driver will
                    review and respond to your request.
                  </p>
                </div>

                <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left">
                  <p className="text-sm font-semibold text-slate-700">
                    Payment
                  </p>

                  <p className="mt-1 text-sm text-slate-600">
                    Cash on Delivery — ${ride.price}
                  </p>
                </div>

                <p className="mt-3 leading-6 text-slate-500">
                  Your request has been sent to{" "}
                  <span className="font-semibold text-slate-700">
                    {driverName}
                  </span>
                  .
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  You'll be notified when the driver responds.
                </p>

                <Link
                  to="/find-ride"
                  className="mt-7 block w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  Back to Find a Ride
                </Link>

              </div>
            )}

          </div>
        </div>
      )}
    </main>
  );
}

export default RideDetails;
import {
  ArrowLeft,
  CalendarDays,
  Car,
  Check,
  Clock3,
  MapPin,
  Users,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useRide } from "../context/RideContext";

function ManageRide() {
  const {
    getRideRequests,
    updateRequestStatus,
  } = useRide();

  const requests = getRideRequests(1);

  // Temporary frontend data.
  // Later this will come from the backend.
  const ride = {
    id: 1,
    from: "Ruston, LA",
    to: "Shreveport, LA",
    date: "August 30, 2026",
    time: "9:00 AM",
    price: 20,
    availableSeats: 3,
    vehicle: "Toyota Camry",
  };

  const pendingRequests = requests.filter(
    (request) => request.status === "Pending"
  );

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-4xl">

        {/* Back */}
        <Link
          to="/my-rides"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600"
        >
          <ArrowLeft size={18} />
          Back to My Rides
        </Link>

        {/* Header */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-blue-600">
            DRIVER DASHBOARD
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Manage Ride
          </h1>

          <p className="mt-2 text-slate-600">
            Manage passenger requests and your upcoming journey.
          </p>
        </div>

        {/* Ride Summary */}
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          {/* Ride Header */}
          <div className="border-b border-slate-200 p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <p className="text-sm font-medium text-blue-600">
                  Your Ride
                </p>

                <h2 className="mt-1 text-2xl font-bold text-slate-900">
                  {ride.from} → {ride.to}
                </h2>
              </div>

              <div className="rounded-2xl bg-blue-50 px-5 py-3 text-center">
                <p className="text-xs text-slate-500">
                  Price per seat
                </p>

                <p className="text-2xl font-bold text-blue-600">
                  ${ride.price}
                </p>
              </div>

            </div>
          </div>

          {/* Ride Details */}
          <div className="grid gap-3 p-6 sm:grid-cols-2 sm:p-8">

            {/* Date */}
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
                  {ride.date}
                </p>
              </div>
            </div>

            {/* Departure */}
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
                  {ride.time}
                </p>
              </div>
            </div>

            {/* Available Seats */}
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
                  {ride.availableSeats}
                </p>
              </div>
            </div>

            {/* Vehicle */}
            <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
              <Car
                size={20}
                className="text-blue-600"
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

          {/* Route */}
          <div className="border-t border-slate-200 p-6 sm:p-8">

            <h2 className="text-lg font-bold text-slate-900">
              Route
            </h2>

            <div className="mt-4 rounded-2xl bg-slate-50 p-5">

              <div className="flex gap-4">

                {/* Route Icons */}
                <div className="flex flex-col items-center">
                  <MapPin
                    size={20}
                    className="text-blue-600"
                  />

                  <div className="my-2 h-8 border-l border-dashed border-slate-300" />

                  <MapPin
                    size={20}
                    className="text-red-500"
                  />
                </div>

                {/* Locations */}
                <div className="space-y-5">

                  <div>
                    <p className="text-xs text-slate-500">
                      PICKUP
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {ride.from}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      DESTINATION
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {ride.to}
                    </p>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Passenger Requests */}
        <section className="mt-8">

          {/* Section Header */}
          <div className="flex items-end justify-between gap-4">

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Passenger Requests
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Review passengers who want to join your ride.
              </p>
            </div>

            <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-600">
              {pendingRequests.length} Pending
            </span>

          </div>

          {/* Requests */}
          <div className="mt-4 space-y-4">

            {requests.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                  <Users
                    size={24}
                    className="text-slate-400"
                  />
                </div>

                <h3 className="mt-4 font-semibold text-slate-900">
                  No passenger requests yet
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Passenger requests will appear here when someone wants to join your ride.
                </p>

              </div>
            ) : (
              requests.map((request) => (
                <article
                  key={request.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    {/* Passenger */}
                    <div className="flex items-center gap-4">

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                        {request.passenger?.name
                          ? request.passenger.name.charAt(0).toUpperCase()
                          : "P"}
                      </div>

                      <div>
                        <h3 className="font-semibold text-slate-900">
                          {request.passenger?.name || "Passenger"}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          {request.passenger?.email || "Passenger request"}
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                          {request.seats || 1} seat
                          {(request.seats || 1) > 1 ? "s" : ""}
                        </p>
                      </div>

                    </div>

                    {/* Actions / Status */}
                    {request.status === "Pending" ? (
                      <div className="flex gap-2">

                        {/* Accept */}
                        <button
                          type="button"
                          onClick={() =>
                            updateRequestStatus(
                              request.id,
                              "Accepted"
                            )
                          }
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 active:scale-[0.98]"
                        >
                          <Check size={17} />
                          Accept
                        </button>

                        {/* Reject */}
                        <button
                          type="button"
                          onClick={() =>
                            updateRequestStatus(
                              request.id,
                              "Rejected"
                            )
                          }
                          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 active:scale-[0.98]"
                        >
                          <X size={17} />
                          Reject
                        </button>

                      </div>
                    ) : (
                      <span
                        className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                          request.status === "Accepted"
                            ? "bg-green-50 text-green-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {request.status}
                      </span>
                    )}

                  </div>

                </article>
              ))
            )}

          </div>
        </section>

      </div>
    </main>
  );
}

export default ManageRide;
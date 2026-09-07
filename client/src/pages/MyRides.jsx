import { useEffect, useState } from "react";

import {
  CalendarDays,
  Car,
  Clock3,
  MapPin,
  Users,
} from "lucide-react";

import { Link } from "react-router-dom";

function MyRides() {
  const [activeTab, setActiveTab] = useState("upcoming");

  const [rides, setRides] = useState({
    upcoming: [],
    requested: [],
    completed: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyRides = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        if (!token) {
          setError("Please log in to view your rides.");
          return;
        }

        // Fetch driver rides & passenger requests in parallel
        const [ridesRes, requestsRes] = await Promise.allSettled([
          fetch("http://localhost:5000/api/rides/my-rides", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch("http://localhost:5000/api/ride-requests/my", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        let driverRides = [];
        if (ridesRes.status === "fulfilled" && ridesRes.value.ok) {
          const data = await ridesRes.value.json();
          driverRides = data.rides || [];
        }

        let passengerRequests = [];
        if (requestsRes.status === "fulfilled" && requestsRes.value.ok) {
          const data = await requestsRes.value.json();
          passengerRequests = data.requests || [];
        }

        const today = new Date();

        const upcomingRides = driverRides.filter((ride) => {
          const rideDate = new Date(ride.date);
          return ride.status === "Published" && rideDate >= today;
        });

        const completedRides = driverRides.filter(
          (ride) =>
            ride.status === "Completed" ||
            new Date(ride.date) < today
        );

        setRides({
          upcoming: upcomingRides,
          requested: passengerRequests,
          completed: completedRides,
        });
      } catch (error) {
        console.error("Fetch my rides error:", error);

        setError(
          error.message ||
            "Something went wrong while fetching your rides."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMyRides();
  }, []);

  const tabs = [
    {
      id: "upcoming",
      label: "Upcoming Rides",
    },
    {
      id: "requested",
      label: "Requested Rides",
    },
    {
      id: "completed",
      label: "Completed",
    },
  ];

  const activeRides = rides[activeTab] || [];

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusClasses = (status) => {
    if (status === "Completed" || status === "Accepted") {
      return "bg-emerald-50 text-emerald-700 border border-emerald-200";
    }

    if (status === "Cancelled" || status === "Rejected") {
      return "bg-red-50 text-red-700 border border-red-200";
    }

    if (status === "Published") {
      return "bg-blue-50 text-blue-700 border border-blue-200";
    }

    if (status === "Pending") {
      return "bg-amber-50 text-amber-700 border border-amber-200";
    }

    return "bg-slate-100 text-slate-600";
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:py-12">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-600">
              YOUR JOURNEYS
            </p>

            <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
              My Rides
            </h1>

            <p className="mt-3 text-slate-600">
              Manage your journeys, passenger requests, and bookings.
            </p>
          </div>

          <Link
            to="/offer-ride"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            <Car size={18} />
            Offer a Ride
          </Link>
        </div>

        {/* Tabs */}
        <div className="mt-8 flex overflow-x-auto rounded-xl border border-slate-200 bg-white p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`min-w-27.5 flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {tab.label}
              {rides[tab.id]?.length > 0 && (
                <span
                  className={`ml-2 rounded-full px-2 py-0.5 text-xs ${
                    activeTab === tab.id
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {rides[tab.id].length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-10 text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

            <p className="mt-4 text-sm text-slate-500">
              Loading your rides...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <h2 className="font-semibold text-red-800">
              Unable to load your rides
            </h2>

            <p className="mt-2 text-sm text-red-600">
              {error}
            </p>
          </div>
        )}

        {/* Ride List */}
        {!loading && !error && (
          <section className="mt-6">
            {activeRides.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                  <Car
                    size={25}
                    className="text-slate-400"
                  />
                </div>

                <h2 className="mt-4 text-lg font-bold text-slate-900">
                  No rides here yet
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  {activeTab === "requested"
                    ? "You haven't requested to join any rides yet."
                    : "Your rides will appear here when you publish or complete them."}
                </p>

                <div className="mt-6 flex justify-center gap-3">
                  <Link
                    to="/find-ride"
                    className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Find a Ride
                  </Link>

                  <Link
                    to="/offer-ride"
                    className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    Offer a Ride
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                {activeRides.map((item) => {
                  const isRequestItem = activeTab === "requested";
                  const ride = isRequestItem ? item.ride : item;
                  const itemStatus = isRequestItem ? item.status : ride?.status;

                  if (!ride) return null;

                  return (
                    <article
                      key={item._id}
                      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                    >
                      {/* Top */}
                      <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100">
                            <Car
                              size={20}
                              className="text-blue-600"
                            />
                          </div>

                          <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                              {isRequestItem ? "Driver" : "You're driving"}
                            </p>

                            <p className="font-semibold text-slate-900">
                              {isRequestItem
                                ? ride.driver?.name || "Driver"
                                : ride.driver?.name || "You"}
                            </p>
                          </div>
                        </div>

                        <span
                          className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                            itemStatus
                          )}`}
                        >
                          {isRequestItem ? `Request: ${itemStatus}` : itemStatus}
                        </span>
                      </div>

                      {/* Route */}
                      <div className="p-5 sm:p-6">
                        <div className="rounded-xl bg-slate-50 p-4">
                          <div className="flex gap-3">
                            <div className="flex flex-col items-center">
                              <MapPin
                                size={19}
                                className="text-blue-600"
                              />

                              <div className="my-1.5 h-5 border-l border-dashed border-slate-300" />

                              <MapPin
                                size={19}
                                className="text-red-500"
                              />
                            </div>

                            <div className="space-y-5">
                              <div>
                                <p className="text-xs text-slate-500">
                                  From
                                </p>

                                <p className="font-semibold text-slate-900">
                                  {ride.from}
                                </p>
                              </div>

                              <div>
                                <p className="text-xs text-slate-500">
                                  To
                                </p>

                                <p className="font-semibold text-slate-900">
                                  {ride.to}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="mt-5 grid gap-3 sm:grid-cols-4">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <CalendarDays
                              size={17}
                              className="text-blue-600"
                            />

                            {formatDate(ride.date)}
                          </div>

                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Clock3
                              size={17}
                              className="text-blue-600"
                            />

                            {ride.departureTime}
                          </div>

                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Users
                              size={17}
                              className="text-blue-600"
                            />

                            {ride.availableSeats} seat
                            {ride.availableSeats > 1 ? "s" : ""}
                          </div>

                          <div>
                            <p className="text-xs text-slate-500">
                              Payment
                            </p>

                            <p className="text-sm font-semibold text-slate-900">
                              ${ride.price} • COD
                            </p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-6 flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
                          <Link
                            to={`/ride/${ride._id}`}
                            className="rounded-xl border border-slate-200 px-5 py-2.5 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                          >
                            View Details
                          </Link>

                          {!isRequestItem && ride.status === "Published" && (
                            <Link
                              to={`/manage-ride/${ride._id}`}
                              className="rounded-xl bg-slate-900 px-5 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-slate-800"
                            >
                              Manage Ride
                            </Link>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}

export default MyRides;
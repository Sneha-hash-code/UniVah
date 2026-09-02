import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  MapPin,
  CalendarDays,
  Users,
  Search,
  ShieldCheck,
  Clock3,
  Car,
} from "lucide-react";

import RideCard from "../components/rides/RideCard";
import RideMap from "../components/rides/RideMap";
import { locations } from "../data/locations";

function FindRide() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    from: location.state?.from || "",
    to: location.state?.to || "",
    date: location.state?.date || "",
    seats: location.state?.seats || "1",
  });

  const [searchedRoute, setSearchedRoute] = useState(
    location.state?.from || location.state?.to
      ? {
          pickup: location.state?.from || "",
          destination: location.state?.to || "",
        }
      : null
  );
  const [hasSearched, setHasSearched] = useState(
    Boolean(location.state?.from || location.state?.to || location.state?.date)
  );

  // Used to trigger smooth scrolling after EVERY search
  const [searchTrigger, setSearchTrigger] = useState(
    location.state?.from || location.state?.to ? 1 : 0
  );

  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // --------------------------------------------------
  // FETCH RIDES FROM BACKEND
  // --------------------------------------------------
  useEffect(() => {
    const fetchRides = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:5000/api/rides"
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch rides"
          );
        }

        setRides(data.rides || []);
      } catch (error) {
        console.error("Fetch rides error:", error);

        setError(
          error.message ||
            "Something went wrong while loading rides"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRides();
  }, []);

  // --------------------------------------------------
  // AUTO SCROLL TO RESULTS AFTER SEARCH
  // --------------------------------------------------
  useEffect(() => {
    if (searchTrigger === 0) return;

    const resultsSection =
      document.getElementById("ride-results");

    if (resultsSection) {
      setTimeout(() => {
        resultsSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [searchTrigger]);

  // --------------------------------------------------
  // HANDLE INPUT CHANGE
  // --------------------------------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // --------------------------------------------------
  // HANDLE MAIN SEARCH
  // --------------------------------------------------
  const handleSearch = (e) => {
    e.preventDefault();

    setSearchedRoute({
      pickup: formData.from,
      destination: formData.to,
    });

    setHasSearched(true);

    // Trigger scroll every time the search button is clicked
    setSearchTrigger((prev) => prev + 1);
  };

  // --------------------------------------------------
  // HANDLE POPULAR ROUTE
  // --------------------------------------------------
  const handleQuickRoute = (from, to) => {
    setFormData((prev) => ({
      ...prev,
      from,
      to,
    }));

    setSearchedRoute({
      pickup: from,
      destination: to,
    });

    setHasSearched(true);

    // Trigger scroll for popular routes too
    setSearchTrigger((prev) => prev + 1);
  };

  // --------------------------------------------------
  // FILTER RIDES
  // --------------------------------------------------
  const filteredRides = hasSearched
    ? rides.filter((ride) => {
        const matchesFrom =
          !formData.from ||
          ride.from
            .toLowerCase()
            .includes(formData.from.toLowerCase());

        const matchesTo =
          !formData.to ||
          ride.to
            .toLowerCase()
            .includes(formData.to.toLowerCase());

        const matchesSeats =
          ride.availableSeats >= Number(formData.seats);

        const matchesDate =
          !formData.date ||
          (ride.date && !isNaN(new Date(ride.date).getTime())
            ? new Date(ride.date).toISOString().split("T")[0] === formData.date
            : false);

        return (
          matchesFrom &&
          matchesTo &&
          matchesSeats &&
          matchesDate
        );
      })
    : rides;

  const formatDate = (dateVal) => {
    if (!dateVal) return "N/A";
    const d = new Date(dateVal);
    if (isNaN(d.getTime())) return String(dateVal);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (timeVal) => {
    if (!timeVal) return "N/A";
    if (/^\d{1,2}:\d{2}$/.test(timeVal)) {
      const d = new Date(`1970-01-01T${timeVal}`);
      if (!isNaN(d.getTime())) {
        return d.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        });
      }
    }
    return timeVal;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ==================================================
          HERO SECTION
      ================================================== */}
      <section className="relative overflow-hidden bg-linear-to-br from-blue-700 via-blue-600 to-cyan-500">
        <div className="absolute inset-0 bg-black/10" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center text-white">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              <ShieldCheck size={17} />
              Safe. Simple. Student-friendly.
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Find Your Perfect Ride
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-blue-50 sm:text-xl">
              Share a ride, save money, and travel together
              with your university community.
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================
          SEARCH SECTION
      ================================================== */}
      <section className="relative z-10 mx-auto -mt-10 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white p-5 shadow-xl sm:p-7">
          <form
            onSubmit={handleSearch}
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-5"
          >
            {/* FROM */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                From
              </label>

              <div className="relative">
                <MapPin
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  name="from"
                  value={formData.from}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Any location</option>

                  {Object.values(locations).map((location) => (
                    <option
                      key={location.name}
                      value={location.name}
                    >
                      {location.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* TO */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                To
              </label>

              <div className="relative">
                <MapPin
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  name="to"
                  value={formData.to}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Any destination</option>

                  {Object.values(locations).map((location) => (
                    <option
                      key={location.name}
                      value={location.name}
                    >
                      {location.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* DATE */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Date
              </label>

              <div className="relative">
                <CalendarDays
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* SEATS */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Seats
              </label>

              <div className="relative">
                <Users
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  name="seats"
                  value={formData.seats}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="1">1 seat</option>
                  <option value="2">2 seats</option>
                  <option value="3">3 seats</option>
                  <option value="4">4 seats</option>
                  <option value="5">5 seats</option>
                  <option value="6">6 seats</option>
                </select>
              </div>
            </div>

            {/* SEARCH BUTTON */}
            <div className="flex items-end">
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
              >
                <Search size={19} />
                Find Available Rides
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ==================================================
          TRUST INDICATORS
      ================================================== */}
      <section className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm">
            <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
              <ShieldCheck size={20} />
            </div>

            <div>
              <p className="font-semibold text-slate-800">
                Verified Community
              </p>
              <p className="text-sm text-slate-500">
                Ride with trusted students
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm">
            <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
              <Clock3 size={20} />
            </div>

            <div>
              <p className="font-semibold text-slate-800">
                Flexible Travel
              </p>
              <p className="text-sm text-slate-500">
                Find rides that fit your schedule
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm">
            <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
              <Car size={20} />
            </div>

            <div>
              <p className="font-semibold text-slate-800">
                Affordable Rides
              </p>
              <p className="text-sm text-slate-500">
                Split the cost and save more
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          POPULAR ROUTES
      ================================================== */}
      <section className="mx-auto max-w-6xl px-4 pb-4 pt-14 sm:px-6 lg:px-8">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Quick Search
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
            Popular Routes
          </h2>

          <p className="mt-2 text-slate-600">
            Start with one of the most searched routes.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Ruston, LA", "Monroe, LA"],
            ["Ruston, LA", "Shreveport, LA"],
            ["Ruston, LA", "Alexandria, LA"],
          ].map(([from, to]) => (
            <button
              key={`${from}-${to}`}
              type="button"
              onClick={() => handleQuickRoute(from, to)}
              className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                  <MapPin size={19} />
                </div>

                <div>
                  <p className="font-semibold text-slate-800">
                    {from}
                  </p>
                  <p className="text-sm text-slate-500">
                    → {to}
                  </p>
                </div>
              </div>

              <span className="text-blue-600 transition group-hover:translate-x-1">
                →
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ==================================================
          MAP
      ================================================== */}
      <section className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 lg:px-8">
        <RideMap
          pickup={searchedRoute?.pickup || formData.from}
          destination={
            searchedRoute?.destination || formData.to
          }
        />
      </section>

      {/* ==================================================
          RIDE RESULTS
          IMPORTANT: id="ride-results"
      ================================================== */}
      <section
        id="ride-results"
        className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-16 pt-14 sm:px-6 lg:px-8"
      >
        <div className="mb-7">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Available Rides
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
            {hasSearched
              ? "Rides matching your search"
              : "Available rides"}
          </h2>

          {searchedRoute && (
            <p className="mt-2 text-slate-600">
              {searchedRoute.pickup || "Any location"}{" "}
              →{" "}
              {searchedRoute.destination || "Any destination"}
            </p>
          )}
        </div>

        {/* LOADING */}
        {loading && (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

            <p className="font-medium text-slate-700">
              Finding available rides...
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Please wait a moment.
            </p>
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="font-semibold text-red-700">
              Unable to load rides
            </p>

            <p className="mt-1 text-sm text-red-600">
              {error}
            </p>
          </div>
        )}

        {/* RESULTS */}
        {!loading && !error && filteredRides.length > 0 && (
          <div className="grid gap-6 lg:grid-cols-2">
            {filteredRides.map((ride) => (
              <RideCard
                key={ride._id || ride.id}
                ride={{
                  ...ride,
                  id: ride._id || ride.id,
                  date: formatDate(ride.date),
                  departureTime: formatTime(ride.departureTime),
                }}
                onViewRide={(selectedRide) => {
                  navigate(
                    `/ride/${selectedRide.id}`
                  );
                }}
              />
            ))}
          </div>
        )}

        {/* NO RESULTS */}
        {!loading &&
          !error &&
          filteredRides.length === 0 && (
            <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                <Search
                  size={25}
                  className="text-slate-400"
                />
              </div>

              <h3 className="text-lg font-semibold text-slate-800">
                No rides found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                We couldn't find a ride matching your
                search. Try changing your route, date,
                or number of seats.
              </p>

              <button
                type="button"
                onClick={() => {
                  setFormData({
                    from: "",
                    to: "",
                    date: "",
                    seats: "1",
                  });

                  setSearchedRoute(null);
                  setHasSearched(false);
                }}
                className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Clear Search
              </button>
            </div>
          )}
      </section>

      {/* ==================================================
          BOTTOM TRUST SECTION
      ================================================== */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900">
            Travel together. Save together.
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            UniVah makes it easier for students to find
            affordable rides while building a connected
            campus community.
          </p>
        </div>
      </section>
    </div>
  );
}

export default FindRide;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  CalendarDays,
  Users,
  Search,
  ArrowRight,
  ShieldCheck,
  Clock3,
  CarFront,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";

import RideCard from "../components/rides/RideCard";
import RideMap from "../components/rides/RideMap";
import { locations } from "../data/locations";

function FindRide() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    seats: "1",
  });

  const [searchedRoute, setSearchedRoute] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const mockRides = [
    {
      id: 1,
      driver: {
        name: "Michael Johnson",
        rating: 4.8,
      },
      from: "Ruston, LA",
      to: "Monroe, LA",
      date: "Aug 28, 2026",
      departureTime: "7:30 AM",
      availableSeats: 2,
      price: 15,
    },
    {
      id: 2,
      driver: {
        name: "Sarah Williams",
        rating: 4.9,
      },
      from: "Ruston, LA",
      to: "Shreveport, LA",
      date: "Aug 28, 2026",
      departureTime: "9:00 AM",
      availableSeats: 3,
      price: 20,
    },
    {
      id: 3,
      driver: {
        name: "Daniel Carter",
        rating: 4.7,
      },
      from: "Ruston, LA",
      to: "Monroe, LA",
      date: "Aug 28, 2026",
      departureTime: "5:30 PM",
      availableSeats: 1,
      price: 12,
    },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const pickup = locations[formData.from];
    const destination = locations[formData.to];

    if (!pickup || !destination) {
      return;
    }

    setSearchedRoute({
      pickup,
      destination,
    });

    setHasSearched(true);

    console.log("Searching for rides:", formData);
  };

  const handleQuickRoute = (from, to) => {
    const pickup = locations[from];
    const destination = locations[to];

    if (!pickup || !destination) {
      return;
    }

    setFormData({
      ...formData,
      from,
      to,
    });

    setSearchedRoute({
      pickup,
      destination,
    });

    setHasSearched(true);
  };

  const filteredRides = hasSearched
    ? mockRides.filter((ride) => {
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

        return matchesFrom && matchesTo && matchesSeats;
      })
    : mockRides;

  const quickRoutes = [
    {
      from: "Ruston, LA",
      to: "Monroe, LA",
    },
    {
      from: "Ruston, LA",
      to: "Shreveport, LA",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50">

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 pb-20 pt-14 sm:px-6 sm:pt-20 lg:px-8">

          <div className="max-w-3xl">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              <Sparkles size={16} />
              Travel smarter with UniVah
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Find a ride.
              <span className="block text-blue-600">
                Share the journey.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Find affordable rides with people heading your way.
              Choose a route, compare available rides, and request
              a seat in just a few clicks.
            </p>

          </div>

          {/* Trust indicators */}
          <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-600">

            <div className="flex items-center gap-2">
              <ShieldCheck
                size={18}
                className="text-blue-600"
              />
              Trusted community
            </div>

            <div className="flex items-center gap-2">
              <Clock3
                size={18}
                className="text-blue-600"
              />
              Simple booking
            </div>

            <div className="flex items-center gap-2">
              <CarFront
                size={18}
                className="text-blue-600"
              />
              Affordable rides
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          SEARCH AREA
      ====================================================== */}
      <section className="-mt-8 relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl sm:p-8">

            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Where are you going?
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Search available rides for your journey.
                </p>
              </div>

              <div className="hidden items-center gap-2 text-sm text-slate-500 sm:flex">
                <SlidersHorizontal size={16} />
                Flexible travel options
              </div>

            </div>

            <form onSubmit={handleSearch}>

              {/* Locations */}
              <div className="grid gap-4 md:grid-cols-2">

                {/* FROM */}
                <div>
                  <label
                    htmlFor="from"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    From
                  </label>

                  <div className="relative">
                    <MapPin
                      size={20}
                      className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-blue-500"
                    />

                    <select
                      id="from"
                      name="from"
                      value={formData.from}
                      onChange={handleChange}
                      required
                      className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                    >
                      <option value="">
                        Select pickup location
                      </option>

                      {Object.keys(locations).map((location) => (
                        <option
                          key={location}
                          value={location}
                        >
                          {location}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* TO */}
                <div>
                  <label
                    htmlFor="to"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    To
                  </label>

                  <div className="relative">
                    <MapPin
                      size={20}
                      className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-red-500"
                    />

                    <select
                      id="to"
                      name="to"
                      value={formData.to}
                      onChange={handleChange}
                      required
                      className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                    >
                      <option value="">
                        Select destination
                      </option>

                      {Object.keys(locations).map((location) => (
                        <option
                          key={location}
                          value={location}
                        >
                          {location}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Date + Seats */}
              <div className="mt-4 grid gap-4 sm:grid-cols-2">

                {/* DATE */}
                <div>
                  <label
                    htmlFor="date"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Travel date
                  </label>

                  <div className="relative">
                    <CalendarDays
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500"
                    />

                    <input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                    />
                  </div>
                </div>

                {/* SEATS */}
                <div>
                  <label
                    htmlFor="seats"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Passengers
                  </label>

                  <div className="relative">
                    <Users
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500"
                    />

                    <select
                      id="seats"
                      name="seats"
                      value={formData.seats}
                      onChange={handleChange}
                      className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                    >
                      <option value="1">1 passenger</option>
                      <option value="2">2 passengers</option>
                      <option value="3">3 passengers</option>
                      <option value="4">4 passengers</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Search button */}
              <button
                type="submit"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.99]"
              >
                <Search size={20} />
                Find Available Rides
              </button>

            </form>
          </div>
        </div>
      </section>

      {/* =====================================================
          POPULAR ROUTES
      ====================================================== */}
      <section className="mx-auto max-w-6xl px-4 pt-14 sm:px-6 lg:px-8">

        <div className="mb-5">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Popular routes
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            Start with a popular journey
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">

          {quickRoutes.map((route) => (
            <button
              key={`${route.from}-${route.to}`}
              type="button"
              onClick={() =>
                handleQuickRoute(route.from, route.to)
              }
              className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
            >

              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                  <MapPin
                    size={20}
                    className="text-blue-600"
                  />
                </div>

                <div>
                  <p className="font-semibold text-slate-900">
                    {route.from}
                  </p>

                  <div className="my-1 flex items-center gap-2 text-xs text-slate-400">
                    <span className="h-px w-5 bg-slate-300" />
                    route
                    <span className="h-px w-5 bg-slate-300" />
                  </div>

                  <p className="font-semibold text-slate-900">
                    {route.to}
                  </p>
                </div>

              </div>

              <ArrowRight
                size={20}
                className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-600"
              />

            </button>
          ))}

        </div>
      </section>

      {/* =====================================================
          SEARCHED ROUTE + MAP
      ====================================================== */}
      {searchedRoute && (
        <section className="mx-auto max-w-6xl px-4 pt-14 sm:px-6 lg:px-8">

          <div className="mb-5">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Your journey
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              {searchedRoute.pickup.name}
              <span className="mx-2 text-slate-400">
                →
              </span>
              {searchedRoute.destination.name}
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Here's your route. Available rides are shown below.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <RideMap
              pickup={searchedRoute.pickup}
              destination={searchedRoute.destination}
            />
          </div>

        </section>
      )}

      {/* =====================================================
          RIDE RESULTS
      ====================================================== */}
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 lg:px-8">

        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              {hasSearched ? "Search results" : "Explore rides"}
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              {hasSearched
                ? "Available rides"
                : "Rides around Ruston"}
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {hasSearched
                ? `Showing rides that match your selected route and passenger count.`
                : "Explore rides available on popular routes."}
            </p>
          </div>

          {hasSearched && filteredRides.length > 0 && (
            <div className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              {filteredRides.length} ride
              {filteredRides.length !== 1 ? "s" : ""} found
            </div>
          )}

        </div>

        {filteredRides.length > 0 ? (
          <div className="grid gap-5 lg:grid-cols-2">

            {filteredRides.map((ride) => (
              <RideCard
                key={ride.id}
                ride={ride}
                onViewRide={(selectedRide) => {
                  navigate(`/ride/${selectedRide.id}`);
                }}
              />
            ))}

          </div>
        ) : (
          /* Empty state */
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
              <CarFront
                size={28}
                className="text-slate-400"
              />
            </div>

            <h3 className="mt-5 text-lg font-bold text-slate-900">
              No rides found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              We couldn't find a ride matching your selected
              route and passenger count. Try another route or
              reduce the number of passengers.
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
              className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Browse all rides
            </button>

          </div>
        )}

      </section>

      {/* =====================================================
          BOTTOM TRUST SECTION
      ====================================================== */}
      <section className="border-t border-slate-200 bg-white">

        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">

          <div className="grid gap-8 sm:grid-cols-3">

            <div>
              <ShieldCheck
                size={24}
                className="text-blue-600"
              />

              <h3 className="mt-4 font-bold text-slate-900">
                Know your ride
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                See driver, vehicle, route, timing and available
                seats before requesting a ride.
              </p>
            </div>

            <div>
              <Users
                size={24}
                className="text-blue-600"
              />

              <h3 className="mt-4 font-bold text-slate-900">
                Travel together
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Connect with people heading in the same
                direction and make better use of every seat.
              </p>
            </div>

            <div>
              <CarFront
                size={24}
                className="text-blue-600"
              />

              <h3 className="mt-4 font-bold text-slate-900">
                Keep it affordable
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Find convenient shared rides without the cost
                of traveling alone.
              </p>
            </div>

          </div>

        </div>
      </section>

    </main>
  );
}

export default FindRide;
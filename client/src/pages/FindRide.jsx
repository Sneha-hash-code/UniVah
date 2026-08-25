import { useState } from "react";
import {
  MapPin,
  CalendarDays,
  Users,
  Search,
} from "lucide-react";

import RideCard from "../components/rides/RideCard";
import RideMap from "../components/rides/RideMap";
import { locations } from "../data/locations";

function FindRide() {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    seats: "1",
  });

  const [searchedRoute, setSearchedRoute] = useState(null);

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

    console.log("Searching for rides:", formData);
  };

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

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            UNIVAH
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            Find a Ride
          </h1>

          <p className="mt-3 text-slate-600">
            Find a comfortable and affordable ride to your destination.
          </p>
        </div>

        {/* Search Card */}
        <div className="rounded-3xl bg-white p-6 shadow-lg sm:p-8">

          <form onSubmit={handleSearch}>

            {/* Locations */}
            <div className="grid gap-5 md:grid-cols-2">

              {/* From */}
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
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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

              {/* To */}
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
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
            <div className="mt-5 grid gap-5 sm:grid-cols-2">

              {/* Date */}
              <div>
                <label
                  htmlFor="date"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Date
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
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Seats */}
              <div>
                <label
                  htmlFor="seats"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Seats
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
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="1">1 seat</option>
                    <option value="2">2 seats</option>
                    <option value="3">3 seats</option>
                    <option value="4">4 seats</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.99]"
            >
              <Search size={20} />
              Find Rides
            </button>
          </form>
        </div>

        {/* Route Map */}
        {searchedRoute && (
          <section className="mt-10">

            <div className="mb-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                Your Journey
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-900">
                {searchedRoute.pickup.name}
                <span className="mx-2 text-slate-400">
                  →
                </span>
                {searchedRoute.destination.name}
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                View the route and available rides below.
              </p>
            </div>

            <RideMap
              pickup={searchedRoute.pickup}
              destination={searchedRoute.destination}
            />
          </section>
        )}

        {/* Results Section */}
        <section className="mt-12">

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900">
              Available Rides
            </h2>

            <p className="mt-2 text-slate-500">
              Rides available around Ruston and nearby destinations.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">

            {mockRides.map((ride) => (
              <RideCard
                key={ride.id}
                ride={ride}
                onViewRide={(selectedRide) => {
                  console.log(
                    "Selected ride:",
                    selectedRide
                  );
                }}
              />
            ))}

          </div>
        </section>

      </div>
    </main>
  );
}

export default FindRide;
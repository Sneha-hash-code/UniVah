import { useState } from "react";
import { MapPin, CalendarDays, Users, Search } from "lucide-react";

function FindRide() {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    seats: "1",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();

    console.log("Searching for rides:", formData);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
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
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500"
                  />

                  <input
                    id="from"
                    name="from"
                    type="text"
                    value={formData.from}
                    onChange={handleChange}
                    placeholder="Enter pickup location"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    required
                  />
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
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500"
                  />

                  <input
                    id="to"
                    name="to"
                    type="text"
                    value={formData.to}
                    onChange={handleChange}
                    placeholder="Enter destination"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    required
                  />
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
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    required
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

        {/* Results Section */}
        <section className="mt-12">

          <h2 className="text-2xl font-bold text-slate-900">
            Available Rides
          </h2>

          <p className="mt-2 text-slate-500">
            Search for a route to see available rides.
          </p>

        </section>

      </div>
    </main>
  );
}

export default FindRide;
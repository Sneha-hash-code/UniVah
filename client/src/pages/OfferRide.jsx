import { useState } from "react";
import {
  CalendarDays,
  Car,
  Clock3,
  DollarSign,
  MapPin,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import RideMap from "../components/rides/RideMap";

function OfferRide() {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    departureTime: "",
    seats: "1",
    price: "",
    vehicle: "",
    description: "",
  });

  const [published, setPublished] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Ride to publish:", formData);

    setPublished(true);
  };

  if (published) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-12">
        <div className="mx-auto flex min-h-[70vh] max-w-xl items-center justify-center">

          <div className="w-full rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <Car size={38} className="text-green-600" />
            </div>

            <h1 className="mt-6 text-3xl font-bold text-slate-900">
              Ride Published!
            </h1>

            <p className="mx-auto mt-3 max-w-md leading-7 text-slate-500">
              Your ride is now ready for passengers in the UniVah community.
            </p>

            <div className="mt-7 rounded-2xl bg-slate-50 p-5 text-left">
              <p className="font-semibold text-slate-900">
                {formData.from} → {formData.to}
              </p>

              <p className="mt-2 text-sm text-slate-500">
                {formData.date} • {formData.departureTime}
              </p>

              <p className="mt-2 text-sm text-slate-500">
                {formData.seats} available seats • ${formData.price} / seat
              </p>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/"
                className="flex-1 rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Back Home
              </Link>

              <Link
                to="/find-ride"
                className="flex-1 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Find a Ride
              </Link>
            </div>

          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:py-12">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-blue-600">
            DRIVE WITH UNIVAH
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            Offer a Ride
          </h1>

          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            Share your journey with people heading the same way and help
            make travel around Ruston more convenient and affordable.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          {/* Route */}
          <section>
            <h2 className="text-lg font-bold text-slate-900">
              Your Route
            </h2>

            <div className="mt-5 grid gap-5 md:grid-cols-2">

              {/* From */}
              <div>
                <label
                  htmlFor="from"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Leaving from
                </label>

                <div className="relative">
                  <MapPin
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600"
                  />

                  <input
                    id="from"
                    name="from"
                    type="text"
                    value={formData.from}
                    onChange={handleChange}
                    placeholder="e.g. Ruston, LA"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* To */}
              <div>
                <label
                  htmlFor="to"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Going to
                </label>

                <div className="relative">
                  <MapPin
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500"
                  />

                  <input
                    id="to"
                    name="to"
                    type="text"
                    value={formData.to}
                    onChange={handleChange}
                    placeholder="e.g. Monroe, LA"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

            </div>
          </section>

          <section className="mt-8">
  <h2 className="text-lg font-bold text-slate-900">
    Route Preview
  </h2>

  <p className="mt-2 text-sm text-slate-500">
    Your route will appear here before you publish the ride.
  </p>

  <div className="mt-5">
    <RideMap />
  </div>
</section>

          {/* Date & Time */}
          <section className="mt-8">
            <h2 className="text-lg font-bold text-slate-900">
              When are you leaving?
            </h2>

            <div className="mt-5 grid gap-5 md:grid-cols-2">

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
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600"
                  />

                  <input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Time */}
              <div>
                <label
                  htmlFor="departureTime"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Departure time
                </label>

                <div className="relative">
                  <Clock3
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600"
                  />

                  <input
                    id="departureTime"
                    name="departureTime"
                    type="time"
                    value={formData.departureTime}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

            </div>
          </section>

          {/* Seats & Price */}
          <section className="mt-8">
            <h2 className="text-lg font-bold text-slate-900">
              Ride Details
            </h2>

            <div className="mt-5 grid gap-5 md:grid-cols-2">

              {/* Seats */}
              <div>
                <label
                  htmlFor="seats"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Available seats
                </label>

                <div className="relative">
                  <Users
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600"
                  />

                  <select
                    id="seats"
                    name="seats"
                    value={formData.seats}
                    onChange={handleChange}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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

              {/* Price */}
              <div>
                <label
                  htmlFor="price"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Price per seat
                </label>

                <div className="relative">
                  <DollarSign
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600"
                  />

                  <input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="15.00"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

            </div>
          </section>

          {/* Vehicle */}
          <section className="mt-8">
            <h2 className="text-lg font-bold text-slate-900">
              Vehicle
            </h2>

            <div className="mt-5">
              <label
                htmlFor="vehicle"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Vehicle information
              </label>

              <div className="relative">
                <Car
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600"
                />

                <input
                  id="vehicle"
                  name="vehicle"
                  type="text"
                  value={formData.vehicle}
                  onChange={handleChange}
                  placeholder="e.g. Toyota Camry, Black"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>
          </section>

          {/* Description */}
          <section className="mt-8">
            <h2 className="text-lg font-bold text-slate-900">
              Additional information
            </h2>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Tell passengers anything they should know about the ride..."
              className="mt-5 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </section>

          {/* Submit */}
          <div className="mt-8 border-t border-slate-200 pt-6">
            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.99]"
            >
              Publish Ride
            </button>

            <p className="mt-3 text-center text-xs text-slate-500">
              You can manage your ride and passenger requests later.
            </p>
          </div>
        </form>

      </div>
    </main>
  );
}

export default OfferRide;
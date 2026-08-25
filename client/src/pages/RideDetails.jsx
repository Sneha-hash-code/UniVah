import { useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import RideMap from "../components/rides/RideMap";

function RideDetails() {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  // Temporary frontend data.
  // Later this will come from the backend.
  const ride = {
    driver: {
      name: "Michael Johnson",
      rating: 4.8,
      rides: 24,
    },
    from: "Ruston, LA",
    to: "Monroe, LA",
    date: "August 28, 2026",
    departureTime: "7:30 AM",
    availableSeats: 2,
    price: 15,
    vehicle: "Toyota Camry",
    description:
      "Comfortable ride from Ruston to Monroe. I prefer leaving on time and can make a short stop if needed.",
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-4xl">
        {/* Back */}
        <Link
          to="/find-ride"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600"
        >
          <ArrowLeft size={18} />
          Back to Find a Ride
        </Link>

        {/* Main Card */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {/* Header */}
          <div className="border-b border-slate-200 p-6 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">
                  Ride Details
                </p>

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
              <h2 className="text-lg font-bold text-slate-900">Your Driver</h2>

              <div className="mt-4 flex items-center justify-between gap-4 rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-600">
                    {ride.driver.name.charAt(0)}
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {ride.driver.name}
                    </h3>

                    <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                      <Star
                        size={15}
                        className="fill-current text-yellow-500"
                      />

                      <span>{ride.driver.rating}</span>

                      <span>•</span>

                      <span>{ride.driver.rides} rides</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-600 sm:flex"
                >
                  <MessageCircle size={17} />
                  Message
                </button>
              </div>
            </section>

            {/* Route */}
            <section className="mt-8">
              <h2 className="text-lg font-bold text-slate-900">Journey</h2>

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

            <section className="mt-8">
              <div className="mb-4">
                <h2 className="text-lg font-bold text-slate-900">Route Map</h2>

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
                  <CalendarDays size={20} className="text-blue-600" />

                  <div>
                    <p className="text-xs text-slate-500">Date</p>
                    <p className="font-semibold text-slate-900">{ride.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
                  <Clock3 size={20} className="text-blue-600" />

                  <div>
                    <p className="text-xs text-slate-500">Departure</p>
                    <p className="font-semibold text-slate-900">
                      {ride.departureTime}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
                  <Users size={20} className="text-blue-600" />

                  <div>
                    <p className="text-xs text-slate-500">Available Seats</p>
                    <p className="font-semibold text-slate-900">
                      {ride.availableSeats} seats
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
                  <ShieldCheck size={20} className="text-green-600" />

                  <div>
                    <p className="text-xs text-slate-500">Vehicle</p>
                    <p className="font-semibold text-slate-900">
                      {ride.vehicle}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Description */}
            <section className="mt-8">
              <h2 className="text-lg font-bold text-slate-900">
                About This Ride
              </h2>

              <p className="mt-3 leading-7 text-slate-600">
                {ride.description}
              </p>
            </section>

            {/* Request */}
            <div className="mt-8 border-t border-slate-200 pt-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-slate-500">Your seat</p>

                  <p className="text-2xl font-bold text-slate-900">
                    ${ride.price}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowRequestModal(true)}
                  className="rounded-xl bg-blue-600 px-8 py-3.5 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.99]"
                >
                  Request to Join
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

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
                      {ride.driver.name}
                    </span>
                    .
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="font-semibold text-slate-900">
                    {ride.from} → {ride.to}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {ride.date} • {ride.departureTime}
                  </p>

                  <p className="mt-3 text-lg font-bold text-slate-900">
                    ${ride.price} / seat
                  </p>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowRequestModal(false)}
                    className="flex-1 rounded-xl border border-slate-200 px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={() => setRequestSent(true)}
                    className="flex-1 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
                  >
                    Send Request
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <ShieldCheck size={32} className="text-green-600" />
                </div>

                <h2 className="mt-5 text-2xl font-bold text-slate-900">
                  Request Sent
                </h2>

                <p className="mt-3 leading-6 text-slate-500">
                  Your request has been sent to{" "}
                  <span className="font-semibold text-slate-700">
                    {ride.driver.name}
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

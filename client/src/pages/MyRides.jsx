import { useState } from "react";
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

  const rides = {
    upcoming: [
      {
        id: 1,
        role: "passenger",
        driver: "Michael Johnson",
        from: "Ruston, LA",
        to: "Monroe, LA",
        date: "August 28, 2026",
        time: "7:30 AM",
        seats: 1,
        price: 15,
        status: "Confirmed",
        payment: "Cash on Delivery",
      },
      {
        id: 2,
        role: "driver",
        driver: "You",
        from: "Ruston, LA",
        to: "Shreveport, LA",
        date: "August 30, 2026",
        time: "9:00 AM",
        seats: 3,
        price: 20,
        status: "Published",
        payment: "Cash on Delivery",
      },
    ],

    requested: [
      {
        id: 3,
        role: "passenger",
        driver: "Sarah Williams",
        from: "Ruston, LA",
        to: "West Monroe, LA",
        date: "September 2, 2026",
        time: "5:30 PM",
        seats: 1,
        price: 12,
        status: "Pending",
        payment: "Cash on Delivery",
      },
    ],

    completed: [
      {
        id: 4,
        role: "passenger",
        driver: "Daniel Carter",
        from: "Ruston, LA",
        to: "Monroe, LA",
        date: "August 10, 2026",
        time: "8:00 AM",
        seats: 1,
        price: 15,
        status: "Completed",
        payment: "Cash on Delivery",
      },
    ],
  };

  const tabs = [
    {
      id: "upcoming",
      label: "Upcoming",
    },
    {
      id: "requested",
      label: "Requested",
    },
    {
      id: "completed",
      label: "Completed",
    },
  ];

  const activeRides = rides[activeTab];

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
              Manage your upcoming journeys and ride requests.
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
                  ? "bg-blue-600 text-white"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Ride List */}
        <section className="mt-6">

          {activeRides.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                <Car size={25} className="text-slate-400" />
              </div>

              <h2 className="mt-4 text-lg font-bold text-slate-900">
                No rides here yet
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Your rides will appear here when you start using UniVah.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {activeRides.map((ride) => (
                <article
                  key={ride.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  {/* Top */}
                  <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">

                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100">
                        {ride.role === "driver" ? (
                          <Car size={20} className="text-blue-600" />
                        ) : (
                          <Users size={20} className="text-blue-600" />
                        )}
                      </div>

                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                          {ride.role === "driver"
                            ? "You're driving"
                            : "You're riding with"}
                        </p>

                        <p className="font-semibold text-slate-900">
                          {ride.driver}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                        ride.status === "Confirmed"
                          ? "bg-green-50 text-green-700"
                          : ride.status === "Pending"
                            ? "bg-yellow-50 text-yellow-700"
                            : ride.status === "Completed"
                              ? "bg-slate-100 text-slate-600"
                              : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      {ride.status}
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
                        {ride.date}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Clock3
                          size={17}
                          className="text-blue-600"
                        />
                        {ride.time}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Users
                          size={17}
                          className="text-blue-600"
                        />
                        {ride.seats} seat
                        {ride.seats > 1 ? "s" : ""}
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
                        to={`/ride/${ride.id}`}
                        className="rounded-xl border border-slate-200 px-5 py-2.5 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        View Details
                      </Link>

                      {ride.role === "driver" &&
                        ride.status === "Published" && (
                          <button
                            type="button"
                            className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                          >
                            Manage Ride
                          </button>
                        )}

                    </div>

                  </div>
                </article>
              ))}
            </div>
          )}

        </section>

      </div>
    </main>
  );
}

export default MyRides;
import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Shield,
  Car,
  MapPin,
  Star,
  Calendar,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Settings,
  LogOut,
  Award,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const isDriver = user?.role?.toLowerCase() === "driver";

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-5xl">
        {/* Profile Banner & Header */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {/* Cover gradient */}
          <div className="h-32 bg-linear-to-r from-blue-600 via-indigo-600 to-cyan-500 sm:h-40" />

          {/* User info header */}
          <div className="relative px-6 pb-6 pt-0 sm:px-8 sm:pb-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                {/* Avatar */}
                <div className="-mt-16 flex h-24 w-24 items-center justify-center rounded-3xl border-4 border-white bg-blue-600 text-3xl font-bold text-white shadow-lg sm:-mt-20 sm:h-28 sm:w-28 sm:text-4xl">
                  {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>

                {/* Name & Role */}
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                      {user?.name || "Student User"}
                    </h1>

                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                        isDriver
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-blue-50 text-blue-700 border border-blue-200"
                      }`}
                    >
                      {isDriver ? <Car size={13} /> : <User size={13} />}
                      {user?.role || "Passenger"}
                    </span>

                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                      <CheckCircle2 size={12} className="text-green-600" />
                      Verified
                    </span>
                  </div>

                  <p className="text-sm text-slate-500">
                    {user?.email} • Ruston, LA
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                {isDriver ? (
                  <Link
                    to="/offer-ride"
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
                  >
                    <Car size={16} />
                    Offer a Ride
                  </Link>
                ) : (
                  <Link
                    to="/find-ride"
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
                  >
                    <Sparkles size={16} />
                    Find a Ride
                  </Link>
                )}

                <button
                  type="button"
                  onClick={logout}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="mt-8 flex gap-2 border-b border-slate-100">
              <button
                type="button"
                onClick={() => setActiveTab("overview")}
                className={`pb-3 text-sm font-semibold transition ${
                  activeTab === "overview"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Overview & Activity
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("account")}
                className={`pb-3 text-sm font-semibold transition ${
                  activeTab === "account"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Account Details
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {isDriver ? "Rides Published" : "Rides Taken"}
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <Car size={18} />
              </div>
            </div>
            <p className="mt-3 text-2xl font-bold text-slate-900">
              {isDriver ? "12" : "8"}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Active in Ruston area
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Rating
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <Star size={18} className="fill-amber-500" />
              </div>
            </div>
            <p className="mt-3 text-2xl font-bold text-slate-900">
              4.9 / 5.0
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Based on community reviews
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {isDriver ? "Passengers" : "Trips Shared"}
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <Award size={18} />
              </div>
            </div>
            <p className="mt-3 text-2xl font-bold text-slate-900">
              {isDriver ? "24 passengers" : "15 trips"}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Eco-friendly journeys
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Community
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                <Shield size={18} />
              </div>
            </div>
            <p className="mt-3 text-2xl font-bold text-slate-900">
              Ruston / Tech
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Trusted member
            </p>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            {/* Main Action Hub */}
            <div className="space-y-6 lg:col-span-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-900">
                    Quick Access
                  </h2>
                  <Link
                    to="/my-rides"
                    className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    View all my rides →
                  </Link>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Link
                    to="/my-rides"
                    className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-blue-300 hover:bg-blue-50/50"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                      <Calendar size={22} />
                    </div>
                    <div className="mt-4">
                      <h3 className="font-bold text-slate-900 group-hover:text-blue-600">
                        My Journeys
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">
                        View upcoming, pending requests, and completed trips
                      </p>
                    </div>
                  </Link>

                  {isDriver ? (
                    <Link
                      to="/offer-ride"
                      className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-blue-300 hover:bg-blue-50/50"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                        <Car size={22} />
                      </div>
                      <div className="mt-4">
                        <h3 className="font-bold text-slate-900 group-hover:text-blue-600">
                          Publish a Ride
                        </h3>
                        <p className="mt-1 text-xs text-slate-500">
                          Offer empty seats to fellow students heading your way
                        </p>
                      </div>
                    </Link>
                  ) : (
                    <Link
                      to="/find-ride"
                      className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-blue-300 hover:bg-blue-50/50"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
                        <MapPin size={22} />
                      </div>
                      <div className="mt-4">
                        <h3 className="font-bold text-slate-900 group-hover:text-blue-600">
                          Search Available Rides
                        </h3>
                        <p className="mt-1 text-xs text-slate-500">
                          Find affordable trips to Monroe, Shreveport, and campus
                        </p>
                      </div>
                    </Link>
                  )}
                </div>
              </div>

              {/* Safety & Trust Note */}
              <div className="rounded-3xl border border-blue-100 bg-blue-50/60 p-6 sm:p-7">
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-blue-600 p-3 text-white">
                    <Shield size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">
                      UniVah Student Safety Community
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      Your profile is verified within the UniVah ride-sharing
                      network. All ride requests include driver contact details,
                      cash-on-delivery transparency, and direct communication.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Profile Card */}
            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-bold text-slate-900">
                  Profile Details
                </h3>

                <div className="mt-5 space-y-4 text-sm">
                  <div className="flex items-center gap-3">
                    <Mail size={17} className="text-slate-400" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-slate-400">Email</p>
                      <p className="truncate font-semibold text-slate-800">
                        {user?.email || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone size={17} className="text-slate-400" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-slate-400">Phone</p>
                      <p className="font-semibold text-slate-800">
                        {user?.phone || "Not provided"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin size={17} className="text-slate-400" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-slate-400">Location</p>
                      <p className="font-semibold text-slate-800">
                        Ruston, Louisiana
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Shield size={17} className="text-slate-400" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-slate-400">Role</p>
                      <p className="font-semibold capitalize text-slate-800">
                        {user?.role || "Passenger"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Account Details Tab */}
        {activeTab === "account" && (
          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold text-slate-900">
              Personal Information
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Your registered details on the UniVah platform.
            </p>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Full Name
                </p>
                <p className="mt-1 text-base font-bold text-slate-900">
                  {user?.name || "N/A"}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Email Address
                </p>
                <p className="mt-1 text-base font-bold text-slate-900">
                  {user?.email || "N/A"}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Phone Number
                </p>
                <p className="mt-1 text-base font-bold text-slate-900">
                  {user?.phone || "Not provided"}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Account Type
                </p>
                <p className="mt-1 text-base font-bold capitalize text-slate-900">
                  {user?.role || "Passenger"}
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-end border-t border-slate-200 pt-6">
              <button
                type="button"
                onClick={logout}
                className="rounded-xl border border-red-300 bg-white px-6 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
              >
                Sign Out of UniVah
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default Profile;
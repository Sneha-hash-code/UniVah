import { useState, useRef, useEffect } from "react";
import {
  Menu,
  X,
  User,
  LogOut,
  Car,
  ChevronDown,
  Calendar,
  ShieldCheck,
  PlusCircle,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileDropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close dropdowns on route change
  useEffect(() => {
    setIsOpen(false);
    setIsProfileOpen(false);
  }, [location.pathname]);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    setIsOpen(false);
    navigate("/");
  };

  const isDriver = user?.role?.toLowerCase() === "driver";

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-black tracking-tight text-blue-600 transition hover:opacity-90"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
            <Car size={20} />
          </div>
          <span>UniVah</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-1 lg:flex">
          <Link
            to="/"
            className={`rounded-xl px-3.5 py-2 text-sm font-semibold transition ${
              location.pathname === "/"
                ? "bg-blue-50 text-blue-600"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            Home
          </Link>

          <Link
            to="/find-ride"
            className={`rounded-xl px-3.5 py-2 text-sm font-semibold transition ${
              location.pathname === "/find-ride"
                ? "bg-blue-50 text-blue-600"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            Find a Ride
          </Link>

          <Link
            to="/how-it-works"
            className={`rounded-xl px-3.5 py-2 text-sm font-semibold transition ${
              location.pathname === "/how-it-works"
                ? "bg-blue-50 text-blue-600"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            How It Works
          </Link>

          <Link
            to="/about"
            className={`rounded-xl px-3.5 py-2 text-sm font-semibold transition ${
              location.pathname === "/about"
                ? "bg-blue-50 text-blue-600"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            About
          </Link>
        </div>

        {/* Right CTA / Auth Section */}
        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <>
              {/* Offer a Ride Button */}
              <Link
                to="/offer-ride"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
              >
                <PlusCircle size={16} />
                <span>Offer a Ride</span>
              </Link>

              {/* Profile Dropdown Menu */}
              <div className="relative" ref={profileDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsProfileOpen((prev) => !prev)}
                  className={`flex items-center gap-2.5 rounded-full border p-1 pl-1.5 pr-3 transition ${
                    isProfileOpen
                      ? "border-blue-300 bg-blue-50/70 shadow-sm"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                  }`}
                  aria-expanded={isProfileOpen}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white shadow-sm">
                    {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <span className="max-w-30 truncate text-sm font-semibold text-slate-700">
                    {user?.name?.split(" ")[0] || "Account"}
                  </span>
                  <ChevronDown
                    size={14}
                    className={`text-slate-400 transition-transform duration-200 ${
                      isProfileOpen ? "rotate-180 text-blue-600" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Card */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-64 origin-top-right rounded-2xl border border-slate-200 bg-white p-2 shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2">
                    {/* User info banner */}
                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="truncate text-sm font-bold text-slate-900">
                        {user?.name || "Student User"}
                      </p>
                      <p className="truncate text-xs text-slate-500">
                        {user?.email}
                      </p>
                      <div className="mt-2 flex items-center gap-1.5">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold capitalize ${
                            isDriver
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {isDriver ? <Car size={10} /> : <User size={10} />}
                          {user?.role || "Passenger"}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] text-slate-500">
                          <ShieldCheck size={11} className="text-green-600" />
                          Verified
                        </span>
                      </div>
                    </div>

                    <div className="my-1.5 border-t border-slate-100" />

                    {/* Menu links */}
                    <div className="space-y-0.5">
                      <Link
                        to="/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
                      >
                        <User size={16} className="text-slate-400" />
                        My Profile
                      </Link>

                      <Link
                        to="/my-rides"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Calendar size={16} className="text-slate-400" />
                        My Rides & Bookings
                      </Link>

                      <Link
                        to="/offer-ride"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Car size={16} className="text-slate-400" />
                        Offer a Ride
                      </Link>
                    </div>

                    <div className="my-1.5 border-t border-slate-100" />

                    {/* Logout Button */}
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="group flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600"
                    >
                      <LogOut
                        size={16}
                        className="text-slate-400 transition group-hover:text-red-600"
                      />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2.5">
              <Link
                to="/login"
                className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
              >
                Sign In
              </Link>

              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-500/20 transition hover:bg-blue-700 active:scale-[0.98]"
              >
                Join UniVah
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-xl p-2 text-slate-700 transition hover:bg-slate-100 md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden animate-in fade-in">
          <div className="flex flex-col gap-2">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-blue-600"
            >
              Home
            </Link>

            <Link
              to="/find-ride"
              onClick={() => setIsOpen(false)}
              className="rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-blue-600"
            >
              Find a Ride
            </Link>

            <Link
              to="/how-it-works"
              onClick={() => setIsOpen(false)}
              className="rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-blue-600"
            >
              How It Works
            </Link>

            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className="rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-blue-600"
            >
              About
            </Link>

            {isAuthenticated ? (
              <div className="mt-2 border-t border-slate-100 pt-3">
                {/* User card */}
                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                    {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-slate-900">
                      {user?.name || "Profile"}
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      {user?.email}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex flex-col gap-1">
                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-blue-600"
                  >
                    <User size={16} />
                    My Profile
                  </Link>

                  <Link
                    to="/my-rides"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-blue-600"
                  >
                    <Calendar size={16} />
                    My Rides
                  </Link>

                  <Link
                    to="/offer-ride"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-blue-600"
                  >
                    <Car size={16} />
                    Offer a Ride
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-3 flex flex-col gap-2 border-t border-slate-100 pt-3">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl border border-slate-200 py-2.5 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Sign In
                </Link>

                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl bg-blue-600 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                >
                  Join UniVah
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;

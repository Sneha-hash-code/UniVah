import { Menu, X, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          UniVah
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="text-sm font-medium text-slate-700 hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            to="/rides"
            className="text-sm font-medium text-slate-700 hover:text-blue-600"
          >
            Find a Ride
          </Link>

          <Link
            to="/how-it-works"
            className="text-sm font-medium text-slate-700 hover:text-blue-600"
          >
            How It Works
          </Link>

          <Link
            to="/about"
            className="text-sm font-medium text-slate-700 hover:text-blue-600"
          >
            About
          </Link>

          {isAuthenticated ? (
            <>
              {/* User */}
              <Link
                to="/profile"
                className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-blue-600"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <User size={18} />
                </div>

                <span>{user?.name}</span>
              </Link>

              {/* Logout */}
              <button
                onClick={logout}
                className="rounded-lg border border-red-500 px-5 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Login */}
              <Link
                to="/login"
                className="rounded-lg border border-blue-600 px-5 py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
              >
                Login
              </Link>

              {/* Register */}
              <Link
                to="/register"
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-slate-700 md:hidden"
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="text-slate-700"
            >
              Home
            </Link>

            <Link
              to="/rides"
              onClick={() => setIsOpen(false)}
              className="text-slate-700"
            >
              Find a Ride
            </Link>

            <Link
              to="/how-it-works"
              onClick={() => setIsOpen(false)}
              className="text-slate-700"
            >
              How It Works
            </Link>

            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className="text-slate-700"
            >
              About
            </Link>

            {isAuthenticated ? (
              <>
                {/* Mobile User */}
                <div className="flex items-center gap-3 border-t border-slate-200 pt-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <User size={18} />
                  </div>

                  <span className="font-semibold text-slate-700">
                    {user?.name}
                  </span>
                </div>

                {/* Mobile Logout */}
                <button
                  onClick={handleLogout}
                  className="rounded-lg border border-red-500 px-5 py-2.5 text-center font-semibold text-red-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg border border-blue-600 px-5 py-2.5 text-center font-semibold text-blue-600"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg bg-blue-600 px-5 py-2.5 text-center font-semibold text-white"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;

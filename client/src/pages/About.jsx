import {
  ArrowRight,
  Car,
  Heart,
  ShieldCheck,
  Users,
  MapPin,
  Sparkles,
  Award,
} from "lucide-react";
import { Link } from "react-router-dom";

function About() {
  const values = [
    {
      icon: Users,
      title: "Community First",
      description:
        "UniVah connects students, faculty, and neighbors traveling in the same direction, turning everyday commutes into connected experiences.",
    },
    {
      icon: ShieldCheck,
      title: "Safety & Trust",
      description:
        "We prioritize peace of mind with verified student accounts, transparent ride info, and cash-on-delivery simplicity.",
    },
    {
      icon: Car,
      title: "Smarter Mobility",
      description:
        "Make better use of empty vehicle seats across Ruston, Monroe, and Shreveport while reducing congestion and travel costs.",
    },
    {
      icon: Heart,
      title: "Built With Purpose",
      description:
        "UniVah is built on a simple idea: regional transportation gets easier, cleaner, and cheaper when people travel together.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-50 px-6 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
              <Sparkles size={16} />
              About UniVah Ride Share
            </div>

            <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
              We believe every journey is better
              <span className="text-blue-600"> together.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              UniVah is a student-centered ride-sharing platform designed to
              connect people traveling across Ruston, Monroe, Shreveport, and
              beyond. We make it simple to find a ride, share empty seats, and
              split trip costs.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/find-ride"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
              >
                Find a Ride
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/how-it-works"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats section */}
      <section className="border-y border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-20">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-center">
            <div>
              <p className="text-4xl font-bold text-blue-600">100%</p>
              <p className="mt-2 text-sm font-medium text-slate-600">
                Student & Community Focused
              </p>
            </div>
            <div>
              <p className="text-4xl font-bold text-slate-900">COD</p>
              <p className="mt-2 text-sm font-medium text-slate-600">
                Transparent Cash Payments
              </p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600">4+ Cities</p>
              <p className="mt-2 text-sm font-medium text-slate-600">
                Ruston, Monroe, Shreveport & more
              </p>
            </div>
            <div>
              <p className="text-4xl font-bold text-slate-900">0 Fees</p>
              <p className="mt-2 text-sm font-medium text-slate-600">
                Direct Driver & Rider Connection
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="px-6 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="font-semibold uppercase tracking-wider text-blue-600">
              Why UniVah?
            </p>

            <h2 className="mt-3 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Transportation shouldn't have to be stressful or expensive.
            </h2>

            <div className="mt-6 space-y-5 text-lg leading-8 text-slate-600">
              <p>
                Every day, students and community members travel the I-20
                corridor between Ruston, Monroe, and Shreveport with empty
                seats. Meanwhile, others need safe, affordable transportation
                to campus, grocery hubs, airports, and home for the weekend.
              </p>

              <p>
                UniVah bridges that gap. Instead of driving alone or paying
                steep rideshare surge pricing, drivers can post upcoming trips
                and riders can reserve seats with one click.
              </p>

              <p>
                Our mission is simple: provide an accessible, trustworthy,
                and friendly shared mobility network for our regional community.
              </p>
            </div>
          </div>

          {/* Visual card */}
          <div className="relative">
            <div className="rounded-3xl bg-blue-600 p-8 text-white sm:p-10 shadow-xl">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
                <MapPin size={32} />
              </div>

              <h3 className="mt-8 text-3xl font-bold">
                One destination.
                <br />
                Shared journeys.
              </h3>

              <p className="mt-5 leading-7 text-blue-100">
                UniVah helps students and commuters discover that you never have
                to make the trip alone. Split the gas, make new friends, and
                arrive safely.
              </p>

              <div className="mt-10 flex items-center gap-4 border-t border-white/20 pt-6">
                <div className="flex -space-x-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-bold text-blue-600 shadow">
                    U
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-600 bg-slate-100 text-sm font-bold text-slate-700 shadow">
                    V
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-600 bg-emerald-400 text-sm font-bold text-slate-900 shadow">
                    +
                  </div>
                </div>

                <span className="text-sm font-medium text-blue-100">
                  Ruston & Louisiana Tech Community
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-slate-50 px-6 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="font-semibold uppercase tracking-wider text-blue-600">
              Our Core Values
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Built around people, not just cars.
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              UniVah is about more than connecting a pickup location to a drop-off.
              It's about building trust, reliability, and community on the road.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon size={24} />
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-slate-900">
                    {value.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600 text-sm">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-blue-600 px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-4xl text-center text-white">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Your next journey could be a shared one.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-blue-100">
            Find someone heading your way or offer an empty seat on your next trip.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/find-ride"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-blue-600 transition hover:bg-slate-100"
            >
              Find a Ride
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/offer-ride"
              className="inline-flex items-center justify-center rounded-xl border border-white/40 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
            >
              Offer a Ride
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
import {
  ArrowRight,
  Car,
  Heart,
  ShieldCheck,
  Users,
  MapPin,
} from "lucide-react";

import { Link } from "react-router-dom";

function About() {
  const values = [
    {
      icon: Users,
      title: "Community First",
      description:
        "UniVah brings people traveling in the same direction together and turns individual journeys into shared experiences.",
    },
    {
      icon: ShieldCheck,
      title: "Safety & Trust",
      description:
        "We want every rider and driver to feel confident before, during, and after every journey.",
    },
    {
      icon: Car,
      title: "Smarter Travel",
      description:
        "Make better use of available seats while making everyday transportation more convenient.",
    },
    {
      icon: Heart,
      title: "Built With Purpose",
      description:
        "UniVah is built around a simple idea: transportation becomes better when people can help each other.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-slate-50 px-6 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="mb-4 font-semibold uppercase tracking-wider text-blue-600">
              About UniVah
            </p>

            <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
              We believe every journey is better
              <span className="text-blue-600"> together.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              UniVah is a ride-sharing platform designed to connect people
              traveling in the same direction. We make it easier to find a
              ride, share an empty seat, and travel together.
            </p>
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
              Transportation shouldn't have to be complicated.
            </h2>

            <div className="mt-6 space-y-5 text-lg leading-8 text-slate-600">
              <p>
                Every day, countless people travel along the same roads while
                many vehicles have empty seats. At the same time, others are
                looking for an affordable and convenient way to reach their
                destination.
              </p>

              <p>
                UniVah connects these two sides. Instead of traveling alone,
                people can share their journey with others going the same way.
              </p>

              <p>
                Our goal is simple: make ride sharing accessible, convenient,
                and trustworthy.
              </p>
            </div>
          </div>

          {/* Visual card */}
          <div className="relative">
            <div className="rounded-3xl bg-blue-600 p-8 text-white sm:p-10">
              <MapPin size={38} />

              <h3 className="mt-8 text-3xl font-bold">
                One destination.
                <br />
                Many journeys.
              </h3>

              <p className="mt-5 leading-7 text-blue-100">
                UniVah helps people discover that they don't have to make the
                journey alone.
              </p>

              <div className="mt-10 flex items-center gap-4 border-t border-white/20 pt-6">
                <div className="flex -space-x-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-bold text-blue-600">
                    U
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-600 bg-slate-100 text-sm font-bold text-slate-700">
                    V
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-600 bg-slate-200 text-sm font-bold text-slate-700">
                    +
                  </div>
                </div>

                <span className="text-sm text-blue-100">
                  Connected through UniVah
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-slate-50 px-6 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-semibold uppercase tracking-wider text-blue-600">
            Our Mission
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            Making shared mobility simpler for everyone.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            We want to create a transportation experience where finding a
            shared ride is as simple as finding your destination. By
            connecting riders and drivers, UniVah aims to make everyday travel
            more accessible while building stronger communities.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="font-semibold uppercase tracking-wider text-blue-600">
              What We Believe
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Built around people, not just rides.
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              UniVah is more than connecting a pickup point to a destination.
              It's about creating a better way for people to travel together.
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

                  <h3 className="mt-6 text-xl font-semibold text-slate-900">
                    {value.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="px-6 pb-20 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
            <div className="grid lg:grid-cols-2">
              <div className="bg-slate-900 px-8 py-12 text-white sm:px-12 lg:px-14">
                <p className="font-semibold uppercase tracking-wider text-blue-400">
                  More Than A Ride
                </p>

                <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
                  Every shared ride can create a connection.
                </h2>

                <p className="mt-6 leading-7 text-slate-300">
                  Whether you're heading to campus, going to work, visiting
                  another city, or simply traveling home, UniVah helps you
                  connect with people whose journey overlaps with yours.
                </p>
              </div>

              <div className="flex items-center px-8 py-12 sm:px-12 lg:px-14">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Heart size={24} />
                  </div>

                  <h3 className="mt-6 text-2xl font-bold text-slate-900">
                    Share the road.
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    A small empty seat can make someone else's journey easier.
                  </p>

                  <Link
                    to="/find-ride"
                    className="mt-7 inline-flex items-center gap-2 font-semibold text-blue-600 transition hover:text-blue-700"
                  >
                    Find a Ride
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
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
            Find someone going your way or offer a seat on your next journey.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/find-ride"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition hover:bg-slate-100"
            >
              Find a Ride
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/offer-ride"
              className="inline-flex items-center justify-center rounded-lg border border-white/40 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
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
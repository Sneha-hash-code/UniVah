import {
  Search,
  MapPin,
  Car,
  MessageCircle,
  ShieldCheck,
  CreditCard,
  ArrowRight,
  UserRound,
} from "lucide-react";

import { Link } from "react-router-dom";

function HowItWorks() {
  const riderSteps = [
    {
      icon: Search,
      number: "01",
      title: "Find a Ride",
      description:
        "Enter your pickup location, destination, and preferred travel time to find available rides.",
    },
    {
      icon: UserRound,
      number: "02",
      title: "Choose Your Ride",
      description:
        "Compare available rides, check driver details, and choose the option that works best for you.",
    },
    {
      icon: MessageCircle,
      number: "03",
      title: "Connect With Your Driver",
      description:
        "Confirm your ride and stay connected with your driver before your journey begins.",
    },
    {
      icon: MapPin,
      number: "04",
      title: "Reach Your Destination",
      description:
        "Meet your driver at the agreed pickup point and enjoy a convenient journey to your destination.",
    },
  ];

  const driverSteps = [
    {
      icon: Car,
      number: "01",
      title: "Offer a Ride",
      description:
        "Tell us where you're going, when you're leaving, and how many seats you have available.",
    },
    {
      icon: UserRound,
      number: "02",
      title: "Find Passengers",
      description:
        "Connect with people traveling in the same direction and choose suitable passengers.",
    },
    {
      icon: MessageCircle,
      number: "03",
      title: "Confirm the Ride",
      description:
        "Coordinate the pickup details with your passengers and get ready for the journey.",
    },
    {
      icon: MapPin,
      number: "04",
      title: "Start Your Journey",
      description:
        "Pick up your passengers and share the journey while making better use of your empty seats.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-slate-50 px-6 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="mb-4 font-semibold uppercase tracking-wider text-blue-600">
              How UniVah Works
            </p>

            <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Your journey starts with
              <span className="text-blue-600"> one simple ride.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              UniVah makes ride sharing simple. Whether you need a ride or
              have an empty seat, connect with people heading the same way.
            </p>
          </div>
        </div>
      </section>

      {/* Main flow */}
      <section className="px-6 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-semibold uppercase tracking-wider text-blue-600">
              Simple. Convenient. Connected.
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Getting a ride is easy
            </h2>

            <p className="mt-4 text-slate-600">
              No complicated process. Just find, connect, and go.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {riderSteps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="relative rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Icon size={24} />
                    </div>

                    <span className="text-4xl font-bold text-slate-100">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-semibold text-slate-900">
                    {step.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Driver section */}
      <section className="bg-slate-50 px-6 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="font-semibold uppercase tracking-wider text-blue-600">
                Have an empty seat?
              </p>

              <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
                Turn your journey into a shared journey.
              </h2>

              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
                Going somewhere anyway? Offer your available seats and connect
                with people traveling in the same direction.
              </p>

              <Link
                to="/offer-ride"
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Offer a Ride
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {driverSteps.map((step) => {
                const Icon = step.icon;

                return (
                  <div
                    key={step.number}
                    className="rounded-2xl bg-white p-6 shadow-sm"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <Icon size={22} />
                    </div>

                    <p className="mt-5 text-sm font-semibold text-blue-600">
                      STEP {step.number}
                    </p>

                    <h3 className="mt-1 text-lg font-semibold text-slate-900">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Safety */}
      <section className="px-6 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-5xl rounded-3xl bg-blue-600 px-8 py-12 text-white sm:px-12 lg:px-16">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15">
              <ShieldCheck size={30} />
            </div>

            <h2 className="mt-6 text-3xl font-bold sm:text-4xl">
              Safety comes first.
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-blue-100">
              UniVah is designed to make ride sharing more comfortable and
              trustworthy. We believe every journey should begin with
              confidence.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm font-medium">
              <span>✓ Verified profiles</span>
              <span>✓ Ride details</span>
              <span>✓ Direct communication</span>
            </div>
          </div>
        </div>
      </section>

      {/* Payment */}
      <section className="border-t border-slate-100 px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
            <CreditCard size={24} />
          </div>

          <h2 className="text-2xl font-bold text-slate-900">
            Simple payment, no complications.
          </h2>

          <p className="max-w-2xl text-slate-600">
            For now, UniVah keeps payments simple with Cash on Delivery.
            Payment can be handled directly between the rider and driver.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl rounded-3xl border border-slate-200 bg-white px-8 py-12 text-center shadow-sm">
          <h2 className="text-3xl font-bold text-slate-900">
            Ready to share the journey?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-slate-600">
            Find a ride that fits your journey or offer a seat to someone
            heading your way.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/find-ride"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Find a Ride
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/offer-ride"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Offer a Ride
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HowItWorks;
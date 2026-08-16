import { MapPin, Search, CarFront } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Find a ride",
    description:
      "Enter your pickup location and destination to discover available rides.",
  },
  {
    number: "02",
    icon: MapPin,
    title: "Choose your ride",
    description:
      "Compare available rides, drivers, departure times, and prices.",
  },
  {
    number: "03",
    icon: CarFront,
    title: "Enjoy the journey",
    description:
      "Book your seat and travel comfortably with your chosen driver.",
  },
];

function HowItWorks() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            How it works
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            Your journey starts in three steps
          </h2>
        </div>

        <div className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div key={step.number} className="relative text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg">
                  <Icon size={28} />
                </div>

                <p className="mt-5 text-sm font-bold text-blue-600">
                  {step.number}
                </p>

                <h3 className="mt-2 text-xl font-semibold text-slate-900">
                  {step.title}
                </h3>

                <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-600">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
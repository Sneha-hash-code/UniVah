import { DollarSign, Leaf, ShieldCheck, Smartphone } from "lucide-react";
import Card from "../common/Card";

const features = [
  {
    icon: ShieldCheck,
    title: "Safe & Verified",
    description:
      "Connect with verified riders and drivers for a more trustworthy journey.",
  },
  {
    icon: DollarSign,
    title: "Affordable Travel",
    description:
      "Share the cost of your trip and make everyday travel more affordable.",
  },
  {
    icon: Leaf,
    title: "Travel Sustainably",
    description:
      "Fewer cars on the road means less traffic and a smaller environmental footprint.",
  },
  {
    icon: Smartphone,
    title: "Simple Booking",
    description:
      "Find, request, and manage your rides from one simple platform.",
  },
];

function WhyUniVah() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Why UniVah
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            More than just a ride
          </h2>

          <p className="mt-4 text-slate-600">
            We're making local transportation simpler, safer, and more
            accessible for everyone.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card
                key={feature.title}
                className="transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Icon size={23} />
                </div>

                <h3 className="mt-6 text-lg font-semibold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhyUniVah;
import { CheckCircle2, ShieldCheck } from "lucide-react";

const safetyFeatures = [
  "Verified driver and rider profiles",
  "Transparent ride details",
  "Ratings and reviews",
  "Trip information available to both sides",
];

function SafetySection() {
  return (
    <section className="bg-slate-900 py-20 text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <div>
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600">
            <ShieldCheck size={28} />
          </div>

          <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-blue-400">
            Your safety matters
          </p>

          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
            Ride with confidence
          </h2>

          <p className="mt-5 max-w-xl leading-7 text-slate-300">
            UniVah is designed to help riders and drivers make informed
            decisions before every trip.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-700 bg-slate-800 p-6 sm:p-8">
          <div className="space-y-5">
            {safetyFeatures.map((feature) => (
              <div key={feature} className="flex items-start gap-3">
                <CheckCircle2
                  size={21}
                  className="mt-0.5 shrink-0 text-blue-400"
                />

                <p className="text-slate-200">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SafetySection;
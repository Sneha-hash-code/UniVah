import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function CTA() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Ready to make your next trip easier?
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-slate-600">
          Find a ride around Ruston or share your journey with someone heading
          the same way.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/find-ride"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
          >
            Find a Ride
            <ArrowRight size={18} />
          </Link>

          <Link
            to="/offer-ride"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Offer a Ride
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CTA;
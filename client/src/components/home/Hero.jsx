import { ArrowRight, MapPin } from "lucide-react";
import Button from "../common/Button";
import Input from "../common/Input";

function Hero() {
  return (
    <section className="overflow-hidden bg-slate-50">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2 lg:items-center lg:px-8">
        
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
            <MapPin size={16} />
            Ride sharing in Ruston, Louisiana
          </div>

          <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Your ride.
            <span className="text-blue-600"> Your way.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Find affordable rides, share your journey, and travel around
            Ruston and beyond with UniVah.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button className="flex items-center justify-center gap-2">
              Find a Ride
              <ArrowRight size={18} />
            </Button>

            <Button variant="secondary">
              Offer a Ride
            </Button>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl sm:p-7">
          <h2 className="text-xl font-bold text-slate-900">
            Where are you going?
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Find a ride that fits your journey.
          </p>

          <div className="mt-6 space-y-4">
            <Input
              label="From"
              placeholder="Ruston, LA"
            />

            <Input
              label="To"
              placeholder="Where are you going?"
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Date"
                type="date"
              />

              <Input
                label="Passengers"
                type="number"
                min="1"
                defaultValue="1"
              />
            </div>

            <Button className="w-full">
              Search Rides
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
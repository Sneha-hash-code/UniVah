import { CalendarDays, Clock3, MapPin, Users, Star } from "lucide-react";

function RideCard({ ride, onViewRide }) {
  const driverName = ride?.driver?.name || "Driver";
  const driverInitial = driverName.charAt(0).toUpperCase() || "D";
  const driverRating = ride?.driver?.rating ?? "5.0";

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="p-5 sm:p-6">

        {/* Driver + Seats */}
        <div className="flex items-start justify-between gap-4">

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
              {driverInitial}
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                {driverName}
              </h3>

              <div className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                <Star size={14} className="fill-current text-yellow-500" />
                <span>{driverRating}</span>
              </div>
            </div>
          </div>

          <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
            {ride.availableSeats} seats left
          </span>
        </div>

        {/* Route */}
        <div className="mt-6 rounded-xl bg-slate-50 p-4">

          <div className="flex items-start gap-3">
            <MapPin size={19} className="mt-0.5 shrink-0 text-blue-600" />

            <div className="min-w-0">
              <p className="text-sm text-slate-500">From</p>
              <p className="font-semibold text-slate-900">
                {ride.from}
              </p>
            </div>
          </div>

          <div className="ml-2.5 my-2 h-5 border-l border-dashed border-slate-300" />

          <div className="flex items-start gap-3">
            <MapPin size={19} className="mt-0.5 shrink-0 text-red-500" />

            <div className="min-w-0">
              <p className="text-sm text-slate-500">To</p>
              <p className="font-semibold text-slate-900">
                {ride.to}
              </p>
            </div>
          </div>

        </div>

        {/* Ride Information */}
        <div className="mt-5 grid grid-cols-2 gap-3">

          <div className="flex items-center gap-2 text-sm text-slate-600">
            <CalendarDays size={17} className="text-blue-600" />
            <span>{ride.date}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Clock3 size={17} className="text-blue-600" />
            <span>{ride.departureTime}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Users size={17} className="text-blue-600" />
            <span>{ride.availableSeats} available</span>
          </div>

          <div className="text-right">
            <p className="text-xs text-slate-500">Per seat</p>
            <p className="text-lg font-bold text-slate-900">
              ${ride.price}
            </p>
          </div>

        </div>

        {/* Action */}
        <button
          type="button"
          onClick={() => onViewRide(ride)}
          className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.99]"
        >
          View Ride
        </button>

      </div>
    </article>
  );
}

export default RideCard;
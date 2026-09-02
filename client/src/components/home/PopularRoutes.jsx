import { ArrowRight, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Card from "../common/Card";

const routes = [
  {
    from: "Ruston, LA",
    to: "Monroe, LA",
    time: "Around 35 min",
  },
  {
    from: "Ruston, LA",
    to: "Shreveport, LA",
    time: "Around 1 hr 10 min",
  },
  {
    from: "Ruston, LA",
    to: "Grambling, LA",
    time: "Around 15 min",
  },
  {
    from: "Ruston, LA",
    to: "West Monroe, LA",
    time: "Around 30 min",
  },
];

function PopularRoutes() {
  const navigate = useNavigate();

  const handleRouteClick = (from, to) => {
    navigate("/find-ride", { state: { from, to, seats: "1" } });
  };

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Popular routes
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
              Where are you heading?
            </h2>

            <p className="mt-3 max-w-xl text-slate-600">
              Discover popular routes around Ruston and nearby communities.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/find-ride")}
            className="flex items-center gap-2 self-start text-sm font-semibold text-blue-600 hover:text-blue-700 sm:self-auto"
          >
            Explore rides
            <ArrowRight size={17} />
          </button>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {routes.map((route) => (
            <Card
              key={`${route.from}-${route.to}`}
              onClick={() => handleRouteClick(route.from, route.to)}
              className="group cursor-pointer transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition">
                <MapPin size={21} />
              </div>

              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  From
                </p>

                <p className="mt-1 font-bold text-slate-900">
                  {route.from}
                </p>

                <div className="my-3 border-t border-dashed border-slate-200" />

                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  To
                </p>

                <p className="mt-1 font-bold text-slate-900">
                  {route.to}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xs text-slate-500 font-medium">
                    {route.time}
                  </p>
                  <span className="text-xs font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition">
                    View rides →
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularRoutes;
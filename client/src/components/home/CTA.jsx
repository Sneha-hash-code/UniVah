import Button from "../common/Button";

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
          <Button>
            Find a Ride
          </Button>

          <Button variant="secondary">
            Offer a Ride
          </Button>
        </div>
      </div>
    </section>
  );
}

export default CTA;
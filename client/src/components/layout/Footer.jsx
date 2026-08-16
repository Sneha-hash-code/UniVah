function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-bold text-blue-600">
              UniVah
            </h2>

            <p className="mt-2 max-w-sm text-sm text-slate-500">
              Connecting people and making travel easier across Ruston and beyond.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-slate-600">
            <a href="#" className="hover:text-blue-600">
              About
            </a>

            <a href="#" className="hover:text-blue-600">
              Safety
            </a>

            <a href="#" className="hover:text-blue-600">
              Terms
            </a>

            <a href="#" className="hover:text-blue-600">
              Privacy
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-6 text-sm text-slate-500">
          © {new Date().getFullYear()} UniVah. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
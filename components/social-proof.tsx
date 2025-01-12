const companies = [
  "Google",
  "Microsoft",
  "Amazon",
  "YouTube",
  "Spotify",
];

export function Companies() {
  return (
    <section id="companies">
      <div className="py-1 pb-10">
        <div className="container mx-auto px-4 md:px-8">
          <h3 className="text-center text-sm font-semibold text-gray-500 pb-2">
            TRUSTED BY LEADING TEAMS
          </h3>
          <div className="relative mt-6">
            <div className="grid grid-cols-2 place-items-center gap-1 md:grid-cols-4 xl:grid-cols-5 xl:gap-1">
              {companies.map((logo, idx) => (
                <img
                  key={idx}
                  src={`https://cdn.magicui.design/companies/${logo}.svg`}
                  className="h-10 w-40 px-2 dark:brightness-0 dark:invert"
                  alt={logo}
                />
              ))}
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 h-full w-1/3"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 h-full w-1/3"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

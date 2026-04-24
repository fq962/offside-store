import Link from "next/link";

const leagues = [
  { name: "LaLiga",         href: "/ligas/laliga" },
  { name: "Premier League", href: "/ligas/premier-league" },
  { name: "Serie A",        href: "/ligas/serie-a" },
  { name: "Bundesliga",     href: "/ligas/bundesliga" },
  { name: "Ligue 1",        href: "/ligas/ligue-1" },
] as const;

function ImagePlaceholder() {
  return (
    <div className="w-full aspect-square bg-bg-elevated flex items-center justify-center rounded-lg">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 80 80"
        className="w-2/3 h-2/3"
        aria-hidden="true"
      >
        <rect x="6" y="14" width="68" height="52" rx="6" fill="none" stroke="#3D4F4D" strokeWidth="3" />
        <circle cx="24" cy="30" r="6" fill="#3D4F4D" />
        <path d="M6 52 L26 34 L42 50 L54 38 L74 54" fill="none" stroke="#3D4F4D" strokeWidth="3" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function LeagueShop() {
  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="block w-1 h-6 bg-accent rounded-full" />
            <h2 className="text-fg-primary text-2xl tracking-widest uppercase">
              Compra por Liga
            </h2>
          </div>
          <Link
            href="/ligas"
            className="text-fg-muted hover:text-accent text-sm tracking-wider uppercase transition-colors duration-150 flex items-center gap-1"
          >
            Ver más
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {leagues.map((league) => (
            <Link
              key={league.href}
              href={league.href}
              className="group flex flex-col items-center gap-3 p-4 rounded-xl border border-border hover:border-border-strong hover:bg-bg-surface transition-all duration-150"
            >
              <div className="w-full max-w-[140px] mx-auto">
                <ImagePlaceholder />
              </div>
              <span className="text-fg-secondary group-hover:text-fg-primary text-xs tracking-wider uppercase text-center transition-colors duration-150">
                {league.name}
              </span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

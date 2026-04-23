const footerLinks = {
  tienda: [
    { label: "Camisas",          href: "/camisas" },
    { label: "Ofertas",          href: "/ofertas" },
    { label: "Nuevos Arrivals",  href: "/nuevos" },
  ],
  soporte: [
    { label: "Nosotros",                  href: "/nosotros" },
    { label: "Contacto",                  href: "/contacto" },
    { label: "Envíos y Devoluciones",     href: "/envios" },
  ],
} as const;

export default function Footer() {
  return (
    <footer className="bg-bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div>
            <p className="text-fg-primary font-bold text-lg uppercase tracking-widest">
              Offside<span className="text-accent">Store</span>
            </p>
            <p className="text-fg-muted text-sm mt-2 leading-relaxed">
              Tu tienda online de camisetas y ropa deportiva.
            </p>
          </div>

          {/* Tienda */}
          <div>
            <h3 className="text-fg-primary font-semibold text-xs uppercase tracking-wider mb-4">
              Tienda
            </h3>
            <ul className="space-y-2">
              {footerLinks.tienda.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-fg-secondary hover:text-accent text-sm transition-colors duration-150"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Soporte */}
          <div>
            <h3 className="text-fg-primary font-semibold text-xs uppercase tracking-wider mb-4">
              Soporte
            </h3>
            <ul className="space-y-2">
              {footerLinks.soporte.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-fg-secondary hover:text-accent text-sm transition-colors duration-150"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <hr className="border-border" />

        <p className="text-fg-muted text-xs text-center mt-6">
          © {new Date().getFullYear()} Offside Store. Todos los derechos reservados.
        </p>

      </div>
    </footer>
  );
}

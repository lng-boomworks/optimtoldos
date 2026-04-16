import { url } from "../utils/paths";

export function Footer() {
  const productLinks = [
    { name: "Toldos", path: url("/toldos") },
    { name: "Pérgolas", path: url("/pergolas") },
    { name: "Cortinas de Cristal", path: url("/cortinas-de-cristal") },
    { name: "Velas de Sombra", path: url("/velas-de-sombra") },
    { name: "Ventanas PVC", path: url("/ventanas-pvc") },
  ];

  const companyLinks = [
    { name: "Sobre Nosotros", path: url("/sobre-nosotros") },
    { name: "Galería", path: url("/galeria") },
    { name: "Contacto", path: url("/contacto") },
    { name: "Blog", path: url("/blog") },
    { name: "Presupuesto Gratis", path: url("/presupuesto") },
  ];

  return (
    <footer className="bg-white border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href={url("/")} className="inline-block mb-5">
              <img
                src={url("/images/logos/logo-footer.png")}
                alt="OptimToldos"
                loading="lazy"
                decoding="async"
                className="h-10 w-auto"
              />
            </a>
            <p className="text-text-muted text-[15px] leading-relaxed max-w-sm mb-5">
              Especialistas en protección solar y vida exterior en la provincia
              de Alicante. Fabricación a medida e instalación profesional.
            </p>
            <div className="flex flex-col gap-1.5 text-sm text-text-muted">
              <span>Elche, Alicante</span>
              <a
                href="mailto:info@optimtoldos.com"
                className="hover:text-terracotta transition-colors"
              >
                info@optimtoldos.com
              </a>
              <a
                href="tel:+34603572348"
                className="hover:text-terracotta transition-colors"
              >
                +34 603 572 348
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-navy font-medium text-sm uppercase tracking-wide mb-4">
              Productos
            </h4>
            <ul className="flex flex-col gap-2.5">
              {productLinks.map((link) => (
                <li key={link.path}>
                  <a
                    href={link.path}
                    className="text-text-muted text-[15px] hover:text-terracotta transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-navy font-medium text-sm uppercase tracking-wide mb-4">
              Empresa
            </h4>
            <ul className="flex flex-col gap-2.5">
              {companyLinks.map((link) => (
                <li key={link.path}>
                  <a
                    href={link.path}
                    className="text-text-muted text-[15px] hover:text-terracotta transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-text-muted text-sm">
            &copy; 2026 OptimToldos. Todos los derechos reservados.
          </p>
          <p className="text-text-muted/60 text-xs">
            Elche &middot; Alicante &middot; Costa Blanca
          </p>
        </div>
      </div>
    </footer>
  );
}

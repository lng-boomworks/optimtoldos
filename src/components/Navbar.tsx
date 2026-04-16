import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./Button";
import { url } from "../utils/paths";

const navLinks = [
  { name: "Inicio", path: url("/") },
  { name: "Toldos", path: url("/toldos") },
  { name: "Pérgolas", path: url("/pergolas") },
  { name: "Cortinas de Cristal", path: url("/cortinas-de-cristal") },
  { name: "Velas", path: url("/velas-de-sombra") },
  { name: "Ventanas PVC", path: url("/ventanas-pvc") },
  { name: "Galería", path: url("/galeria") },
  { name: "Blog", path: url("/blog") },
  { name: "Contacto", path: url("/contacto") },
];

export function Navbar() {
  const [location, setLocation] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setLocation(window.location.pathname);
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-warm-white/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <a href={url("/")} className="flex items-center group">
          <img
            src={isScrolled ? url("/images/logos/logo-sticky.png") : url("/images/logos/logo-2x.png")}
            alt="OptimToldos"
            className="h-10 w-auto transition-all duration-300"
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          <ul className="flex items-center gap-5">
            {navLinks.map((link) => {
              const isActive = location === link.path;
              return (
                <li key={link.path}>
                  <a
                    href={link.path}
                    className={`relative text-[15px] font-medium transition-colors pb-0.5 ${
                      isActive
                        ? "text-terracotta"
                        : isScrolled
                          ? "text-text-muted hover:text-navy"
                          : "text-white/90 hover:text-white"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute left-0 right-0 -bottom-0.5 h-[2px] bg-terracotta rounded-full" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
          <Button variant="gold" href={url("/presupuesto")}>
            Presupuesto Gratis
          </Button>
        </nav>

        {/* Mobile toggle */}
        <button
          className={`lg:hidden p-2 transition-colors ${isScrolled ? "text-navy" : "text-white"}`}
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label="Abrir menú"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden absolute top-[72px] left-0 right-0 bg-warm-white/98 backdrop-blur-xl border-b border-border transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-6 flex flex-col gap-6">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = location === link.path;
              return (
                <li key={link.path}>
                  <a
                    href={link.path}
                    className={`block text-lg font-medium transition-colors ${
                      isActive
                        ? "text-terracotta"
                        : "text-text-muted hover:text-navy"
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="pt-4 border-t border-border">
            <Button variant="gold" href={url("/presupuesto")} className="w-full">
              Presupuesto Gratis
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

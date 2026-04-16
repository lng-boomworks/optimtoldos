import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { FadeIn } from "../FadeIn";
import { AnimatedHeading } from "../AnimatedHeading";
import { Button } from "../Button";

const productOptions = [
  "Toldos",
  "Pérgolas Bioclimáticas",
  "Cortinas de Cristal",
  "Velas de Sombra",
  "Ventanas y Puertas PVC",
  "Otro",
];

const inputClasses =
  "w-full bg-sand border border-border rounded-xl px-4 py-3 text-text-body focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta outline-none transition-colors";

export function PresupuestoPage() {
  return (
    <>
      <Navbar />
      <main>
        <div className="flex flex-col bg-white">
          {/* Hero */}
          <section className="bg-terracotta pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <AnimatedHeading
                text="Presupuesto Gratis"
                tag="h1"
                className="text-white mb-6"
              />
              <FadeIn delay={0.2}>
                <p className="text-lg text-white/80 max-w-2xl mx-auto">
                  Rellena el formulario y recibir&aacute;s tu presupuesto
                  personalizado sin compromiso.
                </p>
              </FadeIn>
            </div>
          </section>

          {/* Form */}
          <section className="bg-white py-16 md:py-24">
            <div className="max-w-2xl mx-auto px-4 sm:px-6">
              <FadeIn>
                <form
                  className="space-y-5"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div>
                    <label className="block text-sm font-medium text-text-body mb-2">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      placeholder="Tu nombre y apellidos"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-body mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="tu@email.com"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-body mb-2">
                      Tel&eacute;fono
                    </label>
                    <input
                      type="tel"
                      placeholder="+34 600 000 000"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-body mb-2">
                      Tipo de producto
                    </label>
                    <select className={inputClasses}>
                      <option value="">Seleccionar...</option>
                      {productOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-body mb-2">
                      Ubicaci&oacute;n / Direcci&oacute;n de instalaci&oacute;n
                    </label>
                    <input
                      type="text"
                      placeholder="Dirección donde se realizará la instalación"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-body mb-2">
                      Medidas aproximadas
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: 4m x 3m"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-body mb-2">
                      Descripci&oacute;n del proyecto
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Cuéntanos los detalles de tu proyecto..."
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-body mb-2">
                      Subir fotos (opcional)
                    </label>
                    <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-terracotta/50 transition-colors cursor-pointer">
                      <svg
                        className="w-10 h-10 text-text-muted mx-auto mb-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                        />
                      </svg>
                      <p className="text-text-muted text-sm">
                        Arrastra fotos aqu&iacute; o haz clic para seleccionar
                      </p>
                    </div>
                  </div>
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full bg-terracotta hover:bg-terracotta-dark text-white font-medium rounded-xl px-8 py-4 text-lg transition-colors duration-200"
                    >
                      Solicitar Presupuesto
                    </button>
                  </div>
                  <p className="text-center text-text-muted text-sm pt-2">
                    &iquest;Prefieres llamar? Contacta con nosotros al{" "}
                    <a
                      href="tel:+34603572348"
                      className="text-terracotta font-medium hover:underline"
                    >
                      +34 603 572 348
                    </a>
                  </p>
                </form>
              </FadeIn>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

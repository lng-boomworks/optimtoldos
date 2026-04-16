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

const contactInfo = [
  {
    label: "Dirección",
    value: "Elche, Alicante, España",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" />
      </svg>
    ),
  },
  {
    label: "Email",
    value: "info@optimtoldos.com",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    label: "Teléfono",
    value: "+34 603 572 348",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
  },
  {
    label: "Horario",
    value: "Lunes a Viernes: 9:00 - 19:00\nSábados: 10:00 - 14:00",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const inputClasses =
  "w-full bg-sand border border-border rounded-xl px-4 py-3 text-text-body focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta outline-none transition-colors";

export function ContactoPage() {
  return (
    <>
      <Navbar />
      <main>
        <div className="flex flex-col bg-white">
          {/* Hero */}
          <section className="bg-navy pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <AnimatedHeading
                text="Contacto"
                tag="h1"
                className="text-white mb-6"
              />
              <FadeIn delay={0.2}>
                <p className="text-lg text-white/70 max-w-2xl mx-auto">
                  Estamos aqu&iacute; para ayudarte. Escr&iacute;benos y te
                  responderemos lo antes posible.
                </p>
              </FadeIn>
            </div>
          </section>

          {/* Contact Section */}
          <section className="bg-white py-20 md:py-28">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Form */}
                <FadeIn>
                  <form
                    className="space-y-5"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <div>
                      <label className="block text-sm font-medium text-text-body mb-2">
                        Nombre
                      </label>
                      <input
                        type="text"
                        placeholder="Tu nombre"
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
                        Mensaje
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Cuéntanos en qué podemos ayudarte..."
                        className={inputClasses}
                      />
                    </div>
                    <Button variant="primary" href="#">
                      Enviar Mensaje
                    </Button>
                  </form>
                </FadeIn>

                {/* Info */}
                <FadeIn delay={0.2}>
                  <div className="space-y-6">
                    {contactInfo.map((item) => (
                      <div
                        key={item.label}
                        className="flex gap-4 p-5 rounded-xl bg-sand-light/50"
                      >
                        <div className="text-terracotta shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="font-serif text-lg text-navy mb-1">
                            {item.label}
                          </h3>
                          <p className="text-text-muted whitespace-pre-line">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    ))}

                    {/* Map placeholder */}
                    <div className="aspect-[4/3] rounded-2xl bg-sand flex items-center justify-center mt-6">
                      <span className="text-text-muted text-lg">
                        Mapa de ubicaci&oacute;n
                      </span>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

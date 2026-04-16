import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { FadeIn } from "../FadeIn";
import { AnimatedHeading } from "../AnimatedHeading";
import { Button } from "../Button";

const values = [
  {
    title: "Calidad",
    desc: "Solo trabajamos con los mejores fabricantes europeos.",
  },
  {
    title: "Cercanía",
    desc: "Somos de aquí. Conocemos tu clima, tu estilo de vida.",
  },
  {
    title: "Transparencia",
    desc: "Presupuestos claros, sin sorpresas, sin letra pequeña.",
  },
  {
    title: "Compromiso",
    desc: "No terminamos hasta que estés 100% satisfecho.",
  },
];

const areas = [
  "Alicante",
  "Elche",
  "Torrevieja",
  "Benidorm",
  "Santa Pola",
  "Orihuela",
  "Guardamar",
  "Dénia",
  "Jávea",
  "Altea",
  "Calpe",
];

const team = [
  { name: "Carlos Martínez", role: "Director General" },
  { name: "Ana García", role: "Directora Comercial" },
  { name: "Miguel López", role: "Jefe de Instalaciones" },
];

export function SobreNosotrosPage() {
  return (
    <>
      <Navbar />
      <main>
        <div className="flex flex-col bg-white">
          {/* Hero */}
          <section className="relative min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-navy via-navy-dark to-navy-light overflow-hidden">
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-20">
              <AnimatedHeading
                text="Sobre Nosotros"
                tag="h1"
                className="text-white mb-6"
              />
              <FadeIn delay={0.2}>
                <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
                  Desde 2009 creando espacios exteriores excepcionales en
                  la Costa Blanca
                </p>
              </FadeIn>
            </div>
          </section>

          {/* Story */}
          <section className="bg-white py-20 md:py-28">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="text-center mb-16">
                <AnimatedHeading
                  text="Nuestra Historia"
                  tag="h2"
                  className="text-navy"
                />
              </FadeIn>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <FadeIn>
                  <div className="space-y-6">
                    <p className="text-text-muted leading-relaxed">
                      Optim Toldos naci&oacute; en 2009 en Elche con una
                      misi&oacute;n clara: ofrecer soluciones de
                      protecci&oacute;n solar y vida exterior de la
                      m&aacute;xima calidad a precios competitivos. Desde
                      nuestros inicios, nos hemos especializado en entender las
                      necesidades &uacute;nicas del clima
                      mediterr&aacute;neo y la vida al aire libre que define la
                      Costa Blanca.
                    </p>
                    <p className="text-text-muted leading-relaxed">
                      Hoy, con m&aacute;s de 2.000 instalaciones realizadas en
                      toda la provincia de Alicante, seguimos fieles a nuestro
                      compromiso: productos a medida, instalaci&oacute;n
                      profesional y un servicio postventa que nos distingue.
                    </p>
                  </div>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-terracotta-pale via-sand to-gold-pale" />
                </FadeIn>
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="bg-sand-light py-20 md:py-28">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="text-center mb-16">
                <AnimatedHeading
                  text="Nuestros Valores"
                  tag="h2"
                  className="text-navy"
                />
              </FadeIn>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((v, i) => (
                  <FadeIn key={v.title} delay={i * 0.1}>
                    <div className="bg-white rounded-2xl p-8 h-full text-center shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="w-12 h-12 rounded-full bg-terracotta-pale flex items-center justify-center mx-auto mb-5">
                        <div className="w-3 h-3 rounded-full bg-terracotta" />
                      </div>
                      <h3 className="font-serif text-xl text-navy mb-3">
                        {v.title}
                      </h3>
                      <p className="text-text-muted leading-relaxed">
                        {v.desc}
                      </p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          {/* Certifications */}
          <section className="bg-white py-20 md:py-28">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="text-center mb-16">
                <AnimatedHeading
                  text="Certificaciones y Marcas"
                  tag="h2"
                  className="text-navy"
                />
                <p className="text-text-muted mt-4 max-w-2xl mx-auto">
                  Trabajamos exclusivamente con fabricantes l&iacute;deres del
                  sector para garantizar la m&aacute;xima calidad en cada
                  proyecto.
                </p>
              </FadeIn>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {[
                  "Fabricantes certificados CE",
                  "Tejidos Dickson® y Sauleda®",
                  "Perfiles de aluminio Gaviota Simbac®",
                  "Ventanas Cortizo® y Aluplast®",
                  "Garantía de fabricante en todos los productos",
                ].map((cert, i) => (
                  <FadeIn key={cert} delay={i * 0.08}>
                    <div className="bg-sand-light border border-sand rounded-xl px-5 py-4 text-center h-full flex items-center justify-center">
                      <span className="text-sm font-medium text-navy">
                        {cert}
                      </span>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          {/* Service Area */}
          <section className="bg-white py-20 md:py-28">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="text-center mb-16">
                <AnimatedHeading
                  text="Nuestra Zona de Servicio"
                  tag="h2"
                  className="text-navy"
                />
              </FadeIn>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <FadeIn>
                  <p className="text-text-muted leading-relaxed mb-8">
                    Damos servicio a toda la provincia de Alicante y la Costa
                    Blanca. Desde D&eacute;nia hasta Torrevieja, nuestro equipo
                    de instaladores profesionales llega a donde nos necesites.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {areas.map((area) => (
                      <span
                        key={area}
                        className="bg-sand-light text-text-body px-4 py-2 rounded-full text-sm font-medium"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <div className="aspect-[4/3] rounded-2xl bg-sand flex items-center justify-center">
                    <span className="text-text-muted text-lg">
                      Mapa de zona de servicio
                    </span>
                  </div>
                </FadeIn>
              </div>
            </div>
          </section>

          {/* Team */}
          <section className="bg-sand-light py-20 md:py-28">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="text-center mb-16">
                <AnimatedHeading
                  text="Nuestro Equipo"
                  tag="h2"
                  className="text-navy"
                />
              </FadeIn>
              <div className="grid sm:grid-cols-3 gap-8">
                {team.map((member, i) => (
                  <FadeIn key={member.name} delay={i * 0.1}>
                    <div className="text-center">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-terracotta-pale via-sand to-gold-pale mx-auto mb-5" />
                      <h3 className="font-serif text-lg text-navy mb-1">
                        {member.name}
                      </h3>
                      <p className="text-text-muted text-sm">{member.role}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-navy py-20 md:py-24">
            <FadeIn className="max-w-3xl mx-auto px-4 text-center">
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
                &iquest;Quieres conocernos mejor?
              </h2>
              <p className="text-lg text-white/70 mb-10">
                Vis&iacute;tanos en Elche o llama para una consulta sin
                compromiso.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button variant="gold" href="/contacto">
                  Contactar
                </Button>
                <Button variant="outline-white" href="/presupuesto">
                  Solicitar Presupuesto
                </Button>
              </div>
            </FadeIn>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

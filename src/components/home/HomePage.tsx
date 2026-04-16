import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { HeroSection } from "./HeroSection";
import { TrustStrip } from "./TrustStrip";
import { ProductShowcase } from "./ProductShowcase";
import { WhyChooseUs } from "./WhyChooseUs";
import { ProjectsTeaser } from "./ProjectsTeaser";
import { Testimonials } from "./Testimonials";
import { CTASection } from "./CTASection";
import { FAQSection } from "../FAQSection";

const homeFaqs = [
  { question: "¿Qué zonas de Alicante cubrís?", answer: "Damos servicio a toda la provincia de Alicante y la Costa Blanca, incluyendo Alicante capital, Elche, Torrevieja, Benidorm, Santa Pola, Orihuela, Guardamar, Dénia, Jávea, Altea, Calpe y todas las localidades intermedias." },
  { question: "¿Ofrecéis presupuestos gratuitos?", answer: "Sí, todos nuestros presupuestos son completamente gratuitos y sin compromiso. Incluimos una visita a domicilio para tomar medidas exactas y asesorarte sobre la mejor solución para tu espacio." },
  { question: "¿Cuánto tardan las instalaciones?", answer: "Los plazos varían según el producto. Un toldo se instala en unas horas, las cortinas de cristal en 1 día, y una pérgola bioclimática en 1-2 días. La fabricación a medida suele tardar entre 2 y 4 semanas." },
  { question: "¿Qué garantía ofrecéis?", answer: "Todos nuestros productos incluyen garantía completa del fabricante, que varía entre 2 y 10 años según el producto. Además, ofrecemos servicio postventa propio para cualquier incidencia o mantenimiento." },
  { question: "¿Trabajáis con comunidades de propietarios?", answer: "Sí, tenemos amplia experiencia trabajando con comunidades de propietarios. Nos encargamos de presentar propuestas que cumplan la normativa de uniformidad de fachada y ofrecemos condiciones especiales para proyectos comunitarios." },
];

export function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <TrustStrip />
        <ProductShowcase />
        <WhyChooseUs />
        <ProjectsTeaser />
        <Testimonials />
        <FAQSection faqs={homeFaqs} heading="Preguntas Frecuentes" />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

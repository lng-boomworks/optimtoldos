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
import { t, type Locale } from "../../i18n/index";

interface HomePageProps {
  locale?: Locale;
}

export function HomePage({ locale = 'es' }: HomePageProps) {
  const homeFaqs = [
    { question: t(locale, 'home.faq.1.q'), answer: t(locale, 'home.faq.1.a') },
    { question: t(locale, 'home.faq.2.q'), answer: t(locale, 'home.faq.2.a') },
    { question: t(locale, 'home.faq.3.q'), answer: t(locale, 'home.faq.3.a') },
    { question: t(locale, 'home.faq.4.q'), answer: t(locale, 'home.faq.4.a') },
    { question: t(locale, 'home.faq.5.q'), answer: t(locale, 'home.faq.5.a') },
  ];

  return (
    <>
      <Navbar locale={locale} />
      <main>
        <HeroSection locale={locale} />
        <TrustStrip locale={locale} />
        <ProductShowcase locale={locale} />
        <WhyChooseUs locale={locale} />
        <ProjectsTeaser locale={locale} />
        <Testimonials locale={locale} />
        <FAQSection faqs={homeFaqs} heading={t(locale, 'home.faq.heading')} />
        <CTASection locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}

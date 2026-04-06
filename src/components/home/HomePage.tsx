import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { HomeHero } from "./HomeHero";
import { Services } from "./Services";
import { FinalCTA } from "./FinalCTA";

interface HomePageProps {
  heroHeading?: string;
  heroSubheading?: string;
  heroCtaText?: string;
  heroCtaUrl?: string;
  ctaHeading?: string;
  ctaText?: string;
}

export function HomePage(props: HomePageProps) {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <HomeHero
          heading={props.heroHeading}
          subheading={props.heroSubheading}
          ctaText={props.heroCtaText}
          ctaUrl={props.heroCtaUrl}
        />
        <Services />
        <FinalCTA
          heading={props.ctaHeading}
          text={props.ctaText}
        />
      </main>
      <Footer />
    </>
  );
}

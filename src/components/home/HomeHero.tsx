import { FadeIn } from "../FadeIn";
import { Button } from "../Button";
import { TrustPill } from "../TrustPill";

interface HomeHeroProps {
  heading?: string;
  subheading?: string;
  ctaText?: string;
  ctaUrl?: string;
}

export function HomeHero({
  heading = "Your headline goes here",
  subheading = "A brief description of what you do and who you help.",
  ctaText = "Get started",
  ctaUrl = "#",
}: HomeHeroProps) {
  return (
    <section className="bg-cream pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="max-w-2xl">
            <h1 className="mb-6 text-balance">{heading}</h1>
            <p className="text-xl text-text-muted mb-8 text-balance">{subheading}</p>
            <div className="flex flex-wrap gap-4 mb-2">
              <Button href={ctaUrl}>{ctaText}</Button>
              <Button variant="ghost" href="/contact">Contact us</Button>
            </div>
            <p className="text-sm text-text-muted italic mb-10">Free initial consultation</p>
            <div className="flex flex-wrap gap-2">
              <TrustPill text="Professional" />
              <TrustPill text="Experienced" />
              <TrustPill text="Trusted" />
              <TrustPill text="Insured" />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

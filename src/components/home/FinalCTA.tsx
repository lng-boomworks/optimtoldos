import { FadeIn } from "../FadeIn";
import { Button } from "../Button";

interface FinalCTAProps {
  heading?: string;
  text?: string;
}

export function FinalCTA({
  heading = "Ready to get started?",
  text = "Get in touch today to discuss how we can help.",
}: FinalCTAProps) {
  return (
    <section className="bg-teal-deep text-white py-24">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <FadeIn>
          <h2 className="text-white mb-6">{heading}</h2>
          <p className="text-teal-light text-lg mb-10 max-w-2xl mx-auto">{text}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="white" href="/contact">Get in touch</Button>
            <Button variant="outline-white" href="tel:01234567890">Call 01234 567890</Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

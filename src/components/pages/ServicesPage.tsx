import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { FadeIn } from "../FadeIn";
import { Button } from "../Button";
import { Lightbulb, BarChart3, Users, CheckCircle2 } from "lucide-react";

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <CheckCircle2 className="w-5 h-5 text-sage shrink-0 mt-1" />
      <span className="text-text-body">{children}</span>
    </li>
  );
}

const services = [
  { id: "service-one", icon: Lightbulb, title: "Service One", desc: "A brief overview of this service and the problem it solves for your clients.", bullets: ["Key benefit or deliverable one", "Key benefit or deliverable two", "Key benefit or deliverable three", "Key benefit or deliverable four"] },
  { id: "service-two", icon: BarChart3, title: "Service Two", desc: "A brief overview of this service and the problem it solves for your clients.", bullets: ["Key benefit or deliverable one", "Key benefit or deliverable two", "Key benefit or deliverable three", "Key benefit or deliverable four"] },
  { id: "service-three", icon: Users, title: "Service Three", desc: "A brief overview of this service and the problem it solves for your clients.", bullets: ["Key benefit or deliverable one", "Key benefit or deliverable two", "Key benefit or deliverable three", "Key benefit or deliverable four"] },
];

interface ServicesPageProps {
  heroHeading?: string;
  heroSubheading?: string;
}

export function ServicesPage({
  heroHeading = "What we do",
  heroSubheading = "A range of services tailored to your needs.",
}: ServicesPageProps) {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <div className="flex flex-col bg-white">
          <section className="bg-cream py-20 md:py-32">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <FadeIn>
                <h1 className="mb-6">{heroHeading}</h1>
                <p className="text-xl text-text-muted">{heroSubheading}</p>
              </FadeIn>
            </div>
          </section>

          <section className="py-20 md:py-32">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
              {services.map((service) => (
                <FadeIn key={service.id} delay={0.1} className="scroll-mt-32" id={service.id}>
                  <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
                    <div className="md:w-1/3 shrink-0">
                      <div className="w-16 h-16 bg-teal-pale rounded-2xl flex items-center justify-center mb-6 border border-teal-light">
                        <service.icon className="w-8 h-8 text-teal-deep" strokeWidth={1.5} />
                      </div>
                      <h2 className="text-3xl mb-4">{service.title}</h2>
                      <p className="text-text-muted text-lg">{service.desc}</p>
                    </div>
                    <div className="md:w-2/3 bg-ivory rounded-2xl p-8 md:p-10 border border-border/50">
                      <ul className="space-y-5">
                        {service.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex gap-4">
                            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                              <div className="w-2 h-2 rounded-full bg-sage" />
                            </div>
                            <span className="text-lg text-text-body">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </section>

          <section className="py-20 bg-teal-pale">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="mb-12">
                <h2 className="text-center mb-12">Clarity on boundaries</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white p-8 rounded-2xl border border-border shadow-sm">
                    <h3 className="text-xl text-teal-deep mb-6 pb-4 border-b border-border">What we do</h3>
                    <ul className="space-y-4">
                      <CheckItem>Deliver high-quality, professional services</CheckItem>
                      <CheckItem>Provide clear communication at every stage</CheckItem>
                      <CheckItem>Work collaboratively with your existing team</CheckItem>
                      <CheckItem>Offer honest advice based on your situation</CheckItem>
                    </ul>
                  </div>
                  <div className="bg-white p-8 rounded-2xl border border-border shadow-sm">
                    <h3 className="text-xl text-charcoal mb-6 pb-4 border-b border-border">What we don't do</h3>
                    <ul className="space-y-4 text-text-muted">
                      {["Service or activity outside your scope", "Another out-of-scope item", "A third boundary to set expectations", "A fourth boundary for clarity"].map((item, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="text-red-400 font-bold shrink-0 mt-0.5">&times;</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            </div>
          </section>

          <section className="py-24 text-center px-4 bg-teal-deep text-white">
            <FadeIn className="max-w-3xl mx-auto">
              <h2 className="text-white mb-6">Not sure which service you need?</h2>
              <p className="text-lg text-white/70 mb-10">Get in touch and we'll help you find the right fit.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button variant="white" href="/contact">Get in touch</Button>
                <Button variant="outline-white" href="tel:01234567890">Call 01234 567890</Button>
              </div>
            </FadeIn>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { FadeIn } from "../FadeIn";
import { Button } from "../Button";
import { Heart, ShieldCheck, Target, Users } from "lucide-react";

const values = [
  { icon: Heart, title: "Client-focused", desc: "We put our clients at the centre of everything we do. Your goals become our goals." },
  { icon: ShieldCheck, title: "Trustworthy", desc: "We operate with integrity and transparency in every interaction." },
  { icon: Target, title: "Results-driven", desc: "We focus on what will make the biggest difference and deliver measurable outcomes." },
  { icon: Users, title: "Collaborative", desc: "We work alongside you as a partner, not just a provider." },
];

interface AboutPageProps {
  heroHeading?: string;
  heroSubheading?: string;
}

export function AboutPage({
  heroHeading = "About us",
  heroSubheading = "Our story and what drives us.",
}: AboutPageProps) {
  return (
    <>
      <Navbar />
      <main>
        <div className="flex flex-col bg-white">
          <section className="bg-navy pt-32 pb-20 md:pb-24">
            <div className="max-w-3xl mx-auto px-4 text-center">
              <FadeIn>
                <span className="text-gold font-medium uppercase tracking-wide text-sm mb-4 block">About</span>
                <h1 className="text-white mb-6">{heroHeading}</h1>
                <p className="text-xl text-white/70">{heroSubheading}</p>
              </FadeIn>
            </div>
          </section>

          <section className="py-20 md:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-12 gap-16 items-center">
                <FadeIn className="lg:col-span-5 relative">
                  <div className="aspect-square md:aspect-[4/5] rounded-[24px] overflow-hidden relative z-10 border border-border/50 bg-teal-pale flex items-center justify-center">
                    <span className="text-text-muted text-lg">Your image here</span>
                  </div>
                </FadeIn>
                <FadeIn delay={0.2} className="lg:col-span-7">
                  <h2 className="mb-6">Our Story</h2>
                  <div className="prose prose-lg text-text-body max-w-none">
                    <p>Tell the story of how your business started. What problem did you see that needed solving? What motivated you to take action?</p>
                    <p>Describe your mission and the impact you want to have. What makes your approach different from others in your field?</p>
                    <p>Share what drives you and your team every day. What values guide your decisions and how do they benefit your clients?</p>
                  </div>
                </FadeIn>
              </div>
            </div>
          </section>

          <section className="py-20 md:py-32 bg-ivory">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="text-center mb-16">
                <h2 className="mb-4">Meet the Team</h2>
                <p className="text-lg text-text-muted">The people behind the business.</p>
              </FadeIn>
              <div className="grid md:grid-cols-2 gap-12 lg:gap-16 max-w-4xl mx-auto">
                <FadeIn>
                  <div className="text-center">
                    <div className="aspect-square rounded-[24px] overflow-hidden bg-teal-pale border border-border/50 mb-6 flex items-center justify-center">
                      <span className="text-text-muted">Photo</span>
                    </div>
                    <span className="text-sage font-medium uppercase tracking-wide text-sm mb-2 block">Founder</span>
                    <h3 className="text-2xl mb-2">Team Member One</h3>
                    <p className="text-teal-mid font-medium mb-4">Role / Title</p>
                    <p className="text-text-muted leading-relaxed">A brief bio about this team member, their background and what they bring to the business.</p>
                  </div>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <div className="text-center">
                    <div className="aspect-square rounded-[24px] overflow-hidden bg-teal-pale border border-border/50 mb-6 flex items-center justify-center">
                      <span className="text-text-muted">Photo</span>
                    </div>
                    <span className="text-sage font-medium uppercase tracking-wide text-sm mb-2 block">Co-Founder</span>
                    <h3 className="text-2xl mb-2">Team Member Two</h3>
                    <p className="text-teal-mid font-medium mb-4">Role / Title</p>
                    <p className="text-text-muted leading-relaxed">A brief bio about this team member, their background and what they bring to the business.</p>
                  </div>
                </FadeIn>
              </div>
            </div>
          </section>

          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="text-center mb-16">
                <h2 className="mb-4">Our Values</h2>
                <p className="text-lg text-text-muted">The principles that guide how we work with you.</p>
              </FadeIn>
              <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                {values.map((value, i) => (
                  <FadeIn key={i} delay={i * 0.1}>
                    <div className="bg-white p-8 md:p-10 rounded-2xl border border-border h-full hover:shadow-md transition-shadow">
                      <value.icon className="w-8 h-8 text-teal-mid mb-6" strokeWidth={1.5} />
                      <h3 className="text-2xl mb-4">{value.title}</h3>
                      <p className="text-text-muted leading-relaxed">{value.desc}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          <section className="py-24 bg-teal-deep text-center px-4">
            <FadeIn className="max-w-3xl mx-auto">
              <h2 className="text-white mb-6">Want to find out more?</h2>
              <p className="text-teal-light text-lg mb-10">Get in touch today to see how we can help.</p>
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

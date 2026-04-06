import { FadeIn } from "../FadeIn";
import { Lightbulb, BarChart3, Users, Wrench, ArrowRight } from "lucide-react";

const services = [
  { icon: Lightbulb, title: "Service One", desc: "A brief description of this service and the value it provides to your clients.", link: "/services" },
  { icon: BarChart3, title: "Service Two", desc: "A brief description of this service and the value it provides to your clients.", link: "/services" },
  { icon: Users, title: "Service Three", desc: "A brief description of this service and the value it provides to your clients.", featured: true, link: "/services" },
  { icon: Wrench, title: "Service Four", desc: "A brief description of this service and the value it provides to your clients.", link: "/services" },
];

export function Services() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-teal-mid font-medium uppercase tracking-wide text-sm mb-4 block">What we do</span>
          <h2 className="mb-6">Services tailored to your needs</h2>
          <p className="text-lg text-text-muted">
            We offer a range of professional services designed to help you achieve your goals and grow your business.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <a href={service.link} className="block h-full group">
                <div className={`h-full p-8 rounded-2xl border transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg ${
                  service.featured
                    ? "bg-teal-deep border-teal-deep text-white shadow-md"
                    : "bg-white border-border hover:border-teal-mid"
                }`}>
                  <service.icon className={`w-8 h-8 mb-6 ${service.featured ? "text-teal-light" : "text-teal-deep"}`} strokeWidth={1.5} />
                  <h3 className={`text-xl mb-3 ${service.featured ? "text-white" : ""}`}>{service.title}</h3>
                  <p className={`mb-6 leading-relaxed ${service.featured ? "text-teal-light" : "text-text-muted"}`}>{service.desc}</p>
                  <span className={`inline-flex items-center text-sm font-medium group-hover:underline underline-offset-4 ${service.featured ? "text-white" : "text-teal-mid"}`}>
                    Learn more <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

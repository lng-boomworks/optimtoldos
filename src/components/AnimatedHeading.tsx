import { useEffect, useRef, useState } from "react";

interface AnimatedHeadingProps {
  text: string;
  tag?: "h1" | "h2" | "h3";
  className?: string;
  staggerMs?: number;
}

export function AnimatedHeading({
  text,
  tag: Tag = "h2",
  className = "",
  staggerMs = 60,
}: AnimatedHeadingProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const words = text.split(" ");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setReducedMotion(true);
      setIsVisible(true);
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "-20px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={containerRef as React.RefObject<HTMLHeadingElement>}
      className={className}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={i}
          style={
            reducedMotion
              ? {}
              : {
                  display: "inline-block",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(40px)",
                  transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * staggerMs}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * staggerMs}ms`,
                  willChange: isVisible ? "auto" : "opacity, transform",
                }
          }
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}

export default AnimatedHeading;

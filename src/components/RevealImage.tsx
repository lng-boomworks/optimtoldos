import { useEffect, useRef, useState } from "react";

interface RevealImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
}

export function RevealImage({
  src,
  alt,
  className = "",
  aspectRatio = "16/9",
}: RevealImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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
      { threshold: 0.1, rootMargin: "-30px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const imgStyle: React.CSSProperties = reducedMotion
    ? { width: "100%", height: "100%", objectFit: "cover" as const }
    : {
        width: "100%",
        height: "100%",
        objectFit: "cover" as const,
        clipPath: isVisible ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
        transform: isVisible
          ? isHovered
            ? "scale(1.05)"
            : "scale(1)"
          : "scale(1.12)",
        opacity: isVisible ? 1 : 0,
        transition: isVisible
          ? `clip-path 1.4s cubic-bezier(0.25, 1, 0.5, 1), transform ${isHovered ? "0.6s" : "1.4s"} cubic-bezier(0.25, 1, 0.5, 1), opacity 1.4s cubic-bezier(0.25, 1, 0.5, 1)`
          : "none",
        willChange: isVisible ? "auto" : "clip-path, transform, opacity",
      };

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${className}`}
      style={{ aspectRatio }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={src} alt={alt} loading="lazy" style={imgStyle} />
    </div>
  );
}

export default RevealImage;

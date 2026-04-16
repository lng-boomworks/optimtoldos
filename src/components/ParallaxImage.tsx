import { useEffect, useRef, useState } from "react";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  aspectRatio?: string;
}

export function ParallaxImage({
  src,
  alt,
  className = "",
  speed = 0.15,
  aspectRatio,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setReducedMotion(true);
      return;
    }

    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        const el = containerRef.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Calculate how far through the viewport the element is
        // 0 = element just entering bottom, 1 = element just leaving top
        const progress =
          (viewportHeight - rect.top) / (viewportHeight + rect.height);
        const centered = (progress - 0.5) * 2; // -1 to 1

        // Apply speed factor and clamp to +-30px
        const raw = centered * speed * 100;
        const clamped = Math.max(-30, Math.min(30, raw));

        setOffsetY(clamped);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial position

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [speed]);

  const containerStyle: React.CSSProperties = {
    overflow: "hidden",
    ...(aspectRatio ? { aspectRatio } : {}),
  };

  const imgStyle: React.CSSProperties = reducedMotion
    ? {
        width: "100%",
        height: "100%",
        objectFit: "cover" as const,
      }
    : {
        width: "100%",
        height: "100%",
        objectFit: "cover" as const,
        transform: `translateY(${offsetY}px) scale(1.1)`,
        willChange: "transform",
      };

  return (
    <div ref={containerRef} className={className} style={containerStyle}>
      <img src={src} alt={alt} loading="lazy" style={imgStyle} />
    </div>
  );
}

export default ParallaxImage;

interface SunRayProps {
  className?: string;
  color?: string;
}

const colorMap: Record<string, string> = {
  terracotta: "var(--color-terracotta, #C75B39)",
  navy: "var(--color-navy, #1B2838)",
  sand: "var(--color-sand, #F5EDE3)",
  olive: "var(--color-olive, #7C8B6F)",
  gold: "var(--color-gold, #E5A93D)",
  "warm-white": "var(--color-warm-white, #FEFCF9)",
};

export function SunRay({ className = "", color = "terracotta" }: SunRayProps) {
  const strokeColor = colorMap[color] || color;
  const rayCount = 10;
  const cx = 60;
  const cy = 60;
  const rayLength = 50;

  // Generate rays fanning from bottom-center upward (180 degrees)
  const rays = Array.from({ length: rayCount }, (_, i) => {
    const angle = Math.PI + (Math.PI / (rayCount - 1)) * i; // PI to 2*PI
    const x2 = cx + Math.cos(angle) * rayLength;
    const y2 = cy + Math.sin(angle) * rayLength;
    return { x2, y2 };
  });

  return (
    <div
      className={`flex justify-center ${className}`}
      aria-hidden="true"
      role="presentation"
    >
      <svg
        width="120"
        height="60"
        viewBox="0 0 120 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 0.15 }}
      >
        {rays.map((ray, i) => (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={ray.x2}
            y2={ray.y2}
            stroke={strokeColor}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        ))}
      </svg>
    </div>
  );
}

export default SunRay;

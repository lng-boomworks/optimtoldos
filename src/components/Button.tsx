import type React from "react";
import { Calendar, Phone, Mail } from "lucide-react";

function AutoIcon({ href, children }: { href?: string; children: React.ReactNode }) {
  // Skip if children already contain an SVG icon (e.g. manually added)
  const hasIcon = Array.isArray(children)
    ? children.some((c) => typeof c === "object" && c !== null && "type" in c && typeof c.type !== "string")
    : typeof children === "object" && children !== null && "type" in children && typeof (children as any).type !== "string";

  if (hasIcon) return <>{children}</>;

  if (href?.includes("calendly.com")) return <><Calendar className="w-4 h-4" />{children}</>;
  if (href?.startsWith("tel:")) return <><Phone className="w-4 h-4" />{children}</>;
  if (href === "/contact") return <><Mail className="w-4 h-4" />{children}</>;

  return <>{children}</>;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline-white" | "white";
  href?: string;
  external?: boolean;
}

export function Button({ variant = "primary", href, external, className = "", children, ...props }: ButtonProps) {
  const baseClass = "inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg text-[15px] font-medium transition-all duration-200";

  const variants: Record<string, string> = {
    primary: "bg-teal-deep text-white hover:bg-[#0a4537] hover:-translate-y-px shadow-sm hover:shadow",
    ghost: "border-[1.5px] border-teal-mid text-teal-deep hover:bg-teal-pale",
    "outline-white": "border-[1.5px] border-white text-white hover:bg-white/10",
    white: "bg-white text-teal-deep hover:bg-white/90 hover:-translate-y-px shadow-sm",
  };

  const classes = `${baseClass} ${variants[variant]} ${className}`;
  const content = <AutoIcon href={href}>{children}</AutoIcon>;

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {content}
        </a>
      );
    }
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
}

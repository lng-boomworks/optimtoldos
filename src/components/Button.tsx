import type React from "react";
import { url } from "../utils/paths";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline-white" | "white" | "gold";
  href?: string;
  external?: boolean;
}

export function Button({
  variant = "primary",
  href,
  external,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseClass =
    "group/btn inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-[15px] font-medium transition-all duration-200 cursor-pointer";

  const variants: Record<string, string> = {
    primary:
      "bg-terracotta text-white hover:bg-terracotta-dark hover:-translate-y-0.5 shadow-sm hover:shadow",
    ghost:
      "border-[1.5px] border-terracotta text-terracotta hover:bg-terracotta-pale",
    "outline-white":
      "border-[1.5px] border-white text-white hover:bg-white/10",
    white:
      "bg-white text-navy hover:bg-white/90 hover:-translate-y-0.5 shadow-sm",
    gold:
      "bg-gold text-navy font-semibold hover:bg-gold-light",
  };

  const classes = `${baseClass} ${variants[variant]} ${className}`;

  const content = (
    <>
      {children}
      {variant === "primary" && (
        <span className="inline-block transition-transform duration-200 group-hover/btn:translate-x-1">
          &rarr;
        </span>
      )}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {content}
        </a>
      );
    }
    return (
      <a href={url(href)} className={classes}>
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

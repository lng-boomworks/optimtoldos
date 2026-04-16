import type { ReactNode } from "react";

interface TrustPillProps {
  text: string;
  icon?: ReactNode;
}

export function TrustPill({ text, icon }: TrustPillProps) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-border text-xs font-medium text-text-muted whitespace-nowrap">
      {icon ? (
        <span className="flex items-center text-terracotta">{icon}</span>
      ) : (
        <div className="w-1.5 h-1.5 rounded-full bg-terracotta" />
      )}
      {text}
    </div>
  );
}

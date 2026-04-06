export function TrustPill({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-border text-xs font-medium text-text-muted whitespace-nowrap">
      <div className="w-1.5 h-1.5 rounded-full bg-teal-deep" />
      {text}
    </div>
  );
}

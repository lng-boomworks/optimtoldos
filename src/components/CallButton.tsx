interface CallButtonProps {
  locale?: "es" | "en";
}

export function CallButton({ locale = "es" }: CallButtonProps) {
  const ariaLabel = locale === "en" ? "Call us" : "Llámanos";

  return (
    <a
      href="tel:+34603572348"
      aria-label={ariaLabel}
      className="fixed bottom-6 right-24 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-[#1d4ed8] text-white shadow-lg hover:bg-[#1e40af] hover:scale-105 transition-all duration-200"
    >
      <svg
        className="w-7 h-7"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.24.2 2.45.57 3.57a1 1 0 01-.24 1.02l-2.21 2.2z" />
      </svg>
    </a>
  );
}

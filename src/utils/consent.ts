const STORAGE_KEY = "optimtoldos-cookie-consent";

export type ConsentChoice = "accepted" | "rejected";

export interface ConsentRecord {
  choice: ConsentChoice;
  timestamp: string;
}

/** Read consent record from localStorage. Returns null if not yet set. */
export function getConsent(): ConsentRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentRecord;
    if (parsed?.choice === "accepted" || parsed?.choice === "rejected") {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

/** Store consent choice in localStorage. */
export function setConsent(choice: ConsentChoice): void {
  if (typeof window === "undefined") return;
  const record: ConsentRecord = {
    choice,
    timestamp: new Date().toISOString(),
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
}

/** True if the user has accepted non-essential cookies. Use this to gate analytics/marketing scripts. */
export function hasConsent(): boolean {
  return getConsent()?.choice === "accepted";
}

const BASE = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');

export function url(path: string): string {
  if (path.startsWith('http') || path.startsWith('#') || path.startsWith('mailto:') || path.startsWith('tel:')) {
    return path;
  }
  if (BASE && path.startsWith(BASE)) {
    return path;
  }
  return `${BASE}${path}`;
}

import { headers } from "next/headers";

function headerValue(h: any, key: string) {
  if (!h) return undefined;
  if (typeof h.get === "function") return h.get(key) ?? undefined; // Headers-like
  if (typeof h === "object") return h[key] ?? undefined; // plain object fallback
  return undefined;
}

export function getBaseUrl() {
  const h = headers() as any;

  const host =
    headerValue(h, "x-forwarded-host") ??
    headerValue(h, "host") ??
    "localhost:3000";

  const proto = headerValue(h, "x-forwarded-proto") ?? "http";

  return `${proto}://${host}`;
}

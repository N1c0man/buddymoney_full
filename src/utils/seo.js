// src/utils/seo.js

// Base site URL – use the www version
export const SITE_URL = "https://www.buddymoney.com";

export function buildUrl(path = "/") {
  const base = SITE_URL.replace(/\/$/, "");

  if (!path || path === "/") return base;

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path.split(/[?#]/)[0];
  }

  return (base + (path.startsWith("/") ? path : "/" + path)).split(/[?#]/)[0];
}

// Simple DOM helper: NO React hooks here
export function setCanonical(pathOrUrl = "/") {
  // Guard for safety during SSR / build
  if (typeof document === "undefined") return;

  const href = buildUrl(pathOrUrl);

  // Find or create the canonical <link> tag
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }

  link.setAttribute("href", href);
}
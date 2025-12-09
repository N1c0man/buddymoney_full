// src/utils/seo.js

// Base site URL – use the www version
export const SITE_URL = "https://www.buddymoney.com";

// Simple DOM helper: NO React hooks here
export function setCanonical(pathOrUrl = "/") {
  // Guard for safety during SSR / build
  if (typeof document === "undefined") return;

  let href = pathOrUrl;

  // If it's not a full URL, build one from SITE_URL
  if (!href.startsWith("http://") && !href.startsWith("https://")) {
    const base = SITE_URL.replace(/\/$/, "");
    href = base + (href.startsWith("/") ? href : "/" + href);
  }

  // Strip query params and hashes for canonical cleanliness
  href = href.split(/[?#]/)[0];

  // Find or create the canonical <link> tag
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }

  link.setAttribute("href", href);
}

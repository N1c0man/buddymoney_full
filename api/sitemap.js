// api/sitemap.js
// Dynamic sitemap for BuddyMoney (Create React App on Vercel)

// IMPORTANT: Update this if your canonical domain ever changes
const STATIC_ROUTES = [
  // Core
  { path: "/", priority: 1.0, changefreq: "daily" },
  { path: "/blog", priority: 0.8, changefreq: "weekly" },

  // Tools hub
  { path: "/tools", priority: 0.9, changefreq: "weekly" },

  // Individual tools
  { path: "/coach", priority: 0.9, changefreq: "weekly" },          // Budget Coach
  { path: "/mortgage", priority: 0.9, changefreq: "weekly" },       // Mortgage Payoff
  { path: "/tools/credit-cards", priority: 0.9, changefreq: "weekly" }, // Credit Card Finder

  // Credit card hub + guides
  { path: "/credit-cards", priority: 0.8, changefreq: "monthly" },
  { path: "/credit-cards/cash-back", priority: 0.8, changefreq: "monthly" },
  { path: "/credit-cards/bad-credit", priority: 0.8, changefreq: "monthly" },
  { path: "/credit-cards/travel", priority: 0.8, changefreq: "monthly" },
  { path: "/credit-cards/0-apr", priority: 0.8, changefreq: "monthly" },
  { path: "/credit-cards/student", priority: 0.8, changefreq: "monthly" },

  // Info & legal
  { path: "/about", priority: 0.4, changefreq: "yearly" },
  { path: "/privacy", priority: 0.2, changefreq: "yearly" },
  { path: "/terms", priority: 0.2, changefreq: "yearly" },
  { path: "/affiliate-disclosure", priority: 0.2, changefreq: "yearly" },
];


// Helper to format one <url> entry
function buildUrlTag({ loc, lastmod, changefreq, priority }) {
  const safePriority =
    typeof priority === "number" ? priority.toFixed(1) : "0.5";

  return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${safePriority}</priority>
  </url>`;
}

// Vercel Node API route (CommonJS style for safety with CRA)
module.exports = (req, res) => {
  res.setHeader("Content-Type", "application/xml; charset=utf-8");

  const today = new Date().toISOString().split("T")[0];

  const staticUrls = STATIC_ROUTES.map((route) => {
    const path = route.path === "/" ? "" : route.path; // avoid double slash for home
    return buildUrlTag({
      loc: `${SITE_URL}${path}`,
      lastmod: today,
      changefreq: route.changefreq || "monthly",
      priority: route.priority ?? 0.5,
    });
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
>
${staticUrls.join("")}
</urlset>`;

  res.status(200).send(xml);
};

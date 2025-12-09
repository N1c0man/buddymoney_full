// api/sitemap.js
const ROUTES = require("../src/routePaths.json");

// Dynamic sitemap for BuddyMoney (Create React App on Vercel)

// IMPORTANT: Update this if your canonical domain ever changes
const STATIC_ROUTES = [
  { path: ROUTES.home, priority: 1.0, changefreq: "daily" },
  { path: ROUTES.blogList, priority: 0.8, changefreq: "weekly" },
  { path: ROUTES.tools, priority: 0.9, changefreq: "weekly" },

  { path: ROUTES.coach, priority: 0.9, changefreq: "weekly" },
  { path: ROUTES.mortgage, priority: 0.9, changefreq: "weekly" },
  { path: ROUTES.creditCardTool, priority: 0.9, changefreq: "weekly" },

  { path: ROUTES.creditCardsHub, priority: 0.8, changefreq: "monthly" },
  { path: ROUTES.creditCardsCashBack, priority: 0.8, changefreq: "monthly" },
  { path: ROUTES.creditCardsBadCredit, priority: 0.8, changefreq: "monthly" },
  { path: ROUTES.creditCardsTravel, priority: 0.8, changefreq: "monthly" },
  { path: ROUTES.creditCardsZeroApr, priority: 0.8, changefreq: "monthly" },
  { path: ROUTES.creditCardsStudent, priority: 0.8, changefreq: "monthly" },

  { path: ROUTES.about, priority: 0.4, changefreq: "yearly" },
  { path: ROUTES.privacy, priority: 0.2, changefreq: "yearly" },
  { path: ROUTES.terms, priority: 0.2, changefreq: "yearly" },
  { path: ROUTES.affiliateDisclosure, priority: 0.2, changefreq: "yearly" }
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

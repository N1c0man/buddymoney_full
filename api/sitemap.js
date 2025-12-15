// api/sitemap.js
const fs = require("fs");
const path = require("path");

const ROUTES = require("../src/routePaths.json");
const SITE_URL = "https://www.buddymoney.com";
const BLOG_POSTS = require("../src/blog/blogPosts.json");

// Dynamic sitemap for BuddyMoney (Create React App on Vercel)
// List of static pages using shared route config
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

// Resolve markdown file path for a post
function getMarkdownPath(post) {
  // If JSON has a file like "/posts/save-your-first-1000.md"
  if (post.file && typeof post.file === "string") {
    const relative = post.file.replace(/^\//, ""); // strip leading slash
    return path.join(__dirname, "..", "public", relative);
  }

  // Fallback to /public/posts/<slug>.md
  if (post.slug) {
    return path.join(__dirname, "..", "public", "posts", `${post.slug}.md`);
  }

  return null;
}

// Compute best lastmod for a post
function getPostLastmod(post, today) {
  // 1) Explicit lastmod in JSON wins
  if (post.lastmod) return post.lastmod;

  // 2) Try filesystem mtime from the markdown file
  const mdPath = getMarkdownPath(post);
  if (mdPath) {
    try {
      const stats = fs.statSync(mdPath);
      const fileDate = stats.mtime.toISOString().split("T")[0];
      return fileDate;
    } catch (err) {
      // If file missing or fs fails, just fall through to other options
      // console.error("Sitemap lastmod fs error for", mdPath, err);
    }
  }

  // 3) Fallback to publish date if present
  if (post.date) return post.date;

  // 4) Absolute fallback: today
  return today;
}

// Vercel Node API route (CommonJS style for safety with CRA)
module.exports = (req, res) => {
  res.setHeader("Content-Type", "application/xml; charset=utf-8");

  const today = new Date().toISOString().split("T")[0];

  const staticUrls = STATIC_ROUTES.map((route) => {
    const pathPart = route.path === "/" ? "" : route.path;
    return buildUrlTag({
      loc: `${SITE_URL}${pathPart}`,
      lastmod: today,
      changefreq: route.changefreq || "monthly",
      priority: route.priority ?? 0.5
    });
  });

  const blogUrls = BLOG_POSTS.map((post) =>
    buildUrlTag({
      loc: `${SITE_URL}/blog/${post.slug}`,
      lastmod: getPostLastmod(post, today),
      changefreq: "monthly",
      priority: post.priority ?? 0.8
    })
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls.join("")}
${blogUrls.join("")}
</urlset>`;

  res.status(200).send(xml);
};

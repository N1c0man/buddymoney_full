const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { marked } = require("marked");
const faqBySlug = require("../src/blog/faqBySlug.json");

marked.setOptions({
  gfm: true,
  breaks: false,
});

const SITE_URL = "https://www.buddymoney.com";
const POSTS_DIR = path.join(__dirname, "..", "public", "posts");
const BLOG_OUTPUT_DIR = path.join(__dirname, "..", "public", "blog");

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function stripHtml(html = "") {
  return String(html).replace(/<[^>]*>/g, "").trim();
}

function removeFirstH1(html = "") {
  return String(html).replace(/^\s*<h1[^>]*>.*?<\/h1>\s*/i, "");
}

function getReadingTime(text = "") {
  const words = String(text).split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.ceil(words / 200));
  return `${mins} min read`;
}

function buildFaqSchema(slug) {
  const faqs = faqBySlug[slug];

  if (!faqs || !Array.isArray(faqs) || faqs.length === 0) {
    return "";
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: String(item.question || ""),
      acceptedAnswer: {
        "@type": "Answer",
        text: String(item.answer || ""),
      },
    })),
  };

  return `<script type="application/ld+json">${JSON.stringify(faqSchema)}</script>`;
}

function buildHtml({
  title,
  description,
  slug,
  date,
  image,
  heroImageAlt,
  tag,
  contentHtml,
}) {
  const canonical = `${SITE_URL}/blog/${slug}/`;
  const ogImage = image
    ? String(image).startsWith("http")
      ? String(image)
      : `${SITE_URL}${image}`
    : `${SITE_URL}/og-image.jpg`;

  const absoluteImage = image
    ? String(image).startsWith("http")
      ? String(image)
      : `${SITE_URL}${image}`
    : "";

  const plainText = stripHtml(contentHtml);
  const readingTime = getReadingTime(plainText);
  const faqSchemaScript = buildFaqSchema(slug);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: String(title),
    description: String(description),
    datePublished: String(date || ""),
    dateModified: String(date || ""),
    mainEntityOfPage: canonical,
    image: [ogImage],
    author: {
      "@type": "Organization",
      name: "BuddyMoney",
    },
    publisher: {
      "@type": "Organization",
      name: "BuddyMoney",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icons/icon-512x512.png`,
      },
    },
  };

  const heroImageHtml = absoluteImage
    ? `
      <figure class="hero">
        <img
          src="${escapeHtml(absoluteImage)}"
          alt="${escapeHtml(heroImageAlt || title)}"
          class="hero-image"
        />
      </figure>
    `
    : "";

  const tagHtml = tag
    ? `<div class="eyebrow">${escapeHtml(tag)}</div>`
    : "";

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${escapeHtml(title)} | BuddyMoney</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <link rel="canonical" href="${canonical}" />

  <meta property="og:type" content="article" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${ogImage}" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="${ogImage}" />

  <script type="application/ld+json">${JSON.stringify(articleSchema)}</script>
  ${faqSchemaScript}

  <style>
    :root {
      --bg: #f8fafc;
      --surface: #ffffff;
      --surface-soft: #f0fdf4;
      --text: #0f172a;
      --muted: #64748b;
      --border: #dbeafe;
      --green: #10b981;
      --green-dark: #047857;
      --blue-soft: #eff6ff;
      --shadow: 0 12px 40px rgba(15, 23, 42, 0.08);
      --radius: 20px;
    }

    * {
      box-sizing: border-box;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      margin: 0;
      font-family: Arial, sans-serif;
      line-height: 1.7;
      color: var(--text);
      background:
        radial-gradient(circle at top, #ecfdf5 0%, #f8fafc 35%, #f8fafc 100%);
    }

    .site-header {
      position: sticky;
      top: 0;
      z-index: 99999;
      backdrop-filter: blur(12px);
      background: rgba(255, 255, 255, 0.92);
      border-bottom: 1px solid rgba(16, 185, 129, 0.12);
      box-shadow: 0 6px 24px rgba(15, 23, 42, 0.06);
    }

    .site-header-inner {
      max-width: 1152px;
      margin: 0 auto;
      padding: 10px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      position: relative;
    }

    .brand-link {
      display: inline-flex;
      align-items: center;
      text-decoration: none;
      flex-shrink: 0;
    }

    .brand-logo {
      height: 48px;
      width: auto;
      display: block;
      transition: transform 0.3s ease;
    }

    .brand-link:hover .brand-logo {
      transform: scale(1.05);
    }

    .desktop-nav {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .nav-divider {
      width: 1px;
      height: 24px;
      background: #d1fae5;
    }

    .nav-link {
      display: inline-flex;
      align-items: center;
      padding: 8px 12px;
      border-radius: 8px;
      text-decoration: none;
      font-size: 0.92rem;
      font-weight: 600;
      color: #334155;
      transition: background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
      white-space: nowrap;
    }

    .nav-link:hover {
      background: #ecfdf5;
      color: #0f172a;
    }

    .nav-link.active {
      background: #059669;
      color: #ffffff;
      box-shadow: 0 3px 10px rgba(5, 150, 105, 0.22);
    }

    .mobile-toggle {
      display: none;
      border: 0;
      background: transparent;
      color: #0f172a;
      font-size: 1.5rem;
      line-height: 1;
      padding: 8px 10px;
      border-radius: 10px;
      cursor: pointer;
    }

    .mobile-toggle:hover {
      background: #ecfdf5;
    }

    .mobile-menu {
      display: none;
      border-top: 1px solid rgba(16, 185, 129, 0.12);
      background: rgba(255, 255, 255, 0.96);
      backdrop-filter: blur(10px);
    }

    .mobile-menu.open {
      display: block;
    }

    .mobile-menu-inner {
      max-width: 1152px;
      margin: 0 auto;
      padding: 10px 16px 16px;
      display: grid;
      gap: 8px;
    }

    .mobile-nav-link {
      display: block;
      text-decoration: none;
      padding: 10px 12px;
      border-radius: 10px;
      font-size: 1rem;
      font-weight: 600;
      color: #334155;
      transition: background-color 0.2s ease, color 0.2s ease;
    }

    .mobile-nav-link:hover {
      background: #ecfdf5;
      color: #0f172a;
    }

    .mobile-nav-link.active {
      background: #059669;
      color: #ffffff;
    }

    .page {
      max-width: 860px;
      margin: 0 auto;
      padding: 28px 20px 72px;
    }

    .backlink {
      display: inline-block;
      margin-bottom: 18px;
      color: var(--green-dark);
      text-decoration: none;
      font-weight: 700;
    }

    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      overflow: hidden;
    }

    .article-head {
      padding: 28px 28px 18px;
      border-bottom: 1px solid #eef2ff;
    }

    .eyebrow {
      display: inline-block;
      margin-bottom: 10px;
      padding: 4px 10px;
      border-radius: 999px;
      background: var(--surface-soft);
      color: var(--green-dark);
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.02em;
      text-transform: uppercase;
    }

    .article-title {
      margin: 0 0 12px;
      font-size: clamp(2rem, 4vw, 2.8rem);
      line-height: 1.12;
      letter-spacing: -0.02em;
      color: #0b132b;
    }

    .article-desc {
      margin: 0 0 14px;
      font-size: 1.05rem;
      color: #334155;
    }

    .meta {
      color: var(--muted);
      font-size: 0.95rem;
    }

    .hero {
      margin: 0;
      padding: 20px 20px 0;
    }

    .hero-image {
      display: block;
      width: 100%;
      height: auto;
      border-radius: 18px;
      border: 1px solid #dbeafe;
      background: #f8fafc;
    }

    .content {
      padding: 28px;
      font-size: 1.04rem;
      color: #1e293b;
    }

    .content > :first-child {
      margin-top: 0;
    }

    .content h1 {
      font-size: 2rem;
      line-height: 1.15;
      margin: 0 0 18px;
      color: #0b132b;
    }

    .content h2 {
      font-size: 1.7rem;
      line-height: 1.2;
      margin-top: 2.1em;
      margin-bottom: 0.7em;
      color: #0f172a;
      padding-top: 0.3em;
      border-top: 1px solid #e5e7eb;
    }

    .content h3 {
      font-size: 1.2rem;
      line-height: 1.35;
      margin-top: 1.8em;
      margin-bottom: 0.55em;
      color: #0f172a;
    }

    .content p {
      margin: 0 0 1.1em;
    }

    .content ul,
    .content ol {
      margin: 0 0 1.2em 1.35em;
      padding: 0;
    }

    .content li {
      margin-bottom: 0.45em;
    }

    .content table {
      width: 100%;
      border-collapse: collapse;
      margin: 1.4em 0;
      overflow: hidden;
      border: 1px solid #dbeafe;
      border-radius: 14px;
      background: #ffffff;
      box-shadow: 0 6px 20px rgba(15, 23, 42, 0.04);
    }

    .content th,
    .content td {
      padding: 12px 14px;
      border: 1px solid #e5e7eb;
      text-align: left;
      vertical-align: top;
    }

    .content th {
      background: #ecfdf5;
      color: #0f172a;
      font-weight: 700;
    }

    .content tr:nth-child(even) td {
      background: #f8fafc;
    }

    .content table code {
      white-space: nowrap;
    }

    .content a {
      color: var(--green-dark);
      font-weight: 600;
      text-decoration: underline;
      text-underline-offset: 2px;
    }

    .content strong {
      color: #0f172a;
    }

    .content hr {
      border: 0;
      border-top: 1px solid #d1fae5;
      margin: 2em 0;
    }

    .content blockquote {
      margin: 1.6em 0;
      padding: 16px 18px;
      background: var(--blue-soft);
      border-left: 4px solid var(--green);
      border-radius: 14px;
      color: #1e3a8a;
    }

    .content blockquote p:last-child {
      margin-bottom: 0;
    }

    .content img {
      max-width: 100%;
      height: auto;
      border-radius: 14px;
    }

    .content pre {
      overflow-x: auto;
      background: #0f172a;
      color: #e2e8f0;
      padding: 16px;
      border-radius: 14px;
      font-size: 0.95rem;
    }

    .content code {
      background: #f1f5f9;
      padding: 2px 6px;
      border-radius: 6px;
      font-size: 0.95em;
    }

    .content pre code {
      background: transparent;
      padding: 0;
      border-radius: 0;
      color: inherit;
    }

    .footer {
      background: #f0fdf4;
      border-top: 1px solid #dcfce7;
      margin-top: 64px;
    }

    .footer-inner {
      max-width: 1152px;
      margin: 0 auto;
      padding: 32px 24px;
      display: grid;
      gap: 20px;
    }

    .footer-brand a {
      font-size: 1.3rem;
      font-weight: 800;
      color: #15803d;
      text-decoration: none;
    }

    .footer-brand .money {
      color: #1d4ed8;
    }

    .footer-nav {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: 8px;
      font-size: 0.95rem;
      color: #4b5563;
    }

    .footer-nav a {
      color: #4b5563;
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .footer-nav a:hover {
      color: #059669;
    }

    .footer-sep {
      color: #cbd5e1;
    }

    .footer-email {
      text-align: center;
      font-size: 0.95rem;
      color: #475569;
    }

    .footer-email a {
      display: inline-flex;
      align-items: center;
      padding: 4px 8px;
      border-radius: 6px;
      color: #059669;
      text-decoration: none;
      transition: background-color 0.2s ease, color 0.2s ease;
    }

    .footer-email a:hover {
      background: #ecfdf5;
      color: #065f46;
      text-decoration: underline;
      text-underline-offset: 2px;
    }

    .footer-disclosure {
      max-width: 700px;
      margin: 0 auto;
      text-align: center;
      font-size: 0.8rem;
      line-height: 1.7;
      color: #6b7280;
    }

    .footer-copy {
      text-align: center;
      font-size: 0.8rem;
      color: #6b7280;
    }

    @media (max-width: 960px) {
      .desktop-nav {
        display: none;
      }

      .mobile-toggle {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
    }

    @media (min-width: 961px) {
      .mobile-menu {
        display: none !important;
      }
    }

    @media (max-width: 640px) {
      .brand-logo {
        height: 42px;
      }

      .page {
        padding: 18px 14px 48px;
      }

      .article-head,
      .content {
        padding: 20px;
      }

      .hero {
        padding: 14px 14px 0;
      }

      .site-header-inner {
        padding: 10px 14px;
      }

      .footer-inner {
        padding: 28px 16px;
      }

      .content table {
        display: block;
        overflow-x: auto;
      }
    }
  </style>
</head>
<body>
  <header class="site-header">
    <div class="site-header-inner">
      <a class="brand-link" href="/" aria-label="BuddyMoney home">
        <img
          src="/icons/BMlogo.png"
          alt="BuddyMoney Logo"
          class="brand-logo"
        />
      </a>

      <nav class="desktop-nav" aria-label="Primary">
        <a class="nav-link" href="/">🏠 Home</a>
        <span class="nav-divider"></span>

        <a class="nav-link" href="/credit-cards">💳 Credit Cards</a>
        <span class="nav-divider"></span>

        <a class="nav-link" href="/coach">🎯 Budget Coach</a>
        <span class="nav-divider"></span>

        <a class="nav-link" href="/mortgage">📊 Mortgage</a>
        <span class="nav-divider"></span>

        <a class="nav-link" href="/tools">🧰 Tools</a>
        <span class="nav-divider"></span>

        <a class="nav-link active" href="/blog">📰 Blog &amp; Guides</a>
      </nav>

      <button
        class="mobile-toggle"
        type="button"
        aria-label="Toggle navigation"
        aria-expanded="false"
        aria-controls="mobile-menu"
      >
        ☰
      </button>
    </div>

    <div id="mobile-menu" class="mobile-menu">
      <div class="mobile-menu-inner">
        <a class="mobile-nav-link" href="/">🏠 Home</a>
        <a class="mobile-nav-link" href="/credit-cards">💳 Credit Cards</a>
        <a class="mobile-nav-link" href="/coach">🎯 Budget Coach</a>
        <a class="mobile-nav-link" href="/mortgage">📊 Mortgage Payoff Calculator</a>
        <a class="mobile-nav-link" href="/tools">🧰 Tools</a>
        <a class="mobile-nav-link active" href="/blog">📰 Blog &amp; Guides</a>
      </div>
    </div>
  </header>

  <main class="page">
    <a class="backlink" href="/blog">← Back to Blog</a>

    <article class="card">
      <div class="article-head">
        ${tagHtml}
        <h1 class="article-title">${escapeHtml(title)}</h1>
        <p class="article-desc">${escapeHtml(description)}</p>
        <div class="meta">${escapeHtml(date || "")} • ${readingTime}</div>
      </div>

      ${heroImageHtml}

      <div class="content">
        ${contentHtml}
      </div>
    </article>
  </main>

  <footer
    class="footer"
    itemscope
    itemtype="https://schema.org/WPFooter"
  >
    <div class="footer-inner">
      <div
        class="footer-brand"
        itemscope
        itemtype="https://schema.org/Organization"
      >
        <a href="/" itemprop="url">
          <span itemprop="name">Buddy<span class="money">Money</span></span>
        </a>
      </div>

      <nav
        class="footer-nav"
        itemscope
        itemtype="https://schema.org/SiteNavigationElement"
        aria-label="Footer"
      >
        <a href="/about" itemprop="url">About</a>
        <span class="footer-sep">|</span>

        <a href="/blog" itemprop="url">Blog</a>
        <span class="footer-sep">|</span>

        <a href="/tools" itemprop="url">Tools</a>
        <span class="footer-sep">|</span>

        <a href="/privacy" itemprop="url">⚖️ Privacy Policy</a>
        <span class="footer-sep">|</span>

        <a href="/terms" itemprop="url">⚖️ Terms of Service</a>
        <span class="footer-sep">|</span>

        <a href="/affiliate-disclosure" itemprop="url">⚖️ Affiliate Disclosure</a>
      </nav>

      <div class="footer-email">
        📩 Email:
        <a href="mailto:contact&#64;buddymoney&#46;com">
          contact&#64;buddymoney&#46;com
        </a>
      </div>

      <p class="footer-disclosure">
        <strong>Affiliate Disclosure:</strong> BuddyMoney may receive compensation
        from partner links on this site. This does not influence our recommendations.
        We only promote products we genuinely believe provide value.
      </p>

      <p class="footer-disclosure">
        <strong>Disclaimer:</strong> BuddyMoney provides educational content only and
        does not offer financial, legal, tax, or investment advice. Always do your own
        research and consider consulting a qualified professional before making financial decisions.
      </p>

      <div class="footer-copy">
        © ${new Date().getFullYear()} <span itemprop="name">BuddyMoney</span>. All rights reserved.
      </div>
    </div>
  </footer>

  <script>
    (function () {
      var toggle = document.querySelector(".mobile-toggle");
      var menu = document.getElementById("mobile-menu");

      if (!toggle || !menu) return;

      toggle.addEventListener("click", function () {
        var isOpen = menu.classList.toggle("open");
        toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        toggle.textContent = isOpen ? "✕" : "☰";
      });
    })();
  </script>
</body>
</html>`;
}

function run() {
  if (!fs.existsSync(POSTS_DIR)) {
    console.log("No public/posts directory found. Skipping blog generation.");
    return;
  }

  ensureDir(BLOG_OUTPUT_DIR);

  const files = fs.readdirSync(POSTS_DIR).filter((file) => file.endsWith(".md"));

  const manifest = [];

  for (const file of files) {
    const fullPath = path.join(POSTS_DIR, file);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(raw);

    const slug = data.slug || file.replace(/\.md$/, "");
    const title = data.title || slug.replace(/-/g, " ");
    const description =
      data.description || data.excerpt || `Read ${title} on BuddyMoney.`;
    const date = data.date || "";
    const image = data.image || data.heroImage || "/og-image.jpg";
    const heroImageAlt = data.heroImageAlt || data.imageAlt || title;
    const tag = data.tag || "";

    const contentHtml = removeFirstH1(marked.parse(content));
    const html = buildHtml({
      title,
      description,
      slug,
      date,
      image,
      heroImageAlt,
      tag,
      contentHtml,
    });

    const outDir = path.join(BLOG_OUTPUT_DIR, slug);
    ensureDir(outDir);
    fs.writeFileSync(path.join(outDir, "index.html"), html, "utf8");

    manifest.push({
      slug,
      title,
      description,
      date: String(date || ""),
      image,
      file: `/posts/${file}`,
      url: `/blog/${slug}/`,
    });
  }

  fs.writeFileSync(
    path.join(__dirname, "..", "public", "posts-manifest.json"),
    JSON.stringify(manifest, null, 2),
    "utf8"
  );

  console.log(`Generated ${manifest.length} static blog pages.`);
}

run();
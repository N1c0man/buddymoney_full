const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { marked } = require("marked");

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

  const plainText = stripHtml(contentHtml);
  const readingTime = getReadingTime(plainText);

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

  const heroImageHtml = image
    ? `
      <figure class="hero">
        <img
          src="${escapeHtml(image)}"
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

    body {
      margin: 0;
      font-family: Arial, sans-serif;
      line-height: 1.7;
      color: var(--text);
      background:
        radial-gradient(circle at top, #ecfdf5 0%, #f8fafc 35%, #f8fafc 100%);
    }

    .sitebar {
      width: 100%;
      background: rgba(255, 255, 255, 0.9);
      border-bottom: 1px solid #e5e7eb;
      backdrop-filter: blur(8px);
    }

    .sitebar-inner {
      max-width: 1120px;
      margin: 0 auto;
      padding: 14px 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .brand {
      color: var(--green-dark);
      font-weight: 800;
      text-decoration: none;
      font-size: 1.1rem;
      letter-spacing: 0.01em;
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

    @media (max-width: 640px) {
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
    }
  </style>
</head>
<body>
  <header class="sitebar">
    <div class="sitebar-inner">
      <a class="brand" href="/">BuddyMoney</a>
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
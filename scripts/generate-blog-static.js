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

function getReadingTime(text = "") {
  const words = String(text).split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.ceil(words / 200));
  return `${mins} min read`;
}

function buildHtml({ title, description, slug, date, image, contentHtml }) {
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
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      line-height: 1.7;
      color: #111827;
      background: #ffffff;
    }
    .wrap {
      max-width: 760px;
      margin: 0 auto;
      padding: 32px 20px 64px;
    }
    .toplink {
      display: inline-block;
      margin-bottom: 24px;
      color: #047857;
      text-decoration: none;
      font-weight: 600;
    }
    h1 {
      font-size: 2.2rem;
      line-height: 1.2;
      margin-bottom: 12px;
    }
    .meta {
      color: #6b7280;
      font-size: 0.95rem;
      margin-bottom: 32px;
    }
    img {
      max-width: 100%;
      height: auto;
    }
    a {
      color: #047857;
    }
    pre {
      overflow-x: auto;
      background: #f3f4f6;
      padding: 16px;
      border-radius: 10px;
    }
    code {
      background: #f3f4f6;
      padding: 2px 6px;
      border-radius: 6px;
    }
  </style>
</head>
<body>
  <main class="wrap">
    <a class="toplink" href="/blog">← Back to Blog</a>
    <article>
      <h1>${escapeHtml(title)}</h1>
      <div class="meta">${escapeHtml(date || "")} • ${readingTime}</div>
      ${contentHtml}
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
    const description = data.description || data.excerpt || `Read ${title} on BuddyMoney.`;
    const date = data.date || "";
    const image = data.image || data.heroImage || "/og-image.jpg";

    const contentHtml = marked.parse(content);
    const html = buildHtml({
      title,
      description,
      slug,
      date,
      image,
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
// scripts/generateBlogPosts.cjs
const fs = require("fs");
const path = require("path");

const POSTS_DIR = path.join(__dirname, "..", "public", "posts");
const OUTPUT_JSON = path.join(__dirname, "..", "src", "blog", "blogPosts.json");

// Tiny frontmatter parser (no external dependency)
function parseFrontmatter(raw) {
  const FRONTMATTER_REGEX = /^---\s*([\s\S]*?)\s*---\s*/;
  const match = raw.match(FRONTMATTER_REGEX);
  if (!match) return { data: {}, content: raw };

  const block = match[1];
  const lines = block.split("\n").filter(Boolean);
  const data = {};

  for (const line of lines) {
    const [key, ...rest] = line.split(":");
    const value = rest.join(":").trim();
    if (!key) continue;
    data[key.trim()] = value;
  }

  const content = raw.slice(match[0].length);
  return { data, content };
}

function main() {
  if (!fs.existsSync(POSTS_DIR)) {
    console.error("No posts directory found at:", POSTS_DIR);
    process.exit(1);
  }

  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .sort();

  const posts = files.map((filename) => {
    const fullPath = path.join(POSTS_DIR, filename);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data } = parseFrontmatter(raw);

    // slug from frontmatter or filename
    const slug =
      data.slug ||
      filename.replace(/\.md$/i, "").trim();

    const title = data.title || slug.replace(/-/g, " ");
    const date = data.date || new Date().toISOString().slice(0, 10);

    return {
      slug,
      title,
      tag: data.tag || "General",
      level: data.level || "Beginner",
      readTime: data.readTime || "",
      excerpt: data.excerpt || "",
      file: `/posts/${filename}`,

      author: data.author || "BuddyMoney Editorial",
      authorAvatar: data.authorAvatar || "/icons/editorial.png",
      date,

      heroImage: data.heroImage || `/icons/${slug}-hero.png`,
      heroImageAlt: data.heroImageAlt || title
    };
  });

  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(posts, null, 2));
  console.log(`✅ Generated ${posts.length} posts → ${OUTPUT_JSON}`);
}

main();

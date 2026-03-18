// src/blog/postsIndex.js
import rawPosts from "./blogPosts.json";
import faqBySlug from "./faqBySlug.json";

// Merge JSON + inferred .md file + FAQ + URL
export const posts = rawPosts.map((post) => {
  const slug = post.slug;
  const file = post.file || `/posts/${slug}.md`;

  return {
    ...post,
    file,
    faq: faqBySlug[slug] || [],
    url: `/blog/${slug}`,
  };
});

// Helper to fetch a post
export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug);
}
// src/blog/postsIndex.js
import rawPosts from "./blogPosts.json";

// Keep ALL FAQs here, keyed by slug (unchanged)
const faqBySlug = {
  "save-your-first-1000": [
    {
      question: "Why is saving the first $1,000 so important?",
      answer:
        "Your first $1,000 acts as a Level 1 emergency fund. It protects you from small emergencies like car repairs or surprise bills so you don’t rely on credit cards. It also gives you confidence and momentum for bigger goals.",
    },
    {
      question: "How fast can I realistically save $1,000?",
      answer:
        "It depends on your timeline. Saving $1,000 in 3 months is about $84 per week, in 6 months is $42 per week, and in 12 months is $21 per week. Choose a pace that feels challenging but realistic.",
    },
    {
      question: "What are the easiest expenses to cut when saving money?",
      answer:
        "Good short-term cuts include reducing eating out, pausing streaming services, limiting delivery apps, delaying impulse Amazon purchases, and bringing snacks or coffee from home. Even $80–$100 per month in cuts makes a big impact.",
    },
    {
      question: "How can a side hustle help me save $1,000 faster?",
      answer:
        "A temporary side hustle—like rideshare driving, selling unused items, pet sitting, babysitting, or simple freelancing—can accelerate your progress. Every dollar earned goes directly to your First $1,000 savings goal.",
    },
    {
      question: "Should I automate my savings while building my first $1,000?",
      answer:
        "Yes. Automating weekly or monthly transfers removes willpower from the process. Setting up a separate savings account and auto-transferring a fixed amount helps you stay consistent until you hit the goal.",
    },
    {
      question: "Where should I keep my first $1,000?",
      answer:
        "Store this money in a separate savings account, preferably a high-yield account. Avoid investing it in stocks or crypto—your first $1,000 needs to be safe, stable, and easily accessible for emergencies.",
    },
    {
      question: "What should I do after I reach $1,000 in savings?",
      answer:
        "Celebrate the milestone, then decide whether to build a larger emergency fund, start paying down high-interest debt, or set a new savings goal. Tools like the Emergency Fund Calculator and Budget Tracker can help you plan your next step.",
    },
  ],

  // ⭐ All your other FAQ objects remain unchanged
  "emergency-fund-basics": [ /* ...existing content... */ ],
  "how-to-start-a-budget-in-10-minutes": [ /* ...existing content... */ ],
  "side-hustle-income-tips": [ /* ...existing content... */ ],
  "crush-credit-card-debt": [ /* ...existing content... */ ],
  "salary-by-age": [ /* ...existing content... */ ],
  "best-secured-credit-cards": [ /* ...existing content... */ ],
  "budget-traps-to-avoid": [ /* ...existing content... */ ],
  "side-hustle-ideas": [],
};

// ⭐ NEW: Merge JSON + inferred .md file + FAQ + URL
export const posts = rawPosts.map((post) => {
  const slug = post.slug;

  // Auto-generate markdown file path if missing
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

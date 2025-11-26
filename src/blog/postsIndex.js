// src/blog/postsIndex.js

export const posts = [
    {
    slug: "save-your-first-1000",
    title: "How to Save Your First $1,000 (Even on a Tight Budget)",
    tag: "Saving",
    level: "Beginner",
    readTime: "9 min read",
    excerpt:
      "A simple, realistic plan to build your first $1,000 cushion even if money feels tight right now.",
    file: "/posts/save-your-first-1000.md",

    author: "BuddyMoney Editorial",
    authorAvatar: "/icons/editorial.png",
    date: "2025-11-23",

    heroImage: "/icons/save-your-first-1000-hero.png",
    heroImageAlt:
      "Owl saving for his first 1000 dollars",
  },
  {
    slug: "emergency-fund-basics",
    title: "Emergency Fund Basics",
    tag: "Emergency Fund",
    level: "Beginner",
    readTime: "6 min read",
    excerpt: "Why every household needs one and how much you should save.",
    file: "/posts/emergency-fund-basics.md",

    author: "BuddyMoney Editorial",
    authorAvatar: "/icons/editorial.png",
    date: "2025-11-17",

    heroImage: "/icons/emergency-fund-hero.png",
    heroImageAlt: "Piggy bank and cash jars labeled as an emergency fund",
  },
  {
    slug: "how-to-start-a-budget-in-10-minutes",
    title: "How to Start a Budget in 10 Minutes",
    tag: "Budgeting",
    level: "Beginner",
    readTime: "7 min read",
    excerpt: "A quick-start method to give every dollar a job today.",
    file: "/posts/how-to-start-a-budget-in-10-minutes.md",

    author: "BuddyMoney Editorial",
    authorAvatar: "/icons/editorial.png",
    date: "2025-11-18",

    heroImage: "/icons/quick-budget-hero.png",
    heroImageAlt:
      "Notebook, phone, and coffee cup on a desk used for budgeting",
  },
  {
    slug: "side-hustle-income-tips",
    title: "Side Hustle Income Tips",
    tag: "Side Hustles",
    level: "Intermediate",
    readTime: "8 min read",
    excerpt:
      "Ideas and guardrails to earn more without burning yourself out.",
    file: "/posts/side-hustle-income-tips.md",

    author: "BuddyMoney Editorial",
    authorAvatar: "/icons/editorial.png",
    date: "2025-11-19",

    heroImage: "/icons/side-hustle-hero.png",
    heroImageAlt:
      "Person working on a laptop at night with side hustle ideas",
  },
  {
    slug: "crush-credit-card-debt",
    title: "Crush Credit Card Debt",
    tag: "Debt",
    level: "Intermediate",
    readTime: "9 min read",
    excerpt: "A step-by-step game plan to pay off high-interest cards faster.",
    file: "/posts/crush-credit-card-debt.md",

    author: "BuddyMoney Editorial",
    authorAvatar: "/icons/editorial.png",
    date: "2025-11-20",

    heroImage: "/icons/credit-card-crush-hero.png",
    heroImageAlt: "Cut-up credit cards and a payoff plan on a notepad",
  },
  {
    slug: "side-hustle-ideas",
    title: "7 Best Side Hustles You Can Start This Week",
    tag: "Side Hustles",
    level: "Beginner",
    readTime: "9 min read",
    excerpt:
      "Practical, fast-start side hustles you can launch this weekend.",
    file: "/posts/side-hustle-ideas.md",

    author: "BuddyMoney Editorial",
    authorAvatar: "/icons/editorial.png",
    date: "2025-11-21",

    heroImage: "/icons/side-hustle-hero2.png",
    heroImageAlt: "Person juggling multiple side hustles",
  },
  {
    slug: "salary-by-age",
    title: "How Much Salary Should You Be Making for Your Age in 2025?",
    tag: "Income",
    level: "Beginner",
    readTime: "10 min read",
    excerpt:
      "A breakdown of what people typically earn at each age in 2025.",
    file: "/posts/salary-by-age.md",

    author: "BuddyMoney Editorial",
    authorAvatar: "/icons/editorial.png",
    date: "2025-11-22",

    heroImage: "/icons/salary-by-age-hero.png",
    heroImageAlt:
      "Bar chart showing typical salary ranges by age",
  },
];

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug);
}

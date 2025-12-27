// src/blog/postsIndex.js
import rawPosts from "./blogPosts.json";

// Keep ALL FAQs here, keyed by slug (unchanged)
const faqBySlug = {
  "first-30-days-taking-control-of-your-money": [
  {
    question: "What should I focus on first when taking control of my money?",
    answer:
      "In the first few weeks, focus on awareness rather than perfection. Track your income and expenses, understand where your money goes, and avoid making drastic changes all at once."
  },
  {
    question: "Is it normal to feel overwhelmed at the beginning?",
    answer:
      "Yes. Feeling overwhelmed is very common when you first look closely at your finances. That discomfort usually fades as clarity improves and small habits form."
  },
  {
    question: "Do I need a perfect budget in the first month?",
    answer:
      "No. The first 30 days are about learning, not perfection. A simple, flexible plan works better than a strict budget that’s hard to maintain."
  },
  {
    question: "What if I make mistakes during the first month?",
    answer:
      "Mistakes are part of the process. Progress comes from consistency, not flawless execution. One off-week does not undo forward momentum."
  },
  {
    question: "How long does it take to feel confident with money?",
    answer:
      "Many people begin to feel calmer and more confident after the first month. Long-term confidence builds over time as habits become routine."
  }
],
    "debt-consolidation-guide": [
    {
      question: "What is debt consolidation in simple terms?",
      answer:
        "Debt consolidation means combining multiple debts into one payment. This is usually done by using a personal loan, balance transfer card, or a structured repayment plan so you have fewer due dates and one clear payoff path.",
    },
    {
      question: "Does debt consolidation lower my interest rate automatically?",
      answer:
        "Not always. Debt consolidation only lowers your interest cost if the new rate is lower than your current average rate (and fees don’t outweigh the savings). Always compare the total cost, not just the monthly payment.",
    },
    {
      question: "Will debt consolidation hurt my credit score?",
      answer:
        "It can cause a small temporary dip, especially if a lender checks your credit or you open a new account. Over time, consolidation can help your score if it helps you make on-time payments and lowers your credit utilization.",
    },
    {
      question: "What’s the difference between debt consolidation and debt settlement?",
      answer:
        "Debt consolidation reorganizes your debt into one payment so you can pay it off more predictably. Debt settlement involves negotiating to pay less than what you owe, which can seriously impact your credit and often includes fees and risks.",
    },
    {
      question: "Is a balance transfer card a good way to consolidate debt?",
      answer:
        "It can be, especially if you qualify for a 0% introductory APR and can pay the balance down before the promo period ends. Watch for balance transfer fees and higher interest rates after the intro period.",
    },
    {
      question: "Can I consolidate debt if my credit is fair or rebuilding?",
      answer:
        "Yes, it’s possible. Approval and rates depend on your credit profile, income, and debt-to-income ratio. If rates are too high, a debt management plan or credit counseling may be a safer option.",
    },
    {
      question: "What debts can usually be consolidated?",
      answer:
        "Common debts include credit cards, personal loans, medical bills, and some types of high-interest installment debt. Mortgages and federal student loans usually have separate rules and may not be a fit for standard consolidation loans.",
    },
    {
      question: "What’s the biggest mistake people make after consolidating?",
      answer:
        "The biggest mistake is running balances back up after paying cards off. Consolidation works best when you stop adding new debt, set a realistic budget, and automate payments so the plan stays on track.",
    },
  ],

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

  "emergency-fund-3-to-6-months": [
    {
      question:
        "How do I know whether I need a 3-month or a 6-month emergency fund?",
      answer:
        "If you have stable income, few dependents, and low monthly expenses, a 3-month fund may be enough. If you have variable income, children, medical needs, or a less stable job, aim for 6 months or more for added protection.",
    },
    {
      question:
        "What expenses should be included when calculating my emergency fund?",
      answer:
        "Include only essential living costs such as rent or mortgage, groceries, utilities, insurance, transportation, and minimum debt payments. Exclude discretionary spending like dining out, subscriptions, and entertainment.",
    },
    {
      question: "Where should I keep my 3–6 month emergency fund?",
      answer:
        "A high-yield savings account is usually the best place. It keeps your money safe, easy to access in a real emergency, and earns interest. Avoid investing emergency funds in stocks or crypto, which can lose value quickly.",
    },
    {
      question: "What’s the fastest way to jump-start my emergency fund?",
      answer:
        "Some quick wins include selling unused items, redirecting tax refunds or bonuses, cutting one or two expenses temporarily, or taking a short-term side hustle. Even one-time boosts can significantly accelerate your progress.",
    },
    {
      question: "What should I do if I need to use the emergency fund?",
      answer:
        "Use only what you need, stay calm, and revisit your budget. After the emergency passes, rebuild the fund using the same automatic transfers or weekly contributions that helped you build it initially.",
    },
    {
      question: "Is it okay to start with a smaller emergency fund first?",
      answer:
        "Absolutely. Many people start with a $500–$1,000 starter emergency fund before working toward 3–6 months. This smaller cushion helps you avoid debt while building momentum toward a larger safety net.",
    },
    {
      question: "How long does it usually take to save a full 3–6 month fund?",
      answer:
        "It varies widely. Some reach it in a few months with high savings or extra income, while others save over a year or more. The key is consistency—saving even small amounts weekly builds a strong fund over time.",
    },
  ],

  // ✅ NEW: FAQs for "Why Knowing Your Net Worth Matters"
  "why-your-net-worth-matters": [
    {
      question: "What is net worth in simple terms?",
      answer:
        "Your net worth is what you own minus what you owe. Add up assets like cash, savings, and investments, then subtract debts like credit cards, loans, and mortgages. The result is your net worth.",
    },
    {
      question: "Why is net worth more important than income?",
      answer:
        "Income shows how much money you earn, but net worth shows how much you actually keep. Someone with high income and high debt can have a lower net worth than someone earning less but saving consistently.",
    },
    {
      question: "Is it bad if my net worth is negative?",
      answer:
        "No. A negative net worth is very common, especially for beginners, students, or people rebuilding credit. What matters most is tracking it and improving it over time.",
    },
    {
      question: "How often should I check my net worth?",
      answer:
        "Once a month or once a quarter is ideal. This gives you enough time to see real progress without obsessing over small day-to-day changes.",
    },
    {
      question: "What’s the easiest way to track net worth?",
      answer:
        "The easiest way is using a tool or dashboard that helps you see balances and debts in one place. That saves time and reduces errors compared to manually updating spreadsheets.",
    },
    {
      question: "Does tracking my net worth hurt my credit score?",
      answer:
        "No. Tracking your net worth or viewing credit information does not hurt your credit score. Monitoring tools typically use soft checks, which do not impact your score.",
    },
    
  ],

  // ⭐ All your other FAQ objects remain unchanged
  "emergency-fund-basics": [/* ...existing content... */],
  "how-to-start-a-budget-in-10-minutes": [/* ...existing content... */],
  "side-hustle-income-tips": [/* ...existing content... */],
  "crush-credit-card-debt": [/* ...existing content... */],
  "salary-by-age": [/* ...existing content... */],
  "best-secured-credit-cards": [/* ...existing content... */],
  "budget-traps-to-avoid": [/* ...existing content... */],
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

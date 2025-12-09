// src/blog/postsIndex.js
import rawPosts from "./blogPosts.json";

// Keep ALL FAQs here, keyed by slug
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

  "emergency-fund-basics": [
    {
      question: "How much should I keep in an emergency fund?",
      answer:
        "Many people aim for 3–6 months of essential expenses. If your income is unstable or you have dependents, you may want to lean closer to 6 months or more.",
    },
    {
      question: "Where should I keep my emergency fund?",
      answer:
        "A high-yield savings account is usually a good fit. It keeps your money safe, easy to access in a real emergency, and still earns some interest.",
    },
    {
      question: "When should I use my emergency fund?",
      answer:
        "Use it only for true emergencies like job loss, urgent medical bills, major car repairs, or essential home fixes—things that are necessary and unexpected.",
    },
    {
      question: "Should I build an emergency fund before paying off debt?",
      answer:
        "Most people start with a small starter emergency fund first, then focus on high-interest debt, and then continue building the full 3–6 month fund.",
    },
  ],

  "how-to-start-a-budget-in-10-minutes": [
    {
      question: "Can I really start a budget in just 10 minutes?",
      answer:
        "Yes. The 10-minute method focuses on grabbing your key numbers, choosing a simple budgeting style, and sorting your money into three basic buckets: needs, wants, and savings or debt payoff.",
    },
    {
      question: "What numbers do I need before I start a budget?",
      answer:
        "You only need a rough idea of your monthly take-home income, your essential bills like rent and utilities, and your flexible spending such as groceries, gas, and entertainment. An estimate based on last month’s bank activity is enough to begin.",
    },
    {
      question: "Which budgeting method is best for beginners?",
      answer:
        "Many beginners do well with the 50/30/20 rule because it’s simple to remember. You can also use a zero-based budget or a pay-yourself-first approach if you prefer more control over each dollar.",
    },
    {
      question: "What should I do if my needs are more than 50% of my income?",
      answer:
        "If your needs are high, look for one or two bills you can reduce, such as a cheaper phone plan, renegotiated insurance, or cutting back on certain utilities. Small changes can free up room for savings over time.",
    },
    {
      question: "How often should I review my 10-minute budget?",
      answer:
        "A quick 10-minute review once a month is usually enough. Use that time to update your numbers, see where you overspent, and adjust your plan for the next month.",
    },
    {
      question: "How can I make sure I stick to my budget?",
      answer:
        "Automate as much as possible. Set up automatic transfers to savings on payday, automatic bill payments for fixed expenses, and consider using cash or a debit card for wants so you stay more aware of your spending.",
    },
  ],

  "side-hustle-income-tips": [
    {
      question: "What side hustle is the easiest to start this week?",
      answer:
        "Rideshare and delivery driving are usually the fastest side hustles to start. Apps like Uber, Lyft, DoorDash, and Instacart let you begin earning within a few days, sometimes the same week.",
    },
    {
      question: "Do I need special skills to start a side hustle?",
      answer:
        "No. Many side hustles require zero specialized skills. Selling unused items, delivery driving, remote micro jobs, and basic freelancing tasks like editing or admin work are all beginner-friendly options.",
    },
    {
      question: "How much money can I realistically earn from side hustles?",
      answer:
        "Earnings vary by hustle. Driving can bring in $18–$32/hr, freelancing can range from $20–$75/hr, selling unused items often yields $100–$500 in a week, and digital products have long-term passive income potential.",
    },
    {
      question: "What is the best side hustle if I don’t have much time?",
      answer:
        "Short, flexible tasks like delivery driving, freelance micro-gigs, or selling items you already own work best for tight schedules. These require minimal setup and can be done in small bursts.",
    },
    {
      question: "Which side hustle has the lowest startup cost?",
      answer:
        "Selling items you already own has almost zero cost and can generate quick cash. Freelancing on platforms like Fiverr or Upwork also has no upfront cost aside from your time.",
    },
    {
      question: "How do I avoid burnout when starting a side hustle?",
      answer:
        "Start with just one hustle and keep it simple. Pick the least intimidating option, set realistic hours, and build consistency over intensity. Tracking progress with budgeting tools helps you stay motivated.",
    },
  ],

  "crush-credit-card-debt": [
    {
      question: "What’s the best way to pay off credit card debt?",
      answer:
        "Two common strategies are the debt snowball (smallest balance first) and the debt avalanche (highest interest rate first). The avalanche saves more on interest, while the snowball can feel more motivating.",
    },
    {
      question: "Should I close my credit cards after I pay them off?",
      answer:
        "Closing a card can sometimes lower your credit score by reducing your total available credit. Many people keep old cards open with a zero balance unless the annual fee isn’t worth it.",
    },
    {
      question: "Is a debt consolidation loan a good idea?",
      answer:
        "It can help if you qualify for a lower interest rate and you’re confident you won’t run balances back up on your credit cards. The key is to change spending habits along with restructuring the debt.",
    },
    {
      question: "How can I avoid getting back into credit card debt?",
      answer:
        "Build a simple budget, start an emergency fund, and track your spending regularly. Using a plan for big purchases and avoiding carrying balances month-to-month helps keep you out of the cycle.",
    },
  ],

  "salary-by-age": [
    {
      question: "What is the median salary for each age group in 2025?",
      answer:
        "In 2025, median U.S. salaries are approximately: $30,000 for ages 16–19, $36,000 for ages 20–24, $52,000 for ages 25–34, $62,000 for ages 35–44, $64,000 for ages 45–54, $62,000 for ages 55–64, and $46,000 for ages 65+. These numbers are based on national Bureau of Labor Statistics data.",
    },
    {
      question: "Does being below the median salary mean I'm behind?",
      answer:
        "Not necessarily. Salaries vary by industry, location, experience, and education. Being below the median can simply mean you're early in skill-building or working in a lower-paying field. Use the data as a benchmark, not a judgment.",
    },
    {
      question: "How do I know if I'm underpaid for my age?",
      answer:
        "You may be underpaid if you haven’t had a raise in 18–24 months, do more than your job description, train new employees, see higher-paying job postings for similar roles, or haven’t negotiated your salary in years.",
    },
    {
      question: "What’s the fastest way to increase my salary in 2025?",
      answer:
        "Changing jobs often leads to the biggest raises—10–20% jumps are common. You can also negotiate a raise using performance data, learn high-demand skills, or add a side hustle to boost income.",
    },
    {
      question: "What skills can help me earn more in 2025?",
      answer:
        "High-paying, high-demand skills include copywriting, project management, data analysis, UX/UI design, sales, and basic coding. Many of these can be learned in a few months.",
    },
    {
      question: "How can I negotiate a raise effectively?",
      answer:
        "Use a simple value-based script such as: 'I’ve taken on additional responsibilities including ____. Based on my performance and current market rates, I’d like to discuss an adjustment to my compensation.' Confidence and data are key.",
    },
    {
      question: "What tools can help me track my salary progress?",
      answer:
        "BuddyMoney tools like the Budget Tracker, Net Worth Tracker, Emergency Fund Calculator, and Debt Payoff Planner help you manage your income, track progress, and stay on top of long-term goals.",
    },
  ],

  "best-secured-credit-cards": [
    {
      question: "What is a secured credit card?",
      answer:
        "A secured credit card is a card that requires a refundable security deposit, which typically becomes your credit limit. It’s designed to help people build or rebuild credit.",
    },
    {
      question: "How much deposit do I need for a secured credit card?",
      answer:
        "Most secured cards require a deposit starting around $200–$300, but some allow higher deposits if you want a larger credit limit.",
    },
    {
      question: "Do secured credit cards really help build credit?",
      answer:
        "Yes—when used responsibly. Most secured cards report your payment history to the major credit bureaus. Paying on time and keeping your balance low can help improve your credit over time.",
    },
    {
      question: "When can I upgrade from a secured card to an unsecured card?",
      answer:
        "Many lenders review your account after several months of on-time payments. If your credit improves, you may be eligible to upgrade and get your security deposit back.",
    },
  ],

  "budget-traps-to-avoid": [
    {
      question: "What is the biggest budgeting trap people fall into?",
      answer:
        "One of the biggest traps is guessing your spending instead of tracking it. Without knowing where your money actually goes, it’s almost impossible to stay in control.",
    },
    {
      question: "How can I make my monthly budget more realistic?",
      answer:
        "Avoid overly strict budgets. Using a flexible 50/30/20 model helps you create a sustainable plan that fits your real-life spending patterns.",
    },
    {
      question: "How do I prepare for irregular expenses?",
      answer:
        "List your true expenses—car repairs, holidays, school fees—and set aside a small amount each month so these costs never catch you by surprise.",
    },
    {
      question: "Why shouldn’t I rely on credit cards for emergencies?",
      answer:
        "Using credit for emergencies can trap you in debt. Building a $500–$1,000 starter emergency fund helps you stay in control when unexpected costs come up.",
    },
    {
      question: "How can I stop wasting money on subscriptions?",
      answer:
        "Perform a monthly subscription audit. Review all active services and cancel those you no longer use or need—including duplicates.",
    },
    {
      question: "Why does budgeting feel restrictive sometimes?",
      answer:
        "Budgeting without goals feels like punishment. When you set clear goals—like paying off debt or saving for travel—your budget becomes a tool to help you move forward.",
    },
    {
      question: "How can I avoid late payments and budgeting mistakes?",
      answer:
        "Automate your minimum bill payments and savings transfers. Automation reduces errors, avoids late fees, and helps you stay consistent.",
    },
  ],

  // Posts without FAQs can be omitted or set to an empty array
  "side-hustle-ideas": []
};

// Merge JSON metadata with FAQs and add url field
export const posts = rawPosts.map((post) => ({
  ...post,
  faq: faqBySlug[post.slug] || [],
  url: `/blog/${post.slug}`,
}));

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug);
}

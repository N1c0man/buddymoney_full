// src/blog/postsIndex.js
import rawPosts from "./blogPosts.json";

// Keep ALL FAQs here, keyed by slug (unchanged)

const faqBySlug = {
    "side-hustle-ideas": [
    {
      question: "What is the easiest side hustle to start?",
      answer:
        "The easiest side hustles usually have low barriers to entry, such as rideshare driving, delivery apps, selling unused items, or basic online tasks. These can often be started within a day or two."
    },
    {
      question: "Do I need experience to start a side hustle?",
      answer:
        "No. Many side hustles require little to no experience. Skills can be learned as you go, especially with freelancing, reselling, or gig-based work."
    },
    {
      question: "How much money can I make from a side hustle?",
      answer:
        "Income varies widely based on the hustle, time invested, and demand. Some people earn a few hundred dollars per month, while others earn significantly more with consistent effort."
    },
    {
      question: "How quickly can I start earning?",
      answer:
        "Some side hustles, like delivery driving or selling items, can generate income within days. Others, such as digital products, take longer to build but offer long-term potential."
    },
    {
      question: "Is side hustle income taxable?",
      answer:
        "Yes. Side hustle income is generally taxable. You may need to pay self-employment taxes and should track income and expenses carefully."
    },
    {
      question: "How do I avoid burnout from side hustles?",
      answer:
        "Focus on one hustle at a time, set clear time limits, and choose something that fits your lifestyle. Consistency matters more than working nonstop."
    },
    {
      question: "Should I keep side hustle income separate from my main income?",
      answer:
        "Keeping side hustle income in a separate account can make budgeting, tracking progress, and tax preparation easier."
    },
    {
      question: "What should I do with side hustle income first?",
      answer:
        "Many people use side hustle income to build an emergency fund, pay down high-interest debt, or reach specific savings goals faster."
    }
  ],
    "budget-traps-to-avoid": [
    {
      question: "What are budget traps?",
      answer:
        "Budget traps are common habits or mistakes that quietly drain your money, such as overspending without tracking, forgetting irregular expenses, or relying on credit cards for emergencies."
    },
    {
      question: "Why do budgets fail so often?",
      answer:
        "Budgets usually fail because they’re too restrictive, unrealistic, or not connected to clear goals. A flexible budget is easier to maintain long-term."
    },
    {
      question: "How can I tell if I’m stuck in a budget trap?",
      answer:
        "Signs include living paycheck to paycheck, relying on credit cards, feeling stressed about money despite earning enough, or not knowing where your money goes each month."
    },
    {
      question: "What is the easiest budget trap to fix first?",
      answer:
        "Tracking spending is often the fastest fix. Once you see where your money is going, many leaks become obvious and easy to correct."
    },
    {
      question: "Do I need a complicated budget to avoid these traps?",
      answer:
        "No. Simple systems are often more effective. A basic budget with tracking, automation, and clear goals works better than a complex plan."
    },
    {
      question: "How do subscriptions affect my budget?",
      answer:
        "Subscriptions can silently drain your budget because small recurring charges add up over time. Reviewing them monthly helps free up money quickly."
    },
    {
      question: "Can automation really improve budgeting?",
      answer:
        "Yes. Automating bills and savings removes human error and willpower from the process, making it easier to stay consistent."
    },
    {
      question: "How long does it take to break bad budgeting habits?",
      answer:
        "Many people see improvement within one to two months of tracking spending and making small adjustments. Consistency matters more than speed."
    }
  ],
    "salary-by-age": [
    {
      question: "What is the average salary by age in the U.S.?",
      answer:
        "Average salaries vary by age, industry, and location. National median salary data provides a general benchmark, but individual earnings depend heavily on skills, experience, and cost of living."
    },
    {
      question: "Is it bad if I earn less than the average salary for my age?",
      answer:
        "No. Being below the average doesn’t mean you’re failing. Many people earn less early in their careers or work in lower-paying industries. What matters most is progress over time."
    },
    {
      question: "Why does salary increase with age?",
      answer:
        "Salary often increases with age because of experience, skill development, promotions, and job changes. Growth tends to slow later in careers as roles stabilize."
    },
    {
      question: "Does location affect how much I should earn?",
      answer:
        "Yes. Cost of living plays a major role. Salaries in large cities are often higher, while rural areas tend to pay less. Always compare income alongside living costs."
    },
    {
      question: "How often should I negotiate my salary?",
      answer:
        "Many people review their compensation every 12–24 months or after taking on new responsibilities. Negotiating regularly helps prevent long-term underpayment."
    },
    {
      question: "Is changing jobs the fastest way to increase salary?",
      answer:
        "For many people, yes. Job changes often lead to larger pay increases than staying at the same company for long periods."
    },
    {
      question: "Can side hustles really improve income long-term?",
      answer:
        "Yes. Side hustles can supplement income, reduce financial pressure, and sometimes grow into full-time opportunities or valuable skills."
    },
    {
      question: "Should I compare myself to others my age?",
      answer:
        "Comparison can be useful for awareness, but it shouldn’t define your self-worth. Focus on your own growth, goals, and financial direction."
    }
  ],
    "crush-credit-card-debt": [
    {
      question: "What is the fastest way to pay off credit card debt?",
      answer:
        "The fastest method for most people is the debt avalanche, which focuses on paying off the highest-interest card first. This minimizes interest and speeds up payoff overall."
    },
    {
      question: "Is the debt snowball or avalanche method better?",
      answer:
        "Both methods work. The avalanche saves more money on interest, while the snowball can feel more motivating by producing quicker wins. The best method is the one you can stick with consistently."
    },
    {
      question: "Should I pay more than the minimum payment?",
      answer:
        "Yes. Paying only the minimum keeps you in debt longer and increases interest costs. Even small extra payments can significantly reduce payoff time."
    },
    {
      question: "What if I can only afford a small extra payment?",
      answer:
        "That’s completely fine. Extra payments of $25 or even $10 still reduce principal and build momentum. Consistency matters more than the amount."
    },
    {
      question: "Should I stop saving while paying off credit card debt?",
      answer:
        "Most people benefit from keeping a small emergency fund while paying off debt. This helps prevent new debt when unexpected expenses arise."
    },
    {
      question: "Will paying off credit card debt improve my credit score?",
      answer:
        "Yes. Lower balances improve credit utilization, which is a major factor in your credit score. On-time payments also strengthen your payment history."
    },
    {
      question: "What should I do if an emergency interrupts my payoff plan?",
      answer:
        "Pause extra payments temporarily, continue making minimum payments, and resume your plan once the emergency passes. Progress doesn’t require perfection."
    },
    {
      question: "How long does it usually take to pay off credit card debt?",
      answer:
        "The timeline depends on balances, interest rates, and extra payments. With a clear plan and consistent effort, many people see meaningful progress within the first few months."
    }
  ],
    "side-hustle-income-tips": [
    {
      question: "What is a side hustle?",
      answer:
        "A side hustle is any way you earn extra income outside your main job. It can include freelance work, gig economy jobs, selling products online, or offering services in your spare time."
    },
    {
      question: "How much money can I realistically make from a side hustle?",
      answer:
        "Income varies widely depending on the hustle, time commitment, and demand. Some people earn a few hundred dollars per month, while others build side hustles that bring in thousands."
    },
    {
      question: "Do I need special skills to start a side hustle?",
      answer:
        "No. Many side hustles require little to no experience, such as delivery driving, pet sitting, reselling items, or basic online tasks. Skills can be developed over time."
    },
    {
      question: "How do I choose the right side hustle?",
      answer:
        "Choose a side hustle that fits your schedule, energy level, and financial goals. Starting with something low-pressure and flexible helps you stay consistent."
    },
    {
      question: "Is side hustle income taxable?",
      answer:
        "Yes. Side hustle income is generally taxable, even if it’s part-time. You may owe self-employment taxes and should track income and expenses carefully."
    },
    {
      question: "How do I avoid burnout from a side hustle?",
      answer:
        "Set clear time limits, automate repetitive tasks, and regularly reassess whether the hustle still aligns with your goals. Extra income should improve your life, not overwhelm it."
    },
    {
      question: "Should I keep side hustle money separate?",
      answer:
        "Keeping side hustle income in a separate account can make tracking easier and help you stay organized for taxes and goal planning."
    },
    {
      question: "What should I do with my side hustle income first?",
      answer:
        "Many people use side hustle income to build an emergency fund, pay down high-interest debt, or reach specific savings goals faster."
    }
  ],
    "how-to-start-a-budget-in-10-minutes": [
    {
      question: "Can I really start a budget in just 10 minutes?",
      answer:
        "Yes. A 10-minute budget focuses on awareness and structure, not perfection. The goal is to get a clear snapshot of your income and expenses so you can start making better decisions immediately."
    },
    {
      question: "What budgeting method is best for beginners?",
      answer:
        "There’s no single best method, but beginners often succeed with the 50/30/20 rule, a simple zero-based budget, or a pay-yourself-first approach. The best method is the one you can stick with consistently."
    },
    {
      question: "Do I need a budgeting app to get started?",
      answer:
        "No. You can start with a notebook, spreadsheet, or notes app. Budgeting apps can help automate tracking later, but they’re not required to begin."
    },
    {
      question: "What if my numbers aren’t accurate at first?",
      answer:
        "That’s normal. Your first budget is an estimate, not a final version. Accuracy improves after one or two months of tracking and adjusting."
    },
    {
      question: "How often should I review my budget?",
      answer:
        "A quick review once per month is enough for most people. This helps you adjust for changes without feeling overwhelmed by constant tracking."
    },
    {
      question: "Should I budget weekly or monthly?",
      answer:
        "Most people find monthly budgeting easier because bills and income are usually monthly. Weekly check-ins can help if your income or expenses fluctuate."
    },
    {
      question: "What if I go over budget?",
      answer:
        "Going over budget doesn’t mean you failed. It’s a signal to adjust categories or expectations. Budgeting is a learning process, not a test you pass or fail."
    },
    {
      question: "Is budgeting only for people with financial problems?",
      answer:
        "No. Budgeting is for anyone who wants clarity and control over their money. It helps people at all income levels plan, save, and reduce stress."
    }
  ],
    "emergency-fund-basics": [
    {
      question: "What is an emergency fund?",
      answer:
        "An emergency fund is money set aside specifically for unexpected expenses like medical bills, car repairs, or job loss. It acts as a financial safety net so you don’t have to rely on credit cards or loans."
    },
    {
      question: "Why is an emergency fund so important?",
      answer:
        "An emergency fund helps prevent debt, reduces financial stress, and gives you flexibility when life throws surprises your way. It allows you to handle emergencies calmly instead of reacting under pressure."
    },
    {
      question: "How much should I save in an emergency fund?",
      answer:
        "Most experts recommend saving three to six months of essential expenses. Many people start with a smaller goal, like $1,000, and then build toward the full amount over time."
    },
    {
      question: "Should I save for emergencies or pay off debt first?",
      answer:
        "A common approach is to save a small starter emergency fund (around $1,000) while making minimum debt payments. After that, you can focus on paying down high-interest debt while continuing to grow your emergency savings."
    },
    {
      question: "Where should I keep my emergency fund?",
      answer:
        "Emergency funds are best kept in a high-yield savings account or money market account. These options keep your money safe, accessible, and earning some interest without risking losses."
    },
    {
      question: "What counts as a true emergency?",
      answer:
        "True emergencies include medical expenses, essential car or home repairs, unexpected job loss, or urgent travel for family reasons. Planned expenses or non-essentials should not come from your emergency fund."
    },
    {
      question: "What if I have irregular or freelance income?",
      answer:
        "If your income varies, base your emergency fund on average monthly essential expenses and consider aiming closer to six months of savings for added stability."
    },
    {
      question: "How fast should I build my emergency fund?",
      answer:
        "There’s no perfect speed. Consistency matters more than pace. Even saving $25–$50 per week adds up over time and builds strong financial habits."
    },
    {
      question: "What should I do after I use my emergency fund?",
      answer:
        "After using your emergency fund, focus on replenishing it as soon as possible. Restart automatic transfers and adjust your budget until the fund is back to its target level."
    }
  ],
    "best-secured-credit-cards": [
    {
      question: "What is a secured credit card?",
      answer:
        "A secured credit card is a credit card that requires a refundable security deposit, which usually becomes your credit limit. It works like a normal card and can help you build or rebuild credit when used responsibly."
    },
    {
      question: "Are secured credit cards good for bad or no credit?",
      answer:
        "Yes. Secured credit cards are one of the best options for people with bad credit or no credit because approval is easier and they help establish positive payment history."
    },
    {
      question: "Do secured credit cards build credit the same way as regular cards?",
      answer:
        "Yes. As long as the card reports to all three credit bureaus and you make on-time payments, secured cards build credit just like unsecured cards."
    },
    {
      question: "How much should I put down for a secured credit card?",
      answer:
        "Most secured cards require a deposit between $200 and $500. Choose an amount you can comfortably afford while keeping your balance low to maintain healthy credit utilization."
    },
    {
      question: "How long does it take to build credit with a secured card?",
      answer:
        "Many people see small improvements within 30–60 days, with more noticeable progress after 3–6 months of consistent, on-time payments."
    },
    {
      question: "Will I get my security deposit back?",
      answer:
        "In most cases, yes. Your deposit is usually returned when you upgrade to an unsecured card or close the account in good standing."
    },
    {
      question: "Can secured credit cards have fees?",
      answer:
        "Some secured cards charge annual or maintenance fees, but many reputable options have no annual fee. Always check the fee structure before applying."
    },
    {
      question: "What’s the biggest mistake people make with secured credit cards?",
      answer:
        "The biggest mistakes are missing payments, maxing out the card, and closing the account too early. Consistency and low balances matter more than speed."
    }
  ],
    "secured-vs-unsecured-credit-cards": [
    {
      question: "Is a secured credit card better than an unsecured card for rebuilding credit?",
      answer:
        "For most people rebuilding credit, yes. Secured credit cards are easier to qualify for and carry less risk. When used responsibly, they build credit just as effectively as unsecured cards."
    },
    {
      question: "Do secured credit cards actually improve your credit score?",
      answer:
        "Yes. Secured credit cards can improve your credit score as long as they report to all three credit bureaus and you make on-time payments while keeping balances low."
    },
    {
      question: "Can an unsecured credit card hurt my credit if I’m rebuilding?",
      answer:
        "It can. Unsecured cards approved for bad or fair credit often come with higher interest rates, fees, and low limits. Missing payments or maxing out the card can hurt your score quickly."
    },
    {
      question: "How long should I keep a secured credit card before upgrading?",
      answer:
        "Most people keep a secured card for 6–12 months. Upgrading too early can slow progress, while keeping the account open longer can help with credit age and stability."
    },
    {
      question: "Will I get my security deposit back?",
      answer:
        "Yes. With most secured credit cards, your deposit is refundable when you upgrade to an unsecured card or close the account in good standing."
    },
    {
      question: "Can I start with a secured card and switch to unsecured later?",
      answer:
        "Absolutely. Many people start with a secured card, build positive payment history, and then qualify for unsecured cards once their credit improves."
    },
    {
      question: "What’s the biggest mistake people make when rebuilding credit?",
      answer:
        "The most common mistakes are missing payments, maxing out credit limits, closing accounts too early, and applying for too many cards at once."
    }
  ],
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

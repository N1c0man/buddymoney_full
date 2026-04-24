import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import BudgetTracker from "../tools/BudgetTracker";
import SavingsGoal from "../tools/SavingsGoal";
import DebtPayoff from "../tools/DebtPayoff";
import BillSplitter from "../tools/BillSplitter";
import EmergencyFund from "../tools/EmergencyFund";
import NetWorth from "../tools/NetWorth";
import ShareBar from "../components/ShareBar";
import WelcomeBackBanner from "../components/WelcomeBackBanner";
import { setCanonical } from "../utils/seo";

const TOOL_CARDS = [
  {
    id: "tip-calculator",
    name: "Tip Calculator",
    tagline: "Quickly calculate tips, totals, and per-person costs.",
    badge: "Everyday",
    icon: "💸",
  },
  {
    id: "bill-splitter",
    name: "Bill Splitter",
    tagline: "Split shared expenses with roommates, friends, or partners.",
    badge: "Everyday",
    icon: "🍕",
  },
  {
    id: "credit-cards",
    name: "Credit Card Finder (Beta)",
    tagline:
      "Preview a smarter way to compare credit cards by score, rewards, and fees.",
    badge: "New",
    icon: "💳",
  },
  {
    id: "budget-tracker",
    name: "Budget Tracker",
    tagline: "Give every dollar a job and see where your money really goes.",
    badge: "Most popular",
    icon: "💰",
  },
  {
    id: "savings-goal",
    name: "Savings Goal Planner",
    tagline: "Turn big goals into small, automatic monthly targets.",
    badge: "Goals",
    icon: "🎯",
  },
  {
    id: "debt-payoff",
    name: "Debt Payoff Planner",
    tagline: "Compare avalanche vs. snowball and pick the fastest route out.",
    badge: "Debt",
    icon: "📉",
  },
  {
    id: "emergency-fund",
    name: "Emergency Fund Estimator",
    tagline: "Know exactly how much you should have set aside for surprises.",
    badge: "Safety",
    icon: "🛟",
  },
  {
    id: "net-worth",
    name: "Net Worth Tracker",
    tagline: "Watch your overall financial picture improve over time.",
    badge: "Big picture",
    icon: "📊",
  },
];

const STANDALONE_TOOL_ROUTES = {
  "tip-calculator": "/tools/tip-calculator",
  "bill-splitter": "/tools/bill-splitter",
  "credit-cards": "/tools/credit-cards",
  "budget-tracker": "/tools/budget-tracker",
  "debt-payoff": "/tools/debt-payoff",
  "emergency-fund": "/tools/emergency-fund",
};

function ToolSection({ id, title, description, route, children }) {
  return (
    <section id={id} className="scroll-mt-28 space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          <p className="text-sm text-slate-600 max-w-2xl">{description}</p>
        </div>

        {route && (
          <Link
            to={route}
            className="text-sm font-semibold text-emerald-700 hover:text-emerald-800"
          >
            Open full tool →
          </Link>
        )}
      </div>

      {children}
    </section>
  );
}

export default function Tools() {
  useEffect(() => {
    setCanonical("/tools");
  }, []);

  const [lastTool, setLastTool] = React.useState(() => {
    return localStorage.getItem("lastTool");
  });

  const handleToolClick = (toolId) => {
    localStorage.setItem("lastTool", toolId);
    setLastTool(toolId);
  };

  const title =
    "Free Financial Tools & Calculators | Budget, Debt, Emergency Fund & More | BuddyMoney";
  const description =
    "Use BuddyMoney’s free financial tools and calculators to plan your budget, emergency fund, debt payoff, savings goals, tips, bill splitting, and net worth. Simple, free, and built for real life.";
  const pageUrl = "https://buddymoney.com/tools";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "BuddyMoney Tools",
    url: "https://buddymoney.com/tools",
    description,
    isAccessibleForFree: true,
    about: [
      "tip calculator",
      "bill splitter",
      "budget calculator",
      "savings goal calculator",
      "debt payoff calculator",
      "emergency fund calculator",
      "net worth tracker",
      "bill splitting tool",
    ],
    mainEntity: TOOL_CARDS.map((tool) => ({
      "@type": "SoftwareApplication",
      applicationCategory: "FinanceApplication",
      name: tool.name,
      operatingSystem: "Web",
      url: STANDALONE_TOOL_ROUTES[tool.id]
        ? `https://buddymoney.com${STANDALONE_TOOL_ROUTES[tool.id]}`
        : `https://buddymoney.com/tools#${tool.id}`,
      description: tool.tagline,
      image: "https://buddymoney.com/images/icon-placeholder.png",
      isAccessibleForFree: true,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      publisher: {
        "@type": "Organization",
        name: "BuddyMoney",
        url: "https://buddymoney.com",
      },
    })),
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index,follow" />
        <meta
          name="keywords"
          content="financial tools, money tools, tip calculator, bill splitter, budget calculator, emergency fund calculator, debt payoff calculator, savings goal calculator, net worth tracker, free budgeting tools, BuddyMoney"
        />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta
          property="og:image"
          content="https://buddymoney.com/images/icon-placeholder.png"
        />
        <meta property="og:site_name" content="BuddyMoney" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta
          name="twitter:image"
          content="https://buddymoney.com/images/icon-placeholder.png"
        />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <main className="min-h-screen pt-2 lg:pt-4 pb-16 bg-gradient-to-b from-green-50 via-white to-emerald-50/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <motion.section
            className="relative rounded-3xl border border-emerald-100 bg-gradient-to-br from-brand-50 via-emerald-50 to-accent-100/70 shadow-soft"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              <img
                src="/icons/hero-tools.png"
                alt="BuddyMoney tools hero image"
                className="absolute inset-0 h-full w-full object-cover object-right"
                loading="eager"
              />
              <div className="absolute inset-0 bg-white/35 md:bg-white/20" />
              <motion.div
                className="pointer-events-none absolute -top-24 -right-10 h-64 w-64 rounded-full bg-emerald-200/50 blur-3xl"
                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
              <motion.div
                className="pointer-events-none absolute -bottom-24 -left-8 h-64 w-64 rounded-full bg-sky-200/50 blur-3xl"
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 1.1,
                  ease: "easeOut",
                  delay: 0.15,
                }}
              />
            </div>

            <div className="relative px-5 py-7 md:px-8 md:py-8">
              <div className="grid gap-6 md:grid-cols-[minmax(0,1.8fr)_minmax(0,1.2fr)] items-start md:items-center">
                <div className="space-y-4">
                  <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-emerald-600">
                    BuddyMoney Tools
                  </p>
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-brand-900 leading-[1.1] pt-1 pb-1">
                    Your free toolbox for calmer money decisions.
                  </h1>
                  <p className="text-sm md:text-base text-brand-900/90 max-w-xl backdrop-blur-[1px]">
                    Plan your budget, goals, debt payoff, bill splitting, tips,
                    and safety net with simple calculators. No logins, no fees —
                    just tools to help you and your buddies stay on the same
                    money page.
                  </p>
                  <div className="flex flex-wrap gap-3 text-xs">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-emerald-700 border border-emerald-100 shadow-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Free • No account needed
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-emerald-700 border border-emerald-100 shadow-sm">
                      🛠️ New tools added over time
                    </span>
                  </div>
                </div>

                <motion.div
                  className="relative flex justify-center"
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                    delay: 0.1,
                  }}
                >
                  <motion.div
                    className="rounded-2xl bg-white/90 backdrop-blur-sm border border-emerald-100 shadow-soft px-5 py-4 w-full max-w-xs"
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                      delay: 1.2,
                    }}
                  >
                    <p className="text-xs font-semibold text-slate-800 mb-3">
                      Popular tools at a glance
                    </p>
                    <div className="grid grid-cols-2 gap-3 text-[11px] text-slate-700">
                      <div className="flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-50 text-lg">
                          💸
                        </span>
                        <span>Tip Calculator</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-50 text-lg">
                          🍕
                        </span>
                        <span>Bill Splitter</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-50 text-lg">
                          💰
                        </span>
                        <span>Budget Tracker</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-50 text-lg">
                          📉
                        </span>
                        <span>Debt Payoff</span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.section>

          <ShareBar
            variant="top"
            label="Share BuddyMoney's simple money tools with a friend"
            title="I’m using BuddyMoney’s free money tools to plan my next money moves."
          />

          <WelcomeBackBanner lastTool={lastTool} />

          <motion.div
            className="space-y-14 px-4 py-6 md:px-6 md:py-8 lg:px-8"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.5 }}
          >
            <section aria-label="Tool navigation" className="space-y-4">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Jump straight to a tool
                  </h2>
                  <p className="text-sm text-slate-600">
                    Pick the money question you want to answer first.
                  </p>
                </div>
                <p className="text-xs text-slate-500">
                  Some tools also have full standalone pages.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {TOOL_CARDS.map((tool) => {
                  const standaloneRoute = STANDALONE_TOOL_ROUTES[tool.id];

                  const cardContent = (
                    <>
                      <div className="mb-3 flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-lg transition-transform group-hover:scale-110">
                            {tool.icon}
                          </span>
                          <div>
                            <h3 className="text-sm font-semibold text-slate-900 group-hover:text-emerald-700">
                              {tool.name}
                            </h3>
                          </div>
                        </div>
                      </div>

                      <p className="mb-4 text-xs text-slate-600 leading-relaxed">
                        {tool.tagline}
                      </p>

                      <div className="mt-auto flex items-center justify-between gap-3">
                        <span className="rounded-full bg-slate-900 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                          {tool.badge}
                        </span>
                        <span className="text-[11px] font-semibold text-emerald-600">
                          Open →
                        </span>
                      </div>
                    </>
                  );

                  if (standaloneRoute) {
                    return (
                      <motion.div
                        key={tool.id}
                        whileHover={{ y: -4, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 18,
                        }}
                      >
                        <Link
                          to={standaloneRoute}
                          onClick={() => handleToolClick(tool.id)}
                          className="group flex h-full min-h-[170px] flex-col rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-emerald-200 hover:shadow-md"
                        >
                          {cardContent}
                        </Link>
                      </motion.div>
                    );
                  }

                  return (
                    <motion.a
                      key={tool.id}
                      href={`#${tool.id}`}
                      onClick={() => handleToolClick(tool.id)}
                      whileHover={{ y: -4, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 18,
                      }}
                      className="group flex h-full min-h-[170px] flex-col rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-emerald-200 hover:shadow-md"
                    >
                      {cardContent}
                    </motion.a>
                  );
                })}
              </div>
            </section>

            <section className="text-center max-w-2xl mx-auto">
              <h2 className="text-xl font-bold text-slate-900">
                Start with one tool. Build momentum from there.
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                You don’t need to fix everything at once. Pick a starting point
                below and take one practical step forward.
              </p>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900 mb-2">
                Free financial calculators for budgeting, saving, and debt
                planning
              </h2>
              <p className="text-sm text-slate-600 max-w-3xl">
                BuddyMoney’s tools are designed to help you make practical money
                decisions. You can calculate tips, split bills, estimate your
                emergency fund, build a budget, compare debt payoff strategies,
                and set savings targets without creating an account.
              </p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                <Link
                  to="/tools/tip-calculator"
                  className="text-emerald-700 font-medium hover:text-emerald-800"
                >
                  Open Tip Calculator →
                </Link>
                <Link
                  to="/tools/bill-splitter"
                  className="text-emerald-700 font-medium hover:text-emerald-800"
                >
                  Open Bill Splitter →
                </Link>
                <Link
                  to="/coach"
                  className="text-emerald-700 font-medium hover:text-emerald-800"
                >
                  Start with Budget Coach →
                </Link>
              </div>
            </section>

            <section className="space-y-14">
              <ToolSection
                id="tip-calculator"
                title="Tip Calculator"
                description="Quickly calculate a tip, total bill, and per-person cost before you pay."
                route="/tools/tip-calculator"
              >
                <div className="rounded-3xl border border-sky-100 bg-sky-50/80 p-5 sm:p-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between shadow-sm">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-700 mb-1">
                      Everyday Tool
                    </p>
                    <p className="text-sm text-slate-700 max-w-2xl">
                      Open the full calculator page for the polished app-style
                      tip calculator.
                    </p>
                  </div>
                  <Link
                    to="/tools/tip-calculator"
                    className="inline-flex items-center justify-center rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-700"
                    onClick={() => handleToolClick("tip-calculator")}
                  >
                    Open Tip Calculator →
                  </Link>
                </div>
              </ToolSection>

              <ToolSection
                id="bill-splitter"
                title="Bill Splitter"
                description="Split a bill with friends, family, or coworkers and include the tip in the final total."
                route="/tools/bill-splitter"
              >
                <BillSplitter />
              </ToolSection>

              <ToolSection
                id="credit-cards"
                title="Credit Card Finder"
                description="Preview a smarter way to browse credit cards by credit score, rewards type, and annual fee."
                route="/tools/credit-cards"
              >
                <div className="rounded-3xl border border-emerald-100 bg-emerald-50/80 p-5 sm:p-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between shadow-sm">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700 mb-1">
                      New • Beta
                    </p>
                    <p className="text-sm text-slate-700 max-w-2xl">
                      We&apos;re building a smarter way to browse credit cards.
                      Right now it&apos;s in preview mode with sample data.
                    </p>
                  </div>
                  <Link
                    to="/tools/credit-cards"
                    className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
                    onClick={() => handleToolClick("credit-cards")}
                  >
                    Open Credit Card Finder →
                  </Link>
                </div>
              </ToolSection>

              <ToolSection
                id="budget-tracker"
                title="Budget Tracker"
                description="Organize your income and expenses to understand exactly where your money is going."
                route="/tools/budget-tracker"
              >
                <BudgetTracker />
              </ToolSection>

              <ToolSection
                id="savings-goal"
                title="Savings Goal Planner"
                description="Turn a big savings goal into a simple monthly target."
              >
                <SavingsGoal />
              </ToolSection>

              <ToolSection
                id="debt-payoff"
                title="Debt Payoff Planner"
                description="Estimate your payoff timeline and see how much your debt may cost over time."
                route="/tools/debt-payoff"
              >
                <DebtPayoff />
              </ToolSection>

              <ToolSection
                id="emergency-fund"
                title="Emergency Fund Calculator"
                description="Estimate how much to save for unexpected expenses based on your essential monthly costs."
                route="/tools/emergency-fund"
              >
                <EmergencyFund />
              </ToolSection>

              <ToolSection
                id="net-worth"
                title="Net Worth Tracker"
                description="Track what you own, what you owe, and your overall financial picture."
              >
                <NetWorth />
              </ToolSection>
            </section>

            <ShareBar
              variant="bottom"
              label="Share BuddyMoney's simple money tools with a friend"
              title="I’m using BuddyMoney’s free money tools to plan my next money moves."
            />

            <section>
              <div className="rounded-3xl bg-emerald-600 text-white px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
                <div>
                  <h2 className="text-lg font-semibold">
                    Want help deciding what to do first?
                  </h2>
                  <p className="text-sm text-emerald-50">
                    Try Budget Coach — a guided experience that helps you choose
                    your next best money move.
                  </p>
                </div>
                <Link
                  to="/coach"
                  className="inline-flex items-center justify-center rounded-full bg-white text-emerald-700 font-semibold text-sm px-5 py-2 shadow hover:bg-emerald-50 transition"
                >
                  Start Budget Coach →
                </Link>
              </div>
            </section>

            <footer className="border-t border-slate-200 pt-4 text-xs text-slate-500">
              <p>
                More tools are on the way. Have an idea? We&apos;re building
                this toolbox with you.
              </p>
              <p className="mt-1 text-[10px] text-slate-400">
                Updated November 2025
              </p>
            </footer>
          </motion.div>
        </div>
      </main>
    </>
  );
}
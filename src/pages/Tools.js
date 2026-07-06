import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import NewsletterSignup from "../components/NewsletterSignup";
import ShareBar from "../components/ShareBar";
import WelcomeBackBanner from "../components/WelcomeBackBanner";
import { setCanonical } from "../utils/seo";

const TOOL_CARDS = [
  {
    id: "monthly-payment-calculator",
    name: "Monthly Payment Calculator",
    tagline: "Estimate monthly loan payments, interest, and total cost.",
    badge: "New",
    icon: "🧮",
    route: "/tools/monthly-payment-calculator",
    category: "Loans",
  },
  {
    id: "bill-splitter",
    name: "Bill Splitter & Tip Calculator",
    tagline: "Split shared bills, add a tip, and see each person’s share.",
    badge: "Everyday",
    icon: "🍕",
    route: "/tools/bill-splitter",
    category: "Everyday",
  },
  {
    id: "credit-cards",
    name: "Credit Card Finder (Beta)",
    tagline:
      "Preview a smarter way to compare credit cards by score, rewards, and fees.",
    badge: "Beta",
    icon: "💳",
    route: "/tools/credit-cards",
    category: "Credit",
  },
  {
    id: "budget-tracker",
    name: "Budget Tracker",
    tagline: "Give every dollar a job and see where your money really goes.",
    badge: "Popular",
    icon: "💰",
    route: "/tools/budget-tracker",
    category: "Budgeting",
  },
  {
    id: "savings-goal",
    name: "Savings Goal Planner",
    tagline: "Turn big goals into small, automatic monthly targets.",
    badge: "Goals",
    icon: "🎯",
    route: "/tools#savings-goal",
    category: "Saving",
  },
  {
    id: "debt-payoff",
    name: "Debt Payoff Planner",
    tagline: "Estimate your payoff timeline and plan your way out of debt.",
    badge: "Debt",
    icon: "📉",
    route: "/tools/debt-payoff",
    category: "Debt",
  },
  {
    id: "emergency-fund",
    name: "Emergency Fund Estimator",
    tagline: "Know how much to set aside for surprise expenses.",
    badge: "Safety",
    icon: "🛟",
    route: "/tools/emergency-fund",
    category: "Saving",
  },
  {
    id: "net-worth",
    name: "Net Worth Tracker",
    tagline: "Track what you own, what you owe, and your big-picture progress.",
    badge: "Big picture",
    icon: "📊",
    route: "/tools#net-worth",
    category: "Planning",
  },
];

const FEATURED_TOOLS = TOOL_CARDS.slice(0, 4);

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
    "Free Financial Tools & Calculators | Budget, Debt, Monthly Payments & More | BuddyMoney";
  const description =
    "Use BuddyMoney’s free financial tools and calculators to plan your budget, emergency fund, debt payoff, savings goals, monthly payments, bill splitting, tips, and net worth. Simple, free, and built for real life.";
  const pageUrl = "https://buddymoney.com/tools";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "BuddyMoney Tools",
    url: pageUrl,
    description,
    isAccessibleForFree: true,
    about: [
      "monthly payment calculator",
      "loan payment calculator",
      "bill splitter",
      "tip calculator",
      "budget calculator",
      "savings goal calculator",
      "debt payoff calculator",
      "emergency fund calculator",
      "net worth tracker",
      "free financial tools",
    ],
    mainEntity: TOOL_CARDS.map((tool) => ({
      "@type": "SoftwareApplication",
      applicationCategory: "FinanceApplication",
      name: tool.name,
      operatingSystem: "Web",
      url: `https://buddymoney.com${tool.route}`,
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
          content="financial tools, money tools, monthly payment calculator, loan payment calculator, tip calculator, bill splitter, budget calculator, emergency fund calculator, debt payoff calculator, savings goal calculator, net worth tracker, free budgeting tools, BuddyMoney"
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

      <main className="min-h-screen bg-gradient-to-b from-green-50 via-white to-emerald-50/40 pb-16 pt-2 lg:pt-4">
        <div className="mx-auto max-w-6xl space-y-6 px-4 sm:px-6 lg:px-8">
          <motion.section
            className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-br from-brand-50 via-emerald-50 to-accent-100/70 shadow-soft"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="absolute inset-0">
              <img
                src="/icons/hero-tools.png"
                alt="BuddyMoney tools hero image"
                className="h-full w-full object-cover object-right"
                loading="eager"
              />
              <div className="absolute inset-0 bg-white/40 md:bg-white/25" />
            </div>

            <div className="relative grid gap-6 px-5 py-7 md:grid-cols-[1.7fr_1fr] md:px-8 md:py-9">
              <div className="space-y-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-600">
                  BuddyMoney Tools
                </p>

                <h1 className="max-w-2xl text-2xl font-extrabold leading-tight text-brand-900 md:text-4xl">
                  Free money tools for everyday decisions.
                </h1>

                <p className="max-w-xl text-sm text-brand-900/90 md:text-base">
                  Estimate payments, split bills, build a budget, plan debt
                  payoff, and stay organized with simple beginner-friendly
                  calculators.
                </p>

                <div className="flex flex-wrap gap-3 text-xs">
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white/85 px-3 py-1 font-medium text-emerald-700 shadow-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Free • No account needed
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white/85 px-3 py-1 font-medium text-emerald-700 shadow-sm">
                    🦉 Beginner-friendly
                  </span>
                </div>
              </div>

              <motion.div
                className="rounded-2xl border border-emerald-100 bg-white/90 p-4 shadow-soft backdrop-blur-sm"
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              >
                <p className="mb-3 text-xs font-semibold text-slate-800">
                  Start here
                </p>
                <div className="space-y-2">
                  {FEATURED_TOOLS.map((tool) => (
                    <Link
                      key={tool.id}
                      to={tool.route}
                      onClick={() => handleToolClick(tool.id)}
                      className="flex items-center justify-between rounded-2xl bg-emerald-50/80 px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-emerald-100"
                    >
                      <span className="flex items-center gap-2">
                        <span>{tool.icon}</span>
                        {tool.name}
                      </span>
                      <span className="text-emerald-700">→</span>
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.section>

          <ShareBar
            variant="top"
            label="Share BuddyMoney's simple money tools with a friend"
            title="I’m using BuddyMoney’s free money tools to plan my next money moves."
          />

          <WelcomeBackBanner lastTool={lastTool} />

          <motion.section
            className="space-y-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.15 }}
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Choose a tool
                </h2>
                <p className="text-sm text-slate-600">
                  Pick the money question you want to answer first.
                </p>
              </div>
              <p className="text-xs text-slate-500">
                Clean, fast, mobile-friendly calculators.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {TOOL_CARDS.map((tool) => (
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
                    to={tool.route}
                    onClick={() => handleToolClick(tool.id)}
                    className="group flex h-full min-h-[190px] flex-col rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-emerald-200 hover:shadow-md"
                  >
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-xl transition-transform group-hover:scale-110">
                        {tool.icon}
                      </span>

                      <span className="rounded-full bg-slate-900 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                        {tool.badge}
                      </span>
                    </div>

                    <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-700">
                      {tool.category}
                    </p>

                    <h3 className="text-sm font-semibold text-slate-900 group-hover:text-emerald-700">
                      {tool.name}
                    </h3>

                    <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-600">
                      {tool.tagline}
                    </p>

                    <div className="mt-5 inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition group-hover:bg-emerald-700">
                      Open tool →
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <section className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-emerald-100 bg-emerald-50/80 p-5 shadow-sm">
              <p className="text-sm font-bold text-slate-900">
                Quick everyday math
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Split bills, calculate tips, and estimate monthly payments
                before you commit.
              </p>
            </div>

            <div className="rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm">
              <p className="text-sm font-bold text-slate-900">
                Budget and debt planning
              </p>
              <p className="mt-2 text-sm text-slate-600">
                See where your money goes and choose a realistic payoff path.
              </p>
            </div>

            <div className="rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm">
              <p className="text-sm font-bold text-slate-900">
                Beginner-friendly by design
              </p>
              <p className="mt-2 text-sm text-slate-600">
                No confusing dashboards. Just practical tools with clear next
                steps.
              </p>
            </div>
          </section>

          <section className="rounded-3xl bg-emerald-600 px-6 py-5 text-white shadow-sm">
            <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
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
                className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-emerald-700 shadow transition hover:bg-emerald-50"
              >
                Start Budget Coach →
              </Link>
            </div>
          </section>

          <ShareBar
            variant="bottom"
            label="Share BuddyMoney's simple money tools with a friend"
            title="I’m using BuddyMoney’s free money tools to plan my next money moves."
          />

          <motion.section
            id="newsletter"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="mx-auto max-w-3xl px-4">
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/80 p-6 shadow-sm sm:p-8">
                <NewsletterSignup />
              </div>
            </div>
          </motion.section>

          <footer className="border-t border-slate-200 pt-4 text-xs text-slate-500">
            <p>
              More tools are on the way. Have an idea? We&apos;re building this
              toolbox with you.
            </p>
            <p className="mt-1 text-[10px] text-slate-400">
              Updated July 2026
            </p>
          </footer>
        </div>
      </main>
    </>
  );
}
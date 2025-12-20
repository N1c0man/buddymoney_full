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
import { setCanonical } from "../utils/seo";

const TOOL_CARDS = [
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
    id: "bill-splitter",
    name: "Bill Splitter",
    tagline: "Split shared expenses with roommates, friends, or partners.",
    badge: "Everyday",
    icon: "🍕",
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

export default function Tools() {
  // ✅ Canonical for /tools
  useEffect(() => {
    setCanonical("/tools");
  }, []);

  // Basic SEO data
  const title =
    "Free Money Tools & Calculators | Budget, Savings, Debt & More | BuddyMoney";

  const description =
    "Use BuddyMoney’s free money tools and calculators to plan your budget, savings goals, debt payoff, emergency fund, and net worth. No logins, no fees—just simple tools to support calmer money decisions.";

  const pageUrl = "https://buddymoney.com/tools";

  // JSON-LD structured data for the tools collection
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "BuddyMoney Tools",
    url: "https://buddymoney.com/tools",
    description,
    isAccessibleForFree: true,
    about: [
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
      url: `https://buddymoney.com/tools#${tool.id}`,
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
          content="money tools, budget calculator, savings goal calculator, debt payoff calculator, emergency fund calculator, net worth tracker, bill splitter, BuddyMoney"
        />

        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta
          property="og:image"
          content="https://buddymoney.com/images/icon-placeholder.png"
        />
        <meta property="og:site_name" content="BuddyMoney" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta
          name="twitter:image"
          content="https://buddymoney.com/images/icon-placeholder.png"
        />

        {/* JSON-LD */}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <main className="min-h-screen pt-2 lg:pt-4 pb-16 bg-gradient-to-b from-green-50 via-white to-emerald-50/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* TOOLS HERO — Mortgage-style image hero with overlay text */}
          <motion.section
            className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-br from-brand-50 via-emerald-50 to-accent-100/70 shadow-soft h-[220px] md:h-[260px] lg:h-[300px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Background hero image */}
            <img
              src="/icons/hero-tools.png"
              alt="BuddyMoney tools hero image"
              className="absolute inset-0 h-full w-full object-cover object right"
              loading="eager"
            />

            {/* Soft overlay so text stays readable */}
            <div className="absolute inset-0 bg-white/50 md:bg-white/35" />

            {/* background blobs (kept EXACTLY from your original hero) */}
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
              transition={{ duration: 1.1, ease: "easeOut", delay: 0.15 }}
            />

            {/* Content (same as your original, only wrapped to fill height like Mortgage) */}
            <div className="relative px-5 py-6 md:px-8 md:py-7 h-full flex items-center">
              <div className="relative grid gap-6 md:grid-cols-[minmax(0,1.8fr)_minmax(0,1.2fr)] items-center w-full">
                <div className="space-y-4">
                  <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-emerald-600">
                    BuddyMoney Tools
                  </p>
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-brand-900 leading-tight">
                    Your free toolbox for calmer money decisions.
                  </h1>
                  <p className="text-sm md:text-base text-brand-800/80 max-w-xl">
                    Plan your budget, goals, debt payoff, and safety net with simple
                    calculators. No logins, no fees—just tools to help you and your
                    buddies stay on the same money page.
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

                {/* mini “tool icons” cluster (kept EXACTLY from your original hero) */}
                <motion.div
                  className="relative flex justify-center"
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
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
                          💰
                        </span>
                        <span>Budget Tracker</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-50 text-lg">
                          🛟
                        </span>
                        <span>Emergency Fund</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-50 text-lg">
                          📉
                        </span>
                        <span>Debt Payoff</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-50 text-lg">
                          📊
                        </span>
                        <span>Net Worth</span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* 🔼 TOP SHARE BAR FOR TOOLS PAGE */}
          <ShareBar
            variant="top"
            label="Share BuddyMoney's simple money tools with a friend"
            title="I’m using BuddyMoney’s free money tools to plan my next money moves."
          />

          {/* MAIN CARD: tool nav + actual embedded tools */}
          <motion.div
            className="space-y-10 rounded-3xl border border-slate-200 bg-white shadow-sm px-4 py-6 md:px-6 md:py-8 lg:px-8"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.5 }}
          >
            {/* TOOL CARD GRID */}
            <section aria-label="Tool navigation" className="mb-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <h2 className="text-sm font-semibold text-slate-900">
                  Jump straight to a tool
                </h2>
                <p className="text-[11px] text-slate-500">
                  Click a card to scroll down to the full calculator.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {TOOL_CARDS.map((tool) => (
                  <motion.a
                    key={tool.id}
                    href={`#${tool.id}`}
                    whileHover={{ y: -4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-lg transition-transform group-hover:scale-110">
                          {tool.icon}
                        </span>
                        <div>
                          <h3 className="text-sm font-semibold text-slate-900 group-hover:text-emerald-700">
                            {tool.name}
                          </h3>
                        </div>
                      </div>
                      <span className="rounded-full bg-slate-900 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-50">
                        {tool.badge}
                      </span>
                    </div>

                    <p className="mb-3 text-xs text-slate-600">{tool.tagline}</p>

                    <div className="flex items-center text-[11px] font-semibold text-emerald-600">
                      Open tool
                      <span className="ml-1 transition-transform group-hover:translate-x-0.5">
                        →
                      </span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </section>

            {/* ACTUAL TOOLS */}
            <section className="space-y-12">
              {/* Credit Cards preview */}
              <section id="credit-cards" className="scroll-mt-24">
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 px-4 py-4 sm:px-5 sm:py-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-1">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
                      New • Beta
                    </p>
                    <h2 className="text-sm sm:text-base font-semibold text-slate-900">
                      Credit Card Finder (preview mode)
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-700 max-w-xl">
                      We&apos;re building a smarter way to browse credit cards by
                      credit score, rewards type, and annual fee. Right now it&apos;s
                      in preview mode with sample data—perfect for exploring the
                      layout before live partner offers go in.
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <Link
                      to="/tools/credit-cards"
                      className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
                    >
                      Open Credit Card Finder →
                    </Link>
                  </div>
                </div>
              </section>

              {/* Budget */}
              <section id="budget" className="scroll-mt-24">
                <div id="budget-tracker">
                  <BudgetTracker />
                </div>
              </section>

              {/* Savings */}
              <section id="savings" className="scroll-mt-24">
                <div id="savings-goal">
                  <SavingsGoal />
                </div>
              </section>

              {/* Debt */}
              <section id="debt" className="scroll-mt-24">
                <div id="debt-payoff">
                  <DebtPayoff />
                </div>
              </section>

              {/* Bill Splitter */}
              <section id="split" className="scroll-mt-24">
                <div id="bill-splitter">
                  <BillSplitter />
                </div>
              </section>

              {/* Emergency Fund */}
              <section id="emergency" className="scroll-mt-24">
                <div id="emergency-fund">
                  <EmergencyFund />
                </div>
              </section>

              {/* Net Worth */}
              <section id="networth" className="scroll-mt-24">
                <div id="net-worth">
                  <NetWorth />
                </div>
              </section>
            </section>

            {/* 🔽 BOTTOM SHARE STRIP INSIDE TOOLS CARD */}
            <ShareBar
              variant="bottom"
              label="Share BuddyMoney's simple money tools with a friend"
              title="I’m using BuddyMoney’s free money tools to plan my next money moves."
            />

            {/* CTA Banner */}
            <section className="mt-4">
              <div className="rounded-2xl bg-emerald-600 text-white px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
                <div>
                  <h2 className="text-lg font-semibold">
                    Want help deciding what to do first?
                  </h2>
                  <p className="text-sm text-emerald-50">
                    Try Budget Coach — a guided experience that helps you choose your
                    next best money move.
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

            {/* FOOTER NOTE */}
            <footer className="mt-4 border-t border-slate-200 pt-4 text-xs text-slate-500">
              <p>
                More tools are on the way. Have an idea? We&apos;re building this
                toolbox with you.
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

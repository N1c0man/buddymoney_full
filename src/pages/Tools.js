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
  // 🌿 NEW: persistent tool memory
  const [lastTool, setLastTool] = React.useState(() => {
    return localStorage.getItem("lastTool");
  });
  const handleToolClick = (toolId) => {
    localStorage.setItem("lastTool", toolId);
    setLastTool(toolId);
  };
  // ✅ EVENT LISTENER for banner-triggered highlight
  useEffect(() => {
    console.log("Listener ready – waiting for highlightTools event...");
    const handleHighlight = () => {
      console.log("highlightTools event received!");
      const cards = document.querySelectorAll(".tool-card");
      if (!cards.length) {
        console.warn("No tool cards found to highlight");
        return;
      }
      cards.forEach((card) => {
        card.classList.add("animate-flashHighlight");
        setTimeout(() => card.classList.remove("animate-flashHighlight"), 1000);
      });
    };
    window.addEventListener("highlightTools", handleHighlight);
    return () => window.removeEventListener("highlightTools", handleHighlight);
  }, []);
  // Basic SEO data
  const title =
    "Free Money Tools & Calculators | Budget, Savings, Debt & More | BuddyMoney";
  const description =
    "Use BuddyMoney’s free money tools and calculators to plan your budget, savings goals, debt payoff, emergency fund, and net worth. No logins, no fees—just simple tools to support calmer money decisions.";
  const pageUrl = "https://buddymoney.com/tools";
  // JSON-LD structured data
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
          {/* HERO SECTION */}
          {/* (unchanged hero content) */}
          {/* 🔼 TOP SHARE BAR */}
          <ShareBar
            variant="top"
            label="Share BuddyMoney's simple money tools with a friend"
            title="I’m using BuddyMoney’s free money tools to plan my next money moves."
          />
          {/* 🌱 NEW: WELCOME BACK BANNER */}
          <WelcomeBackBanner lastTool={lastTool} />
          {/* MAIN TOOL SECTION */}
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
                    onClick={() => handleToolClick(tool.id)}
                    whileHover={{ y: -4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 18,
                    }}
                    className="tool-card group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm transition-shadow hover:shadow-md"
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
                    <p className="mb-3 text-xs text-slate-600">
                      {tool.tagline}
                    </p>
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
                      We&apos;re building a smarter way to browse credit cards
                      by credit score, rewards type, and annual fee. Right now
                      it&apos;s in preview mode with sample data—perfect for
                      exploring the layout before live partner offers go in.
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

              <section id="budget" className="scroll-mt-24">
                <div id="budget-tracker">
                  <BudgetTracker />
                </div>
              </section>

              <section id="savings" className="scroll-mt-24">
                <div id="savings-goal">
                  <SavingsGoal />
                </div>
              </section>

              <section id="debt" className="scroll-mt-24">
                <div id="debt-payoff">
                  <DebtPayoff />
                </div>
              </section>

              <section id="split" className="scroll-mt-24">
                <div id="bill-splitter">
                  <BillSplitter />
                </div>
              </section>

              <section id="emergency" className="scroll-mt-24">
                <div id="emergency-fund">
                  <EmergencyFund />
                </div>
              </section>

              <section id="networth" className="scroll-mt-24">
                <div id="net-worth">
                  <NetWorth />
                </div>
              </section>
            </section>

            <ShareBar
              variant="bottom"
              label="Share BuddyMoney's simple money tools with a friend"
              title="I’m using BuddyMoney’s free money tools to plan my next money moves."
            />

            <section className="mt-4">
              <div className="rounded-2xl bg-emerald-600 text-white px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
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

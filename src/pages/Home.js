import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import ToolCard from "../components/ToolCard";
import NewsletterSignup from "../components/NewsletterSignup";
import ShareBar from "../components/ShareBar";
import Hero from "../components/Hero";
import { setCanonical } from "../utils/seo";

// Shared variants
const containerStagger = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const item = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

export default function Home() {
  const title =
    "BuddyMoney – Free Money Tools for Budgeting, Saving & Debt Payoff";
  const description =
    "BuddyMoney helps beginners feel calmer about money with free tools for budgeting, debt payoff, savings goals, mortgage payoff, emergency fund planning, and more.";
  const url = "https://www.buddymoney.com/";
  const ogImage = "https://www.buddymoney.com/og-image-buddymoney-home.jpg";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "BuddyMoney",
    url,
    description,
    publisher: {
      "@type": "Organization",
      name: "BuddyMoney",
      url,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.buddymoney.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  useEffect(() => {
    setCanonical("/");
  }, []);

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index,follow" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="BuddyMoney" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-brand-50/40 space-y-8 md:space-y-10">
        <Hero />

        {/* ⭐ START HERE */}
        <motion.section
          className="max-w-5xl mx-auto px-4"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerStagger}
        >
          <motion.div
            className="rounded-2xl border border-emerald-100 bg-white/90 p-5 md:p-6 shadow-sm"
            variants={item}
          >
            <p className="text-xs font-semibold tracking-wide text-emerald-700 uppercase">
              Start Here
            </p>

            <h2 className="mt-2 text-xl md:text-2xl font-semibold text-slate-900">
              Pick the tool that fits what you need most right now
            </h2>

            <p className="mt-2 text-sm text-slate-600 max-w-2xl">
              Whether you want to improve your budget, pay off your mortgage
              faster, or compare credit card options, BuddyMoney helps you take
              the next step without overwhelm.
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Link to="/coach" className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 hover:bg-emerald-50 transition">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🧭</span>
                  <span className="text-sm font-semibold text-slate-900">Budget Coach</span>
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  Get personalized budget targets, a score, and practical next steps.
                </p>
              </Link>

              <Link to="/mortgage" className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 hover:bg-emerald-50 transition">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🏠</span>
                  <span className="text-sm font-semibold text-slate-900">Mortgage Payoff</span>
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  See how extra payments could shorten your loan term and reduce total interest.
                </p>
              </Link>

              <Link to="/credit-cards" className="rounded-xl border border-emerald-200 bg-white p-4 hover:bg-emerald-50 transition">
                <div className="flex items-center gap-2">
                  <span className="text-lg">💳</span>
                  <span className="text-sm font-semibold text-slate-900">Credit Cards Hub</span>
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  Explore beginner-friendly credit card categories.
                </p>
              </Link>

              <Link to="/tools/credit-cards" className="rounded-xl border border-emerald-200 bg-white p-4 hover:bg-emerald-50 transition">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🔎</span>
                  <span className="text-sm font-semibold text-slate-900">Credit Card Finder</span>
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  Preview card types that may fit your goals.
                </p>
              </Link>
            </div>
          </motion.div>
        </motion.section>

        {/* 🚀 FEATURED TOOL FUNNEL */}
        <motion.section
          className="max-w-5xl mx-auto px-4"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerStagger}
        >
          <motion.div className="rounded-3xl border border-slate-200 bg-white p-5 md:p-7 shadow-sm" variants={item}>
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-xs font-semibold tracking-wide text-emerald-700 uppercase">
                Featured Money Path
              </p>

              <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-slate-900">
                Start with your budget. Then attack debt. Then get your plan.
              </h2>

              <p className="mt-2 text-sm text-slate-600">
                A simple 3-step path to take control of your money.
              </p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <Link to="/tools/budget-tracker" className="group rounded-3xl border border-emerald-100 bg-emerald-50/70 p-5 shadow-sm hover:bg-white">
                💸 Budget Tracker
              </Link>

              <Link to="/tools/debt-payoff" className="group rounded-3xl border border-sky-100 bg-sky-50/70 p-5 shadow-sm hover:bg-white">
                📉 Debt Payoff
              </Link>

              <Link to="/coach" className="group rounded-3xl border border-slate-200 bg-slate-900 p-5 text-white shadow-sm">
                🧭 Budget Coach
              </Link>
            </div>
          </motion.div>
        </motion.section>

        {/* (rest of your file stays unchanged...) */}

      </div>
    </>
  );
}
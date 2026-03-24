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
              <Link
                to="/coach"
                className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 hover:bg-emerald-50 transition"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">🧭</span>
                  <span className="text-sm font-semibold text-slate-900">
                    Budget Coach
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  Get personalized budget targets, a score, and practical next
                  steps.
                </p>
              </Link>

              <Link
                to="/mortgage"
                className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 hover:bg-emerald-50 transition"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">🏠</span>
                  <span className="text-sm font-semibold text-slate-900">
                    Mortgage Payoff
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  See how extra payments could shorten your loan term and reduce
                  total interest.
                </p>
              </Link>

              <Link
                to="/credit-cards"
                className="rounded-xl border border-emerald-200 bg-white p-4 hover:bg-emerald-50 transition"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">💳</span>
                  <span className="text-sm font-semibold text-slate-900">
                    Credit Cards Hub
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  Explore beginner-friendly credit card categories for bad
                  credit, travel, cash back, 0% APR, and students.
                </p>
              </Link>

              <Link
                to="/tools/credit-cards"
                className="rounded-xl border border-emerald-200 bg-white p-4 hover:bg-emerald-50 transition"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">🔎</span>
                  <span className="text-sm font-semibold text-slate-900">
                    Credit Card Finder
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  Preview card types that may fit your goals before clicking out
                  to apply anywhere.
                </p>
              </Link>
            </div>
          </motion.div>
        </motion.section>

        {/* 🔼 TOP SHARE BAR */}
        <section className="max-w-5xl mx-auto px-4 sm:-mt-1 md:-mt-2">
          <ShareBar
            variant="top"
            label="Share BuddyMoney with a friend who loves simple money tools"
            title="BuddyMoney – Free Money Tools for Budgeting, Saving & Debt Payoff"
          />
        </section>

        {/* TOOLS grid title + staggered cards */}
        <motion.section
          className="pt-0 max-w-5xl mx-auto px-4"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerStagger}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.h2
            className="text-2xl font-semibold text-slate-900 mb-5"
            variants={item}
          >
            Popular Tools
          </motion.h2>

          <motion.p
            className="text-sm text-slate-600 mb-4 max-w-2xl"
            variants={item}
          >
            Explore free BuddyMoney tools to help you budget, save for goals,
            build an emergency fund, track your net worth, and plan your debt
            payoff.
          </motion.p>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerStagger}
          >
            <motion.div variants={item}>
              <div className="relative">
                <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs px-2 py-0.5 rounded-full shadow-sm animate-pulse">
                  New
                </span>
                <ToolCard
                  to="/mortgage"
                  title="Mortgage Payoff"
                  emoji="🏠"
                  desc="See how extra payments shorten your loan term."
                />
              </div>
            </motion.div>

            <motion.div variants={item}>
              <div className="relative">
                <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs px-2 py-0.5 rounded-full shadow-sm animate-pulse">
                  New
                </span>
                <ToolCard
                  to="/coach"
                  title="Budget Coach"
                  emoji="🧭"
                  desc="Personalized budget score, targets, and tips."
                />
              </div>
            </motion.div>

            <motion.div variants={item}>
              <ToolCard
                to="/tools/credit-cards"
                title="Credit Card Finder"
                emoji="🔎"
                desc="Preview card types that may fit your situation."
              />
            </motion.div>

            <motion.div variants={item}>
              <ToolCard
                to="/tools/budget-tracker"
                title="Budget Tracker"
                emoji="💸"
                desc="Track your income and expenses quickly."
              />
            </motion.div>

            <motion.div variants={item}>
              <ToolCard
                to="/tools#savings"
                title="Savings Goal"
                emoji="🎯"
                desc="Plan how much to save each month."
              />
            </motion.div>

            <motion.div variants={item}>
              <ToolCard
                to="/tools/debt-payoff"
                title="Debt Payoff"
                emoji="📉"
                desc="Estimate months to pay off your debt."
              />
            </motion.div>

            <motion.div variants={item}>
              <ToolCard
                to="/tools#split"
                title="Bill Splitter"
                emoji="🧮"
                desc="Split a bill fairly among friends."
              />
            </motion.div>

            <motion.div variants={item}>
              <ToolCard
                to="/tools/emergency-fund"
                title="Emergency Fund"
                emoji="🛟"
                desc="Know your ideal safety net size."
              />
            </motion.div>

            <motion.div variants={item}>
              <ToolCard
                to="/tools#networth"
                title="Net Worth"
                emoji="📊"
                desc="Sum assets minus liabilities."
              />
            </motion.div>
          </motion.div>
        </motion.section>

        {/* 💳 CREDIT CARD CLUSTER */}
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
              Credit Cards
            </p>

            <h2 className="mt-2 text-xl md:text-2xl font-semibold text-slate-900">
              Compare credit cards the simple way
            </h2>

            <p className="mt-2 text-sm text-slate-600 max-w-2xl">
              Explore BuddyMoney’s beginner-friendly credit card hub and preview
              finder to compare options for bad credit, travel rewards, 0% APR,
              cash back, and first-time applicants.
            </p>

            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <Link
                to="/credit-cards"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white shadow-soft hover:bg-emerald-700 transition"
              >
                Explore Credit Card Hub
              </Link>

              <Link
                to="/tools/credit-cards"
                className="inline-flex items-center justify-center rounded-xl border border-emerald-200 bg-white px-5 py-2.5 text-sm font-medium text-emerald-800 hover:bg-emerald-50 transition"
              >
                Try Credit Card Finder
              </Link>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                to="/credit-cards/cash-back"
                className="rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-medium text-emerald-800 hover:bg-emerald-50 transition"
              >
                Cash Back
              </Link>
              <Link
                to="/credit-cards/bad-credit"
                className="rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-medium text-emerald-800 hover:bg-emerald-50 transition"
              >
                Bad Credit
              </Link>
              <Link
                to="/credit-cards/travel"
                className="rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-medium text-emerald-800 hover:bg-emerald-50 transition"
              >
                Travel
              </Link>
              <Link
                to="/credit-cards/0-apr"
                className="rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-medium text-emerald-800 hover:bg-emerald-50 transition"
              >
                0% APR
              </Link>
              <Link
                to="/credit-cards/student"
                className="rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-medium text-emerald-800 hover:bg-emerald-50 transition"
              >
                Student
              </Link>
            </div>
          </motion.div>
        </motion.section>

        {/* TESTIMONIALS */}
        <motion.section
          className="pt-0"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.25 }}
          variants={containerStagger}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.div
            className="max-w-5xl mx-auto text-center mb-6 px-4"
            variants={item}
          >
            <p className="text-xs font-semibold tracking-wide text-emerald-700 uppercase">
              What people say
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">
              BuddyMoney makes money feel less scary.
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-2xl mx-auto">
              These are the kinds of wins people are having when they use the
              tools to map out their budgets, savings, and payoff plans.
            </p>
          </motion.div>

          <motion.div
            className="max-w-5xl mx-auto grid gap-5 md:grid-cols-3 px-4"
            variants={containerStagger}
          >
            <motion.div
              variants={item}
              className="rounded-2xl border border-emerald-100 bg-white/90 p-5 shadow-sm"
            >
              <p className="text-sm text-slate-700">
                “I finally understand how long my debt payoff will take. Seeing
                it on a simple chart made me feel in control instead of
                ashamed.”
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-[11px] font-semibold text-emerald-800">
                  CJ
                </div>
                <div className="text-xs text-slate-600">
                  <p className="font-semibold text-slate-800">Carlos J.</p>
                  <p>New to budgeting</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={item}
              className="rounded-2xl border border-emerald-100 bg-white/90 p-5 shadow-sm"
            >
              <p className="text-sm text-slate-700">
                “The emergency fund calculator gave me an actual number to aim
                for. Now my savings account has a purpose, not just random
                money.”
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-sky-100 flex items-center justify-center text-[11px] font-semibold text-sky-900">
                  AM
                </div>
                <div className="text-xs text-slate-600">
                  <p className="font-semibold text-slate-800">Alicia M.</p>
                  <p>Freelance designer</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={item}
              className="rounded-2xl border border-emerald-100 bg-white/90 p-5 shadow-sm"
            >
              <p className="text-sm text-slate-700">
                “My partner and I use the tools to talk through bills without
                arguing. Having numbers in front of us calms everyone down.”
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-[11px] font-semibold text-amber-900">
                  LN
                </div>
                <div className="text-xs text-slate-600">
                  <p className="font-semibold text-slate-800">Lena &amp; Noah</p>
                  <p>Roommates &amp; buddies</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* NEWSLETTER */}
        <motion.section
          id="newsletter"
          className="mt-0 md:mt-2"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="max-w-3xl mx-auto px-4">
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/80 p-6 sm:p-8 shadow-sm">
              <NewsletterSignup />
            </div>
          </div>
        </motion.section>

        {/* 🔽 BOTTOM SHARE STRIP – good “tell a friend” moment */}
        <section className="max-w-5xl mx-auto px-4 mt-4">
          <ShareBar
            variant="bottom"
            label="Share BuddyMoney with a friend who loves simple money tools"
            title="I’m using BuddyMoney’s free tools to feel calmer about my money."
          />
        </section>

        {/* FOOTER CTA BAR */}
        <motion.section
          className="mt-0 border-t border-emerald-100/70 bg-white/80"
          initial={{ opacity: 0, y: 30 }}
          whileInView="animate"
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="max-w-5xl mx-auto px-4 py-6 md:py-7 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm font-semibold text-slate-900">
                Ready to feel calmer about your money?
              </p>
              <p className="text-xs text-slate-600 mt-1">
                Explore all the BuddyMoney tools, or hop onto the weekly email
                list for friendly money tips.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/tools"
                className="px-5 py-2.5 rounded-xl bg-brand-700 text-white text-sm font-medium hover:bg-brand-800 shadow-soft transition-transform duration-150 hover:-translate-y-0.5"
              >
                Explore All Tools
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </>
  );
}
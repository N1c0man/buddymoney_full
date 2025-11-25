import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import ToolCard from "../components/ToolCard";
import NewsletterSignup from "../components/NewsletterSignup";

// Shared variants
const fadeUp = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 }
};
const containerStagger = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 }
  }
};
const item = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 }
};

export default function Home() {
  return (
    // Brand-tint background + tighter vertical spacing
    <div className="min-h-screen bg-brand-50/40 space-y-8 md:space-y-10">
      {/* HERO with subtle fade-up on view */}
      <motion.section
        className="pt-0"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        variants={fadeUp}
      >
        <Hero />
      </motion.section>

      {/* TOOLS grid title + staggered cards */}
      <motion.section
        className="pt-0"
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

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerStagger}
        >
          {/* ✅ New: Mortgage Payoff Tool */}
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

          {/* ✅ Budget Coach */}
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
              to="/tools#budget"
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
              to="/tools#debt"
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
              to="/tools#emergency"
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

      {/* TESTIMONIALS / SOCIAL PROOF */}
      <motion.section
        className="pt-0"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.25 }}
        variants={containerStagger}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.div
          className="max-w-5xl mx-auto text-center mb-6"
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
          className="max-w-5xl mx-auto grid gap-5 md:grid-cols-3"
          variants={containerStagger}
        >
          {/* Card 1 */}
          <motion.div
            variants={item}
            className="rounded-2xl border border-emerald-100 bg-white/90 p-5 shadow-sm"
          >
            <p className="text-sm text-slate-700">
              “I finally understand how long my debt payoff will take. Seeing it
              on a simple chart made me feel in control instead of ashamed.”
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

          {/* Card 2 */}
          <motion.div
            variants={item}
            className="rounded-2xl border border-emerald-100 bg-white/90 p-5 shadow-sm"
          >
            <p className="text-sm text-slate-700">
              “The emergency fund calculator gave me an actual number to aim
              for. Now my savings account has a purpose, not just random money.”
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

          {/* Card 3 */}
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

      {/* NEWSLETTER with fade-up */}
      <motion.section
        id="newsletter"
        className="mt-0 md:mt-2"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/80 p-6 sm:p-8 shadow-sm">
            <NewsletterSignup />
          </div>
        </div>
      </motion.section>

      {/* FOOTER CTA BAR */}
      <motion.section
        className="mt-0 border-t border-emerald-100/70 bg-white/80"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
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
  );
}

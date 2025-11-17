import React from "react";
import { motion } from "framer-motion";
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
    <div>
      {/* HERO with subtle fade-up on view */}
      <motion.section
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
        className="max-w-6xl mx-auto px-4 py-12"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerStagger}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.h2
          className="text-2xl font-bold text-brand-900 mb-6"
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
              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs px-2 py-0.5 rounded-full shadow">
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
              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs px-2 py-0.5 rounded-full shadow">
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

      {/* NEWSLETTER with fade-up */}
      <motion.section
        className="bg-green-50 border-t border-green-100 py-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto px-6">
          <NewsletterSignup />
        </div>
      </motion.section>
    </div>
  );
}

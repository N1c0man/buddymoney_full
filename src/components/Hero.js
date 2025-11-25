import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-emerald-50 to-accent-100/70">
      {/* Soft animated background blobs */}
      <motion.div
        className="pointer-events-none absolute -top-32 -right-10 h-72 w-72 rounded-full bg-emerald-200/60 blur-3xl"
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-32 -left-10 h-80 w-80 rounded-full bg-sky-200/50 blur-3xl"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
      />

      <div className="relative max-w-6xl mx-auto px-4 py-12 md:py-16 grid md:grid-cols-2 gap-8 md:gap-10 items-center">
        {/* Text side */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-5"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-emerald-700 shadow-sm border border-emerald-50">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            BuddyMoney • Free tools & guides to calm your money stress
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-900 leading-tight">
            Take control of your money,{" "}
            <span className="text-emerald-700">one small step</span> at a time.
          </h1>

          <p className="text-lg text-brand-800/80 max-w-prose">
            BuddyMoney gives you simple calculators and friendly guides for
            budgeting, debt, emergency funds, and more. No jargon, no guilt—
            just clear next steps that actually feel doable.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/tools"
              className="px-6 py-3 rounded-xl bg-brand-700 text-white hover:bg-brand-800 shadow-soft transition-transform duration-150 hover:-translate-y-0.5 inline-flex items-center gap-2"
            >
              Explore money tools
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              to="/blog"
              className="px-6 py-3 rounded-xl bg-white text-brand-800 border border-brand-200 hover:bg-brand-50 shadow-soft transition-transform duration-150 hover:-translate-y-0.5"
            >
              Start with guides
            </Link>
          </div>

          {/* Popular strip */}
          <div className="space-y-2">
            <p className="text-xs text-brand-800/70">
              No logins, no fees — just tools you&apos;ll actually use.
            </p>
            <div className="flex flex-wrap gap-2 text-[11px]">
              <Link
                to="/mortgage"
                className="inline-flex items-center gap-1 rounded-full bg-white/70 border border-emerald-100 px-3 py-1 text-emerald-800 hover:bg-emerald-50/80 transition-colors"
              >
                <span aria-hidden="true">📊</span>
                <span>Mortgage Payoff Calculator</span>
              </Link>
              <Link
                to="/tools"
                className="inline-flex items-center gap-1 rounded-full bg-white/70 border border-emerald-100 px-3 py-1 text-emerald-800 hover:bg-emerald-50/80 transition-colors"
              >
                <span aria-hidden="true">📋</span>
                <span>Budget Planner</span>
              </Link>
              <Link
                to="/tools"
                className="inline-flex items-center gap-1 rounded-full bg-white/70 border border-emerald-100 px-3 py-1 text-emerald-800 hover:bg-emerald-50/80 transition-colors"
              >
                <span aria-hidden="true">🛟</span>
                <span>Emergency Fund Goal</span>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Owl image side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="flex justify-center"
        >
          {/* Floating card with subtle up/down animation */}
          <motion.div
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft p-5 md:p-6 border border-emerald-50"
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 1.2
            }}
          >
            <img
              className="w-72 md:w-96 lg:w-[26rem]"
              src="/icons/heroowl.png"
              alt="BuddyMoney smart owl illustration"
            />
            <div className="mt-3 flex items-center gap-2 text-[11px] text-emerald-700/80">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>
                Your friendly owl, keeping an eye on your budget, savings, and goals.
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

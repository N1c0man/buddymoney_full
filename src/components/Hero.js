// src/components/Hero.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section
      className="
        relative overflow-hidden
        bg-gradient-to-br from-brand-50 via-emerald-50 to-accent-100/70
        pt-20 sm:pt-24 lg:pt-10
        pb-10 sm:pb-12
      "
    >
      {/* Soft background blobs */}
      <motion.div
        className="pointer-events-none absolute -top-24 -right-10 h-72 w-72 rounded-full bg-emerald-200/60 blur-3xl"
        initial={{ opacity: 0, scale: 0.9, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-brand-200/50 blur-3xl"
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Card hero (matches tool-page style) */}
        <motion.div
          className="
            relative
            rounded-3xl border border-white/60
            bg-white/75 backdrop-blur
            shadow-[0_18px_50px_-25px_rgba(0,0,0,0.25)]
            p-6 sm:p-8 lg:p-10
          "
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <div className="grid items-center gap-8 lg:grid-cols-12">
            {/* Copy */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100/70 px-3 py-1 text-sm font-medium text-emerald-900">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Beginner-friendly money tools
              </div>

              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Smart tools to budget, save, and grow —{" "}
                <span className="text-emerald-700">without the jargon</span>
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg">
                Use calculators, checklists, and simple guides built for real life.
                Start with your budget, knock out debt, and build your emergency fund.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  to="/tools"
                  className="
                    inline-flex items-center justify-center
                    rounded-xl bg-emerald-600 px-5 py-3
                    text-base font-semibold text-white
                    shadow-sm transition hover:bg-emerald-700
                    focus:outline-none focus:ring-2 focus:ring-emerald-500/60
                  "
                >
                  Explore free tools
                </Link>

                <Link
                  to="/blog"
                  className="
                    inline-flex items-center justify-center
                    rounded-xl border border-emerald-200 bg-white/60 px-5 py-3
                    text-base font-semibold text-emerald-800
                    transition hover:bg-white
                    focus:outline-none focus:ring-2 focus:ring-emerald-500/40
                  "
                >
                  Read guides
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap gap-2 text-sm text-slate-600">
                <span className="rounded-full bg-slate-50 px-3 py-1 ring-1 ring-slate-200">
                  Budget Coach
                </span>
                <span className="rounded-full bg-slate-50 px-3 py-1 ring-1 ring-slate-200">
                  Mortgage Payoff
                </span>
                <span className="rounded-full bg-slate-50 px-3 py-1 ring-1 ring-slate-200">
                  Credit Cards Hub
                </span>
                <span className="rounded-full bg-slate-50 px-3 py-1 ring-1 ring-slate-200">
                  Debt Payoff
                </span>
              </div>
            </div>

            {/* Visual / mascot area */}
            <div className="lg:col-span-5">
              <div
                className="
                  relative overflow-hidden
                  rounded-2xl border border-white/70
                  bg-gradient-to-br from-emerald-50 to-brand-50
                  p-5 sm:p-6
                "
              >
                <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-emerald-200/60 blur-2xl" />
                <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-brand-200/50 blur-2xl" />

                <div className="relative">
                  <div className="text-sm font-semibold text-slate-800">
                    Quick start
                  </div>
                  <div className="mt-2 space-y-2">
                    <div className="rounded-xl bg-white/80 px-4 py-3 ring-1 ring-slate-200">
                      <div className="text-sm font-semibold text-slate-900">
                        Build a simple budget
                      </div>
                      <div className="text-sm text-slate-600">
                        Start with your income + bills in 2 minutes.
                      </div>
                    </div>

                    <div className="rounded-xl bg-white/80 px-4 py-3 ring-1 ring-slate-200">
                      <div className="text-sm font-semibold text-slate-900">
                        Pay off debt faster
                      </div>
                      <div className="text-sm text-slate-600">
                        See payoff dates and extra-payment impact.
                      </div>
                    </div>

                    <div className="rounded-xl bg-white/80 px-4 py-3 ring-1 ring-slate-200">
                      <div className="text-sm font-semibold text-slate-900">
                        Emergency fund plan
                      </div>
                      <div className="text-sm text-slate-600">
                        Set a goal and get a monthly target.
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Link
                      to="/tools/budget-coach"
                      className="inline-flex items-center text-sm font-semibold text-emerald-800 hover:text-emerald-900"
                    >
                      Start with Budget Coach →
                    </Link>
                  </div>
                </div>
              </div>

              <p className="mt-3 text-xs text-slate-600">
                Tip: On mobile, this hero adds extra top padding so your H1 never
                hides behind the header.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

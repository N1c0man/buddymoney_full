import React from "react";
import AppBottomNav from "../components/AppBottomNav";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { buildUrl } from "../utils/seo";

export default function AppDashboard() {
  const canonicalUrl = buildUrl("/app");

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-indigo-50 px-4 pt-6 pb-24">
      <Helmet>
        <title>BuddyMoney App | Quick Money Tools</title>
        <meta
          name="description"
          content="Open quick BuddyMoney tools like the bill splitter and tip calculator, budget coach, debt payoff estimator, and mortgage payoff calculator."
        />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <main className="mx-auto max-w-md">
        <section className="rounded-3xl bg-white/90 border border-slate-200 shadow-sm px-5 py-6 text-center mb-5">
          <img
            src="/icons/BMlogo.png"
            alt="BuddyMoney"
            className="h-16 mx-auto mb-3"
          />

          <p className="text-xs font-semibold uppercase tracking-wide text-sky-600">
            BuddyMoney App
          </p>

          <h1 className="text-2xl font-bold text-slate-900 mt-1">
            Quick Money Tools
          </h1>

          <p className="text-sm text-slate-600 mt-2">
            Simple calculators to help with everyday money decisions.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-base font-bold text-slate-900 mb-3">
            Quick Tools
          </h2>

          <div className="grid grid-cols-1 gap-3">
            <ToolLink
              to="/tools/bill-splitter"
              icon="🧾"
              title="Bill Splitter & Tip Calculator"
              text="Split bills and calculate tips fast."
              large
            />
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-base font-bold text-slate-900 mb-3">
            More Tools
          </h2>

          <div className="space-y-3">
            <ToolLink
              to="/tools/budget-coach"
              icon="🧠"
              title="Budget Coach"
              text="Get a simple money plan."
            />

            <ToolLink
              to="/tools/debt-payoff"
              icon="🎯"
              title="Debt Payoff Estimator"
              text="See your payoff path."
            />

            <ToolLink
              to="/tools/mortgage-payoff"
              icon="🏠"
              title="Mortgage Payoff"
              text="Estimate savings from extra payments."
            />

            <ToolLink
              to="/tools/credit-cards"
              icon="💳"
              title="Credit Card Tools"
              text="Explore card guides and options."
            />
          </div>
        </section>

        <p className="text-center text-xs text-slate-500 pb-6">
          BuddyMoney helps you make smarter money moves, one tool at a time.
        </p>
      </main>

      <AppBottomNav />
    </div>
  );
}

function ToolLink({ to, icon, title, text, large = false }) {
  return (
    <Link
      to={to}
      className={
        large
          ? "group rounded-3xl bg-white border border-slate-200 p-5 shadow-sm hover:shadow-md transition active:scale-[0.99]"
          : "group block rounded-2xl bg-white border border-slate-200 px-4 py-4 shadow-sm hover:shadow-md transition active:scale-[0.99]"
      }
    >
      <div className={large ? "flex items-center gap-4" : "flex items-center gap-3"}>
        <div
          className={
            large
              ? "flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-2xl"
              : "flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-xl"
          }
        >
          {icon}
        </div>

        <div className="flex-1">
          <h3 className={large ? "text-lg font-bold text-slate-900" : "font-semibold text-slate-900"}>
            {title}
          </h3>
          <p className="text-sm text-slate-600">{text}</p>
        </div>

        <span className="text-slate-400 group-hover:text-sky-600">→</span>
      </div>
    </Link>
  );
}
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
        <title>BuddyMoney App | Build Better Money Habits</title>
        <meta
          name="description"
          content="Build better money habits with simple tools for budgeting, debt payoff, saving goals, mortgage planning, and everyday financial decisions."
        />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <main className="mx-auto max-w-md">
        <section className="rounded-3xl bg-white/90 border border-slate-200 shadow-sm px-5 py-5 text-center mb-5">
          <img
            src="/icons/BMlogo.png"
            alt="BuddyMoney"
            className="h-17 mx-auto mb-3"
          />

          <p className="text-xs font-semibold uppercase tracking-wide text-sky-600">
            Welcome to BuddyMoney
          </p>

          <h1 className="text-3xl font-bold text-slate-900 mt-1 leading-tight">
            Build Better
            <br />
            Money Habits
          </h1>

          <p className="text-sm text-slate-600 mt-3">
            Budget smarter. Save more. Pay off debt faster.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-base font-bold text-slate-900 mb-3">
            🦉 Recommended
          </h2>

          <div className="grid grid-cols-1 gap-3">
            <ToolLink
              to="/app/tools/budget-coach"
              icon="🦉"
              title="Budget Coach"
              text="Create a simple plan for your money."
              large
            />

            <ToolLink
              to="/app/tools/monthly-payment-calculator"
              icon="🧮"
              title="Monthly Payment Calculator"
              text="Estimate payments before you borrow."
              large
            />
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-base font-bold text-slate-900 mb-3">
            ⚡ Quick Tools
          </h2>

          <div className="space-y-3">
            <ToolLink
              to="/app/tools/bill-splitter"
              icon="🧾"
              title="Bill Splitter & Tip Calculator"
              text="Split bills and calculate tips in seconds."
            />
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-base font-bold text-slate-900 mb-3">
            💰 Money Tools
          </h2>

          <div className="space-y-3">
            <ToolLink
              to="/app/tools/budget-tracker"
              icon="💰"
              title="Monthly Budget Planner"
              text="Track income, expenses, and spending habits."
            />

            <ToolLink
              to="/app/tools/debt-payoff"
              icon="🎯"
              title="Debt Payoff Planner"
              text="Create your debt payoff plan."
            />

            <ToolLink
              to="/app/tools/emergency-fund"
              icon="🛟"
              title="Emergency Fund Planner"
              text="Build your financial safety net."
            />

            <ToolLink
              to="/app/tools/mortgage-payoff"
              icon="🏠"
              title="Mortgage Payoff Calculator"
              text="See how extra payments can save thousands."
            />

            <ToolLink
              to="/app/tools/credit-cards"
              icon="💳"
              title="Credit Card Tools"
              text="Learn about cards, rewards, and credit building."
            />
          </div>
        </section>

        <p className="text-center text-xs text-slate-500 pb-6 leading-relaxed">
          Build better money habits one step at a time with simple,
          beginner-friendly financial tools.
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
      <div
        className={
          large ? "flex items-center gap-4" : "flex items-center gap-3"
        }
      >
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
          <h3
            className={
              large
                ? "text-lg font-bold text-slate-900"
                : "font-semibold text-slate-900"
            }
          >
            {title}
          </h3>

          <p className="text-sm text-slate-600">{text}</p>
        </div>

        <span className="text-slate-400 group-hover:text-sky-600">→</span>
      </div>
    </Link>
  );
}
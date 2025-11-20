import React from "react";
import BudgetTracker from "../tools/BudgetTracker";
import SavingsGoal from "../tools/SavingsGoal";
import DebtPayoff from "../tools/DebtPayoff";
import BillSplitter from "../tools/BillSplitter";
import EmergencyFund from "../tools/EmergencyFund";
import NetWorth from "../tools/NetWorth";

const TOOL_CARDS = [
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
  return (
    <main className="max-w-6xl mx-auto px-4 py-12 bg-slate-50 min-h-screen">
      {/* HERO */}
      <header className="mb-6 mt-4">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-emerald-500 mb-3">
          BuddyMoney Tools
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
          Simple tools to keep your money on track.
        </h1>
        <p className="text-sm md:text-base text-slate-600 max-w-2xl">
          Use these calculators to plan your budget, save for goals, pay off
          debt, and stay in control—without needing a finance degree. Bookmark
          this page and come back whenever you need a quick money check-in.
        </p>
      </header>

      {/* TOOL CARD GRID */}
      <section aria-label="Tool navigation" className="mb-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOOL_CARDS.map((tool) => (
            <a
              key={tool.id}
              href={`#${tool.id}`}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-lg">
                    {tool.icon}
                  </span>
                  <div>
                    <h2 className="text-sm font-semibold text-slate-900 group-hover:text-emerald-700">
                      {tool.name}
                    </h2>
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
            </a>
          ))}
        </div>
      </section>

      {/* ACTUAL TOOLS */}
      <section className="space-y-12">
        <section id="budget-tracker" className="scroll-mt-24">
          <BudgetTracker />
        </section>

        <section id="savings-goal" className="scroll-mt-24">
          <SavingsGoal />
        </section>

        <section id="debt-payoff" className="scroll-mt-24">
          <DebtPayoff />
        </section>

        <section id="bill-splitter" className="scroll-mt-24">
          <BillSplitter />
        </section>

        <section id="emergency-fund" className="scroll-mt-24">
          <EmergencyFund />
        </section>

        <section id="net-worth" className="scroll-mt-24">
          <NetWorth />
        </section>
      </section>

      {/* FOOTER NOTE */}
      <footer className="mt-10 border-t border-slate-200 pt-4 text-xs text-slate-500">
  <p>More tools are on the way. Have an idea? We're building this toolbox with you.</p>
  <p className="mt-1 text-[10px] text-slate-400">Updated November 2025</p>
</footer>

    </main>
  );
}

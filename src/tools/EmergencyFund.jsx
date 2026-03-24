import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function EmergencyFund() {
  const [monthly, setMonthly] = useState(0);
  const [months, setMonths] = useState(3);

  const fund = monthly * months;
  const safeMonths = Math.max(0, Math.min(months || 0, 6));
  const barWidth = `${(safeMonths / 6) * 100}%`;

  return (
    <section
      id="emergency"
      className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"
    >
      {/* HEADER */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-600 mb-1">
            Tool
          </p>

          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="text-lg">🛟</span>
            Emergency Fund Calculator
          </h2>

          <p className="text-sm text-slate-600 mt-2 max-w-2xl">
            Use this free emergency fund calculator to estimate how much money
            you may want set aside for unexpected expenses like job loss,
            medical bills, essential repairs, or a sudden income drop.
          </p>

          <p className="text-[11px] text-slate-500 mt-2">
            Most people aim for{" "}
            <span className="font-semibold">3–6 months of essential expenses</span>,
            depending on job stability, income consistency, and household needs.
          </p>
        </div>
      </div>

      {/* QUICK CONTEXT */}
      <div className="mb-6 rounded-xl border border-emerald-100 bg-emerald-50/70 px-4 py-3">
        <p className="text-sm text-slate-700">
          Not sure what counts as an emergency fund target? Start with your
          monthly essentials like housing, groceries, utilities, insurance, and
          minimum debt payments.
        </p>
      </div>

      {/* INPUTS */}
      <div className="grid gap-3 md:grid-cols-3 mb-6">
        {/* Monthly expenses */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Monthly essential expenses
          </label>
          <input
            type="number"
            min={0}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="e.g. 2500"
            value={monthly}
            onChange={(e) => setMonthly(parseFloat(e.target.value || 0))}
          />
          <p className="text-[10px] text-slate-500 mt-1">
            Include only the expenses you must cover each month.
          </p>
        </div>

        {/* Months of coverage */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Months of coverage
          </label>
          <input
            type="number"
            min={1}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="e.g. 3"
            value={months}
            onChange={(e) => setMonths(parseFloat(e.target.value || 0))}
          />

          <p className="text-[10px] text-slate-500 mt-1">
            Tip: 3 months = solid base, 6 months = stronger protection.
          </p>
        </div>

        {/* Result box */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Total fund needed
          </label>
          <div className="rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-3 flex items-center text-sm font-semibold text-emerald-700 h-full">
            ${fund.toFixed(2)}
          </div>
        </div>
      </div>

      {/* SUMMARY + VISUAL */}
      {monthly > 0 && months > 0 && (
        <div className="space-y-5 mb-6">
          {/* Summary line */}
          <div className="flex flex-wrap gap-4 text-sm text-slate-600">
            <div>
              <span className="font-semibold">Monthly expenses:</span>{" "}
              <span className="tabular-nums">${monthly.toFixed(2)}</span>
            </div>

            <div>
              <span className="font-semibold">Months saved for:</span>{" "}
              <span className="tabular-nums">{months}</span>
            </div>

            <div>
              <span className="font-semibold">Goal:</span>{" "}
              <span className="tabular-nums font-semibold text-emerald-700">
                ${fund.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Timeline bar */}
          <div>
            <div className="flex justify-between text-xs text-slate-600 mb-1">
              <span>Coverage length</span>
              <span>{months} months</span>
            </div>

            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full"
                style={{ width: barWidth }}
              />
            </div>

            <p className="text-[10px] text-slate-500 mt-1">
              Bar fills completely at 6 months of expenses.
            </p>
          </div>

          {/* Dynamic summary */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-sm text-slate-700">
              Saving for <span className="font-semibold">{months} months</span>{" "}
              of essential expenses means targeting about{" "}
              <span className="font-semibold text-emerald-700">
                ${fund.toFixed(2)}
              </span>
              . That can give you a stronger cushion against unexpected bills,
              job interruptions, or urgent repairs.
            </p>
          </div>
        </div>
      )}

      {/* HELPFUL CONTENT */}
      <div className="grid gap-4 md:grid-cols-2 mb-6">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h3 className="text-sm font-semibold text-slate-900 mb-2">
            What should your emergency fund cover?
          </h3>
          <ul className="space-y-1 text-sm text-slate-600">
            <li>• Rent or mortgage</li>
            <li>• Utilities and groceries</li>
            <li>• Insurance premiums</li>
            <li>• Transportation</li>
            <li>• Minimum debt payments</li>
          </ul>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h3 className="text-sm font-semibold text-slate-900 mb-2">
            When should you aim for more than 3 months?
          </h3>
          <ul className="space-y-1 text-sm text-slate-600">
            <li>• Your income changes month to month</li>
            <li>• You are self-employed</li>
            <li>• You support a family</li>
            <li>• Your job feels less predictable</li>
            <li>• Your monthly costs are hard to reduce quickly</li>
          </ul>
        </div>
      </div>

      {/* INTERNAL LINKS */}
      <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 mb-6">
        <h3 className="text-sm font-semibold text-slate-900 mb-2">
          Related BuddyMoney guides
        </h3>
        <div className="flex flex-col gap-2 text-sm">
          <Link
            to="/blog/emergency-fund-basics"
            className="text-emerald-700 hover:text-emerald-800 font-medium"
          >
            Read: Emergency Fund Basics →
          </Link>
          <Link
            to="/blog/emergency-fund-3-to-6-months"
            className="text-emerald-700 hover:text-emerald-800 font-medium"
          >
            Read: How to Build a 3–6 Month Emergency Fund →
          </Link>
          <Link
            to="/coach"
            className="text-emerald-700 hover:text-emerald-800 font-medium"
          >
            Use Budget Coach to estimate your monthly essentials →
          </Link>
          <Link
            to="/tools#debt"
            className="text-emerald-700 hover:text-emerald-800 font-medium"
          >
            Planning savings and debt together? Try the Debt Payoff Planner →
          </Link>
        </div>
      </div>

      {/* FAQ-STYLE CONTENT */}
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-900 mb-1">
            Is 3 months enough for an emergency fund?
          </h3>
          <p className="text-sm text-slate-600">
            For many people with stable income, 3 months is a strong starting
            goal. If your income is unpredictable, you may want to aim for 6
            months or more.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900 mb-1">
            Should I save before paying off debt?
          </h3>
          <p className="text-sm text-slate-600">
            Many people start with a small emergency cushion first, then balance
            saving and debt payoff together. That helps prevent new debt when
            surprise expenses pop up.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900 mb-1">
            Where should I keep my emergency fund?
          </h3>
          <p className="text-sm text-slate-600">
            A high-yield savings account is usually the best choice because it
            keeps your money safe, accessible, and separate from daily spending.
          </p>
        </div>
      </div>
    </section>
  );
}
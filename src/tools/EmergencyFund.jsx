import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function EmergencyFund() {
  const [monthly, setMonthly] = useState(0);
  const [months, setMonths] = useState(3);

  const fund = monthly * months;
  const safeMonths = Math.max(0, Math.min(months || 0, 6));
  const barWidth = `${(safeMonths / 6) * 100}%`;

  return (
    <section className="space-y-6">
      {/* Inputs */}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Monthly essential expenses
          </label>
          <input
            type="number"
            className="w-full border border-slate-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="2500"
            value={monthly}
            onChange={(e) => setMonthly(parseFloat(e.target.value || 0))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Months of coverage
          </label>
          <input
            type="number"
            className="w-full border border-slate-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="3"
            value={months}
            onChange={(e) => setMonths(parseFloat(e.target.value || 0))}
          />
        </div>
      </div>

      {/* Summary Panel */}
      <div className="bg-black text-white rounded-2xl p-5 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-slate-300">Monthly expenses</span>
          <span className="font-semibold">${monthly.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-slate-300">Coverage</span>
          <span className="font-semibold">{months} months</span>
        </div>

        <div className="border-t border-white/10 pt-3 flex justify-between items-center">
          <span className="text-sm text-slate-300">Target fund</span>
          <span className="text-lg font-bold text-emerald-400">
            ${fund.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Progress */}
      {monthly > 0 && months > 0 && (
        <div>
          <div className="flex justify-between text-xs text-slate-600 mb-1">
            <span>Coverage strength</span>
            <span>{months} months</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full"
              style={{ width: barWidth }}
            />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            3 months = solid base · 6 months = strong protection
          </p>
        </div>
      )}

      {/* Helper */}
      {monthly > 0 && months > 0 ? (
        <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-4 text-sm text-emerald-800">
          Saving{" "}
          <span className="font-semibold">${fund.toFixed(2)}</span> gives you{" "}
          <span className="font-semibold">{months} months</span> of financial
          protection.
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 p-4 text-sm text-slate-500">
          Enter your expenses and timeline to estimate your emergency fund.
        </div>
      )}

      {/* --- SEO CONTENT (LIGHTER + CLEANER) --- */}
      <div className="pt-4 space-y-6 border-t border-slate-100">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h3 className="text-sm font-semibold text-slate-900 mb-2">
              What should it cover?
            </h3>
            <ul className="space-y-1 text-sm text-slate-600">
              <li>• Housing (rent/mortgage)</li>
              <li>• Utilities & groceries</li>
              <li>• Insurance</li>
              <li>• Transportation</li>
              <li>• Minimum debt payments</li>
            </ul>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h3 className="text-sm font-semibold text-slate-900 mb-2">
              When aim for 6 months?
            </h3>
            <ul className="space-y-1 text-sm text-slate-600">
              <li>• Income is inconsistent</li>
              <li>• Self-employed</li>
              <li>• Supporting a family</li>
              <li>• Job uncertainty</li>
            </ul>
          </div>
        </div>

        {/* Internal links */}
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4">
          <h3 className="text-sm font-semibold text-slate-900 mb-2">
            Related guides
          </h3>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/blog/emergency-fund-basics" className="text-emerald-700 font-medium">
              Emergency Fund Basics →
            </Link>
            <Link to="/blog/emergency-fund-3-to-6-months" className="text-emerald-700 font-medium">
              Build a 3–6 Month Fund →
            </Link>
            <Link to="/coach" className="text-emerald-700 font-medium">
              Budget Coach →
            </Link>
            <Link to="/tools#debt" className="text-emerald-700 font-medium">
              Debt Payoff Planner →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
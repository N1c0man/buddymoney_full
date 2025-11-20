import React, { useState } from "react";

export default function SavingsGoal() {
  const [goal, setGoal] = useState(0);
  const [months, setMonths] = useState(0);
  const monthly = months > 0 ? goal / months : 0;

  return (
    <section
      id="savings"
      className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-600 mb-1">
            Tool
          </p>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="text-lg">🎯</span>
            Savings Goal Planner
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-md">
            Enter your goal amount and how many months you want to reach it.
            We’ll calculate how much you need to save each month.
          </p>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid gap-3 md:grid-cols-3 mb-6">
        {/* Goal amount */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Goal amount
          </label>
          <input
            type="number"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="e.g. 5000"
            value={goal}
            onChange={(e) => setGoal(parseFloat(e.target.value || 0))}
          />
        </div>

        {/* Months */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Months to reach goal
          </label>
          <input
            type="number"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="e.g. 12"
            value={months}
            onChange={(e) => setMonths(parseFloat(e.target.value || 0))}
          />
        </div>

        {/* Monthly needed */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Needed per month
          </label>
          <div className="rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-2 flex items-center text-sm font-semibold text-emerald-700">
            ${monthly.toFixed(2)} / month
          </div>
        </div>
      </div>

      {/* Summary */}
      {goal > 0 && months > 0 && (
        <div className="space-y-3">
          {/* Progress visual */}
          <div>
            <div className="flex justify-between text-xs text-slate-600 mb-1">
              <span>Timeline</span>
              <span>{months} months</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full"
                style={{ width: `${(1 / months) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Breakdown */}
          <div className="flex flex-wrap gap-4 text-sm text-slate-600">
            <div>
              <span className="font-semibold">Total goal:</span>{" "}
              <span className="tabular-nums">${goal.toFixed(2)}</span>
            </div>
            <div>
              <span className="font-semibold">Months:</span>{" "}
              <span className="tabular-nums">{months}</span>
            </div>
            <div>
              <span className="font-semibold">Save:</span>{" "}
              <span className="tabular-nums font-semibold text-emerald-700">
                ${monthly.toFixed(2)}/mo
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

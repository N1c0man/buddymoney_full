import React, { useState } from "react";

export default function SavingsGoal() {
  const [goalInput, setGoalInput] = useState("");
  const [monthsInput, setMonthsInput] = useState("");

  const goal = parseFloat(goalInput) || 0;
  const months = parseFloat(monthsInput) || 0;

  const monthly = months > 0 ? goal / months : 0;

  return (
    <section
      id="savings"
      className="bg-white rounded-3xl p-6 shadow-md border border-slate-200 space-y-6"
    >
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          🎯 Savings Goal Planner
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-md">
          Enter your savings goal and timeline. We’ll show how much you need to
          save each month.
        </p>
      </div>

      {/* Inputs */}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Goal amount
          </label>
          <input
            type="number"
            className="w-full border border-slate-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="5000"
            value={goalInput}
            onChange={(e) => setGoalInput(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Months to reach goal
          </label>
          <input
            type="number"
            className="w-full border border-slate-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="12"
            value={monthsInput}
            onChange={(e) => setMonthsInput(e.target.value)}
          />
        </div>
      </div>

      {/* Summary Panel */}
      <div className="bg-black text-white rounded-2xl p-5 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-slate-300">Savings goal</span>
          <span className="font-semibold">${goal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-slate-300">Timeline</span>
          <span className="font-semibold">
            {months > 0 ? `${months} months` : "—"}
          </span>
        </div>

        <div className="border-t border-white/10 pt-3 flex justify-between items-center">
          <span className="text-sm text-slate-300">Save each month</span>
          <span className="text-lg font-bold text-emerald-400">
            ${monthly.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Helper */}
      {goal > 0 && months > 0 ? (
        <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-4 text-sm text-emerald-800">
          To reach a goal of{" "}
          <span className="font-semibold">${goal.toFixed(2)}</span> in{" "}
          <span className="font-semibold">{months} months</span>, set aside{" "}
          <span className="font-semibold">${monthly.toFixed(2)}</span> each
          month.
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 p-4 text-sm text-slate-500">
          Add a goal amount and timeline to see your monthly savings target.
        </div>
      )}
    </section>
  );
}
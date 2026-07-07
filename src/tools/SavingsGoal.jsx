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
      className="rounded-3xl border border-emerald-100 bg-white/95 p-5 shadow-sm md:p-6 space-y-6"
    >
      <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
          BuddyMoney Tool
        </p>

        <h2 className="mt-2 text-2xl font-extrabold text-slate-900">
          Savings Goal Planner
        </h2>

        <p className="mt-2 text-sm text-slate-600 max-w-2xl">
          Enter a savings goal and timeline to see how much to set aside each
          month.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <InputBlock
          label="Goal amount"
          type="number"
          placeholder="5000"
          value={goalInput}
          onChange={(e) => setGoalInput(e.target.value)}
        />

        <InputBlock
          label="Months to reach goal"
          type="number"
          placeholder="12"
          value={monthsInput}
          onChange={(e) => setMonthsInput(e.target.value)}
        />
      </div>

      <div className="rounded-3xl bg-gradient-to-br from-emerald-600 to-sky-600 p-5 text-white shadow-md">
        <p className="text-sm font-semibold text-white/80">
          Your savings snapshot
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <SummaryItem label="Savings goal" value={`$${goal.toFixed(2)}`} />
          <SummaryItem
            label="Timeline"
            value={months > 0 ? `${months} mo` : "—"}
          />
          <SummaryItem label="Save monthly" value={`$${monthly.toFixed(2)}`} />
        </div>

        <div className="mt-5 rounded-2xl bg-white/15 p-4">
          <p className="text-sm text-white/85">
            {goal > 0 && months > 0
              ? `To reach your goal, set aside about $${monthly.toFixed(
                  2
                )} each month.`
              : "Add a goal amount and timeline to see your monthly savings target."}
          </p>
        </div>
      </div>

      {goal > 0 && months > 0 ? (
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-sm text-emerald-800">
          Small automatic transfers can make this easier. Even weekly deposits
          can help you stay on track.
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 p-4 text-sm text-slate-500">
          Add a goal amount and timeline to get started.
        </div>
      )}
    </section>
  );
}

function InputBlock({ label, type = "text", placeholder, value, onChange }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <input
        type={type}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base shadow-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

function SummaryItem({ label, value }) {
  return (
    <div className="rounded-2xl bg-white/15 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-white/70">
        {label}
      </p>
      <p className="mt-1 text-lg font-extrabold tabular-nums">{value}</p>
    </div>
  );
}
import React, { useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import AppBottomNav from "../components/AppBottomNav";
import { buildUrl } from "../utils/seo";

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function SavingsGoalPlanner() {
  const canonicalUrl = buildUrl("/tools/savings-goal");

  const [goalAmount, setGoalAmount] = useState("");
  const [currentSavings, setCurrentSavings] = useState("");
  const [months, setMonths] = useState("");

  const result = useMemo(() => {
    const goal = Number(goalAmount) || 0;
    const current = Number(currentSavings) || 0;
    const targetMonths = Number(months) || 0;

    const remaining = Math.max(goal - current, 0);
    const monthlyNeeded = targetMonths > 0 ? remaining / targetMonths : 0;
    const progress = goal > 0 ? Math.min((current / goal) * 100, 100) : 0;

    return { goal, current, targetMonths, remaining, monthlyNeeded, progress };
  }, [goalAmount, currentSavings, months]);

  const reset = () => {
    setGoalAmount("");
    setCurrentSavings("");
    setMonths("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-sky-50 px-4 pt-6 pb-24">
      <Helmet>
        <title>Savings Goal Planner | BuddyMoney</title>
        <meta
          name="description"
          content="Use BuddyMoney's free savings goal planner to estimate how much you need to save each month to reach your goal."
        />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <main className="mx-auto max-w-md">
        <section className="rounded-3xl bg-white border border-emerald-100 shadow-sm px-5 py-6 mb-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
            BuddyMoney Tool
          </p>

          <h1 className="text-2xl font-bold text-slate-900 mt-1">
            Savings Goal Planner
          </h1>

          <p className="text-sm text-slate-600 mt-2">
            Turn a big savings goal into a simple monthly target.
          </p>
        </section>

        <section className="rounded-3xl bg-white border border-slate-200 shadow-sm p-5 mb-5">
          <div className="space-y-4">
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">
                Goal amount
              </span>
              <input
                type="number"
                inputMode="decimal"
                min="0"
                value={goalAmount}
                onChange={(e) => setGoalAmount(e.target.value)}
                placeholder="5000"
                className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-slate-700">
                Current savings
              </span>
              <input
                type="number"
                inputMode="decimal"
                min="0"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(e.target.value)}
                placeholder="1000"
                className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-slate-700">
                Months to reach goal
              </span>
              <input
                type="number"
                inputMode="numeric"
                min="1"
                value={months}
                onChange={(e) => setMonths(e.target.value)}
                placeholder="12"
                className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
              />
            </label>
          </div>
        </section>

        <section className="rounded-3xl bg-gradient-to-br from-emerald-600 to-sky-600 text-white shadow-sm p-5 mb-5">
          <p className="text-sm opacity-90">You need to save about</p>

          <p className="text-3xl font-extrabold mt-1">
            {money.format(result.monthlyNeeded)}
          </p>

          <p className="text-sm opacity-90 mt-1">per month</p>

          <div className="mt-5 rounded-2xl bg-white/15 p-4">
            <div className="flex justify-between text-sm">
              <span>Remaining</span>
              <span>{money.format(result.remaining)}</span>
            </div>

            <div className="flex justify-between text-sm mt-2">
              <span>Progress</span>
              <span>{result.progress.toFixed(0)}%</span>
            </div>

            <div className="mt-3 h-3 rounded-full bg-white/20 overflow-hidden">
              <div
                className="h-full rounded-full bg-white transition-all"
                style={{ width: `${result.progress}%` }}
              />
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-white border border-slate-200 shadow-sm p-5 mb-5">
          <h2 className="text-lg font-bold text-slate-900">
            BuddyMoney tip
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            If the monthly number feels too high, try giving yourself more time
            or starting with a smaller milestone. Small automatic transfers can
            make big goals feel much easier.
          </p>
        </section>

        <button
          type="button"
          onClick={reset}
          className="w-full rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
        >
          Reset calculator
        </button>
      </main>

      <AppBottomNav />
    </div>
  );
}
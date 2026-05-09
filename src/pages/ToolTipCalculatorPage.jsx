import React, { useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { buildUrl } from "../utils/seo";
import AppBottomNav from "../components/AppBottomNav";

export default function ToolTipCalculatorPage() {
  const canonicalUrl = buildUrl("/tools/tip-calculator");

  const [billAmount, setBillAmount] = useState("");
  const [tipPercent, setTipPercent] = useState(20);
  const [people, setPeople] = useState(1);

  const results = useMemo(() => {
    const bill = Number(billAmount) || 0;
    const tip = bill * (Number(tipPercent) / 100);
    const total = bill + tip;
    const splitBy = Math.max(Number(people) || 1, 1);

    return {
      tip,
      total,
      perPerson: total / splitBy,
    };
  }, [billAmount, tipPercent, people]);

  const formatMoney = (amount) =>
    amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-indigo-50 px-4 py-8 pb-24">
      <Helmet>
        <title>Tip Calculator | BuddyMoney</title>
        <meta
          name="description"
          content="Use BuddyMoney's free tip calculator to quickly calculate a tip, total bill, and amount per person."
        />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <main className="mx-auto max-w-md">
        <section className="text-center mb-6">
          <p className="text-sm font-semibold text-sky-600 uppercase tracking-wide">
            BuddyMoney Tool
          </p>
          <h1 className="text-3xl font-bold text-slate-900 mt-2">
            Tip Calculator
          </h1>
          <p className="text-slate-600 mt-2">
            Calculate a tip, total bill, and optional split in seconds.
          </p>
        </section>

        <section className="rounded-3xl bg-white border border-slate-200 shadow-sm p-5">
          <label className="block mb-4">
            <span className="block text-sm font-semibold text-slate-700 mb-2">
              Bill amount
            </span>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                $
              </span>
              <input
                type="number"
                inputMode="decimal"
                min="0"
                value={billAmount}
                onChange={(e) => setBillAmount(e.target.value)}
                placeholder="50.00"
                className="w-full rounded-2xl border border-slate-300 bg-white py-3 pl-8 pr-4 text-lg font-semibold text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              />
            </div>
          </label>

          <div className="mb-4">
            <span className="block text-sm font-semibold text-slate-700 mb-2">
              Tip percentage
            </span>

            <div className="grid grid-cols-4 gap-2">
              {[15, 18, 20, 25].map((percent) => (
                <button
                  key={percent}
                  type="button"
                  onClick={() => setTipPercent(percent)}
                  className={`rounded-2xl px-3 py-3 text-sm font-bold transition ${
                    Number(tipPercent) === percent
                      ? "bg-sky-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {percent}%
                </button>
              ))}
            </div>

            <label className="block mt-3">
              <span className="sr-only">Custom tip percentage</span>
              <input
                type="number"
                inputMode="decimal"
                min="0"
                value={tipPercent}
                onChange={(e) => setTipPercent(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              />
            </label>
          </div>

          <label className="block mb-5">
            <span className="block text-sm font-semibold text-slate-700 mb-2">
              Split between
            </span>
            <input
              type="number"
              inputMode="numeric"
              min="1"
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
          </label>

          <div className="rounded-3xl bg-slate-900 text-white p-5">
            <div className="flex justify-between gap-4 py-2 border-b border-white/10">
              <span className="text-slate-300">Tip</span>
              <strong>{formatMoney(results.tip)}</strong>
            </div>

            <div className="flex justify-between gap-4 py-2 border-b border-white/10">
              <span className="text-slate-300">Total</span>
              <strong>{formatMoney(results.total)}</strong>
            </div>

            <div className="flex justify-between gap-4 py-2">
              <span className="text-slate-300">Per person</span>
              <strong>{formatMoney(results.perPerson)}</strong>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-rose-100 bg-rose-50 p-5 shadow-sm">
          <p className="text-sm font-semibold text-rose-700">
            Dining rewards tip
          </p>

          <h2 className="mt-2 text-xl font-bold text-slate-900">
            Eating out often?
          </h2>

          <p className="mt-2 text-sm text-slate-700">
            If restaurants, takeout, coffee runs, or group meals are part of
            your routine, the right credit card may help you earn cash back or
            points on money you already spend.
          </p>

          <Link
            to="/tools/credit-cards"
            className="mt-4 inline-flex rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Find cards for dining rewards
          </Link>

          <p className="mt-3 text-xs text-slate-500">
            Rewards are most valuable when balances are paid in full.
            BuddyMoney may earn a commission from some card partners.
          </p>
        </section>

        <div className="mt-5 text-center">
          <Link
            to="/tools/bill-splitter"
            className="text-sm font-semibold text-sky-700 hover:text-sky-900"
          >
            Need to split a full bill instead? Open Bill Splitter →
          </Link>
        </div>
      </main>

      <AppBottomNav />
    </div>
  );
}
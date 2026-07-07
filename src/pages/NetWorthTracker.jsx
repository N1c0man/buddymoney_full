import React, { useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import AppBottomNav from "../components/AppBottomNav";
import { buildUrl } from "../utils/seo";

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function NetWorthTracker() {
  const canonicalUrl = buildUrl("/tools/net-worth");

  const [cash, setCash] = useState("");
  const [investments, setInvestments] = useState("");
  const [homeValue, setHomeValue] = useState("");
  const [carValue, setCarValue] = useState("");
  const [otherAssets, setOtherAssets] = useState("");

  const [creditCards, setCreditCards] = useState("");
  const [loans, setLoans] = useState("");
  const [mortgage, setMortgage] = useState("");
  const [otherDebt, setOtherDebt] = useState("");

  const result = useMemo(() => {
    const assets =
      (Number(cash) || 0) +
      (Number(investments) || 0) +
      (Number(homeValue) || 0) +
      (Number(carValue) || 0) +
      (Number(otherAssets) || 0);

    const debts =
      (Number(creditCards) || 0) +
      (Number(loans) || 0) +
      (Number(mortgage) || 0) +
      (Number(otherDebt) || 0);

    const netWorth = assets - debts;

    return { assets, debts, netWorth };
  }, [
    cash,
    investments,
    homeValue,
    carValue,
    otherAssets,
    creditCards,
    loans,
    mortgage,
    otherDebt,
  ]);

  const reset = () => {
    setCash("");
    setInvestments("");
    setHomeValue("");
    setCarValue("");
    setOtherAssets("");
    setCreditCards("");
    setLoans("");
    setMortgage("");
    setOtherDebt("");
  };

  const message =
    result.netWorth > 0
      ? "You are building positive net worth. Keep tracking and improving one step at a time."
      : result.netWorth < 0
      ? "Your debts are currently higher than your assets. That is not the end of the story — tracking is the first step."
      : "Enter your assets and debts to see your full picture.";

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-sky-50 px-4 pt-6 pb-24">
      <Helmet>
        <title>Net Worth Tracker | BuddyMoney</title>
        <meta
          name="description"
          content="Use BuddyMoney's free net worth tracker to estimate your assets, debts, and overall financial picture."
        />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <main className="mx-auto max-w-md">
        <section className="rounded-3xl bg-white border border-emerald-100 shadow-sm px-5 py-6 mb-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
            BuddyMoney Tool
          </p>

          <h1 className="text-2xl font-bold text-slate-900 mt-1">
            Net Worth Tracker
          </h1>

          <p className="text-sm text-slate-600 mt-2">
            Add what you own, subtract what you owe, and see your big-picture progress.
          </p>
        </section>

        <section className="rounded-3xl bg-white border border-slate-200 shadow-sm p-5 mb-5">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Assets</h2>

          <div className="space-y-4">
            <MoneyInput label="Cash / checking / savings" value={cash} onChange={setCash} placeholder="2500" />
            <MoneyInput label="Investments / retirement" value={investments} onChange={setInvestments} placeholder="15000" />
            <MoneyInput label="Home value" value={homeValue} onChange={setHomeValue} placeholder="350000" />
            <MoneyInput label="Car value" value={carValue} onChange={setCarValue} placeholder="12000" />
            <MoneyInput label="Other assets" value={otherAssets} onChange={setOtherAssets} placeholder="1000" />
          </div>
        </section>

        <section className="rounded-3xl bg-white border border-slate-200 shadow-sm p-5 mb-5">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Debts</h2>

          <div className="space-y-4">
            <MoneyInput label="Credit card balances" value={creditCards} onChange={setCreditCards} placeholder="2500" />
            <MoneyInput label="Loans" value={loans} onChange={setLoans} placeholder="8000" />
            <MoneyInput label="Mortgage balance" value={mortgage} onChange={setMortgage} placeholder="250000" />
            <MoneyInput label="Other debt" value={otherDebt} onChange={setOtherDebt} placeholder="1000" />
          </div>
        </section>

        <section className="rounded-3xl bg-gradient-to-br from-emerald-600 to-sky-600 text-white shadow-sm p-5 mb-5">
          <p className="text-sm opacity-90">Estimated net worth</p>

          <p className="text-3xl font-extrabold mt-1">
            {money.format(result.netWorth)}
          </p>

          <div className="mt-5 rounded-2xl bg-white/15 p-4">
            <div className="flex justify-between text-sm">
              <span>Total assets</span>
              <span>{money.format(result.assets)}</span>
            </div>

            <div className="flex justify-between text-sm mt-2">
              <span>Total debts</span>
              <span>{money.format(result.debts)}</span>
            </div>
          </div>

          <p className="text-sm opacity-95 mt-4">{message}</p>
        </section>

        <section className="rounded-3xl bg-white border border-slate-200 shadow-sm p-5 mb-5">
          <h2 className="text-lg font-bold text-slate-900">
            BuddyMoney tip
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Net worth is not about judging yourself. It is a snapshot. Check it
            once a month, then focus on improving one number at a time.
          </p>
        </section>

        <button
          type="button"
          onClick={reset}
          className="w-full rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
        >
          Reset tracker
        </button>
      </main>

      <AppBottomNav />
    </div>
  );
}

function MoneyInput({ label, value, onChange, placeholder }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <input
        type="number"
        inputMode="decimal"
        min="0"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
      />
    </label>
  );
}
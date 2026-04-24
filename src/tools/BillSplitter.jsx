import React, { useState } from "react";

export default function BillSplitter() {
  const [total, setTotal] = useState("");
  const [people, setPeople] = useState(2);
  const [tip, setTip] = useState(20);

  const bill = Number(total) || 0;
  const splitBy = Math.max(Number(people) || 1, 1);
  const tipAmount = bill * ((Number(tip) || 0) / 100);
  const totalWithTip = bill + tipAmount;
  const each = totalWithTip / splitBy;

  return (
    <section
      id="split"
      className="rounded-3xl bg-white border border-slate-200 shadow-sm p-5"
    >
      {/* Header */}
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-sky-600">
          BuddyMoney Tool
        </p>
        <h2 className="text-2xl font-bold text-slate-900 mt-1 flex items-center gap-2">
          <span>🧾</span>
          Bill Splitter
        </h2>
        <p className="text-sm text-slate-600 mt-2">
          Add the bill, choose a tip, and see what each person pays.
        </p>
      </div>

      {/* Total bill */}
      <label className="block mb-4">
        <span className="block text-sm font-semibold text-slate-700 mb-2">
          Total bill
        </span>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
            $
          </span>
          <input
            type="number"
            inputMode="decimal"
            min="0"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            placeholder="120.50"
            className="w-full rounded-2xl border border-slate-300 bg-white py-3 pl-8 pr-4 text-lg font-semibold text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
          />
        </div>
      </label>

      {/* Tip percentage */}
      <div className="mb-4">
        <span className="block text-sm font-semibold text-slate-700 mb-2">
          Tip percentage
        </span>

        <div className="grid grid-cols-4 gap-2">
          {[15, 18, 20, 25].map((percent) => (
            <button
              key={percent}
              type="button"
              onClick={() => setTip(percent)}
              className={`rounded-2xl px-3 py-3 text-sm font-bold transition ${
                Number(tip) === percent
                  ? "bg-sky-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {percent}%
            </button>
          ))}
        </div>

        <input
          type="number"
          inputMode="decimal"
          min="0"
          value={tip}
          onChange={(e) => setTip(e.target.value)}
          className="mt-3 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
        />
      </div>

      {/* People */}
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

      {/* Summary */}
      <div className="rounded-3xl bg-slate-900 text-white p-5">
        <div className="flex justify-between gap-4 py-2 border-b border-white/10">
          <span className="text-slate-300">Bill</span>
          <strong>${bill.toFixed(2)}</strong>
        </div>

        <div className="flex justify-between gap-4 py-2 border-b border-white/10">
          <span className="text-slate-300">Tip ({Number(tip) || 0}%)</span>
          <strong>${tipAmount.toFixed(2)}</strong>
        </div>

        <div className="flex justify-between gap-4 py-2 border-b border-white/10">
          <span className="text-slate-300">Total</span>
          <strong>${totalWithTip.toFixed(2)}</strong>
        </div>

        <div className="flex justify-between gap-4 py-3 text-lg font-bold">
          <span className="text-slate-200">Per person</span>
          <strong>${each.toFixed(2)}</strong>
        </div>

        <div className="text-xs text-slate-400 mt-2">
          Split between {splitBy} {splitBy === 1 ? "person" : "people"}
        </div>
      </div>
    </section>
  );
}
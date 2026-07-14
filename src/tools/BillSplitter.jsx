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
      className="
        space-y-6
        rounded-[28px]
        border border-emerald-200
        bg-white
        p-5
        shadow-[0_12px_35px_rgba(15,118,110,0.08)]
        ring-1 ring-emerald-50
        md:p-6
      "
    >
      <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
          BuddyMoney Tool
        </p>

        <h2 className="mt-2 text-2xl font-extrabold text-slate-900">
          Bill Splitter & Tip Calculator
        </h2>

        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Enter the bill, choose a tip, split the total, and see what each person
          owes.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-slate-700">
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
              className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-8 pr-4 text-base font-semibold text-slate-900 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
            />
          </div>
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-slate-700">
            Custom tip %
          </span>

          <input
            type="number"
            inputMode="decimal"
            min="0"
            value={tip}
            onChange={(e) => setTip(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-slate-700">
            Split between
          </span>

          <input
            type="number"
            inputMode="numeric"
            min="1"
            value={people}
            onChange={(e) => setPeople(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
          />
        </label>
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold text-slate-700">
          Quick tip buttons
        </p>

        <div className="grid grid-cols-4 gap-2">
          {[15, 18, 20, 25].map((percent) => (
            <button
              key={percent}
              type="button"
              onClick={() => setTip(percent)}
              className={`rounded-2xl px-3 py-3 text-sm font-bold transition active:scale-[0.98] ${
                Number(tip) === percent
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
              }`}
            >
              {percent}%
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-3xl bg-gradient-to-br from-emerald-600 to-sky-600 p-5 text-white shadow-md">
        <p className="text-sm font-semibold text-white/80">
          Your split summary
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryItem label="Bill" value={`$${bill.toFixed(2)}`} />

          <SummaryItem
            label={`Tip (${Number(tip) || 0}%)`}
            value={`$${tipAmount.toFixed(2)}`}
          />

          <SummaryItem
            label="Total with tip"
            value={`$${totalWithTip.toFixed(2)}`}
          />

          <SummaryItem label="Each pays" value={`$${each.toFixed(2)}`} />
        </div>

        <div className="mt-5 rounded-2xl bg-white/15 p-4">
          <p className="text-sm text-white/85">
            Split between {splitBy} {splitBy === 1 ? "person" : "people"}.
          </p>
        </div>
      </div>
    </section>
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
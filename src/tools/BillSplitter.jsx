import React, { useState } from "react";

export default function BillSplitter() {
  const [total, setTotal] = useState(0);
  const [people, setPeople] = useState(2);
  const [tip, setTip] = useState(15); // percent

  const bill = total || 0;
  const tipAmount = bill * (tip / 100);
  const totalWithTip = bill + tipAmount;
  const each = people > 0 ? totalWithTip / people : 0;

  return (
    <section
      id="split"
      className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-600 mb-1">
            Tool
          </p>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="text-lg">🧮</span>
            Bill Splitter
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-md">
            Quickly split a bill with friends or family. Add the total, choose a
            tip, and see how much each person should pay.
          </p>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid gap-3 md:grid-cols-3 mb-6">
        {/* Total bill */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Total bill
          </label>
          <input
            type="number"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="e.g. 120.50"
            value={total}
            onChange={(e) => setTotal(parseFloat(e.target.value || 0))}
          />
        </div>

        {/* People */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Number of people
          </label>
          <input
            type="number"
            min={1}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="e.g. 3"
            value={people}
            onChange={(e) => setPeople(parseFloat(e.target.value || 0))}
          />
        </div>

        {/* Tip */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Tip (%)
          </label>
          <input
            type="number"
            min={0}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="e.g. 15"
            value={tip}
            onChange={(e) => setTip(parseFloat(e.target.value || 0))}
          />
        </div>
      </div>

      {/* Summary */}
      <div className="grid gap-4 md:grid-cols-3 items-stretch text-sm">
        {/* Bill + tip breakdown */}
        <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 flex flex-col gap-1">
          <div className="flex justify-between">
            <span className="text-slate-500">Bill:</span>
            <span className="tabular-nums text-slate-800">
              ${bill.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Tip ({tip || 0}%):</span>
            <span className="tabular-nums text-slate-800">
              ${tipAmount.toFixed(2)}
            </span>
          </div>
          <div className="mt-1 flex justify-between font-semibold">
            <span className="text-slate-700">Total with tip:</span>
            <span className="tabular-nums text-slate-900">
              ${totalWithTip.toFixed(2)}
            </span>
          </div>
        </div>

        {/* People */}
        <div className="rounded-xl border border-slate-100 bg-white px-4 py-3 flex flex-col justify-center">
          <div className="text-xs uppercase font-semibold text-slate-500 mb-1">
            People
          </div>
          <div className="text-lg font-semibold text-slate-900">
            {people > 0 ? people : 0}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Everyone splits the total evenly.
          </p>
        </div>

        {/* Per person */}
        <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 flex flex-col justify-center">
          <div className="text-xs uppercase font-semibold text-emerald-700 mb-1">
            Per person
          </div>
          <div className="text-xl font-bold text-emerald-700 tabular-nums">
            ${each.toFixed(2)}
          </div>
          <p className="text-xs text-emerald-700 mt-1">
            This is what each person pays including tip.
          </p>
        </div>
      </div>
    </section>
  );
}

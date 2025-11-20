import React, { useState } from "react";

export default function EmergencyFund() {
  const [monthly, setMonthly] = useState(0);
  const [months, setMonths] = useState(3);

  const fund = monthly * months;

  return (
    <section
      id="emergency"
      className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"
    >
      {/* HEADER */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-600 mb-1">
            Tool
          </p>

          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="text-lg">🛟</span>
            Emergency Fund Estimator
          </h2>

          <p className="text-xs text-slate-500 mt-1 max-w-md">
            Quickly calculate how much money you should have set aside for
            unexpected expenses like job loss, medical bills, or car repairs.
          </p>

          <p className="text-[11px] text-slate-500 mt-2">
            Most people aim for <span className="font-semibold">3–6 months</span> of
            essential expenses.
          </p>
        </div>
      </div>

      {/* INPUTS */}
      <div className="grid gap-3 md:grid-cols-3 mb-6">
        {/* Monthly expenses */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Monthly essential expenses
          </label>
          <input
            type="number"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="e.g. 2500"
            value={monthly}
            onChange={(e) => setMonthly(parseFloat(e.target.value || 0))}
          />
        </div>

        {/* Months of coverage */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Months of coverage
          </label>
          <input
            type="number"
            min={1}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="e.g. 3"
            value={months}
            onChange={(e) => setMonths(parseFloat(e.target.value || 0))}
          />

          <p className="text-[10px] text-slate-500 mt-1">
            Tip: 3 months = good start, 6 months = very safe.
          </p>
        </div>

        {/* Result box */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Total fund needed
          </label>
          <div className="rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-3 flex items-center text-sm font-semibold text-emerald-700 h-full">
            ${fund.toFixed(2)}
          </div>
        </div>
      </div>

      {/* SUMMARY + VISUAL */}
      {monthly > 0 && months > 0 && (
        <div className="space-y-4">
          {/* Summary line */}
          <div className="flex flex-wrap gap-4 text-sm text-slate-600">
            <div>
              <span className="font-semibold">Monthly expenses:</span>{" "}
              <span className="tabular-nums">${monthly.toFixed(2)}</span>
            </div>

            <div>
              <span className="font-semibold">Months saved for:</span>{" "}
              <span className="tabular-nums">{months}</span>
            </div>

            <div>
              <span className="font-semibold">Goal:</span>{" "}
              <span className="tabular-nums font-semibold text-emerald-700">
                ${fund.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Timeline bar */}
          <div>
            <div className="flex justify-between text-xs text-slate-600 mb-1">
              <span>Coverage length</span>
              <span>{months} months</span>
            </div>

            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full"
                style={{ width: `${(months / 6) * 100}%` }} // 6 months = full bar
              ></div>
            </div>

            <p className="text-[10px] text-slate-500 mt-1">
              (Bar fills completely at 6 months)
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

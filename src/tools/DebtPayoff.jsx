import React, { useState } from "react";

export default function DebtPayoff() {
  const [amount, setAmount] = useState(0);
  const [rate, setRate] = useState(0);
  const [payment, setPayment] = useState(0);

  // Your exact payoff formula preserved
  const months = (() => {
    if (payment <= 0 || amount <= 0 || rate < 0) return 0;
    const r = rate / 100 / 12;
    const n = Math.log(payment / (payment - r * amount)) / Math.log(1 + r);
    return Math.ceil(n > 0 ? n : 0);
  })();

  // Total interest (your logic stays the same)
  const totalPaid = months * payment;
  const interestPaid = totalPaid - amount;

  return (
    <section
      id="debt"
      className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"
    >
      {/* HEADER */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-600 mb-1">
            Tool
          </p>

          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="text-lg">📉</span>
            Debt Payoff Estimator
          </h2>

          <p className="text-xs text-slate-500 mt-1 max-w-md">
            Enter your debt amount, interest rate, and monthly payment. We’ll
            estimate how long it will take to become debt-free using your exact
            payoff math.
          </p>
        </div>
      </div>

      {/* INPUTS */}
      <div className="grid gap-3 md:grid-cols-4 mb-6">
        {/* Debt Amount */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Debt amount
          </label>
          <input
            type="number"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="e.g. 4500"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value || 0))}
          />
        </div>

        {/* APR */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            APR %
          </label>
          <input
            type="number"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="e.g. 18"
            value={rate}
            onChange={(e) => setRate(parseFloat(e.target.value || 0))}
          />
        </div>

        {/* Monthly Payment */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Monthly payment
          </label>
          <input
            type="number"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="e.g. 150"
            value={payment}
            onChange={(e) => setPayment(parseFloat(e.target.value || 0))}
          />
        </div>

        {/* Months tile */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Result
          </label>

          <div className="rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-2 flex items-center text-sm font-semibold text-emerald-700 h-full">
            {months ? `${months} months` : "—"}
          </div>
        </div>
      </div>

      {/* ERROR STATE */}
      {payment > 0 && amount > 0 && rate > 0 && payment <= (amount * (rate / 100 / 12)) && (
        <div className="text-xs text-rose-600 bg-rose-50 border border-rose-200 px-3 py-2 rounded-lg mb-4">
          Your payment is too low to cover the monthly interest. Increase the
          payment amount to see a payoff date.
        </div>
      )}

      {/* RESULTS */}
      {months > 0 && payment > (amount * (rate / 100 / 12)) && (
        <div className="space-y-4">
          {/* SUMMARY BOXES */}
          <div className="grid gap-4 md:grid-cols-3 text-sm">

            {/* Time */}
            <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 flex flex-col gap-1">
              <span className="text-xs uppercase font-semibold text-slate-500">
                Time to pay off
              </span>
              <span className="text-lg font-bold text-slate-900 tabular-nums">
                {months} months
              </span>
              <span className="text-xs text-slate-500">
                ≈ {(months / 12).toFixed(1)} years
              </span>
            </div>

            {/* Interest */}
            <div className="rounded-xl border border-slate-100 bg-white px-4 py-3 flex flex-col gap-1">
              <span className="text-xs uppercase font-semibold text-slate-500">
                Total interest paid
              </span>
              <span className="text-lg font-bold text-rose-600 tabular-nums">
                ${interestPaid.toFixed(2)}
              </span>
            </div>

            {/* Total */}
            <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 flex flex-col gap-1">
              <span className="text-xs uppercase font-semibold text-emerald-700">
                Total paid
              </span>
              <span className="text-lg font-bold text-emerald-700 tabular-nums">
                ${totalPaid.toFixed(2)}
              </span>
            </div>
          </div>

          {/* TIMELINE BAR */}
          <div>
            <div className="flex justify-between text-xs text-slate-600 mb-1">
              <span>Progress</span>
              <span>{months} months</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full"
                style={{ width: `${(1 / months) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

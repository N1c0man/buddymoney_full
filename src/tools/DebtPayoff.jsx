import React, { useState } from "react";

export default function DebtPayoff() {
  const [amount, setAmount] = useState(0);
  const [rate, setRate] = useState(0);
  const [payment, setPayment] = useState(0);

  const months = (() => {
    if (payment <= 0 || amount <= 0 || rate < 0) return 0;
    const r = rate / 100 / 12;
    const n =
      Math.log(payment / (payment - r * amount)) / Math.log(1 + r);
    return Math.ceil(n > 0 ? n : 0);
  })();

  const totalPaid = months * payment;
  const interestPaid = totalPaid - amount;

  const tooLowPayment =
    payment > 0 &&
    amount > 0 &&
    rate > 0 &&
    payment <= amount * (rate / 100 / 12);

  return (
    <section
      id="debt"
      className="bg-white rounded-3xl p-6 shadow-md border border-slate-200 space-y-6"
    >
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          📉 Debt Payoff Estimator
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-md">
          Estimate how long it will take to pay off your debt based on your
          balance, APR, and monthly payment.
        </p>
      </div>

      {/* Inputs */}
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Debt amount
          </label>
          <input
            type="number"
            className="w-full border border-slate-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="4500"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value || 0))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            APR %
          </label>
          <input
            type="number"
            className="w-full border border-slate-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="18"
            value={rate}
            onChange={(e) => setRate(parseFloat(e.target.value || 0))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Monthly payment
          </label>
          <input
            type="number"
            className="w-full border border-slate-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="150"
            value={payment}
            onChange={(e) => setPayment(parseFloat(e.target.value || 0))}
          />
        </div>
      </div>

      {/* Error */}
      {tooLowPayment && (
        <div className="rounded-2xl bg-rose-50 border border-rose-200 p-4 text-sm text-rose-700">
          Your payment is too low to cover the monthly interest. Increase your
          payment to see a payoff timeline.
        </div>
      )}

      {/* Summary Panel */}
      <div className="bg-black text-white rounded-2xl p-5 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-slate-300">Time to pay off</span>
          <span className="font-semibold">
            {months ? `${months} months` : "—"}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-slate-300">Interest paid</span>
          <span className="font-semibold text-rose-400">
            ${months ? interestPaid.toFixed(2) : "0.00"}
          </span>
        </div>

        <div className="border-t border-white/10 pt-3 flex justify-between items-center">
          <span className="text-sm text-slate-300">Total paid</span>
          <span className="text-lg font-bold text-emerald-400">
            ${months ? totalPaid.toFixed(2) : "0.00"}
          </span>
        </div>
      </div>

      {/* Helper */}
      {months > 0 && !tooLowPayment ? (
        <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-4 text-sm text-emerald-800">
          You’ll be debt-free in{" "}
          <span className="font-semibold">{months} months</span> (
          {(months / 12).toFixed(1)} years). Staying consistent with your payment
          will save you{" "}
          <span className="font-semibold">
            ${interestPaid.toFixed(2)}
          </span>{" "}
          in interest.
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 p-4 text-sm text-slate-500">
          Enter your debt details to estimate your payoff timeline.
        </div>
        
      )}
    </section>
  );
}
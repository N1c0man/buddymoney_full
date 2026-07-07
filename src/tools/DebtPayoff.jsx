import React, { useEffect, useState } from "react";

const STORAGE_KEY = "bm_debt_payoff";

export default function DebtPayoff() {
  const [amountInput, setAmountInput] = useState("");
  const [rateInput, setRateInput] = useState("");
  const [paymentInput, setPaymentInput] = useState("");

  const amount = parseFloat(amountInput) || 0;
  const rate = parseFloat(rateInput) || 0;
  const payment = parseFloat(paymentInput) || 0;

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!saved) return;

      setAmountInput(saved.amount ? String(saved.amount) : "");
      setRateInput(saved.rate ? String(saved.rate) : "");
      setPaymentInput(saved.payment ? String(saved.payment) : "");
    } catch {
      // If saved data is broken, ignore it safely.
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          amount: amountInput,
          rate: rateInput,
          payment: paymentInput,
        })
      );
    } catch {
      // If localStorage is unavailable, the tool still works.
    }
  }, [amountInput, rateInput, paymentInput]);

  const handleReset = () => {
    setAmountInput("");
    setRateInput("");
    setPaymentInput("");

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  const months = (() => {
    if (payment <= 0 || amount <= 0 || rate < 0) return 0;

    const r = rate / 100 / 12;

    if (r === 0) {
      return Math.ceil(amount / payment);
    }

    if (payment <= r * amount) return 0;

    const n = Math.log(payment / (payment - r * amount)) / Math.log(1 + r);
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
      className="rounded-3xl border border-emerald-100 bg-white/95 p-5 shadow-sm md:p-6 space-y-6"
    >
      <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
              BuddyMoney Tool
            </p>

            <h2 className="mt-2 text-2xl font-extrabold text-slate-900">
              Debt Payoff Estimator
            </h2>

            <p className="mt-2 text-sm text-slate-600 max-w-2xl">
              Estimate how long it may take to pay off a balance based on your
              debt amount, APR, and monthly payment.
            </p>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="shrink-0 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <InputBlock
          label="Debt amount"
          type="number"
          placeholder="4500"
          value={amountInput}
          onChange={(e) => setAmountInput(e.target.value)}
        />

        <InputBlock
          label="APR %"
          type="number"
          placeholder="18"
          value={rateInput}
          onChange={(e) => setRateInput(e.target.value)}
        />

        <InputBlock
          label="Monthly payment"
          type="number"
          placeholder="150"
          value={paymentInput}
          onChange={(e) => setPaymentInput(e.target.value)}
        />
      </div>

      {tooLowPayment && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-medium text-rose-700">
          Your payment is too low to cover the monthly interest. Increase your
          payment to see a payoff timeline.
        </div>
      )}

      <div className="rounded-3xl bg-gradient-to-br from-emerald-600 to-sky-600 p-5 text-white shadow-md">
        <p className="text-sm font-semibold text-white/80">
          Your payoff snapshot
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <SummaryItem
            label="Time to pay off"
            value={months ? `${months} mo` : "—"}
          />
          <SummaryItem
            label="Interest paid"
            value={`$${months ? interestPaid.toFixed(2) : "0.00"}`}
          />
          <SummaryItem
            label="Total paid"
            value={`$${months ? totalPaid.toFixed(2) : "0.00"}`}
          />
        </div>

        <div className="mt-5 rounded-2xl bg-white/15 p-4">
          <p className="text-sm text-white/85">
            {months > 0 && !tooLowPayment
              ? `You could be debt-free in ${months} months, or about ${(
                  months / 12
                ).toFixed(1)} years, if you keep making this payment.`
              : "Enter your debt details to estimate your payoff timeline."}
          </p>
        </div>
      </div>

      {months > 0 && !tooLowPayment ? (
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-sm text-emerald-800">
          Staying consistent with your payment plan is the key. A higher monthly
          payment can shorten the timeline and reduce interest.
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 p-4 text-sm text-slate-500">
          Enter your debt amount, APR, and monthly payment to get started.
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
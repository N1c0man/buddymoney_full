import React, { useMemo, useState } from "react";

const formatMoney = (value) => {
  if (!Number.isFinite(value)) return "$0.00";
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

const toNumber = (value) => {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

export default function MonthlyPaymentCalculator() {
  const [loanAmount, setLoanAmount] = useState("25000");
  const [interestRate, setInterestRate] = useState("7");
  const [loanYears, setLoanYears] = useState("5");

  const results = useMemo(() => {
    const principal = toNumber(loanAmount);
    const annualRate = toNumber(interestRate);
    const years = toNumber(loanYears);

    const months = Math.max(years * 12, 0);
    const monthlyRate = annualRate / 100 / 12;

    if (principal <= 0 || months <= 0) {
      return {
        monthlyPayment: 0,
        totalPaid: 0,
        totalInterest: 0,
        months: 0,
      };
    }

    let monthlyPayment = 0;

    if (monthlyRate === 0) {
      monthlyPayment = principal / months;
    } else {
      monthlyPayment =
        principal *
        (monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
    }

    const totalPaid = monthlyPayment * months;
    const totalInterest = totalPaid - principal;

    return {
      monthlyPayment,
      totalPaid,
      totalInterest,
      months,
    };
  }, [loanAmount, interestRate, loanYears]);

  const resetCalculator = () => {
    setLoanAmount("25000");
    setInterestRate("7");
    setLoanYears("5");
  };

  return (
    <div className="rounded-3xl border border-emerald-100 bg-white p-5 sm:p-6 shadow-sm">
      <div className="mb-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
          Monthly Payment Calculator
        </p>
        <h2 className="mt-1 text-xl font-bold text-slate-900">
          Estimate a monthly loan payment
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Enter a loan amount, interest rate, and term to estimate the monthly
          payment, total paid, and total interest.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="space-y-1">
          <span className="text-sm font-medium text-slate-700">
            Loan amount
          </span>
          <input
            type="number"
            min="0"
            inputMode="decimal"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
            placeholder="25000"
          />
        </label>

        <label className="space-y-1">
          <span className="text-sm font-medium text-slate-700">
            Interest rate %
          </span>
          <input
            type="number"
            min="0"
            step="0.01"
            inputMode="decimal"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
            placeholder="7"
          />
        </label>

        <label className="space-y-1">
          <span className="text-sm font-medium text-slate-700">
            Loan term years
          </span>
          <input
            type="number"
            min="0"
            step="1"
            inputMode="decimal"
            value={loanYears}
            onChange={(e) => setLoanYears(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
            placeholder="5"
          />
        </label>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-emerald-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
            Monthly payment
          </p>
          <p className="mt-2 text-2xl font-extrabold text-emerald-800">
            {formatMoney(results.monthlyPayment)}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Total interest
          </p>
          <p className="mt-2 text-xl font-bold text-slate-900">
            {formatMoney(results.totalInterest)}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Total paid
          </p>
          <p className="mt-2 text-xl font-bold text-slate-900">
            {formatMoney(results.totalPaid)}
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-amber-100 bg-amber-50 p-4 text-sm text-amber-900">
        This is an estimate, not a loan offer. Actual payments can vary based on
        fees, taxes, insurance, lender rules, and your final loan terms.
      </div>

      <button
        type="button"
        onClick={resetCalculator}
        className="mt-5 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
      >
        Reset calculator
      </button>
    </div>
  );
}
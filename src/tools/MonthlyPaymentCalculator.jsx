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
    <section className="rounded-3xl border border-emerald-100 bg-white/95 p-5 shadow-sm md:p-6 space-y-6">
      <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
              BuddyMoney Tool
            </p>

            <h2 className="mt-2 text-2xl font-extrabold text-slate-900">
              Monthly Payment Calculator
            </h2>

            <p className="mt-2 text-sm text-slate-600 max-w-2xl">
              Estimate a monthly loan payment using the loan amount, interest
              rate, and repayment term.
            </p>
          </div>

          <button
            type="button"
            onClick={resetCalculator}
            className="shrink-0 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <InputBlock
          label="Loan amount"
          type="number"
          min="0"
          placeholder="25000"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
        />

        <InputBlock
          label="Interest rate %"
          type="number"
          min="0"
          step="0.01"
          placeholder="7"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
        />

        <InputBlock
          label="Loan term years"
          type="number"
          min="0"
          step="1"
          placeholder="5"
          value={loanYears}
          onChange={(e) => setLoanYears(e.target.value)}
        />
      </div>

      <div className="rounded-3xl bg-gradient-to-br from-emerald-600 to-sky-600 p-5 text-white shadow-md">
        <p className="text-sm font-semibold text-white/80">
          Your payment snapshot
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <SummaryItem
            label="Monthly payment"
            value={formatMoney(results.monthlyPayment)}
          />
          <SummaryItem
            label="Total interest"
            value={formatMoney(results.totalInterest)}
          />
          <SummaryItem label="Total paid" value={formatMoney(results.totalPaid)} />
        </div>

        <div className="mt-5 rounded-2xl bg-white/15 p-4">
          <p className="text-sm text-white/85">
            A lower rate, shorter term, or smaller loan balance can reduce the
            total interest you pay over time.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4 text-sm text-amber-900">
        This is an estimate, not a loan offer. Actual payments can vary based on
        fees, taxes, insurance, lender rules, and final loan terms.
      </div>
    </section>
  );
}

function InputBlock({
  label,
  type = "text",
  min,
  step,
  placeholder,
  value,
  onChange,
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-semibold text-slate-700">
        {label}
      </span>

      <input
        type={type}
        min={min}
        step={step}
        inputMode="decimal"
        value={value}
        onChange={onChange}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
        placeholder={placeholder}
      />
    </label>
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
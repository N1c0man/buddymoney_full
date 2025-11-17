import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

export default function MortgagePayoff() {
  // Defaults you can tweak
  const [principal, setPrincipal] = useState(300000);
  const [rate, setRate] = useState(6.5); // APR %
  const [years, setYears] = useState(30);
  const [extra, setExtra] = useState(100); // extra monthly payment

  const monthlyRate = rate / 100 / 12;
  const nPayments = years * 12;

  // Standard monthly payment (without extra)
  const basePayment = useMemo(() => {
    if (monthlyRate === 0) return principal / nPayments;
    const factor = Math.pow(1 + monthlyRate, nPayments);
    return (principal * monthlyRate * factor) / (factor - 1);
  }, [principal, monthlyRate, nPayments]);

  // Total interest if you pay only the basePayment for full term
  const totalInterestNormal = useMemo(() => {
    return basePayment * nPayments - principal;
  }, [basePayment, nPayments, principal]);

  // Simulate payoff with extra payment each month
  const sim = useMemo(() => simulatePayoff(principal, monthlyRate, basePayment, extra), [
    principal,
    monthlyRate,
    basePayment,
    extra,
  ]);

  const savings = Math.max(0, totalInterestNormal - sim.totalInterest);
  const payoffYears = Math.floor(sim.months / 12);
  const payoffMonthsRemainder = sim.months % 12;

  const fmt = (n, digits = 0) =>
    Number(n || 0).toLocaleString(undefined, { maximumFractionDigits: digits });

  return (
    <motion.section
      className="max-w-6xl mx-auto px-4 py-10"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold text-[#1e3a8a]">Mortgage Payoff Calculator</h1>
        <p className="text-gray-600 mt-2">
          See how extra monthly payments reduce your payoff time and total interest.
        </p>
      </header>

      {/* Inputs */}
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Input label="Loan Amount ($)"
               value={principal}
               onChange={(v) => setPrincipal(safeNum(v))}
               placeholder="300000" />
        <Input label="Interest Rate (%)"
               value={rate}
               onChange={(v) => setRate(safeNum(v))}
               placeholder="6.5" />
        <Input label="Term (Years)"
               value={years}
               onChange={(v) => setYears(safeNum(v))}
               placeholder="30" />
        <Input label="Extra Payment ($/mo)"
               value={extra}
               onChange={(v) => setExtra(safeNum(v))}
               placeholder="100" />
      </div>

      {/* Summary cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card title="Base Monthly Payment" value={`$${fmt(basePayment)}`} />
        <Card title="Payoff Time (with extra)" value={`${payoffYears} yr ${payoffMonthsRemainder} mo`} />
        <Card title="Total Interest (with extra)" value={`$${fmt(sim.totalInterest)}`} />
        <Card title="Interest Saved vs Normal" value={`$${fmt(savings)}`} highlight="green" />
      </div>

      {/* Progress & insights */}
      <div className="mt-8 grid lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border p-5 bg-white">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Paydown Progress (simulated)</h3>
          <MiniBars schedule={sim.sampled} />
          <p className="text-xs text-gray-500 mt-2">
            Each bar shows remaining balance at a few points in time (start → mid → end). Extra payments accelerate the drop.
          </p>
        </div>

        <div className="rounded-2xl border p-5 bg-green-50 border-green-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Coach Tips</h3>
          <ul className="list-disc ml-5 text-gray-700 space-y-1 text-sm">
            <li>Even small extra payments compound—try rounding your payment up by $50–$200.</li>
            <li>Use windfalls (tax refunds, bonuses) as one-time extra payments to cut months off the loan.</li>
            <li>Compare bi-weekly vs. monthly payments; bi-weekly effectively adds one extra payment per year.</li>
          </ul>
        </div>
      </div>

      {/* Optional: Download schedule */}
      <details className="mt-8 rounded-2xl border p-5 bg-white">
        <summary className="cursor-pointer font-semibold text-gray-800">
          Show detailed amortization (first 24 months)
        </summary>
        <div className="overflow-auto mt-3">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600">
                <th className="py-2 pr-4">Month</th>
                <th className="py-2 pr-4">Payment</th>
                <th className="py-2 pr-4">Interest</th>
                <th className="py-2 pr-4">Principal</th>
                <th className="py-2 pr-4">Balance</th>
              </tr>
            </thead>
            <tbody>
              {sim.schedule.slice(0, 24).map((row) => (
                <tr key={row.month} className="border-t">
                  <td className="py-2 pr-4">{row.month}</td>
                  <td className="py-2 pr-4">${fmt(row.payment)}</td>
                  <td className="py-2 pr-4">${fmt(row.interest)}</td>
                  <td className="py-2 pr-4">${fmt(row.principal)}</td>
                  <td className="py-2 pr-4">${fmt(row.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </motion.section>
  );
}

/* ---------- helpers & subcomponents ---------- */

function safeNum(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function simulatePayoff(principal, monthlyRate, basePayment, extra) {
  const schedule = [];
  const payment = Math.max(0, basePayment + (extra || 0));
  let balance = principal;
  let months = 0;
  let totalInterest = 0;

  // Avoid infinite loop: cap at 100 years of months
  while (balance > 0 && months < 1200) {
    const interest = balance * monthlyRate;
    const principalPaid = Math.min(payment - interest, balance);
    const actualPayment = Math.max(0, principalPaid + interest);

    balance = Math.max(0, balance - principalPaid);
    totalInterest += Math.max(0, interest);
    months++;

    schedule.push({
      month: months,
      payment: actualPayment,
      interest: Math.max(0, interest),
      principal: Math.max(0, principalPaid),
      balance: balance,
    });

    // If rate is 0% and extra is 0, bail to prevent stuck loop on rounding
    if (monthlyRate === 0 && payment <= 0) break;
  }

  // Sample a few points (start, 25%, 50%, 75%, end) for mini bars
  const checkpoints = [0, 0.25, 0.5, 0.75, 1];
  const sampled = checkpoints.map((p) => {
    const idx = Math.min(schedule.length - 1, Math.round((schedule.length - 1) * p));
    return { month: schedule[idx]?.month || 0, balance: schedule[idx]?.balance || 0 };
  });

  return { months, totalInterest, schedule, sampled };
}

function Input({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type="number"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#84cc16]"
      />
    </div>
  );
}

function Card({ title, value, highlight }) {
  const color =
    highlight === "green"
      ? "text-green-700"
      : highlight === "red"
      ? "text-red-700"
      : "text-[#1e3a8a]";
  return (
    <div className="bg-white shadow rounded-xl p-5 border">
      <h3 className="text-sm text-gray-600">{title}</h3>
      <p className={`text-2xl font-bold mt-1 ${color}`}>{value}</p>
    </div>
  );
}

// Simple mini-bars visualization (no external chart libs)
function MiniBars({ schedule }) {
  if (!schedule || schedule.length === 0) return null;
  const max = schedule[0].balance || 1;
  return (
    <div className="flex items-end gap-3 h-24">
      {schedule.map((s, i) => {
        const pct = max > 0 ? (s.balance / max) * 100 : 0;
        return (
          <div key={i} className="flex-1">
            <div
              className="w-full rounded-t bg-[#1e3a8a]"
              style={{ height: `${pct}%`, minHeight: 6 }}
              title={`Month ${s.month}: $${Number(s.balance).toLocaleString()}`}
            />
            <div className="text-[10px] text-gray-600 text-center mt-1">{s.month}</div>
          </div>
        );
      })}
    </div>
  );
}

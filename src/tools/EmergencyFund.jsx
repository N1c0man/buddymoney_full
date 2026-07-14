import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const STORAGE_KEY = "bm_emergency_fund";

export default function EmergencyFund() {
  const [monthlyInput, setMonthlyInput] = useState("");
  const [monthsInput, setMonthsInput] = useState("3");

  const monthly = parseFloat(monthlyInput) || 0;
  const months = parseFloat(monthsInput) || 0;

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!saved) return;

      setMonthlyInput(saved.monthly ? String(saved.monthly) : "");
      setMonthsInput(saved.months ? String(saved.months) : "3");
    } catch {
      // Ignore broken saved data safely.
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          monthly: monthlyInput,
          months: monthsInput,
        })
      );
    } catch {
      // Tool still works if localStorage is unavailable.
    }
  }, [monthlyInput, monthsInput]);

  const handleReset = () => {
    setMonthlyInput("");
    setMonthsInput("3");

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  const fund = monthly * months;
  const safeMonths = Math.max(0, Math.min(months || 0, 6));
  const barWidth = `${(safeMonths / 6) * 100}%`;

  return (
    <section className="rounded-3xl border border-emerald-100 bg-white/95 p-5 shadow-sm md:p-6 space-y-6">
      <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
              BuddyMoney Tool
            </p>

            <h2 className="mt-2 text-2xl font-extrabold text-slate-900">
              Emergency Fund Planner
            </h2>

            <p className="mt-2 text-sm text-slate-600 max-w-2xl">
              Estimate how much money to keep aside for surprise expenses, job
              changes, repairs, or stressful “life happens” moments.
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

      <div className="grid gap-4 md:grid-cols-2">
        <InputBlock
          label="Monthly essential expenses"
          type="number"
          placeholder="2500"
          value={monthlyInput}
          onChange={(e) => setMonthlyInput(e.target.value)}
        />

        <InputBlock
          label="Months of coverage"
          type="number"
          placeholder="3"
          value={monthsInput}
          onChange={(e) => setMonthsInput(e.target.value)}
        />
      </div>

      <div className="rounded-3xl bg-gradient-to-br from-emerald-600 to-sky-600 p-5 text-white shadow-md">
        <p className="text-sm font-semibold text-white/80">
          Your emergency fund target
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <SummaryItem label="Monthly expenses" value={`$${monthly.toFixed(2)}`} />
          <SummaryItem
            label="Coverage"
            value={monthsInput ? `${months} mo` : "—"}
          />
          <SummaryItem label="Target fund" value={`$${fund.toFixed(2)}`} />
        </div>

        {monthly > 0 && months > 0 && (
          <div className="mt-5 rounded-2xl bg-white/15 p-4">
            <div className="mb-2 flex justify-between text-xs font-semibold text-white/80">
              <span>Coverage strength</span>
              <span>{months} months</span>
            </div>

            <div className="h-2 w-full overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-white"
                style={{ width: barWidth }}
              />
            </div>

            <p className="mt-2 text-xs text-white/75">
              3 months = solid base · 6 months = strong protection
            </p>
          </div>
        )}
      </div>

      {monthly > 0 && months > 0 ? (
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-sm text-emerald-800">
          Saving <span className="font-semibold">${fund.toFixed(2)}</span>{" "}
          gives you <span className="font-semibold">{months} months</span> of
          financial protection.
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 p-4 text-sm text-slate-500">
          Enter your monthly essentials and target months to estimate your
          emergency fund.
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <InfoCard
          title="What should it cover?"
          items={[
            "Housing, rent, or mortgage",
            "Utilities and groceries",
            "Insurance",
            "Transportation",
            "Minimum debt payments",
          ]}
        />

        <InfoCard
          title="When aim for 6 months?"
          items={[
            "Income is inconsistent",
            "You are self-employed",
            "You support a family",
            "There is job uncertainty",
          ]}
        />
      </div>

      <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
        <h3 className="text-sm font-bold text-slate-900">Related guides</h3>

        <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
          <RelatedLink to="/blog/emergency-fund-basics">
            Emergency Fund Basics →
          </RelatedLink>
          <RelatedLink to="/blog/emergency-fund-3-to-6-months">
            Build a 3–6 Month Fund →
          </RelatedLink>
          <RelatedLink to="/tools/budget-coach">Budget Coach →</RelatedLink>
          <RelatedLink to="/tools/debt-payoff">
            Debt Payoff Planner →
          </RelatedLink>
        </div>
      </div>
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

function InfoCard({ title, items }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
      <h3 className="text-sm font-bold text-slate-900">{title}</h3>

      <ul className="mt-3 space-y-1 text-sm text-slate-600">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}

function RelatedLink({ to, children }) {
  return (
    <Link
      to={to}
      className="rounded-xl bg-white px-3 py-2 font-semibold text-emerald-700 shadow-sm transition hover:bg-emerald-100"
    >
      {children}
    </Link>
  );
}
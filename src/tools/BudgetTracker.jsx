import React, { useState } from "react";

export default function BudgetTracker() {
  const [income, setIncome] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [items, setItems] = useState([]);

  const numericIncome = parseFloat(income) || 0;
  const total = items.reduce((s, i) => s + i.amount, 0);
  const balance = numericIncome - total;

  const handleAdd = () => {
    if (!name || !amount) return;

    const numericAmount = parseFloat(amount);
    if (Number.isNaN(numericAmount)) return;

    setItems([...items, { name, amount: numericAmount }]);
    setName("");
    setAmount("");
  };

  const handleRemove = (indexToRemove) => {
    setItems(items.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <section
      id="budget"
      className="rounded-3xl border border-emerald-100 bg-white/95 p-5 shadow-sm md:p-6 space-y-6"
    >
      <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
          BuddyMoney Tool
        </p>

        <h2 className="mt-2 text-2xl font-extrabold text-slate-900">
          Monthly Budget Planner
        </h2>

        <p className="mt-2 text-sm text-slate-600 max-w-2xl">
          Add your income and monthly expenses to see what is left over. Use this
          as a simple money checkup before planning savings, debt payoff, or
          bigger goals.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <InputBlock
          label="Monthly income"
          type="number"
          placeholder="3500"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
        />

        <InputBlock
          label="Expense name"
          placeholder="Rent, groceries..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700">
            Amount
          </label>

          <div className="flex gap-2">
            <input
              type="number"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base shadow-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
              placeholder="1200"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <button
              type="button"
              onClick={handleAdd}
              className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-500 active:scale-[0.98]"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
        <h3 className="text-sm font-bold text-slate-900">Monthly expenses</h3>

        {items.length === 0 ? (
          <div className="mt-3 rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-500">
            No expenses yet. Add your first expense above.
          </div>
        ) : (
          <ul className="mt-3 divide-y divide-slate-200 text-sm">
            {items.map((i, idx) => (
              <li key={idx} className="flex items-center justify-between py-3">
                <span className="font-semibold text-slate-800">{i.name}</span>

                <div className="flex items-center gap-4">
                  <span className="tabular-nums font-semibold text-slate-800">
                    ${i.amount.toFixed(2)}
                  </span>

                  <button
                    type="button"
                    className="text-xs font-semibold text-slate-400 transition hover:text-rose-500"
                    onClick={() => handleRemove(idx)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="rounded-3xl bg-gradient-to-br from-emerald-600 to-sky-600 p-5 text-white shadow-md">
        <p className="text-sm font-semibold text-white/80">
          Your monthly snapshot
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <SummaryItem label="Income" value={`$${numericIncome.toFixed(2)}`} />
          <SummaryItem label="Expenses" value={`$${total.toFixed(2)}`} />
          <SummaryItem label="Remaining" value={`$${balance.toFixed(2)}`} />
        </div>

        <div className="mt-5 rounded-2xl bg-white/15 p-4">
          <p className="text-sm text-white/85">
            {balance >= 0
              ? "Nice — your budget has money left over. Consider sending some of it toward savings, debt payoff, or your emergency fund."
              : "Your expenses are higher than your income right now. Look for one or two categories you can trim first."}
          </p>
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
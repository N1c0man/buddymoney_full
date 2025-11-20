import React, { useState } from "react";

export default function BudgetTracker() {
  const [income, setIncome] = useState(0);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [items, setItems] = useState([]);

  const total = items.reduce((s, i) => s + i.amount, 0);
  const balance = income - total;

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
      className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-600 mb-1">
            Tool
          </p>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="text-lg">💸</span>
            Budget Tracker
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-md">
            Give every dollar a job. Set your monthly income, add expenses, and
            see how much you have left over.
          </p>
        </div>

        <div className="shrink-0 text-right text-xs">
          <div className="text-slate-500 font-semibold">Remaining</div>
          <div
            className={`mt-1 text-sm font-bold ${
              balance >= 0 ? "text-emerald-600" : "text-rose-600"
            }`}
          >
            ${balance.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid gap-3 md:grid-cols-3 mb-4">
        <div className="md:col-span-1">
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Monthly income
          </label>
          <input
            type="number"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="e.g. 3500"
            value={income}
            onChange={(e) =>
              setIncome(parseFloat(e.target.value || 0))
            }
          />
        </div>

        <div className="md:col-span-1">
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Expense name
          </label>
          <input
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="Rent, groceries, gas..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="md:col-span-1">
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Amount
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="e.g. 1200"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button
              type="button"
              className="px-4 py-2 text-sm font-semibold bg-emerald-600 text-white rounded-lg shadow-sm hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              onClick={handleAdd}
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* List / empty state */}
      <div className="mt-4">
        {items.length === 0 ? (
          <p className="text-xs text-slate-500 border border-dashed border-slate-200 rounded-lg p-3">
            No expenses yet. Add your first expense above to start tracking
            where your money goes.
          </p>
        ) : (
          <>
            <ul className="divide-y divide-slate-100 text-sm">
              {items.map((i, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between py-1.5"
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-800">
                      {i.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="tabular-nums text-slate-800">
                      ${i.amount.toFixed(2)}
                    </span>
                    <button
                      type="button"
                      className="text-[11px] text-slate-400 hover:text-rose-500"
                      onClick={() => handleRemove(idx)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Summary */}
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1 text-slate-600">
                <span className="text-xs font-semibold uppercase">
                  Income:
                </span>
                <span className="tabular-nums">
                  ${income ? income.toFixed(2) : "0.00"}
                </span>
              </div>
              <div className="flex items-center gap-1 text-slate-600">
                <span className="text-xs font-semibold uppercase">
                  Expenses:
                </span>
                <span className="tabular-nums">
                  ${total.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs font-semibold uppercase text-slate-600">
                  Remaining:
                </span>
                <span
                  className={`tabular-nums text-sm font-semibold px-2 py-0.5 rounded-full ${
                    balance >= 0
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-rose-50 text-rose-700"
                  }`}
                >
                  ${balance.toFixed(2)}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

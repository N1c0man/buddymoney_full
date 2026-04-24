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
      className="bg-white rounded-3xl p-6 shadow-md border border-slate-200 space-y-6"
    >
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          💸 Budget Tracker
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-md">
          Track your income and expenses. See exactly how much money you have
          left each month.
        </p>
      </div>

      {/* Inputs */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Income */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Monthly income
          </label>
          <input
            type="number"
            className="w-full border border-slate-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="3500"
            value={income}
            onChange={(e) => setIncome(parseFloat(e.target.value || 0))}
          />
        </div>

        {/* Expense Name */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Expense
          </label>
          <input
            className="w-full border border-slate-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Rent, groceries..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Amount
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              className="w-full border border-slate-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="1200"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button
              type="button"
              className="px-5 py-3 text-sm font-semibold bg-emerald-600 text-white rounded-xl hover:bg-emerald-500 transition"
              onClick={handleAdd}
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Expense List */}
      <div>
        {items.length === 0 ? (
          <div className="border border-dashed border-slate-300 rounded-xl p-4 text-sm text-slate-500">
            No expenses yet. Add your first expense above.
          </div>
        ) : (
          <ul className="divide-y divide-slate-100 text-sm">
            {items.map((i, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between py-3"
              >
                <span className="font-medium text-slate-800">
                  {i.name}
                </span>

                <div className="flex items-center gap-4">
                  <span className="tabular-nums text-slate-800">
                    ${i.amount.toFixed(2)}
                  </span>
                  <button
                    className="text-xs text-slate-400 hover:text-rose-500"
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

      {/* 🔥 Summary Panel (NEW STYLE) */}
      <div className="bg-black text-white rounded-2xl p-5 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-slate-300">Income</span>
          <span className="font-semibold">
            ${income ? income.toFixed(2) : "0.00"}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-slate-300">Expenses</span>
          <span className="font-semibold">
            ${total.toFixed(2)}
          </span>
        </div>

        <div className="border-t border-white/10 pt-3 flex justify-between items-center">
          <span className="text-sm text-slate-300">Remaining</span>
          <span
            className={`text-lg font-bold ${
              balance >= 0 ? "text-emerald-400" : "text-rose-400"
            }`}
          >
            ${balance.toFixed(2)}
          </span>
        </div>
      </div>
    </section>
  );
}
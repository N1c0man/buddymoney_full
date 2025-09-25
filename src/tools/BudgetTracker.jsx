import React, { useState } from "react";
export default function BudgetTracker() {
  const [income, setIncome] = useState(0);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [items, setItems] = useState([]);
  const total = items.reduce((s, i) => s + i.amount, 0);
  const balance = income - total;

  return (
    <div id="budget" className="bg-white rounded-2xl p-6 shadow-soft">
      <h2 className="text-xl font-bold text-brand-900 mb-4">💸 Budget Tracker</h2>
      <div className="grid sm:grid-cols-3 gap-3">
        <input type="number" className="border rounded-lg px-3 py-2" placeholder="Monthly income"
          value={income} onChange={e=>setIncome(parseFloat(e.target.value||0))} />
        <input className="border rounded-lg px-3 py-2" placeholder="Expense name" value={name} onChange={e=>setName(e.target.value)} />
        <div className="flex gap-2">
          <input type="number" className="border rounded-lg px-3 py-2 w-full" placeholder="Amount"
            value={amount} onChange={e=>setAmount(e.target.value)} />
          <button className="px-4 py-2 bg-brand-600 text-white rounded-lg"
            onClick={()=>{ if(!name||!amount) return; setItems([...items,{name,amount:parseFloat(amount)}]); setName(''); setAmount(''); }}>
            Add
          </button>
        </div>
      </div>
      <ul className="mt-3 text-sm">
        {items.map((i,idx)=>(
          <li key={idx} className="flex justify-between border-b py-1">
            <span>{i.name}</span><span>${i.amount.toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <div className="mt-3 font-medium">Total: ${total.toFixed(2)}</div>
      <div className="font-bold">Remaining: ${balance.toFixed(2)}</div>
    </div>
  );
}

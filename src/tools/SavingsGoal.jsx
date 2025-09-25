import React, { useState } from "react";
export default function SavingsGoal() {
  const [goal, setGoal] = useState(0);
  const [months, setMonths] = useState(0);
  const monthly = months>0 ? goal/months : 0;
  return (
    <div id="savings" className="bg-white rounded-2xl p-6 shadow-soft">
      <h2 className="text-xl font-bold text-brand-900 mb-4">🎯 Savings Goal</h2>
      <div className="grid sm:grid-cols-3 gap-3">
        <input type="number" className="border rounded-lg px-3 py-2" placeholder="Goal amount" value={goal} onChange={e=>setGoal(parseFloat(e.target.value||0))} />
        <input type="number" className="border rounded-lg px-3 py-2" placeholder="Months" value={months} onChange={e=>setMonths(parseFloat(e.target.value||0))} />
        <div className="rounded-lg bg-brand-50 px-3 py-2 flex items-center">Save ${monthly.toFixed(2)} / month</div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
export default function EmergencyFund() {
  const [monthly, setMonthly] = useState(0);
  const [months, setMonths] = useState(3);
  const fund = monthly * months;
  return (
    <div id="emergency" className="bg-white rounded-2xl p-6 shadow-soft">
      <h2 className="text-xl font-bold text-brand-900 mb-4">🛟 Emergency Fund</h2>
      <div className="grid sm:grid-cols-3 gap-3">
        <input type="number" className="border rounded-lg px-3 py-2" placeholder="Monthly expenses" value={monthly} onChange={e=>setMonthly(parseFloat(e.target.value||0))} />
        <input type="number" className="border rounded-lg px-3 py-2" placeholder="Months of coverage" value={months} onChange={e=>setMonths(parseFloat(e.target.value||0))} />
        <div className="rounded-lg bg-brand-50 px-3 py-2 flex items-center">Need: ${fund.toFixed(2)}</div>
      </div>
    </div>
  );
}

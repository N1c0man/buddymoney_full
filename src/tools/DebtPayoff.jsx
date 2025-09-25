import React, { useState } from "react";
export default function DebtPayoff() {
  const [amount, setAmount] = useState(0);
  const [rate, setRate] = useState(0);
  const [payment, setPayment] = useState(0);
  const months = (()=>{
    if(payment<=0 || amount<=0 || rate<0) return 0;
    const r = rate/100/12;
    const n = Math.log(payment/(payment - r*amount))/Math.log(1+r);
    return Math.ceil(n>0?n:0);
  })();
  return (
    <div id="debt" className="bg-white rounded-2xl p-6 shadow-soft">
      <h2 className="text-xl font-bold text-brand-900 mb-4">📉 Debt Payoff Estimator</h2>
      <div className="grid sm:grid-cols-4 gap-3">
        <input type="number" className="border rounded-lg px-3 py-2" placeholder="Debt amount" value={amount} onChange={e=>setAmount(parseFloat(e.target.value||0))} />
        <input type="number" className="border rounded-lg px-3 py-2" placeholder="APR %" value={rate} onChange={e=>setRate(parseFloat(e.target.value||0))} />
        <input type="number" className="border rounded-lg px-3 py-2" placeholder="Monthly payment" value={payment} onChange={e=>setPayment(parseFloat(e.target.value||0))} />
        <div className="rounded-lg bg-brand-50 px-3 py-2 flex items-center">{months? `${months} months` : "—"}</div>
      </div>
    </div>
  );
}

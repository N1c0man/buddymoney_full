import React, { useState } from "react";
export default function BillSplitter() {
  const [total, setTotal] = useState(0);
  const [people, setPeople] = useState(2);
  const each = people>0 ? total/people : 0;
  return (
    <div id="split" className="bg-white rounded-2xl p-6 shadow-soft">
      <h2 className="text-xl font-bold text-brand-900 mb-4">🧮 Bill Splitter</h2>
      <div className="grid sm:grid-cols-3 gap-3">
        <input type="number" className="border rounded-lg px-3 py-2" placeholder="Total bill" value={total} onChange={e=>setTotal(parseFloat(e.target.value||0))} />
        <input type="number" className="border rounded-lg px-3 py-2" placeholder="# People" value={people} onChange={e=>setPeople(parseFloat(e.target.value||0))} />
        <div className="rounded-lg bg-brand-50 px-3 py-2 flex items-center">${each.toFixed(2)} each</div>
      </div>
    </div>
  );
}

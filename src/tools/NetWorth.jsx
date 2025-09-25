import React, { useState } from "react";
export default function NetWorth() {
  const [assets, setAssets] = useState([]);
  const [liabs, setLiabs] = useState([]);
  const [an, setAn] = useState(""); const [av, setAv] = useState("");
  const [ln, setLn] = useState(""); const [lv, setLv] = useState("");

  const ta = assets.reduce((s,a)=>s+a.v,0);
  const tl = liabs.reduce((s,l)=>s+l.v,0);
  const nw = ta - tl;

  return (
    <div id="networth" className="bg-white rounded-2xl p-6 shadow-soft">
      <h2 className="text-xl font-bold text-brand-900 mb-4">📊 Net Worth</h2>
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-2">Assets</h3>
          <div className="flex gap-2 mb-2">
            <input className="border rounded-lg px-3 py-2 flex-1" placeholder="Name" value={an} onChange={e=>setAn(e.target.value)} />
            <input type="number" className="border rounded-lg px-3 py-2 w-32" placeholder="Value" value={av} onChange={e=>setAv(e.target.value)} />
            <button className="px-3 py-2 bg-brand-600 text-white rounded-lg" onClick={()=>{ if(!an||!av) return; setAssets([...assets,{n:an,v:parseFloat(av)}]); setAn(''); setAv(''); }}>Add</button>
          </div>
          <ul className="text-sm">{assets.map((a,i)=><li key={i} className="flex justify-between border-b py-1"><span>{a.n}</span><span>${a.v.toFixed(2)}</span></li>)}</ul>
          <div className="mt-2 font-medium">Total assets: ${ta.toFixed(2)}</div>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Liabilities</h3>
          <div className="flex gap-2 mb-2">
            <input className="border rounded-lg px-3 py-2 flex-1" placeholder="Name" value={ln} onChange={e=>setLn(e.target.value)} />
            <input type="number" className="border rounded-lg px-3 py-2 w-32" placeholder="Value" value={lv} onChange={e=>setLv(e.target.value)} />
            <button className="px-3 py-2 bg-brand-600 text-white rounded-lg" onClick={()=>{ if(!ln||!lv) return; setLiabs([...liabs,{n:ln,v:parseFloat(lv)}]); setLn(''); setLv(''); }}>Add</button>
          </div>
          <ul className="text-sm">{liabs.map((l,i)=><li key={i} className="flex justify_between border-b py-1"><span>{l.n}</span><span>${l.v.toFixed(2)}</span></li>)}</ul>
          <div className="mt-2 font-medium">Total liabilities: ${tl.toFixed(2)}</div>
        </div>
      </div>
      <div className="mt-4 text-lg font-bold">Net Worth: ${nw.toFixed(2)}</div>
    </div>
  );
}

import React, { useState } from "react";

export default function NetWorth() {
  const [assets, setAssets] = useState([]);
  const [liabs, setLiabs] = useState([]);
  const [an, setAn] = useState("");
  const [av, setAv] = useState("");
  const [ln, setLn] = useState("");
  const [lv, setLv] = useState("");

  const ta = assets.reduce((s, a) => s + a.v, 0);
  const tl = liabs.reduce((s, l) => s + l.v, 0);
  const nw = ta - tl;

  const handleAddAsset = () => {
    if (!an || !av) return;
    const value = parseFloat(av);
    if (Number.isNaN(value)) return;
    setAssets([...assets, { n: an, v: value }]);
    setAn("");
    setAv("");
  };

  const handleAddLiab = () => {
    if (!ln || !lv) return;
    const value = parseFloat(lv);
    if (Number.isNaN(value)) return;
    setLiabs([...liabs, { n: ln, v: value }]);
    setLn("");
    setLv("");
  };

  const handleRemoveAsset = (i) =>
    setAssets(assets.filter((_, idx) => idx !== i));

  const handleRemoveLiab = (i) =>
    setLiabs(liabs.filter((_, idx) => idx !== i));

  return (
    <section
      id="networth"
      className="bg-white rounded-3xl p-6 shadow-md border border-slate-200 space-y-6"
    >
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          📊 Net Worth Tracker
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-md">
          Track everything you own and owe to see your full financial picture.
        </p>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* ASSETS */}
        <div className="space-y-3">
          <h3 className="font-semibold text-slate-900">Assets</h3>

          <div className="flex gap-2">
            <input
              className="flex-1 border border-slate-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Savings, investments..."
              value={an}
              onChange={(e) => setAn(e.target.value)}
            />
            <input
              type="number"
              className="w-32 border border-slate-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Value"
              value={av}
              onChange={(e) => setAv(e.target.value)}
            />
            <button
              className="px-4 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-500"
              onClick={handleAddAsset}
            >
              Add
            </button>
          </div>

          {assets.length === 0 ? (
            <div className="border border-dashed border-slate-300 rounded-xl p-3 text-sm text-slate-500">
              No assets yet.
            </div>
          ) : (
            <ul className="divide-y text-sm">
              {assets.map((a, i) => (
                <li key={i} className="flex justify-between py-2">
                  <span>{a.n}</span>
                  <div className="flex gap-3">
                    <span>${a.v.toFixed(2)}</span>
                    <button
                      className="text-xs text-slate-400 hover:text-rose-500"
                      onClick={() => handleRemoveAsset(i)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="text-sm font-medium text-slate-700">
            Total: ${ta.toFixed(2)}
          </div>
        </div>

        {/* LIABILITIES */}
        <div className="space-y-3">
          <h3 className="font-semibold text-slate-900">Liabilities</h3>

          <div className="flex gap-2">
            <input
              className="flex-1 border border-slate-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Credit card, loan..."
              value={ln}
              onChange={(e) => setLn(e.target.value)}
            />
            <input
              type="number"
              className="w-32 border border-slate-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Amount"
              value={lv}
              onChange={(e) => setLv(e.target.value)}
            />
            <button
              className="px-4 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-500"
              onClick={handleAddLiab}
            >
              Add
            </button>
          </div>

          {liabs.length === 0 ? (
            <div className="border border-dashed border-slate-300 rounded-xl p-3 text-sm text-slate-500">
              No liabilities yet.
            </div>
          ) : (
            <ul className="divide-y text-sm">
              {liabs.map((l, i) => (
                <li key={i} className="flex justify-between py-2">
                  <span>{l.n}</span>
                  <div className="flex gap-3">
                    <span>${l.v.toFixed(2)}</span>
                    <button
                      className="text-xs text-slate-400 hover:text-rose-500"
                      onClick={() => handleRemoveLiab(i)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="text-sm font-medium text-slate-700">
            Total: ${tl.toFixed(2)}
          </div>
        </div>
      </div>

      {/* SUMMARY PANEL */}
      <div className="bg-black text-white rounded-2xl p-5 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-slate-300">Assets</span>
          <span>${ta.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-slate-300">Liabilities</span>
          <span>${tl.toFixed(2)}</span>
        </div>

        <div className="border-t border-white/10 pt-3 flex justify-between items-center">
          <span className="text-slate-300">Net worth</span>
          <span
            className={`text-lg font-bold ${
              nw > 0
                ? "text-emerald-400"
                : nw < 0
                ? "text-rose-400"
                : "text-white"
            }`}
          >
            ${nw.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Helper */}
      <div className="rounded-2xl border border-slate-200 p-4 text-sm text-slate-600">
        {nw > 0
          ? "You’re in positive territory—keep building."
          : nw < 0
          ? "You owe more than you own right now. That’s okay—this is how progress starts."
          : "Your assets and liabilities are balanced."}
      </div>
    </section>
  );
}
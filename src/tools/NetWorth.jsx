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

  const handleRemoveAsset = (indexToRemove) => {
    setAssets(assets.filter((_, idx) => idx !== indexToRemove));
  };

  const handleRemoveLiab = (indexToRemove) => {
    setLiabs(liabs.filter((_, idx) => idx !== indexToRemove));
  };

  const totalAbsolute = ta + tl;
  const assetsShare = totalAbsolute > 0 ? (ta / totalAbsolute) * 100 : 50;
  const liabsShare = totalAbsolute > 0 ? (tl / totalAbsolute) * 100 : 50;

  const netWorthColor =
    nw > 0 ? "text-emerald-700" : nw < 0 ? "text-rose-700" : "text-slate-700";
  const netWorthBg =
    nw > 0 ? "bg-emerald-50 border-emerald-100" :
    nw < 0 ? "bg-rose-50 border-rose-100" :
    "bg-slate-50 border-slate-100";

  return (
    <section
      id="networth"
      className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"
    >
      {/* HEADER */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-600 mb-1">
            Tool
          </p>

          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="text-lg">📊</span>
            Net Worth Tracker
          </h2>

          <p className="text-xs text-slate-500 mt-1 max-w-md">
            List your assets (what you own) and liabilities (what you owe). This
            tool calculates your total net worth so you can see your full money
            picture in one place.
          </p>
        </div>
      </div>

      {/* MAIN GRID: ASSETS & LIABILITIES */}
      <div className="grid sm:grid-cols-2 gap-6 mb-6">
        {/* ASSETS */}
        <div>
          <h3 className="font-semibold text-slate-900 mb-2">Assets</h3>
          <p className="text-[11px] text-slate-500 mb-2">
            Examples: cash, checking, savings, investments, home value, car.
          </p>
          <div className="flex gap-2 mb-2">
            <input
              className="border border-slate-300 rounded-lg px-3 py-2 flex-1 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Asset name (e.g. Savings)"
              value={an}
              onChange={(e) => setAn(e.target.value)}
            />
            <input
              type="number"
              className="border border-slate-300 rounded-lg px-3 py-2 w-32 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Value"
              value={av}
              onChange={(e) => setAv(e.target.value)}
            />
            <button
              type="button"
              className="px-3 py-2 text-sm font-semibold bg-emerald-600 text-white rounded-lg shadow-sm hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              onClick={handleAddAsset}
            >
              Add
            </button>
          </div>

          {assets.length === 0 ? (
            <p className="text-[11px] text-slate-500 border border-dashed border-slate-200 rounded-lg px-3 py-2">
              No assets listed yet. Add your first asset above.
            </p>
          ) : (
            <ul className="text-sm divide-y divide-slate-100 mt-1">
              {assets.map((a, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between py-1.5"
                >
                  <span className="text-slate-800">{a.n}</span>
                  <div className="flex items-center gap-3">
                    <span className="tabular-nums text-slate-800">
                      ${a.v.toFixed(2)}
                    </span>
                    <button
                      type="button"
                      className="text-[11px] text-slate-400 hover:text-rose-500"
                      onClick={() => handleRemoveAsset(i)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-2 text-sm font-medium text-slate-800">
            Total assets:{" "}
            <span className="tabular-nums">${ta.toFixed(2)}</span>
          </div>
        </div>

        {/* LIABILITIES */}
        <div>
          <h3 className="font-semibold text-slate-900 mb-2">Liabilities</h3>
          <p className="text-[11px] text-slate-500 mb-2">
            Examples: credit cards, student loans, car loans, mortgage, personal
            loans.
          </p>
          <div className="flex gap-2 mb-2">
            <input
              className="border border-slate-300 rounded-lg px-3 py-2 flex-1 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Liability name (e.g. Credit card)"
              value={ln}
              onChange={(e) => setLn(e.target.value)}
            />
            <input
              type="number"
              className="border border-slate-300 rounded-lg px-3 py-2 w-32 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Amount"
              value={lv}
              onChange={(e) => setLv(e.target.value)}
            />
            <button
              type="button"
              className="px-3 py-2 text-sm font-semibold bg-emerald-600 text-white rounded-lg shadow-sm hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              onClick={handleAddLiab}
            >
              Add
            </button>
          </div>

          {liabs.length === 0 ? (
            <p className="text-[11px] text-slate-500 border border-dashed border-slate-200 rounded-lg px-3 py-2">
              No liabilities listed yet. Add your first liability above.
            </p>
          ) : (
            <ul className="text-sm divide-y divide-slate-100 mt-1">
              {liabs.map((l, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between py-1.5"
                >
                  <span className="text-slate-800">{l.n}</span>
                  <div className="flex items-center gap-3">
                    <span className="tabular-nums text-slate-800">
                      ${l.v.toFixed(2)}
                    </span>
                    <button
                      type="button"
                      className="text-[11px] text-slate-400 hover:text-rose-500"
                      onClick={() => handleRemoveLiab(i)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-2 text-sm font-medium text-slate-800">
            Total liabilities:{" "}
            <span className="tabular-nums">${tl.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* SUMMARY + NET WORTH */}
      <div className="grid gap-4 md:grid-cols-3 items-stretch text-sm">
        {/* Summary cards */}
        <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 flex flex-col gap-1">
          <span className="text-xs uppercase font-semibold text-slate-500">
            Total assets
          </span>
          <span className="text-lg font-bold text-slate-900 tabular-nums">
            ${ta.toFixed(2)}
          </span>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 flex flex-col gap-1">
          <span className="text-xs uppercase font-semibold text-slate-500">
            Total liabilities
          </span>
          <span className="text-lg font-bold text-slate-900 tabular-nums">
            ${tl.toFixed(2)}
          </span>
        </div>

        <div
          className={`rounded-xl border px-4 py-3 flex flex-col gap-1 ${netWorthBg}`}
        >
          <span className="text-xs uppercase font-semibold text-slate-600">
            Net worth
          </span>
          <span
            className={`text-lg font-bold tabular-nums ${netWorthColor}`}
          >
            ${nw.toFixed(2)}
          </span>
          <span className="text-[11px] text-slate-500">
            {nw > 0
              ? "You own more than you owe. Great job—keep going."
              : nw < 0
              ? "You owe more than you own right now. That’s okay—awareness is the first step."
              : "Your assets and liabilities are currently equal."}
          </span>
        </div>
      </div>

      {/* ASSETS VS LIABILITIES BAR */}
      {totalAbsolute > 0 && (
        <div className="mt-4">
          <div className="flex justify-between text-xs text-slate-600 mb-1">
            <span>Assets vs. liabilities</span>
            <span>
              {Math.round(assetsShare)}% assets · {Math.round(liabsShare)}% liabilities
            </span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden flex">
            <div
              className="bg-emerald-500 h-full"
              style={{ width: `${assetsShare}%` }}
            ></div>
            <div
              className="bg-rose-400 h-full"
              style={{ width: `${liabsShare}%` }}
            ></div>
          </div>
        </div>
      )}
    </section>
  );
}

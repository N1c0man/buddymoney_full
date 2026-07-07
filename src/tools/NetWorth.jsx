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
      className="rounded-3xl border border-emerald-100 bg-white/95 p-5 shadow-sm md:p-6 space-y-6"
    >
      <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
          BuddyMoney Tool
        </p>

        <h2 className="mt-2 text-2xl font-extrabold text-slate-900">
          Net Worth Tracker
        </h2>

        <p className="mt-2 text-sm text-slate-600 max-w-2xl">
          Add what you own and what you owe to see your full money picture in
          one simple snapshot.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <MoneyList
          title="Assets"
          namePlaceholder="Savings, investments..."
          valuePlaceholder="Value"
          nameValue={an}
          amountValue={av}
          onNameChange={(e) => setAn(e.target.value)}
          onAmountChange={(e) => setAv(e.target.value)}
          onAdd={handleAddAsset}
          items={assets}
          emptyText="No assets yet."
          total={ta}
          onRemove={handleRemoveAsset}
        />

        <MoneyList
          title="Liabilities"
          namePlaceholder="Credit card, loan..."
          valuePlaceholder="Amount"
          nameValue={ln}
          amountValue={lv}
          onNameChange={(e) => setLn(e.target.value)}
          onAmountChange={(e) => setLv(e.target.value)}
          onAdd={handleAddLiab}
          items={liabs}
          emptyText="No liabilities yet."
          total={tl}
          onRemove={handleRemoveLiab}
        />
      </div>

      <div className="rounded-3xl bg-gradient-to-br from-emerald-600 to-sky-600 p-5 text-white shadow-md">
        <p className="text-sm font-semibold text-white/80">
          Your net worth snapshot
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <SummaryItem label="Assets" value={`$${ta.toFixed(2)}`} />
          <SummaryItem label="Liabilities" value={`$${tl.toFixed(2)}`} />
          <SummaryItem label="Net worth" value={`$${nw.toFixed(2)}`} />
        </div>

        <div className="mt-5 rounded-2xl bg-white/15 p-4">
          <p className="text-sm text-white/85">
            {nw > 0
              ? "You’re in positive territory — keep building."
              : nw < 0
              ? "You owe more than you own right now. That’s okay — this is how progress starts."
              : "Your assets and liabilities are balanced."}
          </p>
        </div>
      </div>
    </section>
  );
}

function MoneyList({
  title,
  namePlaceholder,
  valuePlaceholder,
  nameValue,
  amountValue,
  onNameChange,
  onAmountChange,
  onAdd,
  items,
  emptyText,
  total,
  onRemove,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 space-y-4">
      <h3 className="font-bold text-slate-900">{title}</h3>

      <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_120px_auto]">
        <input
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base shadow-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
          placeholder={namePlaceholder}
          value={nameValue}
          onChange={onNameChange}
        />

        <input
          type="number"
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base shadow-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
          placeholder={valuePlaceholder}
          value={amountValue}
          onChange={onAmountChange}
        />

        <button
          type="button"
          className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-500 active:scale-[0.98]"
          onClick={onAdd}
        >
          Add
        </button>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-500">
          {emptyText}
        </div>
      ) : (
        <ul className="divide-y divide-slate-200 text-sm">
          {items.map((item, i) => (
            <li key={i} className="flex justify-between gap-3 py-3">
              <span className="font-semibold text-slate-800">{item.n}</span>

              <div className="flex items-center gap-3">
                <span className="tabular-nums font-semibold text-slate-800">
                  ${item.v.toFixed(2)}
                </span>

                <button
                  type="button"
                  className="text-xs font-semibold text-slate-400 transition hover:text-rose-500"
                  onClick={() => onRemove(i)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="rounded-2xl bg-white px-4 py-3 text-sm font-bold text-slate-800 shadow-sm">
        Total: ${total.toFixed(2)}
      </div>
    </div>
  );
}

function SummaryItem({ label, value }) {
  return (
    <div className="rounded-2xl bg-white/15 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-white/70">
        {label}
      </p>
      <p className="mt-1 text-lg font-extrabold tabular-nums">{value}</p>
    </div>
  );
}
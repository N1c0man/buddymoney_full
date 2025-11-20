import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

// 50/30/20 baseline, can adapt based on income
const BASE_RULES = {
  needs: 0.50,
  wants: 0.30,
  savings: 0.20,
};

// Helper to clamp a number
const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

// Helper to safely coerce numeric input (no NaN, no negatives)
const toNumber = (value) => {
  const n = parseFloat(value);
  if (!Number.isFinite(n) || Number.isNaN(n)) return 0;
  return n < 0 ? 0 : n;
};

// Small badge
const Badge = ({ children, color = "bg-green-100 text-green-800" }) => (
  <span
    className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${color}`}
  >
    {children}
  </span>
);

// Progress bar
const Bar = ({ value, color = "bg-[#1e3a8a]" }) => (
  <div className="w-full h-2 rounded bg-gray-200 overflow-hidden">
    <div
      className={`h-2 ${color}`}
      style={{ width: `${clamp(value, 0, 100)}%` }}
    />
  </div>
);

export default function BudgetCoach() {
  // Form state
  const [income, setIncome] = useState("");
  const [housing, setHousing] = useState("");
  const [transport, setTransport] = useState("");
  const [food, setFood] = useState("");
  const [utilities, setUtilities] = useState("");
  const [debt, setDebt] = useState("");
  const [wants, setWants] = useState("");

  // Load from localStorage (safely)
  useEffect(() => {
    try {
      const raw = localStorage.getItem("bm_budget_coach");
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (!saved || typeof saved !== "object") return;

      setIncome(saved.income ?? "");
      setHousing(saved.housing ?? "");
      setTransport(saved.transport ?? "");
      setFood(saved.food ?? "");
      setUtilities(saved.utilities ?? "");
      setDebt(saved.debt ?? "");
      setWants(saved.wants ?? "");
    } catch {
      // If anything goes wrong, just skip loading
    }
  }, []);

  // Save to localStorage (safely)
  useEffect(() => {
    try {
      const payload = {
        income,
        housing,
        transport,
        food,
        utilities,
        debt,
        wants,
      };
      localStorage.setItem("bm_budget_coach", JSON.stringify(payload));
    } catch {
      // Ignore write errors (private mode, quota, etc.)
    }
  }, [income, housing, transport, food, utilities, debt, wants]);

  // Numbers
  const numbers = useMemo(() => {
    const i = toNumber(income);
    const h = toNumber(housing);
    const t = toNumber(transport);
    const f = toNumber(food);
    const u = toNumber(utilities);
    const d = toNumber(debt);
    const w = toNumber(wants);

    const needs = h + t + f + u + d; // simple “needs” bucket
    const total = needs + w;
    const leftover = i - total;

    const needsPct = i > 0 ? (needs / i) * 100 : 0;
    const wantsPct = i > 0 ? (w / i) * 100 : 0;
    const savingsPct = i > 0 ? ((leftover > 0 ? leftover : 0) / i) * 100 : 0;

    return {
      i,
      h,
      t,
      f,
      u,
      d,
      w,
      needs,
      total,
      leftover,
      needsPct,
      wantsPct,
      savingsPct,
    };
  }, [income, housing, transport, food, utilities, debt, wants]);

  // Adaptive targets (tiny nudge for lower income)
  const targets = useMemo(() => {
    const i = numbers.i;
    if (i <= 0) return BASE_RULES;
    // If income is small, relax savings to 15% and raise needs to 55%
    if (i < 3000) return { needs: 0.55, wants: 0.30, savings: 0.15 };
    // If income is high, aim for 25% savings
    if (i > 8000) return { needs: 0.50, wants: 0.25, savings: 0.25 };
    return BASE_RULES;
  }, [numbers.i]);

  // Score: out of 100, subtract penalties for exceeding targets
  const score = useMemo(() => {
    const nOver = Math.max(0, numbers.needsPct - targets.needs * 100);
    const wOver = Math.max(0, numbers.wantsPct - targets.wants * 100);
    const sUnder = Math.max(0, targets.savings * 100 - numbers.savingsPct);
    const penalty = nOver * 0.6 + wOver * 0.6 + sUnder * 0.8;
    return clamp(Math.round(100 - penalty), 0, 100);
  }, [numbers.needsPct, numbers.wantsPct, numbers.savingsPct, targets]);

  const scoreLabel =
    score >= 85
      ? "Excellent"
      : score >= 70
      ? "Good"
      : score >= 50
      ? "Fair"
      : "Needs Attention";

  const scoreColor =
    score >= 85
      ? "text-green-700"
      : score >= 70
      ? "text-emerald-700"
      : score >= 50
      ? "text-amber-700"
      : "text-red-700";

  const scoreBar =
    score >= 85
      ? "bg-green-500"
      : score >= 70
      ? "bg-emerald-500"
      : score >= 50
      ? "bg-amber-500"
      : "bg-red-500";

  // Tips
  const tips = useMemo(() => {
    const t = [];
    if (numbers.i <= 0)
      return ["Add your monthly take-home income to begin."];

    if (numbers.needsPct > targets.needs * 100) {
      t.push(
        "Your essential expenses are running hot. Try reducing housing/transport or renegotiating bills."
      );
    }

    if (numbers.wantsPct > targets.wants * 100) {
      t.push(
        "Wants are above target. Try a 14-day pause on dining out or subscriptions."
      );
    }

    if (numbers.savingsPct < targets.savings * 100) {
      const suggested = targets.savings * numbers.i;
      t.push(
        `Savings below target. Automate at least ${suggested.toFixed(
          0
        )} this month.`
      );
    }

    if (numbers.leftover < 0) {
      t.push(
        "You’re overspending. Aim to trim 5–10% from the highest non-essential category."
      );
    }

    if (t.length === 0) {
      t.push("Nice balance! Consider nudging savings +2–5% for faster progress.");
    }

    return t.slice(0, 3);
  }, [numbers, targets]);

  // Suggested target dollars
  const targetNeeds = (targets.needs * numbers.i) || 0;
  const targetWants = (targets.wants * numbers.i) || 0;
  const targetSavings = (targets.savings * numbers.i) || 0;

  const handleReset = () => {
    setIncome("");
    setHousing("");
    setTransport("");
    setFood("");
    setUtilities("");
    setDebt("");
    setWants("");
    try {
      localStorage.removeItem("bm_budget_coach");
    } catch {
      // ignore
    }
  };

  return (
    <section className="max-w-5xl mx-auto px-4 py-10">
      <motion.div
        className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#1e3a8a]">
              AI-Powered Budget Coach. An improvement of our original tool.
            </h2>
            <p className="text-gray-600 mt-1">
              Enter your monthly numbers—get a budget health score, targets, and
              friendly, actionable tips.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge>beta</Badge>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-gray-500 underline underline-offset-2 hover:text-gray-700"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Monthly take-home income
            </label>
            <input
              type="number"
              inputMode="decimal"
              min={0}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#84cc16]"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="e.g., 5200"
            />
          </div>

          <div className="md:col-span-2 grid grid-cols-2 gap-4">
            <InputField
              label="Housing / Rent"
              value={housing}
              onChange={setHousing}
              placeholder="e.g., 1600"
            />
            <InputField
              label="Transport"
              value={transport}
              onChange={setTransport}
              placeholder="e.g., 300"
            />
            <InputField
              label="Food / Groceries"
              value={food}
              onChange={setFood}
              placeholder="e.g., 450"
            />
            <InputField
              label="Utilities / Bills"
              value={utilities}
              onChange={setUtilities}
              placeholder="e.g., 220"
            />
            <InputField
              label="Debt payments"
              value={debt}
              onChange={setDebt}
              placeholder="e.g., 250"
            />
            <InputField
              label="Wants (shopping, dining, fun)"
              value={wants}
              onChange={setWants}
              placeholder="e.g., 400"
            />
          </div>
        </div>

        {/* Score & overview */}
        <div className="mt-8 grid md:grid-cols-5 gap-6">
          <div className="md:col-span-2 bg-green-50 rounded-xl p-4 border border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <div className={`text-3xl font-extrabold ${scoreColor}`}>
                  {score}
                </div>
                <div className="text-sm text-gray-600 -mt-1">
                  {scoreLabel}
                </div>
              </div>
              <div className="w-28">
                <Bar value={score} color={scoreBar} />
              </div>
            </div>
            <p className="text-sm text-gray-700 mt-3">
              Based on your inputs and the{" "}
              {Math.round(targets.needs * 100)}/
              {Math.round(targets.wants * 100)}/
              {Math.round(targets.savings * 100)} rule of thumb.
            </p>
          </div>

          <div className="md:col-span-3 bg-white rounded-xl p-4 border">
            <h4 className="font-semibold text-gray-800 mb-3">Your Mix</h4>
            <div className="space-y-3">
              <Row
                label="Needs"
                value={numbers.needsPct}
                target={targets.needs * 100}
              />
              <Row
                label="Wants"
                value={numbers.wantsPct}
                target={targets.wants * 100}
              />
              <Row
                label="Savings (leftover)"
                value={numbers.savingsPct}
                target={targets.savings * 100}
              />
            </div>
          </div>
        </div>

        {/* Targets */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <Card
            title="Suggested Monthly Needs"
            value={`$${targetNeeds.toFixed(0)}`}
            note={`${Math.round(targets.needs * 100)}% target`}
          />
          <Card
            title="Suggested Monthly Wants"
            value={`$${targetWants.toFixed(0)}`}
            note={`${Math.round(targets.wants * 100)}% target`}
          />
          <Card
            title="Suggested Monthly Savings"
            value={`$${targetSavings.toFixed(0)}`}
            note={`${Math.round(targets.savings * 100)}% target`}
          />
        </div>

        {/* Tips */}
        <div className="mt-8">
          <h4 className="font-semibold text-gray-800 mb-2">Coach Tips</h4>
          <ul className="list-disc ml-5 text-gray-700 space-y-1">
            {tips.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}

function InputField({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type="number"
        inputMode="decimal"
        min={0}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#84cc16] focus:outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

function Row({ label, value, target }) {
  const diff = Math.round(value - target);
  const color =
    diff > 3
      ? "bg-red-100 text-red-800"
      : diff < -3
      ? "bg-amber-100 text-amber-800"
      : "bg-green-100 text-green-800";
  return (
    <div>
      <div className="flex items-center justify-between text-sm mb-1">
        <div className="font-medium text-gray-800">{label}</div>
        <div className="flex items-center gap-2">
          <span className="text-gray-700">{value.toFixed(1)}%</span>
          <Badge color={color}>
            {diff > 0 ? `+${diff}%` : `${diff}%`}
          </Badge>
        </div>
      </div>
      <Bar value={value} />
      <div className="text-xs text-gray-500 mt-1">
        Target: {target.toFixed(0)}%
      </div>
    </div>
  );
}

function Card({ title, value, note }) {
  return (
    <div className="rounded-xl border p-4 bg-white">
      <div className="text-sm text-gray-600">{title}</div>
      <div className="text-2xl font-bold text-[#1e3a8a]">{value}</div>
      <div className="text-xs text-gray-500">{note}</div>
    </div>
  );
}

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import ShareBar from "../components/ShareBar";
import { setCanonical } from "../utils/seo"; //

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
const Bar = ({ value, color = "bg-indigo-900" }) => (
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

    //  Canonical for /tools/budget-coach
  useEffect(() => {
    setCanonical("/tools/budget-coach");
  }, []);

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

  // 🔗 SOCIAL SHARE STATE & HELPERS
  const [copied, setCopied] = useState(false);

  const pageUrl =
    typeof window !== "undefined"
      ? window.location.href
      : "https://buddymoney.com/tools/budget-coach";

  const shareTitle = "AI Budget Coach – BuddyMoney";
  const encodedUrl = encodeURIComponent(pageUrl);
  const encodedTitle = encodeURIComponent(
    "I’m using this AI Budget Coach from BuddyMoney to get a calm, realistic plan for my monthly money."
  );

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

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

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is the Budget Coach free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, the BuddyMoney AI Budget Coach is completely free to use. You can update your numbers as often as you like.",
        },
      },
      {
        "@type": "Question",
        name: "Does the tool use the 50/30/20 rule?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Budget Coach starts with the 50/30/20 rule and then adapts your targets slightly based on your income level.",
        },
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>AI Budget Coach Calculator | Calm, Realistic Monthly Plan</title>
        <meta
          name="description"
          content="Use BuddyMoney’s free AI Budget Coach to rate your monthly budget, compare it to a flexible 50/30/20 rule, and get friendly tips to improve your money plan."
        />
        {/* Basic OG/Twitter tags */}
        <meta property="og:title" content={shareTitle} />
        <meta
          property="og:description"
          content="Use BuddyMoney’s free AI Budget Coach to get a calm, realistic monthly budget plan based on your real numbers."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={shareTitle} />
        <meta
          name="twitter:description"
          content="Use BuddyMoney’s free AI Budget Coach to get a calm, realistic monthly budget plan based on your real numbers."
        />
        {/* FAQ structured data */}
        <script type="application/ld+json">
          {JSON.stringify(faqJsonLd)}
        </script>
      </Helmet>

      <main className="pt-2 lg:pt-4 pb-16 bg-brand-50/40">
        <div className="max-w-5xl mx-auto px-4 space-y-6">
          {/* COACH HERO */}
          <section className="mb-2 rounded-3xl border border-emerald-100 bg-gradient-to-br from-brand-50 via-emerald-50 to-accent-100/70 px-5 py-7 md:px-8 md:py-9 shadow-soft">
            <div className="space-y-3">
              <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-emerald-600">
                Budget & Money Coach
              </p>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-brand-900 leading-tight">
                AI Budget Coach: Get a calm, realistic plan for your monthly
                money.
              </h1>
              <p className="text-sm md:text-base text-brand-800/80 max-w-xl">
                Enter your real numbers and see how your budget stacks up against a
                simple rule of thumb. Then get clear suggestions on what to tweak
                next.
              </p>

              <div className="flex flex-wrap gap-2 text-[11px] mt-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-emerald-700 border border-emerald-100 shadow-sm">
                  ✍️ Uses your real monthly numbers
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-slate-700 border border-slate-100 shadow-sm">
                  🎯 Simple, friendly tips—not guilt
                </span>
              </div>
            </div>
          </section>

          {/* Social share — Premium BuddyMoney version (no motion) */}
<ShareBar
  variant="top"
  label="Share this friendly budgeting coach with someone who needs it"
  title="I’m using BuddyMoney’s AI Budget Coach to get a calm, realistic monthly plan."
/>
          {/* MAIN COACH CARD */}
          <section className="space-y-8">
            <motion.div
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  
                  <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                    AI-Powered Budget Coach
                  </h2>
                  <p className="text-sm md:text-base text-slate-600 mt-1">
                    Enter your monthly numbers to get a budget health score, targets,
                    and friendly, actionable tips.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge>New</Badge>
                  <button
                onClick={handleReset}
                className="text-sm text-indigo-600 hover:underline"
              >
                Reset to defaults
              </button>
                </div>
              </div>

              {/* Inputs */}
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Monthly take-home income
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    min={0}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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
                <div className="md:col-span-2 bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className={`text-3xl font-extrabold ${scoreColor}`}>
                        {score}
                      </div>
                      <div className="text-sm text-slate-600 -mt-1">
                        {scoreLabel}
                      </div>
                    </div>
                    <div className="w-28">
                      <Bar value={score} color={scoreBar} />
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 mt-3">
                    Based on your inputs and the{" "}
                    {Math.round(targets.needs * 100)}/
                    {Math.round(targets.wants * 100)}/
                    {Math.round(targets.savings * 100)} rule of thumb.
                  </p>
                </div>

                <div className="md:col-span-3 bg-white rounded-xl p-4 border border-slate-200">
                  <h4 className="font-semibold text-slate-800 mb-3">Your mix</h4>
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
                <h4 className="font-semibold text-slate-800 mb-2">Coach tips</h4>
                <ul className="list-disc ml-5 text-slate-700 space-y-1 text-sm">
                  {tips.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </section>

          {/* How to use section (SEO helper) */}
          <section className="mt-10 space-y-4 text-sm text-slate-700">
            <h2 className="text-base md:text-lg font-semibold text-slate-900">
              How to use this Budget Coach
            </h2>
            <p>
              Start by entering your real monthly take-home income and your typical
              spending in each category. The Budget Coach compares your mix to a
              flexible version of the 50/30/20 rule and gives you a score out of 100.
            </p>
            <p>
              You’ll see how much you’re spending on needs, wants, and savings, plus
              suggested dollar amounts to aim for each month. Update your numbers
              any time your income or expenses change.
            </p>
          </section>

          {/* Bottom share strip (smaller) */}
          <ShareBar
  variant="bottom"
  label="Share this friendly budgeting coach with someone who needs it"
  title="I’m using BuddyMoney’s AI Budget Coach to get a calm, realistic monthly plan."
/>
        </div>
      </main>
    </>
  );
}

function InputField({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </label>
      <input
        type="number"
        inputMode="decimal"
        min={0}
        className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
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
        <div className="font-medium text-slate-800">{label}</div>
        <div className="flex items-center gap-2">
          <span className="text-slate-700">{value.toFixed(1)}%</span>
          <Badge color={color}>
            {diff > 0 ? `+${diff}%` : `${diff}%`}
          </Badge>
        </div>
      </div>
      <Bar value={value} />
      <div className="text-xs text-slate-500 mt-1">
        Target: {target.toFixed(0)}%
      </div>
    </div>
  );
}

function Card({ title, value, note }) {
  return (
    <div className="rounded-xl border border-slate-200 p-4 bg-white">
      <div className="text-sm text-slate-600">{title}</div>
      <div className="text-2xl font-bold text-slate-900">{value}</div>
      <div className="text-xs text-slate-500">{note}</div>
    </div>
  );
}

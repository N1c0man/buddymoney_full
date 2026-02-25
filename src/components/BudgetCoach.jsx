import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import ShareBar from "../components/ShareBar";
import AffiliateCalloutAmazonPlanner from "../components/AffiliateCalloutAmazonPlanner";
import { setCanonical } from "../utils/seo";

// NEW imports (logic + UI)
import {
  sanitizeDecimalInput,
  loadBudgetFromStorage,
  saveBudgetToStorage,
  computeBudgetNumbers,
  computeTargets,
  computeScore,
  generateTips,
} from "../utils/budgetLogic";

import {
  InputField,
  Badge,
  Bar,
  Row,
  Card,
  DoughnutChartSimple,
  DoughnutChartAdvanced,
} from "../components/BudgetUI";

export default function BudgetCoach() {
  // Form state — now includes insurance + investments
  const [income, setIncome] = useState("");
  const [housing, setHousing] = useState("");
  const [transport, setTransport] = useState("");
  const [food, setFood] = useState("");
  const [utilities, setUtilities] = useState("");
  const [debt, setDebt] = useState("");
  const [wants, setWants] = useState("");
  const [insurance, setInsurance] = useState("");
  const [investments, setInvestments] = useState("");

  // Chart mode: "simple" or "advanced"
  const [chartMode, setChartMode] = useState("simple");

  // Canonical for SEO
  useEffect(() => {
    setCanonical("/coach");
  }, []);

  // Load from localStorage
  useEffect(() => {
    const saved = loadBudgetFromStorage();
    if (!saved) return;

    setIncome(saved.income ?? "");
    setHousing(saved.housing ?? "");
    setTransport(saved.transport ?? "");
    setFood(saved.food ?? "");
    setUtilities(saved.utilities ?? "");
    setDebt(saved.debt ?? "");
    setWants(saved.wants ?? "");
    setInsurance(saved.insurance ?? "");
    setInvestments(saved.investments ?? "");
  }, []);

  // Save to localStorage on changes
  useEffect(() => {
    saveBudgetToStorage({
      income,
      housing,
      transport,
      food,
      utilities,
      debt,
      wants,
      insurance,
      investments,
    });
  }, [
    income,
    housing,
    transport,
    food,
    utilities,
    debt,
    wants,
    insurance,
    investments,
  ]);

  // Compute numbers
  const numbers = useMemo(
    () =>
      computeBudgetNumbers({
        income,
        housing,
        transport,
        food,
        utilities,
        debt,
        wants,
        insurance,
        investments,
      }),
    [
      income,
      housing,
      transport,
      food,
      utilities,
      debt,
      wants,
      insurance,
      investments,
    ]
  );

  // Compute targets
  const targets = useMemo(() => computeTargets(numbers.i), [numbers.i]);

  // Compute score
  const { score, scoreLabel, scoreColor, scoreBar } = useMemo(
    () => computeScore(numbers, targets),
    [numbers, targets]
  );

  // Tips
  const tips = useMemo(
    () => generateTips(numbers, targets),
    [numbers, targets]
  );

  // Target dollars
  const targetNeeds = targets.needs * numbers.i || 0;
  const targetWants = targets.wants * numbers.i || 0;
  const targetSavings = targets.savings * numbers.i || 0;

  const handleReset = () => {
    setIncome("");
    setHousing("");
    setTransport("");
    setFood("");
    setUtilities("");
    setDebt("");
    setWants("");
    setInsurance("");
    setInvestments("");
    try {
      localStorage.removeItem("bm_budget_coach");
    } catch {}
  };

  // Social share static fields
  const canonicalUrl = "https://www.buddymoney.com/coach";
  const shareTitle = "AI Budget Coach – BuddyMoney";

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
        <meta property="og:title" content={shareTitle} />
        <meta
          property="og:description"
          content="Use BuddyMoney’s free AI Budget Coach to get a calm, realistic monthly budget plan based on your real numbers."
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={shareTitle} />
        <meta
          name="twitter:description"
          content="Use BuddyMoney’s free AI Budget Coach to get a calm, realistic monthly budget plan based on your real numbers."
        />
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <main className="pt-2 lg:pt-4 pb-16 bg-brand-50/40">
        <div className="max-w-5xl mx-auto px-4 space-y-6">

          {/* HERO (UNCHANGED) */}
          <motion.section
  className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-br from-brand-50 via-emerald-50 to-accent-100/70 shadow-soft h-[220px] md:h-[260px] lg:h-[300px]"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.4 }}
  transition={{ duration: 0.7, ease: "easeOut" }}
>
  <img
    src="/icons/hero-budget-coach.png"
    alt="AI Budget Coach hero image"
    className="absolute inset-0 h-full w-full object-cover object-right"
    loading="eager"
  />

  <div className="absolute inset-0 bg-white/35 md:bg-white/20" />

  <motion.div
    className="pointer-events-none absolute -top-24 -right-10 h-64 w-64 rounded-full bg-emerald-200/50 blur-3xl"
    initial={{ opacity: 0, scale: 0.9, y: -10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 1, ease: "easeOut" }}
  />
  <motion.div
    className="pointer-events-none absolute -bottom-24 -left-8 h-64 w-64 rounded-full bg-sky-200/50 blur-3xl"
    initial={{ opacity: 0, scale: 0.9, y: 10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{
      duration: 1.1,
      ease: "easeOut",
      delay: 0.15,
    }}
  />

  <div className="relative px-5 py-6 md:px-8 md:py-7 h-full flex items-center">
    <div className="relative grid gap-6 md:grid-cols-[minmax(0,1.8fr)_minmax(0,1.2fr)] items-center w-full">
      <div className="space-y-4">
        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-emerald-600">
          Budget & Money Coach
        </p>

        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-brand-900 leading-tight">
          AI Budget Coach: Get a calm, realistic plan for your monthly money.
        </h1>

        <p className="text-sm md:text-base text-brand-900/90 max-w-xl backdrop-blur-[1px]">
          Enter your real numbers and see how your budget stacks up against a simple rule
          of thumb. Then get clear suggestions on what to tweak next.
        </p>

        <div className="flex flex-wrap gap-3 text-xs">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-emerald-700 border border-emerald-100 shadow-sm">
            ✍️ Uses your real monthly numbers
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-emerald-700 border border-emerald-100 shadow-sm">
            🎯 Simple, friendly tips—not guilt
          </span>
        </div>
      </div>

      <motion.div
        className="relative hidden md:flex justify-center"
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      >
        <motion.div
          className="rounded-2xl bg-white/90 backdrop-blur-sm border border-emerald-100 shadow-soft px-5 py-4 w-full max-w-xs"
          animate={{ y: [0, -5, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 1.2,
          }}
        >
          <p className="text-xs font-semibold text-slate-800 mb-3">
            What you’ll get
          </p>

          <div className="grid grid-cols-2 gap-3 text-[11px] text-slate-700">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-50 text-lg">
                🧠
              </span>
              <span>Budget score</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-50 text-lg">
                🎯
              </span>
              <span>Targets</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-50 text-lg">
                🧾
              </span>
              <span>Breakdown</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-50 text-lg">
                ✅
              </span>
              <span>Next steps</span>
            </div>
          </div>

          <p className="mt-3 text-[11px] text-emerald-600 font-semibold">
            Fill in your numbers below ↓
          </p>
        </motion.div>
      </motion.div>
    </div>
  </div>
</motion.section>
          <ShareBar
            variant="top"
            label="Share this friendly budgeting coach with someone who needs it"
            title="I’m using BuddyMoney’s AI Budget Coach to get a calm, realistic monthly plan."
          />

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
                    Enter your monthly numbers to get a budget health score, targets, and friendly,
                    actionable tips.
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
                    type="text"
                    inputMode="decimal"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    value={income}
                    onChange={(e) =>
                      setIncome(sanitizeDecimalInput(e.target.value))
                    }
                    placeholder="e.g., 5200"
                  />
                </div>

                <div className="md:col-span-2 grid grid-cols-2 gap-4">
                  <InputField label="Housing / Rent" value={housing} onChange={setHousing} placeholder="e.g., 1600" />
                  <InputField label="Transport" value={transport} onChange={setTransport} placeholder="e.g., 300" />
                  <InputField label="Food / Groceries" value={food} onChange={setFood} placeholder="e.g., 450" />
                  <InputField label="Utilities / Bills" value={utilities} onChange={setUtilities} placeholder="e.g., 220" />
                  <InputField label="Debt payments" value={debt} onChange={setDebt} placeholder="e.g., 250" />
                  <InputField label="Wants (shopping, dining, fun)" value={wants} onChange={setWants} placeholder="e.g., 400" />

                  {/* NEW FIELDS */}
                  <InputField label="Insurance" value={insurance} onChange={setInsurance} placeholder="e.g., 180" />
                  <InputField label="Investments / Retirement" value={investments} onChange={setInvestments} placeholder="e.g., 300" />
                </div>
              </div>

              {/* Score & overview */}
              <div className="mt-8 grid md:grid-cols-5 gap-6">
                <div className="md:col-span-2 bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className={`text-3xl font-extrabold ${scoreColor}`}>{score}</div>
                      <div className="text-sm text-slate-600 -mt-1">{scoreLabel}</div>
                    </div>
                    <div className="w-28">
                      <Bar value={score} color={scoreBar} />
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 mt-3">
                    Based on your inputs and the {Math.round(targets.needs * 100)}/
                    {Math.round(targets.wants * 100)}/
                    {Math.round(targets.savings * 100)} rule of thumb.
                  </p>
                </div>

                <div className="md:col-span-3 bg-white rounded-xl p-4 border border-slate-200">
                  <h4 className="font-semibold text-slate-800 mb-3">Your mix</h4>
                  <div className="space-y-3">
                    <Row label="Needs" value={numbers.needsPct} target={targets.needs * 100} />
                    <Row label="Wants" value={numbers.wantsPct} target={targets.wants * 100} />
                    <Row label="Savings (including investments + leftover)" value={numbers.savingsPct} target={targets.savings * 100} />
                  </div>
                </div>
              </div>

              {/* Chart toggle */}
              <div className="mt-8 flex gap-3">
                <button
                  onClick={() => setChartMode("simple")}
                  className={`px-4 py-2 rounded-lg border text-sm ${
                    chartMode === "simple"
                      ? "bg-emerald-600 text-white border-emerald-700"
                      : "bg-white text-slate-700 border-slate-300"
                  }`}
                >
                  Simple Chart
                </button>
                <button
                  onClick={() => setChartMode("advanced")}
                  className={`px-4 py-2 rounded-lg border text-sm ${
                    chartMode === "advanced"
                      ? "bg-emerald-600 text-white border-emerald-700"
                      : "bg-white text-slate-700 border-slate-300"
                  }`}
                >
                  Advanced Chart
                </button>
              </div>

              {/* Chart */}
              <div className="mt-6 bg-white rounded-xl p-4 border border-slate-200">
                {chartMode === "simple" ? (
                  <DoughnutChartSimple numbers={numbers} />
                ) : (
                  <DoughnutChartAdvanced numbers={numbers} />
                )}
              </div>

              {/* Targets */}
              <div className="mt-8 grid md:grid-cols-3 gap-4">
                <Card title="Suggested Monthly Needs" value={`$${targetNeeds.toFixed(0)}`} note={`${Math.round(targets.needs * 100)}% target`} />
                <Card title="Suggested Monthly Wants" value={`$${targetWants.toFixed(0)}`} note={`${Math.round(targets.wants * 100)}% target`} />
                <Card title="Suggested Monthly Savings" value={`$${targetSavings.toFixed(0)}`} note={`${Math.round(targets.savings * 100)}% target`} />
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

          <AffiliateCalloutAmazonPlanner className="mt-8" />

          <section className="mt-10 space-y-4 text-sm text-slate-700">
            <h2 className="text-base md:text-lg font-semibold text-slate-900">
              How to use this Budget Coach
            </h2>
            <p>
              Start by entering your real monthly take-home income and your typical spending in
              each category. The Budget Coach compares your mix to a flexible version of the
              50/30/20 rule and gives you a score out of 100.
            </p>
            <p>
              You’ll see how much you’re spending on needs, wants, and savings, plus suggested
              dollar amounts to aim for each month. Update your numbers any time your income or
              expenses change.
            </p>
          </section>

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

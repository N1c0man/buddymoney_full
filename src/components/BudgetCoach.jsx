import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import ShareBar from "../components/ShareBar";
import NewsletterSignup from "../components/NewsletterSignup";
import AffiliateCalloutAmazonPlanner from "../components/AffiliateCalloutAmazonPlanner";
import { setCanonical } from "../utils/seo";

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
  Bar,
  Row,
  DoughnutChartSimple,
  DoughnutChartAdvanced,
} from "../components/BudgetUI";

function CoachInput({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-600 mb-1">
        {label}
      </label>
      <input
        type="text"
        inputMode="decimal"
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base shadow-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
        value={value}
        onChange={(e) => onChange(sanitizeDecimalInput(e.target.value))}
        placeholder={placeholder}
      />
    </div>
  );
}

function TargetCard({ title, value, note }) {
  return (
    <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-white to-emerald-50/60 p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </p>
      <p className="mt-1 text-xl font-bold text-slate-900">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{note}</p>
    </div>
  );
}

export default function BudgetCoach() {
  const [income, setIncome] = useState("");
  const [housing, setHousing] = useState("");
  const [transport, setTransport] = useState("");
  const [food, setFood] = useState("");
  const [utilities, setUtilities] = useState("");
  const [debt, setDebt] = useState("");
  const [wants, setWants] = useState("");
  const [insurance, setInsurance] = useState("");
  const [investments, setInvestments] = useState("");

  const [chartMode, setChartMode] = useState("simple");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setCanonical("/coach");
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  const targets = useMemo(() => computeTargets(numbers.i), [numbers.i]);

  const { score, scoreLabel, scoreColor, scoreBar } = useMemo(
    () => computeScore(numbers, targets),
    [numbers, targets]
  );

  const tips = useMemo(() => generateTips(numbers, targets), [numbers, targets]);

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
        <title>Free Budget Coach Calculator | Calm Monthly Budget Plan</title>
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

      <main className="pt-2 lg:pt-4 pb-16 bg-gradient-to-b from-green-50 via-white to-emerald-50/40">
        <div className="max-w-5xl mx-auto px-4 space-y-6">
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

            <div className="relative px-5 py-6 md:px-8 md:py-7 h-full flex items-center">
              <div className="grid gap-6 md:grid-cols-[minmax(0,1.8fr)_minmax(0,1.2fr)] items-center w-full">
                <div className="space-y-4">
                  <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-emerald-600">
                    Budget & Money Coach
                  </p>

                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-brand-900 leading-tight">
                    Free Budget Coach: Get a calm, realistic plan for your monthly money.
                  </h1>

                  <p className="text-sm md:text-base text-brand-900/90 max-w-xl">
                    Enter your real numbers and get a budget score, target
                    breakdown, and friendly next steps.
                  </p>

                  <div className="flex flex-wrap gap-3 text-xs">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-emerald-700 border border-emerald-100 shadow-sm">
                      ✍️ Uses your real monthly numbers
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-emerald-700 border border-emerald-100 shadow-sm">
                      🎯 Simple tips, no guilt
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
                  <div className="rounded-2xl bg-white/90 backdrop-blur-sm border border-emerald-100 shadow-soft px-5 py-4 w-full max-w-xs">
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
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>

          <ShareBar
            variant="top"
            label="Share this friendly budgeting coach with someone who needs it"
            title="I’m using BuddyMoney’s AI Budget Coach to get a calm, realistic monthly plan."
          />

          <motion.section
            className="rounded-3xl border border-emerald-100 bg-white/95 shadow-sm p-6 md:p-8 space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900">
                  Your budget snapshot
                </h2>
                <p className="text-sm md:text-base text-slate-600 mt-1">
                  Add your income and monthly expenses. We’ll turn it into a
                  simple score and suggested targets.
                </p>
              </div>

              <button
                onClick={handleReset}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
              >
                Reset
              </button>
            </div>

            <div className="grid gap-4">
              <CoachInput
                label="Monthly take-home income"
                value={income}
                onChange={setIncome}
                placeholder="5200"
              />

              <div className="grid gap-4 md:grid-cols-2">
                <CoachInput label="Rent / Mortgage" value={housing} onChange={setHousing} placeholder="1600" />
                <CoachInput label="Transportation / Car Payments" value={transport} onChange={setTransport} placeholder="300" />
                <CoachInput label="Food / Groceries" value={food} onChange={setFood} placeholder="450" />
                <CoachInput label="Utilities / Gas / Electricity ETC" value={utilities} onChange={setUtilities} placeholder="220" />
                <CoachInput label="Debt payments / Credit Cards" value={debt} onChange={setDebt} placeholder="250" />
                <CoachInput label="Wants / Fun" value={wants} onChange={setWants} placeholder="400" />
                <CoachInput label="Insurance" value={insurance} onChange={setInsurance} placeholder="180" />
                <CoachInput label="Investments / Retirement" value={investments} onChange={setInvestments} placeholder="300" />
              </div>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-emerald-600 to-sky-600 p-5 text-white shadow-md space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Budget score</span>
                <span className={`font-bold ${scoreColor}`}>{score}/100</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Status</span>
                <span className="font-semibold">{scoreLabel}</span>
              </div>

              <div className="border-t border-white/10 pt-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-300">
                    Target rule
                  </span>
                  <span className="text-lg font-bold text-emerald-400">
                    {Math.round(targets.needs * 100)}/
                    {Math.round(targets.wants * 100)}/
                    {Math.round(targets.savings * 100)}
                  </span>
                </div>
                <Bar value={score} color={scoreBar} />
              </div>
            </div>

            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-3 rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="font-semibold text-slate-900 mb-4">
                  Your mix
                </h3>
                <div className="space-y-3">
                  <Row label="Needs" value={numbers.needsPct} target={targets.needs * 100} />
                  <Row label="Wants" value={numbers.wantsPct} target={targets.wants * 100} />
                  <Row label="Savings" value={numbers.savingsPct} target={targets.savings * 100} />
                </div>
              </div>

              <div className="md:col-span-2 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="font-semibold text-slate-900 mb-3">
                  Chart view
                </h3>

                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => setChartMode("simple")}
                    className={`px-4 py-2 rounded-xl border text-sm font-semibold ${
                      chartMode === "simple"
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "bg-white text-slate-700 border-slate-300"
                    }`}
                  >
                    Simple
                  </button>
                  <button
                    onClick={() => setChartMode("advanced")}
                    className={`px-4 py-2 rounded-xl border text-sm font-semibold ${
                      chartMode === "advanced"
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "bg-white text-slate-700 border-slate-300"
                    }`}
                  >
                    Advanced
                  </button>
                </div>

                {isMounted ? (
                  chartMode === "simple" ? (
                    <DoughnutChartSimple numbers={numbers} />
                  ) : (
                    <DoughnutChartAdvanced numbers={numbers} />
                  )
                ) : (
                  <div className="text-sm text-slate-500">Loading chart…</div>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <TargetCard
                title="Suggested needs"
                value={`$${targetNeeds.toFixed(0)}`}
                note={`${Math.round(targets.needs * 100)}% target`}
              />
              <TargetCard
                title="Suggested wants"
                value={`$${targetWants.toFixed(0)}`}
                note={`${Math.round(targets.wants * 100)}% target`}
              />
              <TargetCard
                title="Suggested savings"
                value={`$${targetSavings.toFixed(0)}`}
                note={`${Math.round(targets.savings * 100)}% target`}
              />
            </div>

            <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-5">
              <h3 className="font-semibold text-slate-900 mb-3">
                Coach tips
              </h3>
              <ul className="list-disc ml-5 text-slate-700 space-y-1 text-sm">
                {tips.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
          </motion.section>

          <AffiliateCalloutAmazonPlanner className="mt-8" />

          <section className="rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-700 space-y-4 shadow-sm">
            <h2 className="text-base md:text-lg font-semibold text-slate-900">
              How to use this Budget Coach
            </h2>
            <p>
              Start by entering your real monthly take-home income and your
              typical spending in each category. The Budget Coach compares your
              mix to a flexible version of the 50/30/20 rule and gives you a
              score out of 100.
            </p>
            <p>
              You’ll see how much you’re spending on needs, wants, and savings,
              plus suggested dollar amounts to aim for each month. Update your
              numbers any time your income or expenses change.
            </p>
          </section>

          <ShareBar
            variant="bottom"
            label="Share this friendly budgeting coach with someone who needs it"
            title="I’m using BuddyMoney’s AI Budget Coach to get a calm, realistic monthly plan."
          />
          {/* NEWSLETTER */}
                      <motion.section
                        id="newsletter"
                        className="mt-0 md:mt-2"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                      >
                        <div className="max-w-3xl mx-auto px-4">
                          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/80 p-6 sm:p-8 shadow-sm">
                            <NewsletterSignup />
                          </div>
                        </div>
                      </motion.section>
        </div>
      </main>
    </>
  );
}
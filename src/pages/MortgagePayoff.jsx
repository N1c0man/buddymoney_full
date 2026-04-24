import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import ShareBar from "../components/ShareBar";
import { setCanonical, buildUrl } from "../utils/seo";

const DEFAULT_PRINCIPAL = 300000;
const DEFAULT_RATE = 6.5;
const DEFAULT_YEARS = 30;
const DEFAULT_EXTRA = 100;

function toNumber(raw) {
  if (raw === null || raw === undefined) return 0;
  const cleaned = String(raw).replace(/[^0-9.]/g, "");
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : 0;
}

function formatMoney(v, { decimals = 0 } = {}) {
  if (!Number.isFinite(v) || v <= 0) return "$0";
  return v.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function buildScenarioSchedule(
  principal,
  termMonths,
  monthlyRate,
  basePayment,
  extraPayment
) {
  const schedule = [];
  if (!principal || !termMonths || !basePayment) {
    return { schedule, totalInterest: 0, payoffMonths: 0 };
  }

  let balance = principal;
  let month = 0;
  let totalInterest = 0;
  const monthlyPayment = basePayment + Math.max(extraPayment, 0);
  const maxIterations = 1200;

  while (balance > 0 && month < maxIterations) {
    const interest = balance * monthlyRate;
    let principalPaid = monthlyPayment - interest;

    if (principalPaid <= 0) principalPaid = monthlyPayment;
    if (principalPaid > balance) principalPaid = balance;

    balance -= principalPaid;
    totalInterest += interest;
    month++;

    schedule.push({
      month,
      balance: Math.max(balance, 0),
      interest,
      principalPaid,
    });

    if (balance <= 0.01) break;
  }

  return { schedule, totalInterest, payoffMonths: month };
}

function computeScenarioMetrics({ principal, rate, years, extra, frequency }) {
  if (!principal || !rate || !years) return null;

  const termMonths = years * 12;
  const monthlyRate = rate > 0 ? rate / 100 / 12 : 0;

  if (!termMonths) return null;

  let basePayment;
  if (monthlyRate === 0) {
    basePayment = principal / termMonths;
  } else {
    const x = Math.pow(1 + monthlyRate, termMonths);
    basePayment = (principal * monthlyRate * x) / (x - 1);
  }

  const effectiveExtra =
    frequency === "biweekly" && basePayment > 0
      ? extra + basePayment / 12
      : extra;

  const normalResult = buildScenarioSchedule(
    principal,
    termMonths,
    monthlyRate,
    basePayment,
    0
  );

  const extraResult = buildScenarioSchedule(
    principal,
    termMonths,
    monthlyRate,
    basePayment,
    effectiveExtra
  );

  const payoffMonthsNormal = normalResult.payoffMonths || termMonths;
  const payoffMonthsExtra = extraResult.payoffMonths || termMonths;

  const payoffYears = Math.floor(payoffMonthsExtra / 12);
  const payoffRemMonths = payoffMonthsExtra % 12;

  const interestNormal = normalResult.totalInterest || 0;
  const interestExtra = extraResult.totalInterest || 0;
  const interestSaved = Math.max(interestNormal - interestExtra, 0);

  const rawYearsSaved = Math.max(
    (payoffMonthsNormal - payoffMonthsExtra) / 12,
    0
  );
  const yearsSaved = rawYearsSaved > 0.05 ? rawYearsSaved.toFixed(1) : null;

  return {
    payoffYears,
    payoffRemMonths,
    interestNormal,
    interestExtra,
    interestSaved,
    yearsSaved,
  };
}

export default function MortgagePayoff() {
  useEffect(() => {
    setCanonical("/mortgage");
  }, []);

  const title =
    "Mortgage Payoff Calculator – Extra Payment & Bi-Weekly Tool | BuddyMoney";

  const description =
    "Use BuddyMoney’s free Mortgage Payoff Calculator to see how extra monthly payments and bi-weekly strategies can reduce your payoff time and total interest.";

  const canonicalUrl = buildUrl("/mortgage");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Mortgage Payoff Calculator – Extra Payment & Bi-Weekly Tool",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    url: canonicalUrl,
    description,
    isAccessibleForFree: true,
    keywords: [
      "mortgage payoff calculator",
      "extra payment mortgage calculator",
      "bi-weekly mortgage calculator",
      "amortization calculator",
      "pay off mortgage faster",
    ],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    publisher: {
      "@type": "Organization",
      name: "BuddyMoney",
      url: "https://www.buddymoney.com",
    },
  };

  const [principal, setPrincipal] = useState(String(DEFAULT_PRINCIPAL));
  const [rate, setRate] = useState(String(DEFAULT_RATE));
  const [years, setYears] = useState(String(DEFAULT_YEARS));
  const [extra, setExtra] = useState(String(DEFAULT_EXTRA));
  const [frequency, setFrequency] = useState("monthly");

  const [scenarioA, setScenarioA] = useState(null);
  const [scenarioB, setScenarioB] = useState(null);

  const [goalYearsInput, setGoalYearsInput] = useState("");
  const [goalResult, setGoalResult] = useState(null);

  const [copyStatus, setCopyStatus] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);

  const principalNum = toNumber(principal);
  const rateNum = toNumber(rate);
  const yearsNum = toNumber(years);
  const extraNum = toNumber(extra);

  const termMonths = yearsNum * 12;
  const monthlyRate = rateNum > 0 ? rateNum / 100 / 12 : 0;

  const basePayment = useMemo(() => {
    if (!principalNum || !termMonths) return 0;
    if (monthlyRate === 0) return principalNum / termMonths;

    const x = Math.pow(1 + monthlyRate, termMonths);
    return (principalNum * monthlyRate * x) / (x - 1);
  }, [principalNum, monthlyRate, termMonths]);

  const effectiveExtra =
    frequency === "biweekly" && basePayment > 0
      ? extraNum + basePayment / 12
      : extraNum;

  function buildSchedule(extraPayment) {
    return buildScenarioSchedule(
      principalNum,
      termMonths,
      monthlyRate,
      basePayment,
      extraPayment
    );
  }

  const normalResult = useMemo(
    () => buildSchedule(0),
    [principalNum, monthlyRate, termMonths, basePayment]
  );

  const extraResult = useMemo(
    () => buildSchedule(effectiveExtra),
    [principalNum, monthlyRate, termMonths, basePayment, effectiveExtra]
  );

  const payoffMonthsNormal = normalResult.payoffMonths || termMonths;
  const payoffMonthsExtra = extraResult.payoffMonths || termMonths;

  const payoffYears = Math.floor(payoffMonthsExtra / 12);
  const payoffRemMonths = payoffMonthsExtra % 12;

  const interestNormal = normalResult.totalInterest || 0;
  const interestExtra = extraResult.totalInterest || 0;
  const interestSaved = Math.max(interestNormal - interestExtra, 0);

  const rawYearsSaved = Math.max(
    (payoffMonthsNormal - payoffMonthsExtra) / 12,
    0
  );
  const yearsSaved = rawYearsSaved > 0.05 ? rawYearsSaved.toFixed(1) : null;

  const chartPoints = useMemo(() => {
    let schedule = [];

    if (
      extraResult &&
      Array.isArray(extraResult.schedule) &&
      extraResult.schedule.length > 0
    ) {
      schedule = extraResult.schedule;
    } else if (
      normalResult &&
      Array.isArray(normalResult.schedule) &&
      normalResult.schedule.length > 0
    ) {
      schedule = normalResult.schedule;
    }

    if (!schedule.length) return [];

    const n = schedule.length;
    const indices = [
      0,
      Math.floor(n * 0.25),
      Math.floor(n * 0.5),
      Math.floor(n * 0.75),
      n - 1,
    ];

    const unique = [...new Set(indices.filter((i) => i >= 0 && i < n))];

    return unique.map((i) => ({
      month: schedule[i].month,
      balance: schedule[i].balance,
    }));
  }, [extraResult, normalResult]);

  const maxBalance =
    chartPoints.length > 0
      ? Math.max(...chartPoints.map((p) => p.balance))
      : 0;

  const scheduleForDisplay =
    extraResult &&
    Array.isArray(extraResult.schedule) &&
    extraResult.schedule.length > 0
      ? extraResult.schedule
      : normalResult.schedule || [];

  function handleReset() {
    setPrincipal(String(DEFAULT_PRINCIPAL));
    setRate(String(DEFAULT_RATE));
    setYears(String(DEFAULT_YEARS));
    setExtra(String(DEFAULT_EXTRA));
    setFrequency("monthly");
    setGoalYearsInput("");
    setGoalResult(null);
    setScenarioA(null);
    setScenarioB(null);
    setCopyStatus("");
  }

  function handleSaveScenarioA() {
    if (!principalNum || !rateNum || !yearsNum) return;
    setScenarioA({
      principal: principalNum,
      rate: rateNum,
      years: yearsNum,
      extra: 0,
      frequency: "monthly",
    });
  }

  function handleSaveScenarioB() {
    if (!principalNum || !rateNum || !yearsNum) return;
    setScenarioB({
      principal: principalNum,
      rate: rateNum,
      years: yearsNum,
      extra: extraNum,
      frequency: "biweekly",
    });
  }

  const scenarioAMetrics = useMemo(
    () => (scenarioA ? computeScenarioMetrics(scenarioA) : null),
    [scenarioA]
  );

  const scenarioBMetrics = useMemo(
    () => (scenarioB ? computeScenarioMetrics(scenarioB) : null),
    [scenarioB]
  );

  function handleGoalCalculate() {
    const gy = toNumber(goalYearsInput);
    if (!gy || gy <= 0) {
      setGoalResult({
        error: "Enter a payoff goal in years greater than 0.",
      });
      return;
    }

    if (!principalNum || !rateNum || !yearsNum || !basePayment) {
      setGoalResult({
        error: "Please enter a valid loan amount, interest rate, and term first.",
      });
      return;
    }

    const targetMonths = gy * 12;

    if (targetMonths >= termMonths) {
      setGoalResult({
        error:
          "Your goal is longer than or equal to your current term. No extra payment is required.",
      });
      return;
    }

    const freq = frequency;

    const payoffForExtra = (extraGuess) => {
      const effective =
        extraGuess +
        (freq === "biweekly" && basePayment > 0 ? basePayment / 12 : 0);
      const result = buildSchedule(effective);
      return result.payoffMonths || termMonths;
    };

    let low = 0;
    let high = principalNum || 1;
    let monthsHigh = payoffForExtra(high);
    let iter = 0;

    while (monthsHigh > targetMonths && iter < 50) {
      high *= 2;
      monthsHigh = payoffForExtra(high);
      iter++;
      if (!Number.isFinite(monthsHigh)) break;
    }

    for (let i = 0; i < 50; i++) {
      const mid = (low + high) / 2;
      const monthsMid = payoffForExtra(mid);
      if (!Number.isFinite(monthsMid)) break;

      if (monthsMid > targetMonths) {
        low = mid;
      } else {
        high = mid;
      }
    }

    const extraNeeded = Math.round(high * 100) / 100;

    setGoalResult({
      error: null,
      extraNeeded,
      targetYears: gy,
      frequencyUsed: freq,
    });
  }

  const shareSummary = useMemo(() => {
    if (!principalNum || !payoffMonthsNormal || !payoffMonthsExtra) return "";

    const originalYears = Math.floor(payoffMonthsNormal / 12);
    const originalRemMonths = payoffMonthsNormal % 12;
    const strategyLabel = frequency === "biweekly" ? "bi-weekly" : "monthly";

    const extraLabel = extraNum > 0 ? formatMoney(extraNum) : "$0";

    const extraBiweeklyNote =
      frequency === "biweekly" && extraNum > 0
        ? ` (≈ ${formatMoney(extraNum / 2)} extra each bi-weekly payment)`
        : "";

    return (
      `With ${extraLabel} in extra per month${extraBiweeklyNote} and ` +
      `${strategyLabel} payments, you'll pay off your ` +
      `${formatMoney(principalNum)} loan in ${payoffYears} years and ` +
      `${payoffRemMonths} months instead of ${originalYears} years and ` +
      `${originalRemMonths} months, and save about ` +
      `${formatMoney(interestSaved)} in interest (estimate, not financial advice).`
    );
  }, [
    principalNum,
    extraNum,
    frequency,
    payoffYears,
    payoffRemMonths,
    payoffMonthsNormal,
    payoffMonthsExtra,
    interestSaved,
  ]);

  function handleCopySummary() {
    if (!shareSummary) return;
    if (
      typeof navigator !== "undefined" &&
      navigator.clipboard &&
      navigator.clipboard.writeText
    ) {
      navigator.clipboard
        .writeText(shareSummary)
        .then(() => {
          setCopyStatus("Copied!");
          setTimeout(() => setCopyStatus(""), 2000);
        })
        .catch(() => {
          setCopyStatus("Copy failed. You can select and copy the text manually.");
          setTimeout(() => setCopyStatus(""), 3000);
        });
    } else {
      setCopyStatus(
        "Your browser does not support automatic copy. Please select and copy the text manually."
      );
      setTimeout(() => setCopyStatus(""), 3000);
    }
  }

  const encodedUrl = encodeURIComponent(canonicalUrl);
  const encodedTitle = encodeURIComponent(
    "I’m using BuddyMoney’s Mortgage Payoff Calculator to see how extra payments can knock years off my mortgage."
  );

  async function handleCopyLink() {
    try {
      if (
        typeof navigator !== "undefined" &&
        navigator.clipboard &&
        navigator.clipboard.writeText
      ) {
        await navigator.clipboard.writeText(canonicalUrl);
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  }

  function handleDownloadCsv() {
    const schedule = scheduleForDisplay;
    if (!schedule || !schedule.length || !basePayment) return;

    const paymentAmount = basePayment + effectiveExtra;

    const rows = [
      ["Month", "Payment", "Principal", "Interest", "Balance"],
      ...schedule.map((row) => [
        row.month,
        paymentAmount.toFixed(2),
        row.principalPaid.toFixed(2),
        row.interest.toFixed(2),
        row.balance.toFixed(2),
      ]),
    ];

    const csvContent = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mortgage_amortization_schedule.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="BuddyMoney" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />

        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <main className="pt-2 lg:pt-4 pb-16 bg-gradient-to-b from-green-50 via-white to-emerald-50/40">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-6xl mx-auto px-4 space-y-6"
        >
          <section className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-br from-brand-50 via-emerald-50 to-accent-100/70 shadow-soft h-[220px] md:h-[260px] lg:h-[300px]">
            <img
              src="/icons/hero-mortgage-payoff.png"
              alt="Mortgage Payoff Calculator hero image"
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-white/55 md:bg-white/40" />

            <div className="relative px-5 py-6 md:px-8 md:py-7 h-full flex items-center">
              <div className="space-y-3 max-w-2xl">
                <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-emerald-700">
                  Mortgage Payoff Lab
                </p>

                <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-brand-900 leading-tight">
                  See how extra payments can knock years off your mortgage.
                </h1>

                <p className="text-sm md:text-base text-brand-900/90 max-w-xl">
                  Plug in your balance, rate, and extra payments to see how much
                  interest you could save — and how soon you could be free from
                  the bank.
                </p>

                <div className="flex flex-wrap gap-2 text-[11px] mt-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1 text-emerald-700 border border-emerald-100 shadow-sm">
                    🧮 Normal vs. extra payments
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1 text-slate-700 border border-slate-100 shadow-sm">
                    📉 Interest saved + years avoided
                  </span>
                </div>
              </div>
            </div>
          </section>

          <ShareBar
            variant="top"
            label="Share this mortgage payoff calculator with a homeowner"
            title="Mortgage Payoff Calculator – BuddyMoney"
          />

          <section className="rounded-3xl border border-slate-200 bg-white shadow-md px-4 py-6 md:px-8 md:py-8 space-y-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900">
                  Mortgage Payoff Calculator
                </h2>
                <p className="mt-1 text-slate-600 max-w-2xl text-sm md:text-base">
                  Enter your loan details, choose a payoff strategy, and see the
                  impact in plain English.
                </p>
              </div>

              <button
                onClick={handleReset}
                className="self-start rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-emerald-200 hover:text-emerald-700"
              >
                Reset
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
              <InputBox label="Loan amount" value={principal} onChange={setPrincipal} />
              <InputBox label="Interest rate %" value={rate} onChange={setRate} />
              <InputBox label="Term in years" value={years} onChange={setYears} />
              <InputBox label="Extra payment / month" value={extra} onChange={setExtra} />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Payment frequency
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Bi-weekly mode estimates the effect of one extra full payment
                  per year.
                </p>
              </div>

              <div className="inline-flex rounded-full bg-white p-1 text-sm border border-slate-200">
                <button
                  type="button"
                  onClick={() => setFrequency("monthly")}
                  className={`px-4 py-2 rounded-full font-semibold ${
                    frequency === "monthly"
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => setFrequency("biweekly")}
                  className={`px-4 py-2 rounded-full font-semibold ${
                    frequency === "biweekly"
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Bi-weekly
                </button>
              </div>
            </div>

            <div className="text-center max-w-xl mx-auto">
              <p className="text-sm text-slate-600">
                Small extra payments can dramatically reduce your payoff time
                and total interest.
              </p>
            </div>

            <div className="bg-black text-white rounded-2xl p-5 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Monthly payment</span>
                <span className="font-semibold">{formatMoney(basePayment)}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Payoff time</span>
                <span className="font-semibold">
                  {payoffYears} yr {payoffRemMonths} mo
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Interest with strategy</span>
                <span className="font-semibold">
                  {formatMoney(interestExtra)}
                </span>
              </div>

              <div className="border-t border-white/10 pt-3 flex justify-between items-center">
                <span className="text-sm text-slate-300">Interest saved</span>
                <span className="text-lg font-bold text-emerald-400">
                  {formatMoney(interestSaved)}
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-sm text-emerald-900">
              {interestSaved > 0 && yearsSaved ? (
                <p>
                  You’ll pay off about{" "}
                  <span className="font-semibold">{yearsSaved} years</span>{" "}
                  sooner and avoid roughly{" "}
                  <span className="font-semibold">
                    {formatMoney(interestSaved)}
                  </span>{" "}
                  in interest compared with the normal schedule.
                </p>
              ) : (
                <p>
                  Try adding an extra payment or switching to bi-weekly payments
                  to see how your payoff timeline changes.
                </p>
              )}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-xs text-slate-600 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div className="font-semibold text-slate-800">
                  Comparison summary
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-1">
                  <span>
                    <span className="font-medium text-slate-800">
                      Base payoff:
                    </span>{" "}
                    {Math.floor(payoffMonthsNormal / 12)} yr{" "}
                    {payoffMonthsNormal % 12} mo
                  </span>
                  <span>
                    <span className="font-medium text-slate-800">
                      Current strategy:
                    </span>{" "}
                    {payoffYears} yr {payoffRemMonths} mo
                  </span>
                  <span>
                    <span className="font-medium text-slate-800">
                      Base interest:
                    </span>{" "}
                    {formatMoney(interestNormal)}
                  </span>
                  <span>
                    <span className="font-medium text-slate-800">
                      Strategy interest:
                    </span>{" "}
                    {formatMoney(interestExtra)}
                  </span>
                </div>
              </div>
            </div>

            <section className="grid gap-4 md:grid-cols-2">
              <ScenarioCard
                title="Scenario A: Monthly, no extra"
                description="Snapshot this loan with standard monthly payments and no extra contributions."
                metrics={scenarioAMetrics}
                onClick={handleSaveScenarioA}
              />

              <ScenarioCard
                title="Scenario B: Bi-weekly + extra"
                description="Snapshot this loan using your current extra amount with a bi-weekly strategy."
                metrics={scenarioBMetrics}
                onClick={handleSaveScenarioB}
              />
            </section>

            <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                  <h2 className="text-sm font-semibold text-slate-900">
                    Have a payoff goal?
                  </h2>
                  <p className="text-xs text-slate-500 mt-1 max-w-xl">
                    Enter a target payoff timeline and we’ll estimate the extra
                    payment needed with your current loan details.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-end gap-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">
                      Target payoff years
                    </label>
                    <input
                      type="number"
                      min={1}
                      className="w-full sm:w-40 rounded-xl border border-slate-300 px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      value={goalYearsInput}
                      onChange={(e) => setGoalYearsInput(e.target.value)}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleGoalCalculate}
                    className="rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-500"
                  >
                    Calculate
                  </button>
                </div>
              </div>

              <div className="mt-4 rounded-2xl bg-white border border-slate-200 p-4 text-sm text-slate-700">
                {goalResult?.error ? (
                  <span className="text-rose-600">{goalResult.error}</span>
                ) : goalResult?.extraNeeded != null ? (
                  <>
                    To pay off this loan in about{" "}
                    <span className="font-semibold">
                      {goalResult.targetYears} years
                    </span>{" "}
                    with{" "}
                    <span className="font-semibold">
                      {goalResult.frequencyUsed === "biweekly"
                        ? "bi-weekly"
                        : "monthly"}
                    </span>{" "}
                    payments, you’d need approximately{" "}
                    <span className="font-semibold text-emerald-700">
                      {formatMoney(goalResult.extraNeeded)}
                    </span>{" "}
                    in extra payments per month.
                    {goalResult.frequencyUsed === "biweekly" && (
                      <>
                        {" "}
                        That’s about{" "}
                        <span className="font-semibold text-emerald-700">
                          {formatMoney(goalResult.extraNeeded / 2)}
                        </span>{" "}
                        extra added to each bi-weekly payment.
                      </>
                    )}
                  </>
                ) : (
                  <span className="text-slate-500">
                    Example: if your term is 30 years, try a 15-year payoff goal.
                  </span>
                )}
              </div>
            </section>

            <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
              <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between mb-3">
                  <h2 className="text-sm font-semibold text-slate-900">
                    Paydown progress
                  </h2>
                  <span className="text-xs text-slate-500">
                    Remaining balance at key milestones
                  </span>
                </div>

                <div className="h-40 flex items-end justify-between gap-4">
                  {chartPoints.length === 0 ? (
                    <div className="text-xs text-slate-500">
                      No chart data yet. Check that loan amount, rate, and term
                      are all filled in.
                    </div>
                  ) : (
                    chartPoints.map((p) => {
                      const heightPct =
                        maxBalance > 0 ? (p.balance / maxBalance) * 85 + 10 : 0;

                      return (
                        <div
                          key={p.month}
                          className="flex-1 h-full flex flex-col items-center justify-end"
                        >
                          <div
                            className="w-6 bg-emerald-500 rounded-t-md shadow"
                            style={{ height: `${heightPct}%` }}
                          />
                          <div className="mt-1 text-[10px] text-slate-500">
                            Month {p.month}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                <p className="mt-3 text-xs text-slate-500">
                  Each bar shows remaining balance at a few points in time.
                  Extra payments speed up the drop.
                </p>
              </div>

              <div className="rounded-2xl bg-emerald-50 border border-emerald-100 px-5 py-4 shadow-sm">
                <h2 className="text-sm font-semibold text-emerald-900 mb-2">
                  Coach tips
                </h2>
                <ul className="list-disc ml-4 space-y-1 text-sm text-emerald-900/90">
                  <li>Round your payment up by $50–$200 if your budget allows.</li>
                  <li>Use bonuses or tax refunds as principal-only payments.</li>
                  <li>
                    Bi-weekly payments can mimic one extra payment per year.
                  </li>
                </ul>
              </div>
            </div>

            <section className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                <div>
                  <h2 className="text-sm font-semibold text-slate-900">
                    Save or share this plan
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Copy this summary into an email, note, or text message.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="rounded-full border border-emerald-500 px-4 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-50"
                >
                  Copy summary
                </button>
              </div>

              <textarea
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[80px]"
                readOnly
                value={
                  shareSummary ||
                  "Enter a loan amount, rate, term, and payoff strategy to generate a shareable summary."
                }
              />

              {copyStatus && (
                <p className="mt-1 text-xs text-emerald-600">{copyStatus}</p>
              )}
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 px-5 pt-4">
                <h2 className="text-sm font-semibold text-slate-900">
                  Amortization schedule preview
                </h2>
                <button
                  type="button"
                  onClick={handleDownloadCsv}
                  className="rounded-full border border-emerald-500 px-4 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-50"
                >
                  Download CSV
                </button>
              </div>

              <div className="px-5 pb-4 overflow-x-auto">
                {scheduleForDisplay && scheduleForDisplay.length ? (
                  <table className="mt-3 w-full text-xs text-left text-slate-700">
                    <thead>
                      <tr className="border-b border-slate-200 text-xs text-slate-500">
                        <th className="py-2 pr-3">Month</th>
                        <th className="py-2 pr-3">Payment</th>
                        <th className="py-2 pr-3">Principal</th>
                        <th className="py-2 pr-3">Interest</th>
                        <th className="py-2 pr-3">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scheduleForDisplay.slice(0, 24).map((row) => (
                        <tr
                          key={row.month}
                          className="border-b border-slate-50 last:border-0"
                        >
                          <td className="py-2 pr-3">{row.month}</td>
                          <td className="py-2 pr-3">
                            {formatMoney(basePayment + effectiveExtra)}
                          </td>
                          <td className="py-2 pr-3">
                            {formatMoney(row.principalPaid)}
                          </td>
                          <td className="py-2 pr-3">
                            {formatMoney(row.interest)}
                          </td>
                          <td className="py-2 pr-3">
                            {formatMoney(row.balance)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="mt-3 text-xs text-slate-500">
                    Enter a valid loan amount, interest rate, and term to view
                    the schedule.
                  </p>
                )}
              </div>
            </section>

            <ShareBar
              variant="bottom"
              label="Share this mortgage payoff calculator with a homeowner"
              title="I’m using BuddyMoney’s Mortgage Payoff Calculator to see how extra payments can knock years off my mortgage."
            />

            <section>
              <h2 className="text-sm font-semibold text-slate-900 mb-2">
                Explore more BuddyMoney tools
              </h2>
              <p className="text-xs text-slate-500 mb-3">
                Keep building your financial plan with these other calculators.
              </p>
              <div className="grid gap-3 md:grid-cols-3">
                <RelatedToolCard
                  title="Budget Planner"
                  description="Track your income and spending so extra mortgage payments fit comfortably."
                  href="/tools#budget-tracker"
                />
                <RelatedToolCard
                  title="Debt Payoff Planner"
                  description="Prioritize credit cards, loans, and other debts alongside your mortgage."
                  href="/tools#debt-payoff"
                />
                <RelatedToolCard
                  title="Emergency Fund Calculator"
                  description="Estimate how much cash you should keep on hand for surprises."
                  href="/tools#emergency-fund"
                />
              </div>
            </section>

            <section>
              <div className="bg-slate-900 text-slate-100 rounded-2xl px-5 py-4 text-xs leading-relaxed shadow-sm">
                <h2 className="text-sm font-semibold mb-2">
                  Assumptions &amp; Disclaimers
                </h2>
                <ul className="list-disc ml-4 space-y-1">
                  <li>
                    Calculations assume a fixed-rate, fully amortizing mortgage
                    with payments made in full and on time each month.
                  </li>
                  <li>
                    Property taxes, homeowners insurance, mortgage insurance,
                    HOA dues, and other housing costs are not included.
                  </li>
                  <li>
                    Bi-weekly mode approximates half-payments every two weeks by
                    applying the equivalent of one extra monthly principal
                    payment per year. Actual lender programs may differ.
                  </li>
                  <li>
                    Scenario comparisons, payoff goals, and summaries are
                    estimates only and are not financial advice.
                  </li>
                </ul>
              </div>
            </section>
          </section>
        </motion.div>
      </main>
    </>
  );
}

function InputBox({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-600 mb-1">
        {label}
      </label>
      <input
        type="text"
        inputMode="decimal"
        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
        value={String(value ?? "")}
        onChange={(e) => {
          let raw = e.target.value.replace(/[^0-9.]/g, "");
          const firstDot = raw.indexOf(".");
          if (firstDot !== -1) {
            raw =
              raw.slice(0, firstDot + 1) +
              raw.slice(firstDot + 1).replace(/\./g, "");
          }
          onChange(raw);
        }}
      />
    </div>
  );
}

function ScenarioCard({ title, description, metrics, onClick }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
      <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
      <p className="text-xs text-slate-500 mt-1 mb-3">{description}</p>

      {metrics ? (
        <div className="space-y-1 text-sm text-slate-700 mb-3">
          <div>
            <span className="font-medium">Payoff time:</span>{" "}
            {metrics.payoffYears} yr {metrics.payoffRemMonths} mo
          </div>
          <div>
            <span className="font-medium">Total interest:</span>{" "}
            {formatMoney(metrics.interestExtra)}
          </div>
          <div>
            <span className="font-medium">Interest saved:</span>{" "}
            {formatMoney(metrics.interestSaved)}
          </div>
        </div>
      ) : (
        <p className="text-xs text-slate-500 mb-3">
          Click below to store this scenario from your current values.
        </p>
      )}

      <button
        type="button"
        onClick={onClick}
        className="rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
      >
        Set from current values
      </button>
    </div>
  );
}

function RelatedToolCard({ title, description, href }) {
  return (
    <a
      href={href}
      className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-transform"
    >
      <div className="text-sm font-semibold text-slate-900 mb-1">{title}</div>
      <p className="text-xs text-slate-600">{description}</p>
    </a>
  );
}
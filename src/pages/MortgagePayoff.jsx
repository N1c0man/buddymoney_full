import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

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

// Helper to build a schedule for arbitrary scenario
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
  const yearsSaved =
    rawYearsSaved > 0.05 ? rawYearsSaved.toFixed(1) : null;

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
  const [principal, setPrincipal] = useState(String(DEFAULT_PRINCIPAL));
  const [rate, setRate] = useState(String(DEFAULT_RATE));
  const [years, setYears] = useState(String(DEFAULT_YEARS));
  const [extra, setExtra] = useState(String(DEFAULT_EXTRA));
  const [frequency, setFrequency] = useState("monthly"); // "monthly" | "biweekly"

  // Scenario snapshots
  const [scenarioA, setScenarioA] = useState(null);
  const [scenarioB, setScenarioB] = useState(null);

  // Goal payoff calculator
  const [goalYearsInput, setGoalYearsInput] = useState("");
  const [goalResult, setGoalResult] = useState(null);

  // Copy/share status
  const [copyStatus, setCopyStatus] = useState("");

  const principalNum = toNumber(principal);
  const rateNum = toNumber(rate);
  const yearsNum = toNumber(years);
  const extraNum = toNumber(extra);

  const termMonths = yearsNum * 12;
  const monthlyRate = rateNum > 0 ? rateNum / 100 / 12 : 0;

  // Base mortgage payment (monthly)
  const basePayment = useMemo(() => {
    if (!principalNum || !termMonths) return 0;
    if (monthlyRate === 0) return principalNum / termMonths;

    const x = Math.pow(1 + monthlyRate, termMonths);
    return (principalNum * monthlyRate * x) / (x - 1);
  }, [principalNum, monthlyRate, termMonths]);

  // Effective extra payment:
  // - Monthly mode: just user extra
  // - Bi-weekly mode: user extra + 1/12 of base payment (approx 1 extra payment/year)
  const effectiveExtra =
    frequency === "biweekly" && basePayment > 0
      ? extraNum + basePayment / 12
      : extraNum;

  // Build amortization with optional extra monthly payment
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

  // Payoff and interest metrics for current strategy
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
  const yearsSaved =
    rawYearsSaved > 0.05 ? rawYearsSaved.toFixed(1) : null;

  // --- CHART DATA ---
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

  // Schedule used for table + CSV (prefer "with extra", fall back to base)
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

  // Scenario handlers
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
    () =>
      scenarioA ? computeScenarioMetrics(scenarioA) : null,
    [scenarioA]
  );

  const scenarioBMetrics = useMemo(
    () =>
      scenarioB ? computeScenarioMetrics(scenarioB) : null,
    [scenarioB]
  );

  // Goal date calculator
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
        error:
          "Please enter a valid loan amount, interest rate, and term first.",
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

  // Shareable summary text
  const shareSummary = useMemo(() => {
    if (!principalNum || !payoffMonthsNormal || !payoffMonthsExtra) return "";

    const originalYears = Math.floor(payoffMonthsNormal / 12);
    const originalRemMonths = payoffMonthsNormal % 12;
    const strategyLabel = frequency === "biweekly" ? "bi-weekly" : "monthly";

    const extraLabel =
      extraNum > 0 ? formatMoney(extraNum) : "$0";

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
          setCopyStatus(
            "Copy failed. You can select and copy the text manually."
          );
          setTimeout(() => setCopyStatus(""), 3000);
        });
    } else {
      setCopyStatus(
        "Your browser does not support automatic copy. Please select and copy the text manually."
      );
      setTimeout(() => setCopyStatus(""), 3000);
    }
  }

  // CSV download
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
    <div className="min-h-screen bg-slate-50 pb-16">
      <motion.div
        className="max-w-6xl mx-auto px-4 pt-10"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
              Mortgage Payoff Calculator
            </h1>
            <p className="mt-2 text-slate-600 max-w-2xl">
              See how extra monthly payments and bi-weekly strategies reduce
              your payoff time and total interest.
            </p>
          </div>

          <button
            onClick={handleReset}
            className="text-sm text-indigo-600 hover:underline"
          >
            Reset to defaults
          </button>
        </div>

        {/* Impact banner */}
        <div className="mb-4">
          <div className="inline-flex flex-wrap items-center gap-2 rounded-full bg-indigo-50 border border-indigo-100 px-4 py-2 text-sm text-slate-800">
            <span className="font-semibold text-indigo-700">
              {interestSaved > 0 && yearsSaved
                ? "Impact of your payoff strategy"
                : "Try adding an extra payment or switching to bi-weekly to see your impact"}
            </span>

            {interestSaved > 0 && yearsSaved && (
              <span className="whitespace-normal">
                You&apos;ll pay off about{" "}
                <span className="font-semibold">
                  {yearsSaved} years
                </span>{" "}
                sooner and avoid roughly{" "}
                <span className="font-semibold">
                  {formatMoney(interestSaved)}
                </span>{" "}
                in interest compared with the normal schedule.
              </span>
            )}
          </div>
        </div>

        {/* Frequency toggle */}
        <div className="mb-6 flex items-center justify-end">
          <span className="text-xs text-slate-600 mr-2">
            Payment frequency:
          </span>
          <div className="inline-flex rounded-full bg-slate-100 p-1 text-xs">
            <button
              type="button"
              onClick={() => setFrequency("monthly")}
              className={`px-3 py-1 rounded-full border ${
                frequency === "monthly"
                  ? "bg-white border-slate-300 text-slate-900 shadow-sm"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setFrequency("biweekly")}
              className={`px-3 py-1 rounded-full border ml-1 ${
                frequency === "biweekly"
                  ? "bg-white border-slate-300 text-slate-900 shadow-sm"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              Bi-weekly
            </button>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid gap-4 md:grid-cols-4 mb-6">
          <InputBox
            label="Loan Amount ($)"
            value={principal}
            onChange={setPrincipal}
          />
          <InputBox
            label="Interest Rate (%)"
            value={rate}
            onChange={setRate}
          />
          <InputBox label="Term (Years)" value={years} onChange={setYears} />
          <InputBox
            label="Extra Payment ($/mo)"
            value={extra}
            onChange={setExtra}
          />
        </div>

        {/* Summary */}
        <div className="grid gap-4 md:grid-cols-4 mb-4">
          <SummaryCard
            title="Base Monthly Payment"
            value={formatMoney(basePayment)}
          />
          <SummaryCard
            title="Payoff Time (with strategy)"
            value={`${payoffYears} yr ${payoffRemMonths} mo`}
          />
          <SummaryCard
            title="Total Interest (with strategy)"
            value={formatMoney(interestExtra)}
          />
          <SummaryCard
            title="Interest Saved vs Normal"
            value={formatMoney(interestSaved)}
            green
          />
        </div>

        {/* Base vs extra comparison */}
        <div className="mb-8 text-xs text-slate-600 bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-sm">
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
                  With current strategy:
                </span>{" "}
                {payoffYears} yr {payoffRemMonths} mo
              </span>
              <span>
                <span className="font-medium text-slate-800">
                  Interest (base):
                </span>{" "}
                {formatMoney(interestNormal)}
              </span>
              <span>
                <span className="font-medium text-slate-800">
                  Interest (with strategy):
                </span>{" "}
                {formatMoney(interestExtra)}
              </span>
            </div>
          </div>
          {frequency === "biweekly" && (
            <p className="mt-1 text-[11px] text-slate-500">
              Bi-weekly mode approximates half your monthly payment every two
              weeks, which is similar to making one extra full payment per year.
            </p>
          )}
        </div>

        {/* Scenario A vs Scenario B */}
        <section className="mb-8 grid gap-4 md:grid-cols-2">
          {/* Scenario A */}
          <div className="bg-white border border-slate-200 rounded-2xl px-4 py-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-800 mb-1">
              Scenario A: Monthly, no extra
            </h2>
            <p className="text-[11px] text-slate-500 mb-3">
              Snapshot this loan with standard monthly payments and no extra
              contributions.
            </p>
            {scenarioAMetrics ? (
              <div className="space-y-1 text-xs text-slate-700 mb-3">
                <div>
                  <span className="font-medium">Payoff time:</span>{" "}
                  {scenarioAMetrics.payoffYears} yr{" "}
                  {scenarioAMetrics.payoffRemMonths} mo
                </div>
                <div>
                  <span className="font-medium">Total interest:</span>{" "}
                  {formatMoney(scenarioAMetrics.interestExtra)}
                </div>
                <div>
                  <span className="font-medium">Interest saved vs base:</span>{" "}
                  {formatMoney(scenarioAMetrics.interestSaved)}
                </div>
              </div>
            ) : (
              <p className="text-[11px] text-slate-500 mb-3">
                Click “Set from current values” to store this scenario.
              </p>
            )}
            <button
              type="button"
              onClick={handleSaveScenarioA}
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-3 py-1.5 text-[11px] font-medium text-slate-700 hover:bg-slate-50"
            >
              Set from current values
            </button>
          </div>

          {/* Scenario B */}
          <div className="bg-white border border-slate-200 rounded-2xl px-4 py-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-800 mb-1">
              Scenario B: Bi-weekly + extra
            </h2>
            <p className="text-[11px] text-slate-500 mb-3">
              Snapshot this loan using your current extra amount with a
              bi-weekly strategy.
            </p>
            {scenarioBMetrics ? (
              <div className="space-y-1 text-xs text-slate-700 mb-3">
                <div>
                  <span className="font-medium">Payoff time:</span>{" "}
                  {scenarioBMetrics.payoffYears} yr{" "}
                  {scenarioBMetrics.payoffRemMonths} mo
                </div>
                <div>
                  <span className="font-medium">Total interest:</span>{" "}
                  {formatMoney(scenarioBMetrics.interestExtra)}
                </div>
                <div>
                  <span className="font-medium">Interest saved vs base:</span>{" "}
                  {formatMoney(scenarioBMetrics.interestSaved)}
                </div>
              </div>
            ) : (
              <p className="text-[11px] text-slate-500 mb-3">
                Click “Set from current values” to store this scenario.
              </p>
            )}
            <button
              type="button"
              onClick={handleSaveScenarioB}
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-3 py-1.5 text-[11px] font-medium text-slate-700 hover:bg-slate-50"
            >
              Set from current values
            </button>
          </div>
        </section>

        {/* Goal date reverse calculator */}
        <section className="mb-8 bg-white border border-slate-200 rounded-2xl px-5 py-4 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold text-slate-800">
                Have a payoff goal?
              </h2>
              <p className="text-[11px] text-slate-500 mt-1">
                Enter a target payoff horizon and we’ll estimate the extra{" "}
                {frequency === "biweekly"
                  ? "per month (and per bi-weekly payment)"
                  : "per month"}{" "}
                needed with your current loan details.
              </p>
            </div>
            <div className="flex items-end gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Target payoff (years)
                </label>
                <input
                  type="number"
                  min={1}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-24"
                  value={goalYearsInput}
                  onChange={(e) => setGoalYearsInput(e.target.value)}
                />
              </div>
              <button
                type="button"
                onClick={handleGoalCalculate}
                className="inline-flex items-center justify-center rounded-full border border-indigo-500 px-3 py-1.5 text-xs font-medium text-indigo-600 hover:bg-indigo-50 mt-4 md:mt-0"
              >
                Calculate extra needed
              </button>
            </div>
          </div>

          <div className="mt-3 text-[11px] text-slate-600">
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
                payments, you&apos;d need approximately{" "}
                <span className="font-semibold">
                  {formatMoney(goalResult.extraNeeded)}
                </span>{" "}
                in extra payments per month.
                {goalResult.frequencyUsed === "biweekly" && (
                  <>
                    {" "}
                    That’s about{" "}
                    <span className="font-semibold">
                      {formatMoney(goalResult.extraNeeded / 2)}
                    </span>{" "}
                    extra added to each bi-weekly payment.
                  </>
                )}
              </>
            ) : (
              <span className="text-slate-500">
                Example: if your term is 30 years, try a 15-year payoff goal to
                see how much extra you might need.
              </span>
            )}
          </div>
        </section>

        {/* Chart + Tips */}
        <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
          {/* Chart */}
          <div className="bg-white rounded-2xl border border-slate-200 px-5 py-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-slate-800">
                Paydown Progress (simulated)
              </h2>
              <span className="text-[11px] text-slate-500">
                Remaining balance at key milestones
              </span>
            </div>

            <div className="h-40 flex items-end justify-between gap-4">
              {chartPoints.length === 0 ? (
                <div className="text-xs text-slate-500">
                  No chart data yet. Check that loan amount, rate, and term are
                  all filled in.
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
                        className="w-6 bg-indigo-500 rounded-t-md shadow"
                        style={{ height: `${heightPct}%` }}
                      />
                      <div className="mt-1 text-[10px] text-slate-500">
                        {p.month}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <p className="mt-3 text-[11px] text-slate-500">
              Each bar shows remaining balance at a few points in time (start →{" "}
              mid → end). Bi-weekly payments and extra contributions speed up
              the drop.
            </p>
          </div>

          {/* Coach tips */}
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl px-5 py-4 shadow-sm">
            <h2 className="text-sm font-semibold text-emerald-900 mb-2">
              Coach Tips
            </h2>
            <ul className="list-disc ml-4 space-y-1 text-xs text-emerald-900/90">
              <li>
                Even small extra payments compound—round your payment up by
                $50–$200.
              </li>
              <li>
                Use windfalls (bonuses, tax refunds) as lump-sum principal
                payments.
              </li>
              <li>
                Bi-weekly payments can mimic one extra payment per year without
                changing your budget dramatically.
              </li>
            </ul>
          </div>
        </div>

        {/* Save / share summary */}
        <section className="mt-8 bg-white border border-slate-200 rounded-2xl px-5 py-4 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
            <div>
              <h2 className="text-sm font-semibold text-slate-800">
                Save or share this plan
              </h2>
              <p className="text-[11px] text-slate-500 mt-1">
                Copy this summary into an email, note, or text message so you
                can revisit your payoff strategy later.
              </p>
            </div>
            <button
              type="button"
              onClick={handleCopySummary}
              className="inline-flex items-center justify-center rounded-full border border-indigo-500 px-3 py-1.5 text-xs font-medium text-indigo-600 hover:bg-indigo-50"
            >
              Copy summary
            </button>
          </div>
          <textarea
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[70px]"
            readOnly
            value={
              shareSummary ||
              "Enter a loan amount, rate, term, and payoff strategy to generate a shareable summary."
            }
          />
          {copyStatus && (
            <p className="mt-1 text-[11px] text-emerald-600">{copyStatus}</p>
          )}
        </section>

        {/* Amortization preview + CSV download */}
        <section className="mt-8 bg-white border border-slate-200 rounded-2xl shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 px-5 pt-4">
            <h2 className="text-sm font-semibold text-slate-800">
              Amortization schedule (preview)
            </h2>
            <button
              type="button"
              onClick={handleDownloadCsv}
              className="inline-flex items-center justify-center rounded-full border border-indigo-500 px-3 py-1.5 text-xs font-medium text-indigo-600 hover:bg-indigo-50"
            >
              Download full schedule (CSV)
            </button>
          </div>

          <div className="px-5 pb-4 overflow-x-auto">
            {scheduleForDisplay && scheduleForDisplay.length ? (
              <table className="mt-3 w-full text-xs text-left text-slate-700">
                <thead>
                  <tr className="border-b border-slate-200 text-[11px] text-slate-500">
                    <th className="py-1 pr-3">Month</th>
                    <th className="py-1 pr-3">Payment</th>
                    <th className="py-1 pr-3">Principal</th>
                    <th className="py-1 pr-3">Interest</th>
                    <th className="py-1 pr-3">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {scheduleForDisplay.slice(0, 24).map((row) => (
                    <tr
                      key={row.month}
                      className="border-b border-slate-50 last:border-0"
                    >
                      <td className="py-1 pr-3">{row.month}</td>
                      <td className="py-1 pr-3">
                        {formatMoney(basePayment + effectiveExtra)}
                      </td>
                      <td className="py-1 pr-3">
                        {formatMoney(row.principalPaid)}
                      </td>
                      <td className="py-1 pr-3">
                        {formatMoney(row.interest)}
                      </td>
                      <td className="py-1 pr-3">
                        {formatMoney(row.balance)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="mt-3 text-xs text-slate-500">
                Enter a valid loan amount, interest rate, and term to view the
                schedule.
              </p>
            )}
          </div>
        </section>

        {/* Related tools */}
        <section className="mt-8 max-w-5xl">
          <h2 className="text-sm font-semibold text-slate-800 mb-2">
            Explore more BuddyMoney tools
          </h2>
          <p className="text-[11px] text-slate-500 mb-3">
            Keep building your financial plan with these other calculators.
          </p>
          <div className="grid gap-3 md:grid-cols-3">
            <RelatedToolCard
              title="Budget Planner"
              description="Track your income and spending so extra mortgage payments fit comfortably."
              href="/tools/#budget-tracker"
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

        {/* Assumptions & disclaimers */}
        <section className="mt-8 max-w-4xl">
          <div className="bg-slate-900 text-slate-100 rounded-2xl px-5 py-4 text-xs leading-relaxed shadow-sm">
            <h2 className="text-sm font-semibold mb-2">
              Assumptions &amp; Disclaimers
            </h2>
            <ul className="list-disc ml-4 space-y-1">
              <li>
                Calculations assume a fixed-rate, fully amortizing mortgage with
                payments made in full and on time each month.
              </li>
              <li>
                Property taxes, homeowners insurance, mortgage insurance, HOA
                dues, and other housing costs are not included.
              </li>
              <li>
                Bi-weekly mode approximates half-payments every two weeks by
                applying the equivalent of one extra monthly principal payment
                per year. Actual lender bi-weekly programs may differ.
              </li>
              <li>
                Scenario comparisons, payoff goals, and summaries are estimates
                only and are not a commitment to lend or financial advice.
                Actual lender terms may differ.
              </li>
            </ul>
          </div>
        </section>
      </motion.div>
    </div>
  );
}

/* --- Small components --- */

function InputBox({ label, value, onChange }) {
  return (
    <div className="flex flex-col">
      <label className="text-xs font-semibold text-slate-600 mb-1">
        {label}
      </label>
      <input
        type="number"
        className="rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function SummaryCard({ title, value, green }) {
  return (
    <div
      className={`rounded-2xl px-4 py-3 shadow-sm border ${
        green ? "border-emerald-300" : "border-slate-200"
      } bg-white`}
    >
      <div className="text-xs font-semibold text-slate-500 mb-1">{title}</div>
      <div
        className={`text-2xl font-bold ${
          green ? "text-emerald-600" : "text-slate-900"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function RelatedToolCard({ title, description, href }) {
  return (
    <a
      href={href}
      className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-transform"
    >
      <div className="text-xs font-semibold text-slate-800 mb-1">
        {title}
      </div>
      <p className="text-[11px] text-slate-600">{description}</p>
    </a>
  );
}

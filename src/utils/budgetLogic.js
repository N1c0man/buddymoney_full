/**
 * Sanitizes user input for numerical fields.
 * Allows digits, commas, one decimal point.
 */
export function sanitizeDecimalInput(s) {
  let raw = String(s ?? "").replace(/[^0-9.,]/g, "");
  raw = raw.replace(/,/g, "");

  const firstDot = raw.indexOf(".");
  if (firstDot !== -1) {
    raw =
      raw.slice(0, firstDot + 1) +
      raw.slice(firstDot + 1).replace(/\./g, "");
  }

  return raw;
}

/** Convert cleaned string to number */
function toNumber(value) {
  const cleaned = String(value ?? "").replace(/,/g, "");
  const n = parseFloat(cleaned);
  if (!Number.isFinite(n) || Number.isNaN(n)) return 0;
  return n < 0 ? 0 : n;
}

/** Load from localStorage */
export function loadBudgetFromStorage() {
  try {
    const raw = localStorage.getItem("bm_budget_coach");
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data || typeof data !== "object") return null;
    return data;
  } catch {
    return null;
  }
}

/** Save to localStorage */
export function saveBudgetToStorage(payload) {
  try {
    localStorage.setItem("bm_budget_coach", JSON.stringify(payload));
  } catch {}
}

/**
 * Core budget calculation
 */
export function computeBudgetNumbers({
  income,
  housing,
  transport,
  food,
  utilities,
  debt,
  wants,
  insurance,
  investments,
}) {
  const i = toNumber(income);
  const h = toNumber(housing);
  const t = toNumber(transport);
  const f = toNumber(food);
  const u = toNumber(utilities);
  const d = toNumber(debt);
  const w = toNumber(wants);
  const ins = toNumber(insurance);
  const inv = toNumber(investments);

  const needs = h + t + f + u + d + ins;
  const total = needs + w + inv;
  const leftover = i - total;

  const needsPct = i > 0 ? (needs / i) * 100 : 0;
  const wantsPct = i > 0 ? (w / i) * 100 : 0;
  const savingsPct =
    i > 0
      ? ((inv + (leftover > 0 ? leftover : 0)) / i) * 100
      : 0;

  return {
    i,
    h,
    t,
    f,
    u,
    d,
    w,
    ins,
    inv,
    needs,
    total,
    leftover,
    needsPct,
    wantsPct,
    savingsPct,
  };
}

/**
 * Adaptive targets based on income
 */
export function computeTargets(income) {
  const BASE_RULES = {
    needs: 0.5,
    wants: 0.3,
    savings: 0.2,
  };

  if (income <= 0) return BASE_RULES;
  if (income < 3000) return { needs: 0.55, wants: 0.3, savings: 0.15 };
  if (income > 8000) return { needs: 0.5, wants: 0.25, savings: 0.25 };
  return BASE_RULES;
}

/**
 * Score calculation
 */
export function computeScore(numbers, targets) {
  const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

  const nOver = Math.max(0, numbers.needsPct - targets.needs * 100);
  const wOver = Math.max(0, numbers.wantsPct - targets.wants * 100);
  const sUnder = Math.max(0, targets.savings * 100 - numbers.savingsPct);

  const penalty = nOver * 0.6 + wOver * 0.6 + sUnder * 0.8;
  const score = clamp(Math.round(100 - penalty), 0, 100);

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

  return { score, scoreLabel, scoreColor, scoreBar };
}

/**
 * Tips generation
 */
export function generateTips(numbers, targets) {
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

  const suggestedSavings = targets.savings * numbers.i;
  if (numbers.savingsPct < targets.savings * 100) {
    t.push(
      `Savings below target. Automate at least ${suggestedSavings.toFixed(
        0
      )} this month.`
    );
  }

  if (numbers.inv <= 0) {
    t.push(
      "Consider automating a small monthly investment — even $50 builds momentum."
    );
  }

  if (numbers.leftover < 0) {
    t.push(
      "You’re overspending. Aim to trim 5–10% from the highest non-essential category."
    );
  }

  if (t.length === 0) {
    t.push(
      "Nice balance! Consider nudging savings +2–5% for faster progress."
    );
  }

  return t.slice(0, 3);
}

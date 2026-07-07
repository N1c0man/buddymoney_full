// src/tools/CreditCardFinder.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation } from "react-router-dom";
import ShareBar from "../components/ShareBar";
import AppBottomNav from "../components/AppBottomNav";
import { setCanonical } from "../utils/seo";

const AFFILIATE_ENABLED = false;

const CREDIT_CARDS = [
  {
    id: "sample-cashback-plus",
    name: "CashBack Plus Visa",
    issuer: "Sample Bank",
    network: "Visa",
    creditScore: "good",
    cardType: "cashback",
    annualFee: 0,
    bonus: "Earn a $200 bonus after you spend $1,000 in the first 3 months.",
    rewards:
      "3% cash back on groceries, 2% at gas stations, 1% on everything else.",
    introApr: "0% intro APR for 15 months on purchases.",
    regularApr: "18.99%–27.99% variable APR.",
    perks: [
      "No annual fee",
      "Cell phone protection when you pay your bill with the card",
      "Auto rental collision coverage",
    ],
    link: "#",
  },
  {
    id: "travel-rewards-world",
    name: "Travel Rewards World Mastercard",
    issuer: "Sample Travel Bank",
    network: "Mastercard",
    creditScore: "excellent",
    cardType: "travel",
    annualFee: 95,
    bonus: "60,000 bonus miles after $3,000 spent in 3 months.",
    rewards: "2x miles on travel and dining, 1x miles on all other purchases.",
    introApr: "0% intro APR on balance transfers for 12 months.",
    regularApr: "20.99%–28.99% variable APR.",
    perks: [
      "No foreign transaction fees",
      "Two airport lounge visits per year",
      "Global Entry / TSA PreCheck credit every 4 years",
    ],
    link: "#",
  },
  {
    id: "everyday-builder-secured",
    name: "Everyday Builder Secured Card",
    issuer: "Friendly Bank",
    network: "Visa",
    creditScore: "building",
    cardType: "secured",
    annualFee: 0,
    bonus: "No bonus — designed to help you build credit over time.",
    rewards: "1% cash back on all purchases.",
    introApr: "N/A",
    regularApr: "25.99% variable APR.",
    perks: [
      "Reports to all three major credit bureaus",
      "Choose your own deposit starting at $200",
      "Free access to monthly credit score",
    ],
    link: "#",
  },
  {
    id: "student-cash-starter",
    name: "Student Cash Starter",
    issuer: "Campus Bank",
    network: "Visa",
    creditScore: "fair",
    cardType: "student",
    annualFee: 0,
    bonus: "Earn a $50 statement credit after your first purchase.",
    rewards: "3% back on coffee shops & dining, 1% on everything else.",
    introApr: "0% intro APR for 6 months on purchases.",
    regularApr: "22.99%–29.99% variable APR.",
    perks: [
      "No annual fee",
      "Automatic credit line reviews after 6 months",
      "Tools to help track spending by category",
    ],
    link: "#",
  },
];

const CREDIT_SCORE_LABELS = {
  any: "Any credit score",
  excellent: "Excellent (720+)",
  good: "Good (670–719)",
  fair: "Fair (580–669)",
  building: "Building / limited",
};

const CARD_TYPE_LABELS = {
  any: "Any card type",
  cashback: "Cash back",
  travel: "Travel",
  "balance-transfer": "Balance transfer",
  secured: "Secured / rebuilding",
  student: "Student",
};

const INTENT_CONTENT = {
  dining: {
    eyebrow: "Dining Rewards Match",
    title: "Find cards that may reward dining, takeout, and coffee runs.",
    description:
      "Coming from the tip calculator? Start with cards that may reward restaurant, takeout, coffee, and everyday purchases.",
    cardType: "cashback",
    annualFeeFilter: "any",
  },
  "low-interest": {
    eyebrow: "Interest Savings Match",
    title: "Compare cards that may help with interest and payoff planning.",
    description:
      "Coming from the debt payoff calculator? Start with cards that include intro APR language or lower-cost features while you build a payoff plan.",
    cardType: "any",
    annualFeeFilter: "any",
  },
  rewards: {
    eyebrow: "Rewards Match",
    title: "Match credit card rewards to your real monthly spending.",
    description:
      "Coming from the budget tracker? Compare cards that may fit everyday spending like groceries, gas, dining, travel, and bills.",
    cardType: "cashback",
    annualFeeFilter: "any",
  },
  backup: {
    eyebrow: "Emergency Backup Match",
    title: "Look for simple, flexible cards while you build savings.",
    description:
      "Coming from the emergency fund calculator? A card should not replace savings, but a no-fee card may provide flexibility while you build your cash cushion.",
    cardType: "any",
    annualFeeFilter: "no-fee",
  },
  lifestyle: {
    eyebrow: "Everyday Spending Match",
    title: "Get more value from meals, group plans, and everyday purchases.",
    description:
      "Coming from the bill splitter? Compare cards that may reward common spending like dining, groceries, travel, and shared outings.",
    cardType: "cashback",
    annualFeeFilter: "any",
  },
};

export default function CreditCardFinder({ showAppBottomNav = false }) {
  const location = useLocation();

  const intentType = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("type");
  }, [location.search]);

  const intentConfig = INTENT_CONTENT[intentType] || null;

  const [creditScore, setCreditScore] = useState("any");
  const [cardType, setCardType] = useState("any");
  const [annualFeeFilter, setAnnualFeeFilter] = useState("any");
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [compareIds, setCompareIds] = useState([]);

  useEffect(() => {
    if (!intentConfig) return;

    setCreditScore("any");
    setCardType(intentConfig.cardType || "any");
    setAnnualFeeFilter(intentConfig.annualFeeFilter || "any");
    setSortBy("featured");
    setSearchQuery("");
  }, [intentConfig]);

  useEffect(() => {
    setCanonical("/tools/credit-cards");
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleCompare = (id) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  const selectedForCompare = useMemo(
    () => CREDIT_CARDS.filter((card) => compareIds.includes(card.id)),
    [compareIds]
  );

  const schemaOrg = useMemo(() => {
    const items = CREDIT_CARDS.map((card, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "FinancialProduct",
        name: card.name,
        description: `${card.rewards} ${card.bonus}`,
        provider: {
          "@type": "BankOrCreditUnion",
          name: card.issuer,
        },
        feesAndCommissionsSpecification:
          card.annualFee === 0
            ? "No annual fee"
            : `$${card.annualFee.toLocaleString()} annual fee`,
      },
    }));

    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Credit Card Finder",
      description:
        "Use BuddyMoney’s educational credit card finder to compare sample cards by credit score, rewards type, and annual fee before applying anywhere.",
      itemListElement: items,
    };
  }, []);

  const filteredCards = useMemo(() => {
    let cards = [...CREDIT_CARDS];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      cards = cards.filter(
        (card) =>
          card.name.toLowerCase().includes(q) ||
          card.issuer.toLowerCase().includes(q)
      );
    }

    if (creditScore !== "any") {
      cards = cards.filter((card) => card.creditScore === creditScore);
    }

    if (cardType !== "any") {
      cards = cards.filter((card) => card.cardType === cardType);
    }

    if (annualFeeFilter !== "any") {
      cards = cards.filter((card) => {
        if (annualFeeFilter === "no-fee") return card.annualFee === 0;
        if (annualFeeFilter === "under-100")
          return card.annualFee > 0 && card.annualFee < 100;
        if (annualFeeFilter === "premium") return card.annualFee >= 100;
        return true;
      });
    }

    if (intentType === "low-interest") {
      cards.sort((a, b) => {
        const aHasIntro = a.introApr && a.introApr !== "N/A" ? 1 : 0;
        const bHasIntro = b.introApr && b.introApr !== "N/A" ? 1 : 0;
        return bHasIntro - aHasIntro;
      });
    } else if (sortBy === "annualFeeLow") {
      cards.sort((a, b) => a.annualFee - b.annualFee);
    } else if (sortBy === "annualFeeHigh") {
      cards.sort((a, b) => b.annualFee - a.annualFee);
    }

    return cards;
  }, [
    creditScore,
    cardType,
    annualFeeFilter,
    sortBy,
    searchQuery,
    intentType,
  ]);

  const pageTitle =
    "Credit Card Finder: Compare Cards by Credit Score, Type & Fee | BuddyMoney";
  const pageDescription =
    "Use BuddyMoney’s educational credit card finder to compare sample cards by credit score, card type, and annual fee. Helpful for beginners, rebuilding credit, travel rewards, and balance transfer research.";

  const heroEyebrow = intentConfig
    ? intentConfig.eyebrow
    : "Credit Card Finder";

  const heroTitle = intentConfig
    ? intentConfig.title
    : "Compare credit cards without the confusing noise.";

  const heroDescription = intentConfig
    ? intentConfig.description
    : "Explore sample credit cards by credit score, card type, annual fee, APR, rewards, and perks. Built for beginners, credit rebuilders, and people who want to compare before applying.";

  const activeFiltersCount =
    (creditScore !== "any" ? 1 : 0) +
    (cardType !== "any" ? 1 : 0) +
    (annualFeeFilter !== "any" ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  const resetFilters = () => {
    setCreditScore("any");
    setCardType("any");
    setAnnualFeeFilter("any");
    setSortBy("featured");
    setSearchQuery("");
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="robots" content="index,follow" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta
          property="og:url"
          content="https://www.buddymoney.com/tools/credit-cards"
        />
        <meta
          property="og:image"
          content="https://www.buddymoney.com/icons/buddymoney-og-default.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta
          name="twitter:image"
          content="https://www.buddymoney.com/icons/buddymoney-og-default.png"
        />

        <script type="application/ld+json">{JSON.stringify(schemaOrg)}</script>
      </Helmet>

      <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-sky-50 pb-16 pt-4">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
          <section className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-br from-brand-50 via-emerald-50 to-sky-50 px-5 py-6 shadow-sm md:px-8 md:py-8">
            <div className="pointer-events-none absolute -top-24 -right-10 h-64 w-64 rounded-full bg-emerald-200/50 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-8 h-64 w-64 rounded-full bg-sky-200/50 blur-3xl" />

            <div className="relative grid gap-6 md:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] md:items-center">
              <div className="space-y-4">
                <p className="inline-flex items-center gap-2 rounded-2xl bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700 shadow-sm">
                  {heroEyebrow}
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                    Educational Tool
                  </span>
                </p>

                <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-brand-900 leading-tight">
                  {heroTitle}
                </h1>

                <p className="text-sm md:text-base text-brand-800/80 max-w-xl">
                  {heroDescription}
                </p>

                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full bg-white/80 border border-emerald-100 px-3 py-1 text-emerald-700">
                    Beginner-friendly
                  </span>
                  <span className="rounded-full bg-white/80 border border-emerald-100 px-3 py-1 text-emerald-700">
                    Sample data for now
                  </span>
                  <span className="rounded-full bg-white/80 border border-emerald-100 px-3 py-1 text-emerald-700">
                    Partner offers coming later
                  </span>
                </div>

                {intentConfig && (
                  <div className="rounded-2xl border border-emerald-100 bg-white/80 px-4 py-3 text-xs text-emerald-900 shadow-sm">
                    <p className="font-semibold">Personalized starting point</p>
                    <p className="mt-1">
                      BuddyMoney adjusted the filters based on the tool you
                      came from. You can change or reset them anytime.
                    </p>
                  </div>
                )}

                <p className="text-[12px] text-slate-700">
                  Want broader context first? Visit the{" "}
                  <Link
                    to="/credit-cards"
                    className="font-semibold text-emerald-700 underline underline-offset-2"
                  >
                    Credit Cards Hub
                  </Link>{" "}
                  or read our{" "}
                  <Link
                    to="/blog/best-secured-credit-cards/"
                    className="font-semibold text-emerald-700 underline underline-offset-2"
                  >
                    secured credit cards guide
                  </Link>
                  .
                </p>
              </div>

              <div className="rounded-2xl bg-white/90 backdrop-blur-sm border border-emerald-100 shadow-sm px-5 py-4 text-sm text-slate-800 space-y-3">
                <p className="text-xs font-semibold text-slate-700">
                  How to use it
                </p>
                <ol className="ml-4 list-decimal space-y-1 text-[12px]">
                  <li>Choose your credit score range.</li>
                  <li>Pick a card type that matches your goal.</li>
                  <li>Filter by annual fee.</li>
                  <li>Compare up to 3 cards side by side.</li>
                </ol>
                <p className="text-[11px] text-slate-500">
                  This is educational sample data while BuddyMoney prepares live
                  partner links.
                </p>
              </div>
            </div>
          </section>

          <ShareBar
            variant="top"
            label="Share this compare credit card tool with a buddy"
            title="I’m using BuddyMoney’s credit card finder to explore card options."
          />

          <section className="rounded-3xl border border-emerald-100 bg-white/95 shadow-sm px-4 py-6 md:px-6 md:py-8 space-y-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Who this tool is for
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                A calmer way to compare card categories before applying.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <InfoCard
                tone="emerald"
                title="Building or rebuilding credit"
                text="Compare secured and starter-style cards before deciding what may fit your situation."
              />
              <InfoCard
                tone="sky"
                title="Choosing your first card"
                text="Compare annual fees, rewards styles, and basic card types without getting buried in marketing language."
              />
              <InfoCard
                tone="amber"
                title="Avoiding high-fee traps"
                text="Spot fees, APRs, and tradeoffs before applying, especially if you are trying to keep costs low."
              />
            </div>
          </section>

          <section className="space-y-6 rounded-3xl border border-emerald-100 bg-white/95 shadow-sm px-4 py-6 md:px-6 md:py-8">
            <div className="rounded-3xl bg-gradient-to-br from-emerald-600 to-sky-600 p-5 text-white shadow-md space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-white/75">Cards showing</span>
                <span className="font-semibold">{filteredCards.length}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-white/75">Selected to compare</span>
                <span className="font-semibold">
                  {selectedForCompare.length}/3
                </span>
              </div>

              <div className="border-t border-white/15 pt-3 flex justify-between items-center">
                <span className="text-sm text-white/75">Mode</span>
                <span className="text-lg font-bold text-white">
                  Educational preview
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 sm:p-5 space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Find cards that fit your situation
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    Filter by credit score, card type, annual fee, and search by
                    name or bank.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {activeFiltersCount > 0 && (
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
                      {activeFiltersCount} active filter
                      {activeFiltersCount === 1 ? "" : "s"}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    Reset
                  </button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                <FilterSelect
                  label="Credit score"
                  value={creditScore}
                  onChange={setCreditScore}
                  options={CREDIT_SCORE_LABELS}
                />

                <FilterSelect
                  label="Card type"
                  value={cardType}
                  onChange={setCardType}
                  options={CARD_TYPE_LABELS}
                />

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Annual fee
                  </label>
                  <select
                    value={annualFeeFilter}
                    onChange={(e) => setAnnualFeeFilter(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
                  >
                    <option value="any">Any annual fee</option>
                    <option value="no-fee">No annual fee</option>
                    <option value="under-100">Under $100</option>
                    <option value="premium">$100+ premium</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Sort by
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
                  >
                    <option value="featured">Featured</option>
                    <option value="annualFeeLow">Lowest annual fee</option>
                    <option value="annualFeeHigh">Highest annual fee</option>
                  </select>
                </div>

                <div className="md:col-span-2 lg:col-span-1">
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Search
                  </label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Card or bank"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs text-slate-500">
                  Showing{" "}
                  <span className="font-semibold text-slate-800">
                    {filteredCards.length}
                  </span>{" "}
                  card{filteredCards.length === 1 ? "" : "s"}.
                </p>

                {selectedForCompare.length > 0 && (
                  <p className="text-xs text-emerald-700">
                    Scroll down to compare your selected cards side by side.
                  </p>
                )}
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                {filteredCards.map((card) => (
                  <CardResult
                    key={card.id}
                    card={card}
                    isSelected={compareIds.includes(card.id)}
                    onToggleCompare={() => toggleCompare(card.id)}
                  />
                ))}

                {filteredCards.length === 0 && (
                  <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center text-sm text-slate-600">
                    No cards match those filters yet. Try widening your credit
                    score, card type, or annual fee range.
                  </div>
                )}
              </div>
            </div>

            {selectedForCompare.length > 0 && (
              <ComparePanel
                cards={selectedForCompare}
                onClear={() => setCompareIds([])}
              />
            )}

            <div className="rounded-2xl border border-amber-100 bg-amber-50/80 px-4 py-3 text-xs leading-relaxed text-amber-900">
              <p className="font-semibold uppercase tracking-[0.16em] text-amber-800">
                Important note
              </p>
              <p className="mt-1">
                This tool is for educational purposes only and is not financial
                advice. Card details shown here are sample data while we prepare
                live offers from partner banks and card issuers. Always review
                the terms and disclosures on the official application page before
                you apply.
              </p>
            </div>
          </section>

          <section className="rounded-3xl border border-emerald-100 bg-white/95 shadow-sm px-4 py-6 md:px-6 md:py-8 space-y-5">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                How to compare credit cards without guessing
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                A good credit card is not just about the biggest bonus. It
                should match your credit profile, spending habits, and financial
                situation.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <InfoCard
                tone="emerald"
                title="Match the card to your goal"
                text="A secured card can make sense for rebuilding credit. A travel card may fit frequent flyers. A balance transfer card may help with payoff planning."
              />
              <InfoCard
                tone="sky"
                title="Look beyond the welcome offer"
                text="Bonuses can be attractive, but annual fees, regular APR, balance transfer terms, and ongoing rewards matter more over time."
              />
              <InfoCard
                tone="amber"
                title="Protect your budget"
                text="If you may carry a balance, interest charges matter a lot. If you pay in full, a no-fee or rewards card may be more useful."
              />
            </div>

            <p className="text-sm text-slate-600">
              Want help before you choose? Explore the{" "}
              <Link
                to="/credit-cards"
                className="font-semibold text-emerald-700 underline underline-offset-2"
              >
                Credit Cards Hub
              </Link>
              , read our{" "}
              <Link
                to="/blog/best-secured-credit-cards/"
                className="font-semibold text-emerald-700 underline underline-offset-2"
              >
                best secured credit cards guide
              </Link>
              , or use the{" "}
              <Link
                to="/tools/budget-coach"
                className="font-semibold text-emerald-700 underline underline-offset-2"
              >
                Budget Coach
              </Link>{" "}
              and{" "}
              <Link
                to="/tools/debt-payoff"
                className="font-semibold text-emerald-700 underline underline-offset-2"
              >
                Debt Payoff tool
              </Link>
              .
            </p>
          </section>

          <ShareBar
            variant="bottom"
            label="Share this compare credit card tool with a buddy"
            title="I’m using BuddyMoney’s credit card finder to explore card options."
          />
        </div>
      </main>
      {showAppBottomNav && <AppBottomNav />}
    </>
  );
}

function FilterSelect({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
      >
        {Object.entries(options).map(([optionValue, optionLabel]) => (
          <option key={optionValue} value={optionValue}>
            {optionLabel}
          </option>
        ))}
      </select>
    </div>
  );
}

function InfoCard({ tone, title, text }) {
  const toneClasses = {
    emerald: "border-emerald-100 bg-emerald-50/50",
    sky: "border-sky-100 bg-sky-50/50",
    amber: "border-amber-100 bg-amber-50/50",
  };

  return (
    <div
      className={`rounded-2xl border p-4 ${
        toneClasses[tone] || toneClasses.emerald
      }`}
    >
      <h3 className="text-sm font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-xs text-slate-700">{text}</p>
    </div>
  );
}

function ComparePanel({ cards, onClear }) {
  return (
    <section className="mt-4 space-y-3 rounded-2xl border border-emerald-100 bg-emerald-50/60 px-4 py-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Compare cards
          </p>
          <p className="text-xs text-slate-600">
            You’re comparing{" "}
            <span className="font-semibold">{cards.length}</span> card
            {cards.length === 1 ? "" : "s"}. You can select up to 3 at a time.
          </p>
        </div>
        <button
          type="button"
          onClick={onClear}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
        >
          Clear comparison
        </button>
      </div>

      <div className="mt-2 flex gap-3 overflow-x-auto pb-2">
        {cards.map((card) => (
          <div
            key={card.id}
            className="min-w-[230px] max-w-xs rounded-2xl border border-slate-200 bg-white px-3 py-3 text-xs text-slate-800 shadow-sm"
          >
            <p className="text-sm font-semibold text-slate-900 line-clamp-2">
              {card.name}
            </p>
            <p className="mt-0.5 text-xs text-slate-500">
              {card.issuer} • {card.network}
            </p>

            <dl className="mt-3 space-y-1 text-xs">
              <CompareRow label="Type" value={CARD_TYPE_LABELS[card.cardType]} />
              <CompareRow
                label="Score"
                value={CREDIT_SCORE_LABELS[card.creditScore]}
              />
              <CompareRow
                label="Annual fee"
                value={
                  card.annualFee === 0
                    ? "No fee"
                    : `$${card.annualFee.toLocaleString()}/yr`
                }
              />
              <CompareBlock label="Intro APR" value={card.introApr} />
              <CompareBlock label="Regular APR" value={card.regularApr} />
              <CompareBlock label="Bonus" value={card.bonus} />
            </dl>

            <p className="mt-2 text-xs text-slate-500 line-clamp-3">
              {card.rewards}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CompareRow({ label, value }) {
  return (
    <div className="flex justify-between gap-2">
      <dt className="text-slate-500">{label}</dt>
      <dd className="text-right font-medium text-slate-800">{value}</dd>
    </div>
  );
}

function CompareBlock({ label, value }) {
  return (
    <div>
      <dt className="text-slate-500">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function CardResult({ card, isSelected, onToggleCompare }) {
  const {
    name,
    issuer,
    network,
    creditScore,
    cardType,
    annualFee,
    bonus,
    rewards,
    introApr,
    regularApr,
    perks,
    link,
  } = card;

  const annualFeeLabel =
    annualFee === 0 ? "No annual fee" : `$${annualFee.toLocaleString()}/year`;

  const highlights = [
    rewards?.split(".")[0] || null,
    annualFee === 0 ? "No annual fee" : null,
    introApr && introApr !== "N/A" ? introApr : null,
  ].filter(Boolean);

  const canApply = AFFILIATE_ENABLED && link && link !== "#";

  return (
    <article className="flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-200 hover:shadow-md">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="hidden sm:flex h-16 w-28 flex-shrink-0 flex-col justify-between rounded-xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-emerald-100 px-2.5 py-2 shadow-inner">
              <div className="flex items-center justify-between text-[9px] text-slate-500">
                <span className="font-medium truncate max-w-[70%]">
                  {issuer}
                </span>
                <span className="rounded-full border border-emerald-200 bg-white/80 px-1.5 py-[1px] text-[8px] font-semibold uppercase tracking-[0.14em] text-emerald-700">
                  {network}
                </span>
              </div>

              <div className="text-[10px] font-semibold text-slate-800 leading-tight line-clamp-2">
                {name}
              </div>

              <div className="flex items-center justify-between text-[8px] text-slate-500 mt-1">
                <span className="rounded-full bg-emerald-600/90 px-1.5 py-[1px] text-[8px] font-semibold uppercase tracking-[0.16em] text-white">
                  {CARD_TYPE_LABELS[cardType] || "Credit"}
                </span>
              </div>
            </div>

            <div>
              <h2 className="text-base sm:text-lg font-semibold text-slate-900">
                {name}
              </h2>
              <p className="text-xs text-slate-500">
                {issuer} • {network}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onToggleCompare}
            className={`inline-flex items-center gap-1 rounded-2xl border px-3 py-1 text-xs font-semibold transition ${
              isSelected
                ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                : "border-slate-200 bg-white text-slate-600 hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700"
            }`}
          >
            {isSelected ? "In compare" : "Compare"}
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
            {CARD_TYPE_LABELS[cardType] || "Credit card"}
          </span>
          <span className="rounded-full bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600">
            {CREDIT_SCORE_LABELS[creditScore] || "Any credit score"}
          </span>
          <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
            {annualFeeLabel}
          </span>
        </div>

        {highlights.length > 0 && (
          <div className="flex flex-wrap gap-2 text-xs text-emerald-700">
            {highlights.map((h, i) => (
              <span key={i} className="rounded-full bg-emerald-50 px-2.5 py-1">
                ⭐ {h.trim()}
              </span>
            ))}
          </div>
        )}

        <div className="space-y-2">
          <p className="text-sm font-semibold text-slate-900">{bonus}</p>
          <p className="text-sm text-slate-700">{rewards}</p>
        </div>

        <dl className="grid grid-cols-1 sm:grid-cols-3 gap-3 rounded-2xl bg-slate-50 px-4 py-4 text-xs text-slate-700">
          <MiniStat label="Intro APR" value={introApr} />
          <MiniStat label="Regular APR" value={regularApr} />
          <MiniStat label="Annual fee" value={annualFeeLabel} />
        </dl>

        {Array.isArray(perks) && perks.length > 0 && (
          <ul className="space-y-1 text-xs text-slate-700">
            {perks.map((perk, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="mt-[5px] h-[6px] w-[6px] rounded-full bg-emerald-500/80" />
                <span>{perk}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
        <p className="text-xs text-slate-500 max-w-md">
          This card is shown as an{" "}
          <span className="font-semibold text-slate-800">
            example for comparison.
          </span>{" "}
          Real offers are added as partnerships go live.
        </p>

        {canApply ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1"
          >
            Apply now
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="inline-flex items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-500"
          >
            Apply link coming soon
          </button>
        )}
      </div>
    </article>
  );
}

function MiniStat({ label, value }) {
  return (
    <div>
      <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </dt>
      <dd className="mt-1 font-medium text-slate-800">{value}</dd>
    </div>
  );
}
// src/tools/CreditCardFinder.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import ShareBar from "../components/ShareBar";
import { setCanonical } from "../utils/seo";

const AFFILIATE_ENABLED = false; // flip to true later when you have real links

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
    rewards:
      "2x miles on travel and dining, 1x miles on all other purchases.",
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

export default function CreditCardFinder() {
  const [creditScore, setCreditScore] = useState("any");
  const [cardType, setCardType] = useState("any");
  const [annualFeeFilter, setAnnualFeeFilter] = useState("any");
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [compareIds, setCompareIds] = useState([]);

  useEffect(() => {
    setCanonical("/tools/credit-cards");
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleCompare = (id) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((x) => x !== id);
      }
      if (prev.length >= 3) {
        return prev;
      }
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

    if (sortBy === "annualFeeLow") {
      cards.sort((a, b) => a.annualFee - b.annualFee);
    } else if (sortBy === "annualFeeHigh") {
      cards.sort((a, b) => b.annualFee - a.annualFee);
    }

    return cards;
  }, [creditScore, cardType, annualFeeFilter, sortBy, searchQuery]);

  const pageTitle =
    "Credit Card Finder: Compare Cards by Credit Score, Type & Fee | BuddyMoney";
  const pageDescription =
    "Use BuddyMoney’s educational credit card finder to compare sample cards by credit score, card type, and annual fee. Helpful for beginners, rebuilding credit, travel rewards, and balance transfer research.";

  const activeFiltersCount =
    (creditScore !== "any" ? 1 : 0) +
    (cardType !== "any" ? 1 : 0) +
    (annualFeeFilter !== "any" ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

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

        <script type="application/ld+json">
          {JSON.stringify(schemaOrg)}
        </script>
      </Helmet>

      <main className="min-h-screen bg-gradient-to-b from-green-50 via-white to-emerald-50/40 pb-16 pt-4">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
          <section className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-br from-brand-50 via-emerald-50 to-accent-100/70 px-5 py-6 shadow-soft md:px-8 md:py-8">
            <div className="pointer-events-none absolute -top-24 -right-10 h-64 w-64 rounded-full bg-emerald-200/50 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-8 h-64 w-64 rounded-full bg-sky-200/50 blur-3xl" />

            <div className="relative grid gap-6 md:grid-cols-[minmax(0,1.8fr)_minmax(0,1.2fr)] items-center">
              <div className="space-y-4">
                <p className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
                  Credit Card Finder
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
  Educational Tool
</span>
                </p>

                <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-brand-900 leading-tight">
                  Find a credit card that actually fits your life.
                </h1>

                <p className="text-sm md:text-base text-brand-800/80 max-w-xl">
                  Use this educational comparison tool to explore example credit cards
  by credit score, card type, and annual fee. It is designed to help
  you research your options in plain English before applying anywhere.
  Real offers are added as partnerships go live.
                </p>

                <ul className="ml-4 list-disc text-[12px] text-slate-700 space-y-1">
                  <li>Helpful for beginners, rebuilding credit, and reward seekers.</li>
                  <li>Compare common card categories before you apply.</li>
                  <li>Use alongside your budget and debt tools to make a smarter decision.</li>
                </ul>

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
                  </Link>.
                </p>
              </div>

              <div className="relative">
                <div className="rounded-2xl bg-white/90 backdrop-blur-sm border border-emerald-100 shadow-soft px-5 py-4 text-sm text-slate-800 space-y-3">
                  <p className="text-xs font-semibold text-slate-700">
                    How to use this finder
                  </p>
                  <ol className="ml-4 list-decimal space-y-1 text-[12px]">
                    <li>Pick your closest credit score range.</li>
                    <li>Choose the card type that matches your goal.</li>
                    <li>Filter by annual fee to fit your budget.</li>
                    <li>Compare perks, APRs, and welcome offers side by side.</li>
                  </ol>
                  <p className="text-[11px] text-slate-500">
                    Real partner links can be added later. For now, this page is
                    designed to help you compare options in plain English.
                  </p>
                </div>
              </div>
            </div>
          </section>
<section className="rounded-3xl border border-slate-200 bg-white shadow-sm px-4 py-6 md:px-6 md:py-8 space-y-4">
  <div className="space-y-2">
    <h2 className="text-lg font-bold text-slate-900">
      Who this tool is for
    </h2>
    <p className="text-sm text-slate-600">
      This credit card finder is designed for people who want a calmer,
      simpler way to compare card categories before applying.
    </p>
  </div>

  <div className="grid gap-4 md:grid-cols-3">
    <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4">
      <h3 className="text-sm font-semibold text-slate-900 mb-2">
        Building or rebuilding credit
      </h3>
      <p className="text-xs text-slate-700">
        If your credit is limited, fair, or recovering, this tool can help
        you compare secured and starter-style cards before you decide what
        to apply for.
      </p>
    </div>

    <div className="rounded-2xl border border-sky-100 bg-sky-50/50 p-4">
      <h3 className="text-sm font-semibold text-slate-900 mb-2">
        Comparing your first card
      </h3>
      <p className="text-xs text-slate-700">
        If you are new to credit cards, you can use the filters to compare
        annual fees, rewards styles, and basic card types without getting
        overwhelmed by marketing language.
      </p>
    </div>

    <div className="rounded-2xl border border-amber-100 bg-amber-50/50 p-4">
      <h3 className="text-sm font-semibold text-slate-900 mb-2">
        Avoiding high-fee traps
      </h3>
      <p className="text-xs text-slate-700">
        Comparing cards side by side can make it easier to spot fees, APRs,
        and tradeoffs before you apply, especially if you are trying to keep
        costs low.
      </p>
    </div>
  </div>
</section>
          <ShareBar
            variant="top"
            label="Share this compare credit card tool with a buddy"
            title="I’m using BuddyMoney’s credit card finder to explore card options."
          />

          <section className="space-y-6 rounded-3xl border border-slate-200 bg-white shadow-sm px-4 py-6 md:px-6 md:py-8">
            <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5 space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-slate-700">
                    Use the filters to narrow down cards by{" "}
                    <span className="font-semibold text-slate-900">
                      credit score, card type, and annual fee.
                    </span>
                  </p>
                  <p className="text-[11px] text-slate-500">
  This card is shown as an{" "}
  <span className="font-semibold text-slate-800">example for comparison</span>.
  {" "}Real offers are added as partnerships go live.
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
                    onClick={() => {
                      setCreditScore("any");
                      setCardType("any");
                      setAnnualFeeFilter("any");
                      setSortBy("featured");
                      setSearchQuery("");
                    }}
                    className="self-start text-[11px] font-medium text-emerald-700 hover:text-emerald-800"
                  >
                    Reset filters
                  </button>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Credit score
                  </label>
                  <select
                    value={creditScore}
                    onChange={(e) => setCreditScore(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-inner outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  >
                    {Object.entries(CREDIT_SCORE_LABELS).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Card type
                  </label>
                  <select
                    value={cardType}
                    onChange={(e) => setCardType(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-inner outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  >
                    {Object.entries(CARD_TYPE_LABELS).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Annual fee
                  </label>
                  <select
                    value={annualFeeFilter}
                    onChange={(e) => setAnnualFeeFilter(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-inner outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="any">Any</option>
                    <option value="no-fee">No annual fee</option>
                    <option value="under-100">Under $100</option>
                    <option value="premium">$100+ (premium)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Sort & search
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-1/2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs sm:text-sm text-slate-800 shadow-inner outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    >
                      <option value="featured">Featured</option>
                      <option value="annualFeeLow">Lowest annual fee</option>
                      <option value="annualFeeHigh">Highest annual fee</option>
                    </select>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by card or bank"
                      className="w-1/2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs sm:text-sm text-slate-800 shadow-inner outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
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
                  card{filteredCards.length === 1 ? "" : "s"} based on your
                  filters.
                </p>

                {selectedForCompare.length > 0 && (
                  <p className="text-[11px] text-emerald-700">
                    Tip: Scroll down to the{" "}
                    <span className="font-semibold">Compare cards</span> bar to
                    see your selected cards side by side.
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
              <section className="mt-4 space-y-3 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Compare cards
                    </p>
                    <p className="text-[11px] text-slate-600">
                      You&apos;re comparing{" "}
                      <span className="font-semibold">
                        {selectedForCompare.length}
                      </span>{" "}
                      card{selectedForCompare.length === 1 ? "" : "s"}. You can
                      select up to 3 at a time.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCompareIds([])}
                    className="text-[11px] font-medium text-emerald-700 hover:text-emerald-800"
                  >
                    Clear comparison
                  </button>
                </div>

                <div className="mt-2 flex gap-3 overflow-x-auto pb-2">
                  {selectedForCompare.map((card) => (
                    <div
                      key={card.id}
                      className="min-w-[220px] max-w-xs rounded-2xl border border-slate-200 bg-white px-3 py-3 text-xs text-slate-800 shadow-sm"
                    >
                      <p className="text-[11px] font-semibold text-slate-900 line-clamp-2">
                        {card.name}
                      </p>
                      <p className="mt-0.5 text-[10px] text-slate-500">
                        {card.issuer} • {card.network}
                      </p>

                      <dl className="mt-2 space-y-1 text-[11px]">
                        <div className="flex justify-between gap-2">
                          <dt className="text-slate-500">Type</dt>
                          <dd className="font-medium text-slate-800">
                            {CARD_TYPE_LABELS[card.cardType] || "Credit card"}
                          </dd>
                        </div>
                        <div className="flex justify-between gap-2">
                          <dt className="text-slate-500">Score</dt>
                          <dd className="text-right">
                            {CREDIT_SCORE_LABELS[card.creditScore]}
                          </dd>
                        </div>
                        <div className="flex justify-between gap-2">
                          <dt className="text-slate-500">Annual fee</dt>
                          <dd className="text-right">
                            {card.annualFee === 0
                              ? "No fee"
                              : `$${card.annualFee.toLocaleString()}/yr`}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-slate-500">Intro APR</dt>
                          <dd className="text-[11px]">{card.introApr}</dd>
                        </div>
                        <div>
                          <dt className="text-slate-500">Regular APR</dt>
                          <dd className="text-[11px]">{card.regularApr}</dd>
                        </div>
                        <div>
                          <dt className="text-slate-500">Bonus</dt>
                          <dd className="text-[11px] line-clamp-3">
                            {card.bonus}
                          </dd>
                        </div>
                      </dl>

                      <p className="mt-2 text-[10px] text-slate-500 line-clamp-3">
                        {card.rewards}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <div className="rounded-2xl border border-amber-100 bg-amber-50/80 px-4 py-3 text-[11px] leading-relaxed text-amber-900">
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

          <section className="rounded-3xl border border-slate-200 bg-white shadow-sm px-4 py-6 md:px-6 md:py-8 space-y-5">
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">
                How to compare credit cards without guessing
              </h2>
              <p className="text-sm text-slate-600">
                A good credit card is not just about the biggest bonus. It should
                match your credit profile, your spending habits, and your overall
                financial situation. Comparing cards before you apply can help
                you avoid unnecessary fees and choose a card that actually fits
                your goals.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4">
                <h3 className="text-sm font-semibold text-slate-900 mb-2">
                  Match the card to your goal
                </h3>
                <p className="text-xs text-slate-700">
                  A secured card can make sense for building or rebuilding credit.
                  A travel card may be better for frequent flyers. A balance transfer
                  card may help if your focus is paying down debt faster.
                </p>
              </div>

              <div className="rounded-2xl border border-sky-100 bg-sky-50/50 p-4">
                <h3 className="text-sm font-semibold text-slate-900 mb-2">
                  Look beyond the welcome offer
                </h3>
                <p className="text-xs text-slate-700">
                  Bonuses can be attractive, but annual fees, regular APR, balance
                  transfer terms, and ongoing rewards matter more over time.
                  Always compare the long-term value, not just the first few months.
                </p>
              </div>

              <div className="rounded-2xl border border-amber-100 bg-amber-50/50 p-4">
                <h3 className="text-sm font-semibold text-slate-900 mb-2">
                  Protect your budget
                </h3>
                <p className="text-xs text-slate-700">
                  If you may carry a balance, interest charges matter a lot. If you
                  plan to pay in full every month, a no-fee or rewards card might
                  be more useful. Your budget should guide your card choice.
                </p>
              </div>
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
                to="/coach"
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
              </Link>{" "}
              to understand what fits your next money move.
            </p>
          </section>

          <ShareBar
            variant="bottom"
            label="Share this compare credit card tool with a buddy"
            title="I’m using BuddyMoney’s credit card finder to explore card options."
          />
        </div>
      </main>
    </>
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
    <article className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white/95 p-4 sm:p-5 shadow-soft">
      <div className="space-y-3">
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
                <span className="text-[8px] text-emerald-800/90">
                  {CREDIT_SCORE_LABELS[creditScore] || ""}
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

          <div className="flex flex-col items-end gap-1 text-right">
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
              {CARD_TYPE_LABELS[cardType] || "Credit card"}
            </span>
            <span className="rounded-full bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-600">
              {CREDIT_SCORE_LABELS[creditScore] || "Any credit score"}
            </span>
            <button
              type="button"
              onClick={onToggleCompare}
              className={`mt-1 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
                isSelected
                  ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                  : "border-slate-200 bg-white text-slate-600 hover:border-emerald-400 hover:text-emerald-700"
              }`}
            >
              {isSelected ? (
                <>
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  In compare
                </>
              ) : (
                <>
                  <span className="text-xs">＋</span>
                  Compare
                </>
              )}
            </button>
          </div>
        </div>

        {highlights.length > 0 && (
          <p className="text-[11px] text-emerald-700/90 font-medium flex flex-wrap gap-x-3 gap-y-1">
            {highlights.map((h, i) => (
              <span key={i} className="flex items-center gap-1">
                <span className="text-emerald-600">⭐</span>
                <span>{h.trim()}</span>
              </span>
            ))}
          </p>
        )}

        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-900">{bonus}</p>
          <p className="text-sm text-slate-700">{rewards}</p>
        </div>

        <dl className="grid grid-cols-2 gap-3 rounded-xl bg-slate-50 px-3 py-3 text-xs text-slate-700">
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Intro APR
            </dt>
            <dd className="mt-1">{introApr}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Regular APR
            </dt>
            <dd className="mt-1">{regularApr}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Annual fee
            </dt>
            <dd className="mt-1">{annualFeeLabel}</dd>
          </div>
        </dl>

        {Array.isArray(perks) && perks.length > 0 && (
          <ul className="mt-1 space-y-1 text-xs text-slate-700">
            {perks.map((perk, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="mt-[3px] h-[6px] w-[6px] rounded-full bg-emerald-500/80" />
                <span>{perk}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3">
        <p className="text-[11px] text-slate-500">
          This card is shown as an{" "}
          <span className="font-semibold text-slate-800">example for comparison</span> Real offers are added as partnerships go live.
        </p>

        {canApply ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1"
          >
            Apply now
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="inline-flex items-center justify-center rounded-full border border-dashed border-slate-300 bg-white px-4 py-1.5 text-xs font-semibold text-slate-500"
          >
            Apply link coming soon
          </button>
        )}
      </div>
    </article>
  );
}
// src/tools/CreditCardFinder.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";

const AFFILIATE_ENABLED = false; // flip to true later when you have real links

// ---------------------------------------------------------
// Placeholder card data (we'll swap links later)
// ---------------------------------------------------------
const CREDIT_CARDS = [
  {
    id: "sample-cashback-plus",
    name: "CashBack Plus Visa",
    issuer: "Sample Bank",
    network: "Visa",
    creditScore: "good", // excellent | good | fair | building
    cardType: "cashback", // cashback | travel | balance-transfer | secured | student
    annualFee: 0,
    bonus: "Earn a $200 bonus after you spend $1,000 in the first 3 months.",
    rewards: "3% cash back on groceries, 2% at gas stations, 1% on everything else.",
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

// Helpful labels for UI
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
  // ------------------------------------------
  // Filters + sort
  // ------------------------------------------
  const [creditScore, setCreditScore] = useState("any");
  const [cardType, setCardType] = useState("any");
  const [annualFeeFilter, setAnnualFeeFilter] = useState("any"); // any | no-fee | under-100 | premium
  const [sortBy, setSortBy] = useState("featured"); // featured | annualFeeLow | annualFeeHigh
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ------------------------------------------
  // Structured data for SEO (ItemList of cards)
// ------------------------------------------
  const schemaOrg = useMemo(() => {
    const items = CREDIT_CARDS.map((card, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "FinancialProduct",
        name: card.name,
        description: card.rewards,
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
      name: "Credit card finder",
      description:
        "Browse a sample list of credit cards by credit score, rewards type, and annual fee. Live offers will be available once partner approvals are complete.",
      itemListElement: items,
    };
  }, []);

  // ------------------------------------------
  // Filter + sort logic
  // ------------------------------------------
  const filteredCards = useMemo(() => {
    let cards = [...CREDIT_CARDS];

    // Text search by name / issuer
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      cards = cards.filter(
        (card) =>
          card.name.toLowerCase().includes(q) ||
          card.issuer.toLowerCase().includes(q)
      );
    }

    // Credit score filter
    if (creditScore !== "any") {
      cards = cards.filter((card) => card.creditScore === creditScore);
    }

    // Card type filter
    if (cardType !== "any") {
      cards = cards.filter((card) => card.cardType === cardType);
    }

    // Annual fee filter
    if (annualFeeFilter !== "any") {
      cards = cards.filter((card) => {
        if (annualFeeFilter === "no-fee") return card.annualFee === 0;
        if (annualFeeFilter === "under-100") return card.annualFee > 0 && card.annualFee < 100;
        if (annualFeeFilter === "premium") return card.annualFee >= 100;
        return true;
      });
    }

    // Sort
    if (sortBy === "annualFeeLow") {
      cards.sort((a, b) => a.annualFee - b.annualFee);
    } else if (sortBy === "annualFeeHigh") {
      cards.sort((a, b) => b.annualFee - a.annualFee);
    } else {
      // "featured" — leave as-is for now
    }

    return cards;
  }, [creditScore, cardType, annualFeeFilter, sortBy, searchQuery]);

  const pageTitle = "Credit Card Finder | BuddyMoney";
  const pageDescription =
    "Use BuddyMoney’s beta credit card finder to explore sample cards by credit score, rewards type, and annual fee. Live partner offers will be added soon.";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>

        {/* Basic meta */}
        <meta name="description" content={pageDescription} />
        <link
          rel="canonical"
          href="https://buddymoney.com/tools/credit-cards"
        />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta
          property="og:url"
          content="https://buddymoney.com/tools/credit-cards"
        />
        {/* You can swap this for a dedicated OG image later */}
        <meta
          property="og:image"
          content="https://buddymoney.com/icons/buddymoney-og-default.png"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta
          name="twitter:image"
          content="https://buddymoney.com/icons/buddymoney-og-default.png"
        />

        {/* JSON-LD structured data */}
        <script type="application/ld+json">
          {JSON.stringify(schemaOrg)}
        </script>
      </Helmet>

      <section className="bg-slate-50/60 min-h-screen">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:py-12 lg:py-16 space-y-10">
          {/* Heading / Intro */}
          <header className="space-y-3">
            <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Credit Card Finder
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] text-emerald-700">
                Beta
              </span>
            </p>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
              Find a credit card that actually fits your life.
            </h1>
            <p className="max-w-2xl text-sm sm:text-base text-slate-600">
              Filter by credit score, card type, and annual fee to explore card
              options. This tool is in{" "}
              <span className="font-semibold text-emerald-700">preview mode</span>{" "}
              — application links will be added once partner approvals are live.
            </p>
          </header>

          {/* Filters panel */}
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 sm:p-5 shadow-sm space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs sm:text-sm text-slate-600">
                Use the filters to narrow down cards by{" "}
                <span className="font-semibold text-slate-800">
                  credit score, card type, and annual fee.
                </span>
              </p>
              <button
                type="button"
                onClick={() => {
                  setCreditScore("any");
                  setCardType("any");
                  setAnnualFeeFilter("any");
                  setSortBy("featured");
                  setSearchQuery("");
                }}
                className="self-start text-xs font-medium text-emerald-700 hover:text-emerald-800"
              >
                Reset filters
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {/* Credit score */}
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

              {/* Card type */}
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

              {/* Annual fee */}
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

              {/* Sort + search */}
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

          {/* Results */}
          <div className="space-y-3">
            <p className="text-xs text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-800">
                {filteredCards.length}
              </span>{" "}
              card{filteredCards.length === 1 ? "" : "s"} based on your filters.
            </p>

            <div className="grid gap-4 lg:grid-cols-2">
              {filteredCards.map((card) => (
                <CardResult key={card.id} card={card} />
              ))}

              {filteredCards.length === 0 && (
                <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white/70 px-4 py-10 text-center text-sm text-slate-600">
                  No cards match those filters yet. Try widening your credit score
                  or card type.
                </div>
              )}
            </div>
          </div>

          {/* Disclosure */}
          <div className="rounded-2xl border border-amber-100 bg-amber-50/80 px-4 py-3 text-[11px] leading-relaxed text-amber-900">
            <p className="font-semibold uppercase tracking-[0.16em] text-amber-800">
              Important note
            </p>
            <p className="mt-1">
              This tool is for educational purposes only and is not financial
              advice. Card details shown here are sample data while we prepare
              live offers from partner banks and card issuers. Always review the
              terms and disclosures on the official application page before you
              apply.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

// ---------------------------------------------------------
// CardResult: single card visual
// ---------------------------------------------------------
function CardResult({ card }) {
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

  const canApply = AFFILIATE_ENABLED && link && link !== "#";

  return (
    <article className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white/90 p-4 sm:p-5 shadow-sm">
      <div className="space-y-3">
        {/* Top row: name + issuer */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-slate-900">
              {name}
            </h2>
            <p className="text-xs text-slate-500">
              {issuer} &bull; {network}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1 text-right">
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
              {CARD_TYPE_LABELS[cardType] || "Credit card"}
            </span>
            <span className="rounded-full bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-600">
              {CREDIT_SCORE_LABELS[creditScore] || "Any credit score"}
            </span>
          </div>
        </div>

        {/* Bonus & rewards */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-900">{bonus}</p>
          <p className="text-sm text-slate-700">{rewards}</p>
        </div>

        {/* Key stats */}
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

        {/* Perks list */}
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

      {/* CTA */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3">
        <p className="text-[11px] text-slate-500">
          Application links are{" "}
          <span className="font-semibold text-slate-800">coming soon</span> as
          we finalize partnerships.
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

// src/pages/BestCashBackCards.jsx
import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import ShareBar from "../components/ShareBar";
import { setCanonical } from "../utils/seo";

// Sample cash back card data (preview mode, no affiliate links yet)
const CASHBACK_CARDS = [
  {
    id: "everyday-cash-plus",
    name: "Everyday Cash Plus",
    issuer: "Sample Bank",
    creditScore: "good",
    annualFee: 0,
    bonus:
      "Earn a $200 cash bonus after you spend $1,000 in purchases in the first 3 months.",
    rewards:
      "3% cash back on groceries, 2% at gas stations, 1% on everything else.",
    introApr: "0% intro APR for 15 months on purchases.",
    regularApr: "18.99%–27.99% variable APR.",
    bestFor: "Families and everyday spending.",
  },
  {
    id: "flat-cash-2",
    name: "Flat Cash 2%",
    issuer: "Everyday Credit Co.",
    creditScore: "excellent",
    annualFee: 0,
    bonus: "Earn a $150 bonus after you spend $500 in the first 3 months.",
    rewards: "Unlimited 2% cash back on every purchase.",
    introApr: "0% intro APR for 12 months on purchases.",
    regularApr: "19.99%–27.99% variable APR.",
    bestFor: "People who want simple rewards on everything.",
  },
  {
    id: "rotating-category-max",
    name: "Rotating Category Max",
    issuer: "Rewards Bank",
    creditScore: "good",
    annualFee: 0,
    bonus:
      "Earn a $200 bonus after you activate and spend in bonus categories.",
    rewards:
      "5% cash back on rotating quarterly categories (up to $1,500 in combined purchases), 1% on everything else.",
    introApr: "0% intro APR for 15 months on purchases.",
    regularApr: "20.99%–28.99% variable APR.",
    bestFor: "People who don’t mind tracking bonus categories.",
  },
];

export default function BestCashBackCards() {
  const title = "Best Cash Back Credit Cards (Preview) | BuddyMoney";
  const description =
    "Explore BuddyMoney’s preview list of cash back credit cards. Learn the tradeoffs between flat 2% cards, rotating categories, and everyday cash back before live offers go live.";
  const pageUrl =
    typeof window !== "undefined"
      ? window.location.href
      : "https://buddymoney.com/credit-cards/cash-back";

  // ✅ Canonical for /credit-cards/cash-back
  useEffect(() => {
    setCanonical("/credit-cards/cash-back");
  }, []);

  // JSON-LD structured data (ItemList of sample cash back cards)
  const jsonLd = useMemo(() => {
    const items = CASHBACK_CARDS.map((card, index) => ({
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
      name: "Best cash back credit cards (preview)",
      description,
      itemListElement: items,
    };
  }, [description]);

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index,follow" />

        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={pageUrl} />
        <meta
          property="og:image"
          content="https://buddymoney.com/icons/buddymoney-og-default.png"
        />
        <meta property="og:site_name" content="BuddyMoney" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta
          name="twitter:image"
          content="https://buddymoney.com/icons/buddymoney-og-default.png"
        />

        {/* JSON-LD */}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <main className="min-h-screen bg-gradient-to-b from-green-50 via-white to-emerald-50/40 pb-16 pt-4">
        <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
          {/* Top share snippet */}
          <ShareBar
            variant="top"
            title="I’m reading BuddyMoney’s guide to the best cash back credit cards."
          />

          {/* Header */}
          <header className="space-y-3 rounded-3xl border border-emerald-100 bg-white/90 px-5 py-6 shadow-sm">
            <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Credit Cards
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                Preview guide
              </span>
            </p>
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Best cash back credit cards (preview)
            </h1>
            <p className="text-sm text-slate-700 sm:text-base">
              This guide walks through different types of cash back cards using{" "}
              <span className="font-semibold text-slate-900">sample data</span>.
              Once partner approvals are live, we&apos;ll replace these examples
              with real, up-to-date offers inside the{" "}
              <Link
                to="/tools/credit-cards"
                className="font-semibold text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
              >
                BuddyMoney Credit Card Finder
              </Link>
              .
            </p>
            <p className="text-[11px] text-slate-500">
              Educational only • Not financial advice • Always check the
              official issuer&apos;s terms before you apply.
            </p>
          </header>

          {/* Intro content */}
          <section className="space-y-4 rounded-3xl border border-slate-200 bg-white px-5 py-6 text-sm text-slate-800 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              How cash back cards work (in plain English)
            </h2>
            <p>
              Cash back cards give you a percentage of your spending back in the
              form of statement credits, deposits, or rewards you can redeem
              later. The right card for you depends on{" "}
              <span className="font-semibold">
                where you spend the most money
              </span>{" "}
              and whether you value{" "}
              <span className="font-semibold">simplicity</span> or{" "}
              <span className="font-semibold">maximizing every category</span>.
            </p>
            <ul className="ml-5 list-disc space-y-1">
              <li>
                <span className="font-semibold">Flat-rate cards</span> pay the
                same percent on everything (like 2% back on all purchases).
              </li>
              <li>
                <span className="font-semibold">Everyday cards</span> boost
                categories like groceries, gas, and dining.
              </li>
              <li>
                <span className="font-semibold">Rotating-category cards</span>{" "}
                offer high cash back in categories that change each quarter.
              </li>
            </ul>
          </section>

          {/* Sample card list */}
          <section className="space-y-4 rounded-3xl border border-slate-200 bg-white px-5 py-6 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              Sample cash back card line-up
            </h2>
            <p className="text-sm text-slate-700">
              These are{" "}
              <span className="font-semibold">example cards</span> to help you
              understand tradeoffs. They&apos;re not real offers, but they mirror
              the types of cards you&apos;ll typically see from major issuers.
            </p>

            <div className="mt-3 space-y-4">
              {CASHBACK_CARDS.map((card) => (
                <article
                  key={card.id}
                  className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-4 text-sm text-slate-800"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">
                        {card.name}
                      </h3>
                      <p className="text-[12px] text-slate-500">
                        {card.issuer} •{" "}
                        {card.annualFee === 0
                          ? "No annual fee"
                          : `$${card.annualFee.toLocaleString()} annual fee`}
                      </p>
                    </div>
                    <p className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
                      Best for: {card.bestFor}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[13px] font-medium text-slate-900">
                      {card.bonus}
                    </p>
                    <p className="text-[13px] text-slate-700">
                      Rewards: {card.rewards}
                    </p>
                  </div>

                  <dl className="grid gap-2 rounded-xl bg-white px-3 py-2 text-[12px] text-slate-700 sm:grid-cols-3">
                    <div>
                      <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                        Intro APR
                      </dt>
                      <dd className="mt-1">{card.introApr}</dd>
                    </div>
                    <div>
                      <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                        Regular APR
                      </dt>
                      <dd className="mt-1">{card.regularApr}</dd>
                    </div>
                    <div>
                      <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                        Credit score (typical)
                      </dt>
                      <dd className="mt-1">
                        {card.creditScore === "excellent"
                          ? "Excellent (720+)"
                          : "Good (670+)"}
                      </dd>
                    </div>
                  </dl>

                  <p className="text-[11px] text-slate-500">
                    Not a real product. For illustration only — actual card
                    terms vary by issuer and can change at any time.
                  </p>
                </article>
              ))}
            </div>
          </section>

          {/* CTA: move into the Credit Card Finder */}
          <section className="rounded-3xl border border-emerald-100 bg-emerald-600 px-5 py-5 text-white shadow-sm">
            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold">
                  Ready to explore cards in tool form?
                </h2>
                <p className="text-sm text-emerald-50">
                  Use BuddyMoney&apos;s Credit Card Finder (in preview mode) to
                  browse cards by credit score, rewards type, and annual fee —
                  all in one place.
                </p>
              </div>
              <Link
                to="/tools/credit-cards"
                className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-emerald-700 shadow hover:bg-emerald-50"
              >
                Open Credit Card Finder →
              </Link>
            </div>
          </section>

          {/* Bottom share snippet */}
          <ShareBar
            variant="bottom"
            label="Share this guide"
            title="I’m reading BuddyMoney’s guide to the best cash back credit cards."
          />
        </div>
      </main>
    </>
  );
}

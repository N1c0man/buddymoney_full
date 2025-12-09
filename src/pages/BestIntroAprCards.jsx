// src/pages/BestIntroAprCards.jsx
import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import ShareBar from "../components/ShareBar";
import { setCanonical } from "../utils/seo"; // ✅ added

// Sample 0% / intro APR cards (preview mode – no affiliate links yet)
const INTRO_APR_CARDS = [
  {
    id: "long-intro-balance-transfer",
    name: "Long Intro Balance Transfer",
    issuer: "Steady Savings Bank",
    annualFee: 0,
    introApr:
      "0% intro APR on balance transfers for 21 months; 0% on purchases for 12 months.",
    regularApr: "19.99%–27.99% variable APR.",
    balanceTransferFee: "3%–5% of the amount transferred",
    bestFor:
      "People with existing high-interest credit card debt who want time to aggressively pay it down.",
    highlights: [
      "Extra-long balance transfer intro window",
      "No annual fee",
      "Designed for consolidating debt from other cards",
    ],
  },
  {
    id: "everyday-0-purchases",
    name: "Everyday 0% Purchases",
    issuer: "Everyday Credit Co.",
    annualFee: 0,
    introApr: "0% intro APR on purchases for 18 months.",
    regularApr: "20.99%–28.99% variable APR.",
    balanceTransferFee: "3% of each transfer",
    bestFor:
      "Big upcoming purchases (like appliances or car repairs) you can pay off during the intro period.",
    highlights: [
      "Long 0% period on new purchases",
      "Simple structure with no annual fee",
      "Useful for planned, one-time expenses",
    ],
  },
  {
    id: "low-fee-bt-mixed",
    name: "Low-Fee Mixed Balance Transfer",
    issuer: "Smart Budget Bank",
    annualFee: 39,
    introApr:
      "0% intro APR on balance transfers for 15 months; 0% on purchases for 6 months.",
    regularApr: "21.99%–29.99% variable APR.",
    balanceTransferFee: "3% of the amount transferred (promotional)",
    bestFor:
      "People who want both a transfer option and a short 0% window on new purchases.",
    highlights: [
      "Reduced promo balance transfer fee",
      "0% intro APR covers both transfers and purchases for a time",
      "Good middle ground if you have mixed needs",
    ],
  },
];

export default function BestIntroAprCards() {
  const title = "Best 0% / Intro APR Credit Cards (Preview) | BuddyMoney";
  const description =
    "Understand how 0% intro APR cards work for balance transfers and new purchases using BuddyMoney’s preview guide—before live offers go into the Credit Card Finder.";
  const pageUrl =
    typeof window !== "undefined"
      ? window.location.href
      : "https://buddymoney.com/credit-cards/0-apr";

  // ✅ Canonical for /credit-cards/0-apr
  useEffect(() => {
    setCanonical("/credit-cards/0-apr");
  }, []);

  // JSON-LD structured data (ItemList of sample 0% / intro APR cards)
  const jsonLd = useMemo(() => {
    const items = INTRO_APR_CARDS.map((card, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "FinancialProduct",
        name: card.name,
        description: `${card.introApr} Typically best for: ${card.bestFor}`,
        provider: {
          "@type": "BankOrCreditUnion",
          name: card.issuer,
        },
        feesAndCommissionsSpecification:
          card.annualFee === 0
            ? `No annual fee; balance transfer fee usually ${card.balanceTransferFee}.`
            : `$${card.annualFee.toLocaleString()} annual fee; balance transfer fee usually ${card.balanceTransferFee}.`,
      },
    }));

    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Best 0% intro APR credit cards (preview)",
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
        <link
          rel="canonical"
          href="https://buddymoney.com/credit-cards/0-apr"
        />

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
            title="I’m reading BuddyMoney’s guide to the best 0% intro APR credit cards."
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
              Best 0% / intro APR credit cards (preview)
            </h1>
            <p className="text-sm text-slate-700 sm:text-base">
              0% intro APR cards can give you breathing room to pay off existing
              debt or fund a big purchase—but only if you{" "}
              <span className="font-semibold text-slate-900">
                understand the fine print
              </span>
              . This guide uses{" "}
              <span className="font-semibold text-slate-900">
                sample 0% cards
              </span>{" "}
              to show how balance transfers and purchase promos usually work.
              Once partner offers are live, we&apos;ll plug real cards into the{" "}
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
              official issuer&apos;s terms, fees, and promo details before you
              apply.
            </p>
          </header>

          {/* Intro: how 0% / intro APR cards really work */}
          <section className="space-y-4 rounded-3xl border border-slate-200 bg-white px-5 py-6 text-sm text-slate-800 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              How 0% intro APR cards actually help (and when they don’t)
            </h2>
            <p>
              A 0% intro APR doesn&apos;t erase your debt—it just gives you a{" "}
              <span className="font-semibold">window with no interest</span> so
              more of your payment hits the principal. Used well, it can save
              you a lot of money. Used poorly, it can make things worse.
            </p>
            <ul className="ml-5 list-disc space-y-1">
              <li>
                <span className="font-semibold">
                  Balance transfer cards
                </span>{" "}
                shine when you already have high-interest credit card debt and a
                clear payoff plan.
              </li>
              <li>
                <span className="font-semibold">
                  0% on purchases cards
                </span>{" "}
                are best for big, planned expenses you can knock out during the
                intro period.
              </li>
              <li>
                Always factor in{" "}
                <span className="font-semibold">
                  balance transfer fees and the regular APR
                </span>{" "}
                after the promo ends.
              </li>
            </ul>
          </section>

          {/* Sample 0% card line-up */}
          <section className="space-y-4 rounded-3xl border border-slate-200 bg-white px-5 py-6 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              Sample 0% / intro APR card line-up
            </h2>
            <p className="text-sm text-slate-700">
              These are{" "}
              <span className="font-semibold">example cards</span> built to show
              common patterns: long balance transfer windows, purchase-only
              promos, and mixed intro offers. They aren&apos;t actual products,
              but they reflect the kinds of terms you&apos;ll often see.
            </p>

            <div className="mt-3 space-y-4">
              {INTRO_APR_CARDS.map((card) => (
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
                      Intro offer: {card.introApr}
                    </p>
                  </div>

                  <dl className="grid gap-2 rounded-xl bg-white px-3 py-2 text-[12px] text-slate-700 sm:grid-cols-3">
                    <div>
                      <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                        Regular APR
                      </dt>
                      <dd className="mt-1">{card.regularApr}</dd>
                    </div>
                    <div>
                      <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                        Balance transfer fee
                      </dt>
                      <dd className="mt-1">{card.balanceTransferFee}</dd>
                    </div>
                    <div>
                      <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                        Annual fee
                      </dt>
                      <dd className="mt-1">
                        {card.annualFee === 0
                          ? "No annual fee"
                          : `$${card.annualFee.toLocaleString()}/year`}
                      </dd>
                    </div>
                  </dl>

                  <ul className="ml-4 list-disc space-y-1 text-[12px] text-slate-700">
                    {card.highlights.map((h, idx) => (
                      <li key={idx}>{h}</li>
                    ))}
                  </ul>

                  <p className="text-[11px] text-slate-500">
                    Not a real product. For illustration only — actual promo
                    periods, transfer fees, and APRs vary by issuer and can
                    change at any time.
                  </p>
                </article>
              ))}
            </div>
          </section>

          {/* Quick payoff tip box */}
          <section className="space-y-3 rounded-3xl border border-amber-100 bg-amber-50/80 px-5 py-5 text-[13px] text-amber-900 shadow-sm">
            <h2 className="text-sm font-semibold text-amber-900">
              Make a 0% card part of a real payoff plan
            </h2>
            <p>
              Before you apply, map out{" "}
              <span className="font-semibold">
                how much you&apos;ll pay each month
              </span>{" "}
              and confirm you can clear the balance before the promo ends. 0%
              is powerful, but only if you use the window to{" "}
              <span className="font-semibold">attack the principal</span>.
            </p>
          </section>

          {/* CTA: move into the Credit Card Finder */}
          <section className="rounded-3xl border border-emerald-100 bg-emerald-600 px-5 py-5 text-white shadow-sm">
            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold">
                  Want to compare 0% cards side by side?
                </h2>
                <p className="text-sm text-emerald-50">
                  Use BuddyMoney&apos;s Credit Card Finder (in preview mode) to
                  explore cards by intro APR, annual fee, and card type — so
                  you can see how 0% offers stack up.
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
            title="I’m reading BuddyMoney’s guide to the best 0% intro APR credit cards."
          />
        </div>
      </main>
    </>
  );
}

// src/pages/BestCashBackCards.jsx
import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import ShareBar from "../components/ShareBar";
import { setCanonical } from "../utils/seo";

// Sample cash back card data (educational examples)
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
  const title = "Best Cash Back Credit Cards (2026 Guide) | BuddyMoney";
  const description =
    "Learn how cash back credit cards work, compare flat-rate versus category rewards, and see what to watch for before choosing the best cash back card for your spending habits.";
  const canonicalUrl = "https://www.buddymoney.com/credit-cards/cash-back";
  const ogImage =
    "https://www.buddymoney.com/icons/buddymoney-og-default.png";

  useEffect(() => {
    setCanonical("/credit-cards/cash-back");
  }, []);

  const jsonLd = useMemo(() => {
    const items = CASHBACK_CARDS.map((card, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "FinancialProduct",
        name: card.name,
        description: `${card.rewards} Best for: ${card.bestFor}`,
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
      name: "Best cash back credit cards",
      description,
      itemListElement: items,
    };
  }, [description]);

  const faqSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the best type of cash back credit card?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The best type depends on your spending. Flat-rate cards are simpler, while category cards can earn more if you spend heavily in places like groceries, gas, or dining.",
          },
        },
        {
          "@type": "Question",
          name: "Are rotating category cash back cards worth it?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "They can be worth it if you are willing to track and activate bonus categories. If you prefer simplicity, a flat-rate cash back card may be a better fit.",
          },
        },
        {
          "@type": "Question",
          name: "Should I carry a balance on a cash back card?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Usually no. Interest charges can wipe out the value of your rewards very quickly. Cash back cards work best when you pay the balance in full each month.",
          },
        },
        {
          "@type": "Question",
          name: "What should I compare besides rewards?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Compare annual fees, intro APR periods, redemption rules, spending caps, and your own budget. The best rewards card is the one that fits how you already spend.",
          },
        },
      ],
    }),
    []
  );

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content="BuddyMoney" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />

        {/* JSON-LD */}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <main className="min-h-screen bg-gradient-to-b from-green-50 via-white to-emerald-50/40 pb-16 pt-4">
        <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
          <ShareBar
            variant="top"
            title="I’m reading BuddyMoney’s guide to the best cash back credit cards."
          />

          <header className="space-y-4 rounded-3xl border border-emerald-100 bg-white/90 px-5 py-6 shadow-sm">
            <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Credit Cards
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                Beginner guide
              </span>
            </p>

            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Best cash back credit cards
            </h1>

            <p className="text-sm text-slate-700 sm:text-base">
              Cash back credit cards can be great for everyday spending, but the
              best one depends on{" "}
              <span className="font-semibold text-slate-900">
                how you actually use your money
              </span>
              . Some cards keep it simple with a flat rewards rate, while others
              pay more in categories like groceries, gas, dining, or rotating
              bonus groups.
            </p>

            <p className="text-sm text-slate-700 sm:text-base">
              This BuddyMoney guide explains the tradeoffs between flat-rate and
              category-based rewards, what fees and limits to watch for, and how
              to compare offers before you apply. You can also explore more card
              types in the{" "}
              <Link
                to="/tools/credit-cards"
                className="font-semibold text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
              >
                BuddyMoney Credit Card Finder
              </Link>
              .
            </p>

            <p className="text-[11px] text-slate-500">
              Educational guide only • Card offers, fees, categories, and intro
              APR terms can change • BuddyMoney updates this page regularly, and
              new cards may be added over time • Always verify current issuer
              details before applying.
            </p>
          </header>

          <section className="space-y-4 rounded-3xl border border-slate-200 bg-white px-5 py-6 text-sm text-slate-800 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              How cash back cards work
            </h2>
            <p>
              Cash back cards give you a percentage of your spending back in the
              form of statement credits, deposits, or rewards you can redeem
              later. The right card depends on{" "}
              <span className="font-semibold">where you spend the most</span>{" "}
              and whether you value{" "}
              <span className="font-semibold">simplicity</span> or{" "}
              <span className="font-semibold">maximizing categories</span>.
            </p>
            <ul className="ml-5 list-disc space-y-1">
              <li>
                <span className="font-semibold">Flat-rate cards</span> pay the
                same percent on everything.
              </li>
              <li>
                <span className="font-semibold">Everyday cards</span> boost
                categories like groceries, gas, and dining.
              </li>
              <li>
                <span className="font-semibold">Rotating-category cards</span>{" "}
                offer higher rewards in categories that change during the year.
              </li>
            </ul>
            <p>
              The best cash back card is usually the one that matches spending
              you already do, not the one with the flashiest headline.
            </p>
          </section>

          <section className="space-y-4 rounded-3xl border border-slate-200 bg-white px-5 py-6 text-sm text-slate-800 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              What to compare before you apply
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <h3 className="text-sm font-semibold text-slate-900">
                  Rewards style
                </h3>
                <p className="mt-1 text-[13px] text-slate-700">
                  Decide whether you want a flat rate on everything or higher
                  rewards in categories you use often.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <h3 className="text-sm font-semibold text-slate-900">
                  Annual fee
                </h3>
                <p className="mt-1 text-[13px] text-slate-700">
                  A higher-earning card is not always better if the annual fee
                  wipes out the extra rewards.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <h3 className="text-sm font-semibold text-slate-900">
                  Redemption rules
                </h3>
                <p className="mt-1 text-[13px] text-slate-700">
                  Check whether rewards redeem as statement credits, deposits,
                  gift cards, or rotating category bonuses with activation.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <h3 className="text-sm font-semibold text-slate-900">
                  APR and intro offers
                </h3>
                <p className="mt-1 text-[13px] text-slate-700">
                  Rewards matter less if you carry a balance and pay high
                  interest. Compare intro APR terms carefully.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4 rounded-3xl border border-slate-200 bg-white px-5 py-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-base font-semibold text-slate-900">
                Sample cash back card line-up
              </h2>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                Educational examples
              </span>
            </div>

            <p className="text-sm text-slate-700">
              These examples show common cash back card patterns, including
              flat-rate rewards, everyday spending categories, and rotating
              quarterly bonuses. BuddyMoney may expand this page with additional
              cards and comparisons over time.
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
                        Credit score
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
                    terms, categories, bonuses, and APRs vary by issuer and can
                    change at any time.
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="space-y-3 rounded-3xl border border-amber-100 bg-amber-50/80 px-5 py-5 text-[13px] text-amber-900 shadow-sm">
            <h2 className="text-sm font-semibold text-amber-900">
              Cash back works best with a budget
            </h2>
            <p>
              Rewards are only valuable if you avoid interest and overspending.
              A 2% reward does not help much if you carry a balance at 20% APR.
            </p>
            <p>
              Use the{" "}
              <Link
                to="/tools/budget-tracker"
                className="font-semibold underline underline-offset-2 hover:text-amber-950"
              >
                Budget Tracker
              </Link>{" "}
              to line up your spending categories, or the{" "}
              <Link
                to="/tools/debt-payoff"
                className="font-semibold underline underline-offset-2 hover:text-amber-950"
              >
                Debt Payoff Calculator
              </Link>{" "}
              if rewards are competing with existing debt.
            </p>
          </section>

          <section className="space-y-4 rounded-3xl border border-slate-200 bg-white px-5 py-6 text-sm text-slate-800 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              Related tools and guides
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                to="/tools/credit-cards"
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-emerald-200 hover:bg-emerald-50"
              >
                <span className="block font-semibold text-slate-900">
                  Credit Card Finder
                </span>
                <span className="mt-1 block text-[13px] text-slate-600">
                  Explore cards by rewards type, annual fee, and credit profile.
                </span>
              </Link>

              <Link
                to="/credit-cards/0-apr"
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-emerald-200 hover:bg-emerald-50"
              >
                <span className="block font-semibold text-slate-900">
                  Best 0% Intro APR Credit Cards
                </span>
                <span className="mt-1 block text-[13px] text-slate-600">
                  Compare rewards cards against 0% APR options before choosing.
                </span>
              </Link>

              <Link
                to="/credit-cards/bad-credit"
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-emerald-200 hover:bg-emerald-50"
              >
                <span className="block font-semibold text-slate-900">
                  Credit Cards for Bad or Rebuilding Credit
                </span>
                <span className="mt-1 block text-[13px] text-slate-600">
                  A helpful next step if rewards are not the first priority yet.
                </span>
              </Link>

              <Link
                to="/tools/emergency-fund"
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-emerald-200 hover:bg-emerald-50"
              >
                <span className="block font-semibold text-slate-900">
                  Emergency Fund Tool
                </span>
                <span className="mt-1 block text-[13px] text-slate-600">
                  Build cash reserves so your card is a tool, not a fallback.
                </span>
              </Link>
            </div>
          </section>

          <section className="rounded-3xl border border-emerald-100 bg-emerald-600 px-5 py-5 text-white shadow-sm">
            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold">
                  Ready to compare cash back cards side by side?
                </h2>
                <p className="text-sm text-emerald-50">
                  Use BuddyMoney&apos;s Credit Card Finder to browse cards by
                  rewards type, annual fee, and credit profile — all in one
                  place.
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
// src/pages/BestIntroAprCards.jsx
import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import ShareBar from "../components/ShareBar";
import { setCanonical } from "../utils/seo";

// Sample 0% / intro APR cards (educational examples – no affiliate links yet)
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
  const title = "Best 0% Intro APR Credit Cards | BuddyMoney";
  const description =
    "Learn how 0% intro APR credit cards work for balance transfers and new purchases, what fees to watch for, and how to compare the best intro APR cards before you apply.";
  const canonicalUrl = "https://www.buddymoney.com/credit-cards/0-apr";
  const pageUrl =
    typeof window !== "undefined" ? window.location.href : canonicalUrl;
  const ogImage =
    "https://www.buddymoney.com/icons/buddymoney-og-default.png";

  useEffect(() => {
    setCanonical("/credit-cards/0-apr");
  }, []);

  const itemListSchema = useMemo(() => {
    const items = INTRO_APR_CARDS.map((card, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "FinancialProduct",
        name: card.name,
        description: `${card.introApr} Best for: ${card.bestFor}`,
        provider: {
          "@type": "BankOrCreditUnion",
          name: card.issuer,
        },
      },
    }));

    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Best 0% intro APR credit cards",
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
          name: "What is a 0% intro APR credit card?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A 0% intro APR credit card offers a temporary period with no interest on purchases, balance transfers, or both. After that intro period ends, the card’s regular APR applies.",
          },
        },
        {
          "@type": "Question",
          name: "Are 0% APR cards good for balance transfers?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "They can be helpful if you have a clear payoff plan and understand the balance transfer fee. A 0% offer can reduce interest costs, but only if you pay down the balance before the regular APR begins.",
          },
        },
        {
          "@type": "Question",
          name: "What should I watch out for with intro APR cards?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Watch for balance transfer fees, the length of the intro period, the regular APR after the promo ends, late-payment penalties, and whether the card is best for purchases, transfers, or both.",
          },
        },
        {
          "@type": "Question",
          name: "Is a 0% intro APR card the same as a debt payoff plan?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. A 0% intro APR card can support a payoff strategy, but it is not a full plan by itself. You still need to know how much you will pay each month and when the balance will be gone.",
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

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />

        {/* Structured data */}
        <script type="application/ld+json">
          {JSON.stringify(itemListSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <main className="min-h-screen bg-gradient-to-b from-green-50 via-white to-emerald-50/40 pb-16 pt-4">
        <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
          <ShareBar
            variant="top"
            title="I’m reading BuddyMoney’s guide to the best 0% intro APR credit cards."
          />

          <header className="space-y-4 rounded-3xl border border-emerald-100 bg-white/90 px-5 py-6 shadow-sm">
            <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Credit Cards
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                Beginner guide
              </span>
            </p>

            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Best 0% Intro APR Credit Cards
            </h1>

            <p className="text-sm text-slate-700 sm:text-base">
              A <span className="font-semibold text-slate-900">0% intro APR credit card</span>
              can give you breathing room to pay down debt or spread out a large
              planned purchase without interest for a limited time. The catch is
              that these offers only help if you understand the promo window,
              transfer fees, and what happens when the regular APR starts.
            </p>

            <p className="text-sm text-slate-700 sm:text-base">
              This BuddyMoney guide walks you through how{" "}
              <span className="font-semibold text-slate-900">
                intro APR cards
              </span>{" "}
              work, who they are best for, what mistakes to avoid, and how to
              compare offers before you apply. You can also browse more card
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
              Educational only • Not financial advice • Always verify current
              issuer terms, fees, and promo details before you apply.
            </p>
          </header>

          <section className="space-y-4 rounded-3xl border border-slate-200 bg-white px-5 py-6 text-sm text-slate-800 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              What is a 0% intro APR card?
            </h2>
            <p>
              A 0% intro APR card gives you a temporary period with{" "}
              <span className="font-semibold">no interest</span> on purchases,
              balance transfers, or both. That can make it easier to pay down
              principal faster or finance a planned expense without immediate
              interest charges.
            </p>
            <p>
              The key is knowing{" "}
              <span className="font-semibold">what type of 0% offer you need</span>:
            </p>
            <ul className="ml-5 list-disc space-y-1">
              <li>
                <span className="font-semibold">Balance transfer cards</span> are
                designed for moving existing high-interest credit card debt.
              </li>
              <li>
                <span className="font-semibold">0% purchase cards</span> are better
                for large planned expenses you can pay off during the intro period.
              </li>
              <li>
                Some cards offer both, but the terms, fees, and promo lengths may
                differ.
              </li>
            </ul>
          </section>

          <section className="space-y-4 rounded-3xl border border-slate-200 bg-white px-5 py-6 text-sm text-slate-800 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              When a 0% intro APR card makes sense
            </h2>
            <ul className="ml-5 list-disc space-y-2">
              <li>
                You have a realistic plan to pay off the balance before the intro
                period ends.
              </li>
              <li>
                You want to stop high-interest charges from piling up on existing
                credit card debt.
              </li>
              <li>
                You are financing a necessary purchase and can commit to a clear
                monthly payoff amount.
              </li>
              <li>
                You understand the transfer fee and regular APR before applying.
              </li>
            </ul>

            <div className="rounded-2xl border border-amber-100 bg-amber-50/80 px-4 py-4 text-[13px] text-amber-900">
              <p className="font-semibold">Important:</p>
              <p className="mt-1">
                A 0% card is not a magic fix. If the balance is still there when
                the promo ends, the regular APR can wipe out much of the benefit.
              </p>
            </div>
          </section>

          <section className="space-y-4 rounded-3xl border border-slate-200 bg-white px-5 py-6 text-sm text-slate-800 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              What to compare before you apply
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <h3 className="text-sm font-semibold text-slate-900">
                  Intro period length
                </h3>
                <p className="mt-1 text-[13px] text-slate-700">
                  Look at how many months the 0% offer lasts for purchases,
                  transfers, or both.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <h3 className="text-sm font-semibold text-slate-900">
                  Balance transfer fee
                </h3>
                <p className="mt-1 text-[13px] text-slate-700">
                  Many cards charge 3%–5% of the transferred balance. That fee
                  should be part of your math.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <h3 className="text-sm font-semibold text-slate-900">
                  Regular APR after the promo
                </h3>
                <p className="mt-1 text-[13px] text-slate-700">
                  Once the intro window ends, any remaining balance may start
                  accruing interest at a much higher rate.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <h3 className="text-sm font-semibold text-slate-900">
                  Best use case
                </h3>
                <p className="mt-1 text-[13px] text-slate-700">
                  Some cards are better for debt consolidation, while others are
                  stronger for new purchases.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4 rounded-3xl border border-slate-200 bg-white px-5 py-6 text-sm text-slate-800 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-slate-900">
                Sample 0% intro APR card line-up
              </h2>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                Educational examples
              </span>
            </div>

            <p className="text-[13px] text-slate-600">
              These examples show common patterns like longer balance transfer
              windows, purchase-only promos, and mixed intro offers. Use them to
              understand what to compare, not as live recommendations.
            </p>

            <div className="grid gap-4">
              {INTRO_APR_CARDS.map((card) => (
                <article
                  key={card.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 shadow-sm"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-slate-900">
                        {card.name}
                      </h3>
                      <p className="text-[13px] text-slate-600">{card.issuer}</p>
                    </div>
                    <div className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-semibold text-emerald-700">
                      Annual fee: {card.annualFee === 0 ? "None" : `$${card.annualFee}`}
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-3">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                        Intro offer
                      </p>
                      <p className="mt-1 text-[13px] text-slate-800">{card.introApr}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                        Regular APR
                      </p>
                      <p className="mt-1 text-[13px] text-slate-800">{card.regularApr}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                        Balance transfer fee
                      </p>
                      <p className="mt-1 text-[13px] text-slate-800">
                        {card.balanceTransferFee}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-[1.2fr,0.8fr]">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                        Best for
                      </p>
                      <p className="mt-1 text-[13px] text-slate-800">{card.bestFor}</p>
                    </div>

                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                        Highlights
                      </p>
                      <ul className="mt-1 ml-4 list-disc space-y-1 text-[13px] text-slate-800">
                        {card.highlights.map((highlight) => (
                          <li key={highlight}>{highlight}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <p className="mt-4 text-[11px] text-slate-500">
                    For illustration only — actual promo periods, transfer fees,
                    and APRs vary by issuer and can change at any time.
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="space-y-4 rounded-3xl border border-slate-200 bg-white px-5 py-6 text-sm text-slate-800 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Common mistakes to avoid
            </h2>
            <ul className="ml-5 list-disc space-y-2">
              <li>
                Applying without knowing whether you need a purchase promo or a
                balance transfer promo.
              </li>
              <li>
                Ignoring the balance transfer fee and focusing only on the 0%
                headline.
              </li>
              <li>
                Paying only the minimum and still carrying a balance after the
                intro period ends.
              </li>
              <li>
                Using a 0% card as permission to overspend instead of as part of a
                real payoff plan.
              </li>
            </ul>
          </section>

          <section className="space-y-3 rounded-3xl border border-amber-100 bg-amber-50/80 px-5 py-5 text-[13px] text-amber-900 shadow-sm">
            <h2 className="text-sm font-semibold text-amber-900">
              Make a 0% card part of a real payoff plan
            </h2>
            <p>
              Before you apply, figure out{" "}
              <span className="font-semibold">exactly how much you need to pay each month</span>{" "}
              to clear the balance before the promo ends.
            </p>
            <p>
              Start with the{" "}
              <Link
                to="/tools/debt-payoff"
                className="font-semibold underline underline-offset-2 hover:text-amber-950"
              >
                Debt Payoff Calculator
              </Link>{" "}
              to map out your monthly plan, or read the{" "}
              <Link
                to="/blog/debt-consolidation-guide"
                className="font-semibold underline underline-offset-2 hover:text-amber-950"
              >
                Debt Consolidation Guide
              </Link>{" "}
              if you are comparing balance transfers against other debt strategies.
            </p>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white px-5 py-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Related credit card guides
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Link
                to="/credit-cards"
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-800 transition hover:border-emerald-200 hover:bg-emerald-50"
              >
                <span className="block font-semibold text-slate-900">
                  Credit Cards Hub
                </span>
                <span className="mt-1 block text-[13px] text-slate-600">
                  Explore BuddyMoney’s main credit card category and related guides.
                </span>
              </Link>

              <Link
                to="/blog/secured-vs-unsecured-credit-cards"
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-800 transition hover:border-emerald-200 hover:bg-emerald-50"
              >
                <span className="block font-semibold text-slate-900">
                  Secured vs. Unsecured Credit Cards
                </span>
                <span className="mt-1 block text-[13px] text-slate-600">
                  Learn the difference before choosing the right card type.
                </span>
              </Link>

              <Link
                to="/tools/credit-cards"
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-800 transition hover:border-emerald-200 hover:bg-emerald-50"
              >
                <span className="block font-semibold text-slate-900">
                  Credit Card Finder
                </span>
                <span className="mt-1 block text-[13px] text-slate-600">
                  Compare card types and learn which features matter most.
                </span>
              </Link>

              <Link
                to="/mortgage"
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-800 transition hover:border-emerald-200 hover:bg-emerald-50"
              >
                <span className="block font-semibold text-slate-900">
                  Mortgage Payoff Calculator
                </span>
                <span className="mt-1 block text-[13px] text-slate-600">
                  Another beginner-friendly payoff tool if you are prioritizing debt.
                </span>
              </Link>
            </div>
          </section>

          <section className="space-y-4 rounded-3xl border border-slate-200 bg-white px-5 py-6 text-sm text-slate-800 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Frequently asked questions
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-slate-900">
                  What is the difference between a 0% purchase card and a balance transfer card?
                </h3>
                <p className="mt-1 text-slate-700">
                  A 0% purchase card helps with new spending, while a balance
                  transfer card helps you move existing credit card debt from
                  another account. Some cards offer both, but not always with the
                  same terms.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  Do 0% intro APR cards always have fees?
                </h3>
                <p className="mt-1 text-slate-700">
                  Not always. Some have no annual fee, but many balance transfer
                  offers still charge a transfer fee. Always check the terms.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  Is a 0% intro APR card good for paying off debt?
                </h3>
                <p className="mt-1 text-slate-700">
                  It can be, especially if you qualify for a good offer and have a
                  realistic plan to pay the balance before the promo ends.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-emerald-100 bg-emerald-600 px-5 py-5 text-white shadow-sm">
            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold">
                  Want to compare card types side by side?
                </h2>
                <p className="text-sm text-emerald-50">
                  Use BuddyMoney’s Credit Card Finder to explore cards by intro
                  APR, annual fee, and card type — and connect what you learn here
                  to the card features that matter most.
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
            title="I’m reading BuddyMoney’s guide to the best 0% intro APR credit cards."
          />
        </div>
      </main>
    </>
  );
}
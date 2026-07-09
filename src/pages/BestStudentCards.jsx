// src/pages/BestStudentCards.jsx
import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import ShareBar from "../components/ShareBar";
import { setCanonical } from "../utils/seo";

// Sample student cards (educational examples)
const STUDENT_CARDS = [
  {
    id: "campus-cash-student",
    name: "Campus Cash Student",
    issuer: "Campus Credit Co.",
    annualFee: 0,
    bonus:
      "Earn a $50 statement credit after your first purchase within 3 months.",
    rewards:
      "3% cash back on coffee shops & dining, 1% on everything else. Designed for campus life.",
    introApr: "0% intro APR on purchases for 6 months.",
    regularApr: "22.99%–29.99% variable APR.",
    bestFor:
      "Students who mostly spend on food, coffee, and hanging out with friends.",
    perks: [
      "No annual fee",
      "Free monthly credit score access",
      "Spending breakdowns by category to help you budget",
    ],
  },
  {
    id: "starter-grade-boost",
    name: "Starter Grade Boost Card",
    issuer: "Student Finance Bank",
    annualFee: 0,
    bonus:
      "Earn a $25 bonus after you make 3 on-time payments in a row within the first 6 months.",
    rewards:
      "1.5% cash back on all purchases. Simple, flat rewards with no rotating categories.",
    introApr: "N/A",
    regularApr: "23.99%–29.99% variable APR.",
    bestFor:
      "Students who want something simple and are mainly focused on building credit.",
    perks: [
      "No annual fee",
      "Reports to all three major credit bureaus",
      "Automatic credit line review after 6–12 months of on-time payments",
    ],
  },
  {
    id: "secured-student-builder",
    name: "Secured Student Builder",
    issuer: "Friendly Campus Credit Union",
    annualFee: 0,
    bonus: "No bonus—focused on helping you build credit from scratch.",
    rewards:
      "1% cash back on all purchases, even while secured. Refundable deposit required.",
    introApr: "N/A",
    regularApr: "24.99% variable APR.",
    bestFor:
      "Students with no credit history who can put down a small refundable deposit.",
    perks: [
      "Refundable security deposit (e.g., $200+)",
      "Potential upgrade to unsecured card later",
      "Designed for thin/no-file students",
    ],
  },
];

export default function BestStudentCards() {
  const title =
    "Best Student Credit Cards of 2026: Compare Beginner Options | BuddyMoney";
  const description =
    "Compare student credit cards for 2026. Learn about beginner cards, rewards, no annual fee options, building credit, and choosing your first credit card.";
  const canonicalUrl = "https://www.buddymoney.com/credit-cards/student";
  const ogImage = "https://www.buddymoney.com/icons/buddymoney-og-default.png";

  useEffect(() => {
    setCanonical("/credit-cards/student");
  }, []);

  const jsonLd = useMemo(() => {
    const items = STUDENT_CARDS.map((card, index) => ({
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
            ? "No annual fee; student credit card."
            : `$${card.annualFee.toLocaleString()} annual fee; student credit card.`,
      },
    }));

    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Best student credit cards",
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
          name: "What is a student credit card?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A student credit card is designed for people with limited or no credit history. These cards often have lower starting limits, simple rewards, and tools that help you build credit while learning good habits.",
          },
        },
        {
          "@type": "Question",
          name: "Do student credit cards help build credit?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, they can help build credit when the issuer reports to the major credit bureaus and you make on-time payments while keeping balances low.",
          },
        },
        {
          "@type": "Question",
          name: "Should a student choose rewards or simplicity?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It depends on spending habits. Some students benefit from basic flat-rate cards, while others prefer simple cash back on common categories like dining or coffee. The most important feature is still responsible use.",
          },
        },
        {
          "@type": "Question",
          name: "Is a secured student card a good option?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A secured student card can be a strong option for someone with no credit history who can afford a refundable deposit. It may be easier to qualify for and can still help build payment history.",
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

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content="BuddyMoney" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />

        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <main className="min-h-screen bg-gradient-to-b from-green-50 via-white to-emerald-50/40 pb-16 pt-4">
        <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
          <ShareBar
            variant="top"
            title="I’m reading BuddyMoney’s guide to the best student credit cards."
          />

          <header className="space-y-4 rounded-3xl border border-emerald-100 bg-white/90 px-5 py-6 shadow-sm">
            <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Credit Cards
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                2026 Guide
              </span>
            </p>

            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Best Student Credit Cards of 2026
            </h1>

            <p className="text-sm text-slate-700 sm:text-base">
              Student credit cards are designed to help you{" "}
              <span className="font-semibold text-slate-900">
                build credit from scratch
              </span>{" "}
              while you are still in school. The best option depends on whether
              you want simple rewards, help tracking spending, or a starter card
              that is easier to qualify for.
            </p>

            <p className="text-sm text-slate-700 sm:text-base">
              This BuddyMoney guide walks through the tradeoffs between student
              cash back cards, simple flat-rate cards, and secured starter
              options. You can also explore more card types in the{" "}
              <Link
                to="/tools/credit-cards"
                className="font-semibold text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
              >
                BuddyMoney Credit Card Finder
              </Link>
              .
            </p>

            <p className="text-[11px] text-slate-500">
              Educational guide only • Card offers, fees, and eligibility rules
              can change • BuddyMoney updates this page regularly, and new cards
              may be added over time • Always verify current issuer details
              before applying.
            </p>
          </header>

          <section className="space-y-4 rounded-3xl border border-slate-200 bg-white px-5 py-6 text-sm text-slate-800 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              What makes a card a student card?
            </h2>
            <p>
              Student cards are built for people with{" "}
              <span className="font-semibold">limited or no credit history</span>.
              That usually means:
            </p>
            <ul className="ml-5 list-disc space-y-1">
              <li>Lower starting credit limits.</li>
              <li>
                More focus on{" "}
                <span className="font-semibold">credit education tools</span>,
                payment reminders, and progress tracking.
              </li>
              <li>
                Rewards that may match{" "}
                <span className="font-semibold">typical student spending</span>,
                like dining, coffee, or everyday purchases.
              </li>
            </ul>
            <p>
              The real goal is not just rewards. It is building a{" "}
              <span className="font-semibold">clean on-time payment history</span>{" "}
              so you have better options later for apartments, auto loans, and
              better credit cards.
            </p>

            <p>
              If you are a student with no credit history and cannot qualify for
              a traditional student card, a secured card may also help you start
              building credit.
            </p>

            <Link
              to="/blog/best-secured-credit-cards/"
              className="font-semibold text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
            >
              Compare secured credit cards for building credit →
            </Link>
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
                  Some student cards focus on simple flat-rate rewards, while
                  others pay more in categories like dining or campus spending.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <h3 className="text-sm font-semibold text-slate-900">
                  Credit-building tools
                </h3>
                <p className="mt-1 text-[13px] text-slate-700">
                  Look for cards that report to the major credit bureaus and
                  offer progress tracking or educational tools.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <h3 className="text-sm font-semibold text-slate-900">
                  Fees and APR
                </h3>
                <p className="mt-1 text-[13px] text-slate-700">
                  Student cards can still have high APRs. Rewards matter much
                  less if you carry a balance and pay interest.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <h3 className="text-sm font-semibold text-slate-900">
                  Secured vs. unsecured
                </h3>
                <p className="mt-1 text-[13px] text-slate-700">
                  Some students may qualify for unsecured cards right away, while
                  others may do better starting with a secured card and a small
                  refundable deposit.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4 rounded-3xl border border-slate-200 bg-white px-5 py-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-base font-semibold text-slate-900">
                Compare Student Credit Card Options
              </h2>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                Educational examples
              </span>
            </div>

            <p className="text-sm text-slate-700">
              These examples show common student card patterns, including
              campus-focused rewards, simple flat-rate cards, and secured
              starter options. BuddyMoney may expand this page with additional
              cards and comparisons over time.
            </p>

            <div className="mt-3 space-y-4">
              {STUDENT_CARDS.map((card) => (
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
                    {card.perks.map((perk, idx) => (
                      <li key={idx}>{perk}</li>
                    ))}
                  </ul>

                  <p className="text-[11px] text-slate-500">
                    Not a real product. For illustration only — actual student
                    card terms, eligibility requirements, and APRs vary by
                    issuer and can change at any time.
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="space-y-3 rounded-3xl border border-sky-100 bg-sky-50/80 px-5 py-5 text-[13px] text-slate-800 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">
              3 simple student card habits that pay off later
            </h2>
            <ul className="ml-5 list-disc space-y-1">
              <li>Turn on autopay for at least the statement balance.</li>
              <li>
                Keep usage under about 30% of your credit limit when possible.
              </li>
              <li>Use the card for small planned purchases, not big splurges.</li>
            </ul>
          </section>

          <section className="space-y-3 rounded-3xl border border-amber-100 bg-amber-50/80 px-5 py-5 text-[13px] text-amber-900 shadow-sm">
            <h2 className="text-sm font-semibold text-amber-900">
              Credit cards work best alongside a plan
            </h2>
            <p>
              A student card can help you build credit, but it works best when
              you already know what you can afford to spend and pay back.
            </p>
            <p>
              Use the{" "}
              <Link
                to="/tools/budget-tracker"
                className="font-semibold underline underline-offset-2 hover:text-amber-950"
              >
                Budget Tracker
              </Link>{" "}
              to manage monthly spending, or the{" "}
              <Link
                to="/tools/emergency-fund"
                className="font-semibold underline underline-offset-2 hover:text-amber-950"
              >
                Emergency Fund Tool
              </Link>{" "}
              so your credit card does not become your backup plan.
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
                  Explore cards by annual fee, rewards style, and card type.
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
                  Helpful if you are building from a very thin or damaged credit
                  file.
                </span>
              </Link>

              <Link
                to="/credit-cards/cash-back"
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-emerald-200 hover:bg-emerald-50"
              >
                <span className="block font-semibold text-slate-900">
                  Best Cash Back Credit Cards
                </span>
                <span className="mt-1 block text-[13px] text-slate-600">
                  Compare student card rewards against broader cash back
                  options.
                </span>
              </Link>

              <Link
                to="/tools/debt-payoff"
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-emerald-200 hover:bg-emerald-50"
              >
                <span className="block font-semibold text-slate-900">
                  Debt Payoff Calculator
                </span>
                <span className="mt-1 block text-[13px] text-slate-600">
                  Useful if you already carry balances and want a payoff plan.
                </span>
              </Link>
            </div>
          </section>

          <section className="rounded-3xl border border-emerald-100 bg-emerald-600 px-5 py-5 text-white shadow-sm">
            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold">
                  Want to compare student-friendly cards side by side?
                </h2>
                <p className="text-sm text-emerald-50">
                  Use BuddyMoney&apos;s Credit Card Finder to browse cards by
                  credit profile, annual fee, and rewards style — including
                  student-friendly options.
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
            title="I’m reading BuddyMoney’s guide to the best student credit cards."
          />
        </div>
      </main>
    </>
  );
}
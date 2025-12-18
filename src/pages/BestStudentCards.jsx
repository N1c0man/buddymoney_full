// src/pages/BestStudentCards.jsx
import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import ShareBar from "../components/ShareBar";
import { setCanonical } from "../utils/seo";

// Sample student cards (preview mode – no affiliate links yet)
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
  const title = "Best Student Credit Cards (Preview) | BuddyMoney";
  const description =
    "Learn how student credit cards work using BuddyMoney’s preview guide—cash back on student life, simple flat-rate cards, and secured starter options—before live offers go into the Credit Card Finder.";
  const pageUrl =
    typeof window !== "undefined"
      ? window.location.href
      : "https://buddymoney.com/credit-cards/student";

  // ✅ Canonical for /credit-cards/student
  useEffect(() => {
    setCanonical("/credit-cards/student");
  }, []);

  // JSON-LD structured data (ItemList of sample student cards)
  const jsonLd = useMemo(() => {
    const items = STUDENT_CARDS.map((card, index) => ({
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
            ? "No annual fee; student credit card."
            : `$${card.annualFee.toLocaleString()} annual fee; student credit card.`,
      },
    }));

    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Best student credit cards (preview)",
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
            title="I’m reading BuddyMoney’s guide to the best student credit cards."
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
              Best student credit cards (preview)
            </h1>
            <p className="text-sm text-slate-700 sm:text-base">
              Student cards are designed to help you{" "}
              <span className="font-semibold text-slate-900">
                build credit from scratch
              </span>{" "}
              while you&apos;re still in school. This guide uses{" "}
              <span className="font-semibold text-slate-900">
                sample student cards
              </span>{" "}
              to show the tradeoffs between cash back, simplicity, and secured
              options. Once partner offers are live, we&apos;ll plug real cards
              into the{" "}
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
              official issuer&apos;s terms, eligibility rules, and fees before
              you apply.
            </p>
          </header>

          {/* Intro: student card basics */}
          <section className="space-y-4 rounded-3xl border border-slate-200 bg-white px-5 py-6 text-sm text-slate-800 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              What makes a card a “student” card?
            </h2>
            <p>
              Student cards are built for people with{" "}
              <span className="font-semibold">limited or no credit history</span>.
              That means:
            </p>
            <ul className="ml-5 list-disc space-y-1">
              <li>Lower credit limits at the start.</li>
              <li>
                More focus on{" "}
                <span className="font-semibold">credit education tools</span>{" "}
                and progress tracking.
              </li>
              <li>
                Rewards that often match{" "}
                <span className="font-semibold">
                  typical student spending
                </span>{" "}
                (food, coffee, small purchases).
              </li>
            </ul>
            <p>
              The goal is to help you build a{" "}
              <span className="font-semibold">clean, on-time payment history</span>{" "}
              so your future self has better options on apartments, car loans,
              and more.
            </p>
          </section>

          {/* Sample student card line-up */}
          <section className="space-y-4 rounded-3xl border border-slate-200 bg-white px-5 py-6 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              Sample student card line-up
            </h2>
            <p className="text-sm text-slate-700">
              These are{" "}
              <span className="font-semibold">example cards</span> to show the
              types of student offers you might see: campus-focused rewards,
              simple flat-rate cards, and secured options. They aren&apos;t real
              products, but they reflect common setups in the student card
              space.
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

          {/* Quick habits box */}
          <section className="space-y-3 rounded-3xl border border-sky-100 bg-sky-50/80 px-5 py-5 text-[13px] text-slate-800 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">
              3 simple student card habits that pay off later
            </h2>
            <ul className="ml-5 list-disc space-y-1">
              <li>Turn on autopay for at least the statement balance.</li>
              <li>Keep usage under ~30% of your credit limit when possible.</li>
              <li>Use the card regularly for small purchases, not big splurges.</li>
            </ul>
          </section>

          {/* CTA: move into the Credit Card Finder */}
          <section className="rounded-3xl border border-emerald-100 bg-emerald-600 px-5 py-5 text-white shadow-sm">
            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold">
                  Want to see how student cards compare?
                </h2>
                <p className="text-sm text-emerald-50">
                  Use BuddyMoney&apos;s Credit Card Finder (in preview mode) to
                  browse cards by credit score, annual fee, and rewards style —
                  including student-friendly options.
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
            title="I’m reading BuddyMoney’s guide to the best student credit cards."
          />
        </div>
      </main>
    </>
  );
}

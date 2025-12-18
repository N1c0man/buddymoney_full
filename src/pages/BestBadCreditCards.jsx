// src/pages/BestBadCreditCards.jsx
import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import ShareBar from "../components/ShareBar";
import { setCanonical } from "../utils/seo";

// Sample "bad / rebuilding credit" cards (preview mode, no affiliate links yet)
const BAD_CREDIT_CARDS = [
  {
    id: "secured-builder",
    name: "Secured Builder Card",
    issuer: "Friendly Credit Union",
    creditScore: "building",
    annualFee: 0,
    depositRange: "$200–$2,500",
    introApr: "N/A",
    regularApr: "25.99% variable APR.",
    bestFor: "Someone rebuilding credit who can put down a refundable deposit.",
    features: [
      "Reports to all three major credit bureaus",
      "Choose your own refundable security deposit",
      "Automatic credit line review after 6–12 months",
    ],
  },
  {
    id: "fresh-start-unsecured",
    name: "Fresh Start Unsecured",
    issuer: "Rebuild Bank",
    creditScore: "fair",
    annualFee: 39,
    depositRange: "No deposit required",
    introApr: "N/A",
    regularApr: "27.99% variable APR.",
    bestFor:
      "Someone with fair credit who wants to avoid tying up money in a deposit.",
    features: [
      "No security deposit",
      "Reports monthly to the major credit bureaus",
      "Chance at credit line increase with on-time payments",
    ],
  },
  {
    id: "student-rebuild-card",
    name: "Student Rebuild Card",
    issuer: "Campus Credit Co.",
    creditScore: "limited",
    annualFee: 0,
    depositRange: "$200+ security deposit",
    introApr: "N/A",
    regularApr: "26.99% variable APR.",
    bestFor:
      "Students or young adults with thin credit history who want to establish a track record.",
    features: [
      "Designed for thin or no credit history",
      "Free monthly credit score monitoring",
      "Payment reminders and budgeting tools",
    ],
  },
];

export default function BestBadCreditCards() {
  const title =
    "Best Credit Cards for Bad or Rebuilding Credit (Preview) | BuddyMoney";
  const description =
    "Learn how secured and rebuilding credit cards work using BuddyMoney’s preview line-up. Understand deposits, annual fees, and expectations before real offers go live in the Credit Card Finder.";
  const pageUrl =
    typeof window !== "undefined"
      ? window.location.href
      : "https://buddymoney.com/credit-cards/bad-credit";

  // ✅ Canonical for this page
  useEffect(() => {
    setCanonical("/credit-cards/bad-credit");
  }, []);

  // JSON-LD structured data (ItemList of sample “bad credit” cards)
  const jsonLd = useMemo(() => {
    const items = BAD_CREDIT_CARDS.map((card, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "FinancialProduct",
        name: card.name,
        description: `${card.bestFor} Typically requires ${card.depositRange}.`,
        provider: {
          "@type": "BankOrCreditUnion",
          name: card.issuer,
        },
        feesAndCommissionsSpecification:
          card.annualFee === 0
            ? "No annual fee; may require refundable security deposit."
            : `$${card.annualFee.toLocaleString()} annual fee; may require refundable security deposit.`,
      },
    }));

    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Best credit cards for bad or rebuilding credit (preview)",
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
            title="I’m reading BuddyMoney’s guide to credit cards for rebuilding credit."
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
              Best credit cards for bad or rebuilding credit (preview)
            </h1>
            <p className="text-sm text-slate-700 sm:text-base">
              If your credit score is low or you&apos;re starting over, the goal
              isn&apos;t to chase rewards — it&apos;s to{" "}
              <span className="font-semibold text-slate-900">
                rebuild trust with lenders
              </span>{" "}
              in the cheapest, safest way you can. This guide uses{" "}
              <span className="font-semibold text-slate-900">sample cards</span>{" "}
              to show how secured and rebuilding cards typically work. Once
              partner offers are live, we&apos;ll plug real cards into the{" "}
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
              official issuer&apos;s terms and fees before you apply.
            </p>
          </header>

          {/* Intro: mindset for rebuilding credit */}
          <section className="space-y-4 rounded-3xl border border-slate-200 bg-white px-5 py-6 text-sm text-slate-800 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              The rebuilding-credit game plan (simple version)
            </h2>
            <p>
              When you&apos;re rebuilding, a credit card is a{" "}
              <span className="font-semibold">tool</span>, not a flex. The main
              job of the card is to:
            </p>
            <ul className="ml-5 list-disc space-y-1">
              <li>
                Help you{" "}
                <span className="font-semibold">make small, on-time payments</span>{" "}
                every month.
              </li>
              <li>
                Report that positive history to{" "}
                <span className="font-semibold">all three major bureaus</span>.
              </li>
              <li>
                Keep your{" "}
                <span className="font-semibold">credit utilization low</span>{" "}
                (ideally under 30% of your limit).
              </li>
            </ul>
            <p>
              The tradeoff is that these cards often come with{" "}
              <span className="font-semibold">higher APRs</span> and, sometimes,{" "}
              <span className="font-semibold">annual fees</span>. That&apos;s why
              it&apos;s critical to treat them as a{" "}
              <span className="font-semibold">temporary stepping stone</span>,
              not a forever card.
            </p>
          </section>

          {/* Sample card line-up */}
          <section className="space-y-4 rounded-3xl border border-slate-200 bg-white px-5 py-6 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              Sample rebuilding credit card line-up
            </h2>
            <p className="text-sm text-slate-700">
              These are{" "}
              <span className="font-semibold">example cards</span> to help you
              understand what you might see in the market. They&apos;re not
              actual offers, but they&apos;re based on how many real rebuilding
              cards are structured.
            </p>

            <div className="mt-3 space-y-4">
              {BAD_CREDIT_CARDS.map((card) => (
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

                  <dl className="grid gap-2 rounded-xl bg-white px-3 py-2 text-[12px] text-slate-700 sm:grid-cols-3">
                    <div>
                      <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                        Deposit
                      </dt>
                      <dd className="mt-1">{card.depositRange}</dd>
                    </div>
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
                  </dl>

                  <ul className="ml-4 list-disc space-y-1 text-[12px] text-slate-700">
                    {card.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>

                  <p className="text-[11px] text-slate-500">
                    Not a real product. For illustration only — actual card
                    terms, fees, and deposit requirements vary by issuer and can
                    change at any time.
                  </p>
                </article>
              ))}
            </div>
          </section>

          {/* Small coaching section */}
          <section className="space-y-3 rounded-3xl border border-amber-100 bg-amber-50/80 px-5 py-5 text-[13px] text-amber-900 shadow-sm">
            <h2 className="text-sm font-semibold text-amber-900">
              Quick checklist before you apply for a rebuilding card
            </h2>
            <ul className="ml-5 list-disc space-y-1">
              <li>Make sure the card reports to all three major bureaus.</li>
              <li>Confirm the total cost: annual fee + potential monthly fees.</li>
              <li>Only charge what you can pay off in full each month.</li>
              <li>
                Set calendar reminders so you never miss a payment — a single
                late payment can set you back.
              </li>
            </ul>
          </section>

          {/* CTA: move into the Credit Card Finder */}
          <section className="rounded-3xl border border-emerald-100 bg-emerald-600 px-5 py-5 text-white shadow-sm">
            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold">
                  Want to see how rebuilding cards compare side by side?
                </h2>
                <p className="text-sm text-emerald-50">
                  Use BuddyMoney&apos;s Credit Card Finder (in preview mode) to
                  explore cards by credit score, annual fee, and type — including
                  secured and rebuilding options.
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
            title="I’m reading BuddyMoney’s guide to credit cards for rebuilding credit."
          />
        </div>
      </main>
    </>
  );
}

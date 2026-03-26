// src/pages/BestBadCreditCards.jsx
import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import ShareBar from "../components/ShareBar";
import { setCanonical } from "../utils/seo";

// Sample "bad / rebuilding credit" cards (educational examples)
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
    "Best Credit Cards for Bad or Rebuilding Credit (2026 Guide) | BuddyMoney";
  const description =
    "Learn how credit cards for bad or rebuilding credit work, what fees to watch for, and how to rebuild safely with smarter habits and the right card type.";
  const canonicalUrl = "https://www.buddymoney.com/credit-cards/bad-credit";
  const ogImage =
    "https://www.buddymoney.com/icons/buddymoney-og-default.png";

  useEffect(() => {
    setCanonical("/credit-cards/bad-credit");
  }, []);

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
      name: "Best credit cards for bad or rebuilding credit",
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
          name: "Can I get a credit card with bad credit?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. People with bad, fair, or limited credit may still qualify for secured cards or some rebuilding cards. The key is to focus on fees, reporting to all three bureaus, and whether the card fits your budget.",
          },
        },
        {
          "@type": "Question",
          name: "Is a secured card better for rebuilding credit?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A secured card can be a strong option because it is often easier to qualify for and may help you build payment history when used responsibly. You usually need a refundable security deposit.",
          },
        },
        {
          "@type": "Question",
          name: "What should I avoid with rebuilding credit cards?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Watch for high annual fees, monthly maintenance fees, missed-payment penalties, and carrying a balance at a high APR. A rebuilding card works best when you keep spending low and pay on time every month.",
          },
        },
        {
          "@type": "Question",
          name: "Will a rebuilding credit card raise my score quickly?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Credit improvement usually takes time. A rebuilding card can help by adding positive payment history, but results depend on your overall credit file, low balances, and consistent on-time payments.",
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

        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <main className="min-h-screen bg-gradient-to-b from-green-50 via-white to-emerald-50/40 pb-16 pt-4">
        <div className="mx-auto max-w-4xl space-y-6 px-4 sm:px-6 lg:px-8">
          <ShareBar
            variant="top"
            label="Share this guide with someone looking to rebuild credit"
            title="I’m reading BuddyMoney’s guide to rebuilding credit with credit cards."
          />

          <header className="space-y-4 rounded-3xl border border-emerald-100 bg-white/90 px-5 py-6 shadow-sm">
            <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Credit Cards
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                Beginner guide
              </span>
            </p>

            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Best credit cards for bad or rebuilding credit
            </h1>

            <p className="text-sm text-slate-700 sm:text-base">
              If your credit score is not where you want it to be, you still
              have options. This guide explains how{" "}
              <span className="font-semibold text-slate-900">
                credit cards for bad or rebuilding credit
              </span>{" "}
              work, what fees to watch for, and how to use them responsibly
              before you apply.
            </p>

            <p className="text-sm text-slate-700 sm:text-base">
              Some people do best with a secured card and refundable deposit,
              while others may qualify for an unsecured card with higher fees.
              The goal is not just getting approved. The goal is building a
              stronger credit profile over time.
            </p>

            <p className="text-[11px] text-slate-500">
              Educational guide only • Card offers, fees, and approval criteria
              can change • BuddyMoney updates this page regularly, and new cards
              may be added over time • Always review current issuer details
              before applying.
            </p>
          </header>

          <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 px-4 py-3 text-[11px] text-emerald-900">
            <strong>Disclosure:</strong> BuddyMoney may earn compensation from
            partners when you click links or apply for products. This does not
            affect how we explain cards or tools. We focus on clarity, not
            commissions.
          </div>

          <section className="space-y-4 rounded-3xl border border-slate-200 bg-white px-5 py-6 text-sm text-slate-800 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              A simple game plan for rebuilding credit
            </h2>
            <ul className="ml-5 list-disc space-y-2">
              <li>Make small, on-time payments every month.</li>
              <li>Keep balances low, ideally under 30% of your limit.</li>
              <li>Use rebuilding cards as a stepping stone, not a long-term crutch.</li>
              <li>Check whether the card reports to all three major credit bureaus.</li>
            </ul>
            <p>
              These cards often come with higher APRs or more fees, which is why
              paying balances in full is so important. Used correctly, they can
              help you qualify for better cards later.
            </p>
          </section>

          <section className="space-y-4 rounded-3xl border border-slate-200 bg-white px-5 py-6 text-sm text-slate-800 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              Secured vs. unsecured cards for rebuilding
            </h2>
            <p>
              A{" "}
              <span className="font-semibold text-slate-900">
                secured credit card
              </span>{" "}
              usually requires a refundable deposit, but it may be easier to
              qualify for if your credit needs work. An{" "}
              <span className="font-semibold text-slate-900">
                unsecured card
              </span>{" "}
              may not require a deposit, but it can come with higher fees or
              tighter approval standards.
            </p>
            <p>
              If you are comparing those two paths, read BuddyMoney’s{" "}
              <Link
                to="/blog/secured-vs-unsecured-credit-cards"
                className="font-semibold text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
              >
                secured vs. unsecured credit cards guide
              </Link>{" "}
              before you apply.
            </p>
          </section>

          <section className="space-y-4 rounded-3xl border border-slate-200 bg-white px-5 py-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-base font-semibold text-slate-900">
                Example rebuilding card structures
              </h2>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                Educational examples
              </span>
            </div>

            <p className="text-[13px] text-slate-600">
              These examples show common patterns for secured and rebuilding
              cards, including refundable deposits, credit-bureau reporting, and
              higher-fee unsecured options. BuddyMoney may expand this page with
              additional cards and comparisons over time.
            </p>

            <div className="space-y-4">
              {BAD_CREDIT_CARDS.map((card) => (
                <article
                  key={card.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-4 text-sm"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-900">{card.name}</h3>
                      <p className="text-[12px] text-slate-500">
                        {card.issuer} •{" "}
                        {card.annualFee === 0
                          ? "No annual fee"
                          : `$${card.annualFee} annual fee`}
                      </p>
                    </div>
                    <p className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-semibold text-emerald-700">
                      Best for: {card.bestFor}
                    </p>
                  </div>

                  <dl className="mt-4 grid gap-3 text-[12px] text-slate-700 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                        Credit profile
                      </dt>
                      <dd className="mt-1">{card.creditScore}</dd>
                    </div>
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

                  <ul className="ml-4 mt-3 list-disc space-y-1 text-[12px] text-slate-700">
                    {card.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>

                  <p className="mt-3 text-[11px] text-slate-500">
                    Not a real product. For illustration only — terms,
                    qualification requirements, and fees vary by issuer.
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="space-y-3 rounded-3xl border border-amber-100 bg-amber-50/80 px-5 py-5 text-[13px] text-amber-900 shadow-sm">
            <h2 className="text-sm font-semibold text-amber-900">
              Quick checklist before you apply for a rebuilding card
            </h2>
            <ul className="ml-5 list-disc space-y-1">
              <li>Make sure the card reports to all three major bureaus.</li>
              <li>Confirm the total cost, including annual and monthly fees.</li>
              <li>Only charge what you can pay off in full each month.</li>
              <li>
                Set payment reminders so you never miss a due date. One late
                payment can set you back.
              </li>
            </ul>
          </section>

          <section className="space-y-4 rounded-3xl border border-slate-200 bg-white px-5 py-6 text-sm text-slate-800 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              Tools and guides that can help
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
                  Explore cards by credit profile, fees, and card type.
                </span>
              </Link>

              <Link
                to="/tools/budget-tracker"
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-emerald-200 hover:bg-emerald-50"
              >
                <span className="block font-semibold text-slate-900">
                  Budget Tracker
                </span>
                <span className="mt-1 block text-[13px] text-slate-600">
                  Build a spending plan so you can pay balances in full and stay on track.
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
                  Map out a payoff strategy if you are already carrying balances.
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
                  Build cash reserves so credit cards do not become your fallback plan.
                </span>
              </Link>
            </div>
          </section>

          <section className="rounded-3xl border border-emerald-100 bg-emerald-600 px-5 py-5 text-white shadow-sm">
            <h2 className="text-lg font-semibold">
              Ready to compare cards side by side?
            </h2>
            <p className="text-sm text-emerald-50">
              Use BuddyMoney’s Credit Card Finder to explore cards by credit
              score, fees, and type so you can compare rebuilding options more
              clearly.
            </p>
            <Link
              to="/tools/credit-cards"
              className="mt-3 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-emerald-700 shadow hover:bg-emerald-50"
            >
              Open Credit Card Finder →
            </Link>
          </section>

          <ShareBar
            variant="bottom"
            label="Share this guide with someone looking to rebuild credit"
            title="I’m reading BuddyMoney’s guide to rebuilding credit."
          />
        </div>
      </main>
    </>
  );
}
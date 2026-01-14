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
    "Best Credit Cards for Bad or Rebuilding Credit (2026 Guide) | BuddyMoney";
  const description =
    "Learn how credit cards for bad or fair credit work, what to watch out for, and how to rebuild safely. Educational guidance first — real offers added when available.";
  const pageUrl =
    typeof window !== "undefined"
      ? window.location.href
      : "https://buddymoney.com/credit-cards/bad-credit";

  // Canonical
  useEffect(() => {
    setCanonical("/credit-cards/bad-credit");
  }, []);

  // JSON-LD structured data (ItemList – preview examples)
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

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />

        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={pageUrl} />
        <meta
          property="og:image"
          content="https://buddymoney.com/icons/buddymoney-og-default.png"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta
          name="twitter:image"
          content="https://buddymoney.com/icons/buddymoney-og-default.png"
        />

        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <main className="min-h-screen bg-gradient-to-b from-green-50 via-white to-emerald-50/40 pb-16 pt-4">
        <div className="mx-auto max-w-4xl space-y-6 px-4 sm:px-6 lg:px-8">
          <ShareBar
            variant="top"
            label="Share this guide with someone looking to rebuild credit"
            title="I’m reading BuddyMoney’s guide to rebuilding credit with credit cards."
          />

          {/* Header */}
          <header className="space-y-3 rounded-3xl border border-emerald-100 bg-white/90 px-5 py-6 shadow-sm">
            <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Credit Cards
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                Educational guide
              </span>
            </p>

            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Best credit cards for bad or rebuilding credit
            </h1>

            <p className="text-sm text-slate-700 sm:text-base">
              If your credit score isn&apos;t where you want it to be, you still
              have options. This guide explains how rebuilding credit cards work,
              what fees to watch out for, and how to use them responsibly —
              before you apply.
            </p>

            <p className="text-[11px] text-slate-500">
              Educational only • Not financial advice • Always review issuer
              terms before applying.
            </p>
          </header>

          {/* Disclosure */}
          <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 px-4 py-3 text-[11px] text-emerald-900">
            <strong>Disclosure:</strong> BuddyMoney may earn compensation from
            partners when you click links or apply for products. This does not
            affect how we explain cards or tools. We focus on clarity, not
            commissions.
          </div>

          {/* Education */}
          <section className="space-y-4 rounded-3xl border border-slate-200 bg-white px-5 py-6 text-sm text-slate-800 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              A simple game plan for rebuilding credit
            </h2>
            <ul className="ml-5 list-disc space-y-1">
              <li>Make small, on-time payments every month.</li>
              <li>Keep balances low (under 30% of your limit).</li>
              <li>Use rebuilding cards as a temporary stepping stone.</li>
            </ul>
            <p>
              These cards often come with higher APRs or fees, which is why
              paying balances in full is so important. Used correctly, they can
              help you qualify for better cards later.
            </p>
          </section>

          {/* Sample cards */}
          <section className="space-y-4 rounded-3xl border border-slate-200 bg-white px-5 py-6 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              Example rebuilding card structures
            </h2>

            <div className="space-y-4">
              {BAD_CREDIT_CARDS.map((card) => (
                <article
                  key={card.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-4 text-sm"
                >
                  <h3 className="font-semibold text-slate-900">{card.name}</h3>
                  <p className="text-[12px] text-slate-500">
                    {card.issuer} •{" "}
                    {card.annualFee === 0
                      ? "No annual fee"
                      : `$${card.annualFee} annual fee`}
                  </p>

                  <ul className="ml-4 mt-2 list-disc text-[12px] text-slate-700">
                    {card.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>

                  <p className="mt-2 text-[11px] text-slate-500">
                    Example only. Terms and requirements vary by issuer.
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
          {/* CTA */}
          <section className="rounded-3xl border border-emerald-100 bg-emerald-600 px-5 py-5 text-white shadow-sm">
            <h2 className="text-lg font-semibold">
              Ready to explore cards side by side?
            </h2>
            <p className="text-sm text-emerald-50">
              Use BuddyMoney’s Credit Card Finder (preview mode) to explore
              cards by credit score, fees, and type — no credit score impact.
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

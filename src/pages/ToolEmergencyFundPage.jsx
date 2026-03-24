import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import EmergencyFund from "../tools/EmergencyFund";
import ShareBar from "../components/ShareBar";
import { setCanonical } from "../utils/seo";

export default function ToolEmergencyFundPage() {
  useEffect(() => {
    setCanonical("/tools/emergency-fund");
  }, []);

  const title =
    "Emergency Fund Calculator | How Much Should You Save? | BuddyMoney";
  const description =
    "Use BuddyMoney’s free emergency fund calculator to estimate how much you should save based on your monthly essential expenses and target months of coverage.";
  const pageUrl = "https://www.buddymoney.com/tools/emergency-fund";
  const ogImage = "https://www.buddymoney.com/icons/emergency-fund-3to6-hero.png";

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How much should I save in an emergency fund?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most people aim for 3 to 6 months of essential expenses, depending on job stability, income consistency, and household needs."
        }
      },
      {
        "@type": "Question",
        name: "Is $1,000 enough for an emergency fund?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "$1,000 is a strong starter emergency fund, but many households should continue building toward 3 to 6 months of essential expenses."
        }
      },
      {
        "@type": "Question",
        name: "What expenses should an emergency fund cover?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "An emergency fund should typically cover essential monthly expenses like housing, groceries, utilities, insurance, transportation, and minimum debt payments."
        }
      }
    ]
  };

  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "BuddyMoney Emergency Fund Calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    url: pageUrl,
    description,
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    },
    publisher: {
      "@type": "Organization",
      name: "BuddyMoney",
      url: "https://www.buddymoney.com"
    }
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={pageUrl} />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content="BuddyMoney" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />

        <script type="application/ld+json">
          {JSON.stringify(faqJsonLd)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(softwareJsonLd)}
        </script>
      </Helmet>

      <main className="min-h-screen bg-gradient-to-b from-green-50 via-white to-emerald-50/40 pt-4 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <section className="rounded-3xl border border-emerald-100 bg-white shadow-sm px-5 py-6 md:px-8 md:py-8">
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-emerald-600 mb-2">
              BuddyMoney Tool
            </p>

            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
              Emergency Fund Calculator
            </h1>

            <p className="mt-3 text-sm md:text-base text-slate-600 max-w-3xl">
              Estimate how much you may want to save for emergencies based on
              your essential monthly expenses and your target number of months.
              This calculator can help you build a stronger financial safety net
              for job loss, medical bills, repairs, and other unexpected costs.
            </p>

            <div className="mt-4 flex flex-wrap gap-3 text-xs">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 border border-emerald-100">
                🛟 3–6 month planning
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 border border-emerald-100">
                Free • No login required
              </span>
            </div>
          </section>

          <ShareBar
            variant="top"
            label="Share this emergency fund calculator with a friend"
            title="I’m using BuddyMoney’s emergency fund calculator to plan my savings goal."
          />

          <EmergencyFund />

          <section className="rounded-3xl border border-slate-200 bg-white shadow-sm px-5 py-6 md:px-8 md:py-8 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                How to use this emergency fund calculator
              </h2>
              <p className="mt-2 text-sm md:text-base text-slate-600 max-w-3xl">
                Enter your monthly essential expenses and choose how many months
                of coverage you want. A common target is 3 to 6 months, but the
                right amount depends on your income stability, household size,
                and risk tolerance.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-sm font-semibold text-slate-900 mb-2">
                  Include essential expenses like:
                </h3>
                <ul className="space-y-1 text-sm text-slate-600">
                  <li>• Rent or mortgage</li>
                  <li>• Utilities</li>
                  <li>• Groceries</li>
                  <li>• Insurance</li>
                  <li>• Transportation</li>
                  <li>• Minimum debt payments</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-sm font-semibold text-slate-900 mb-2">
                  You may want a larger fund if:
                </h3>
                <ul className="space-y-1 text-sm text-slate-600">
                  <li>• Your income changes month to month</li>
                  <li>• You are self-employed</li>
                  <li>• You support dependents</li>
                  <li>• Your expenses are harder to reduce quickly</li>
                  <li>• Your job feels less predictable</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Related BuddyMoney guides
              </h2>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                <Link
                  to="/blog/emergency-fund-basics"
                  className="text-emerald-700 hover:text-emerald-800 font-medium"
                >
                  Read: What Is an Emergency Fund? How Much You Need & How to Start →
                </Link>
                <Link
                  to="/blog/emergency-fund-3-to-6-months"
                  className="text-emerald-700 hover:text-emerald-800 font-medium"
                >
                  Read: How to Build a 3–6 Month Emergency Fund →
                </Link>
                <Link
                  to="/coach"
                  className="text-emerald-700 hover:text-emerald-800 font-medium"
                >
                  Use Budget Coach to estimate your monthly essentials →
                </Link>
                <Link
                  to="/tools#debt"
                  className="text-emerald-700 hover:text-emerald-800 font-medium"
                >
                  Need to balance savings and debt? Try the Debt Payoff Planner →
                </Link>
              </div>
            </div>
          </section>

          <ShareBar
            variant="bottom"
            label="Share this emergency fund calculator with a friend"
            title="I’m using BuddyMoney’s emergency fund calculator to plan my savings goal."
          />
        </div>
      </main>
    </>
  );
}
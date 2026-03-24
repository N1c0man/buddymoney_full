import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import DebtPayoff from "../tools/DebtPayoff";
import ShareBar from "../components/ShareBar";
import { setCanonical } from "../utils/seo";

export default function ToolDebtPayoffPage() {
  useEffect(() => {
    setCanonical("/tools/debt-payoff");
  }, []);

  const title =
    "Debt Payoff Calculator | Snowball vs Avalanche | BuddyMoney";
  const description =
    "Use BuddyMoney’s free debt payoff calculator to compare snowball vs avalanche strategies, estimate payoff time, and build a plan to get out of debt faster.";
  const pageUrl = "https://www.buddymoney.com/tools/debt-payoff";
  const ogImage = "https://www.buddymoney.com/icons/debt-hero.png";

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the best way to pay off debt?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Two popular strategies are the debt snowball (smallest balance first) and the debt avalanche (highest interest first). The best method depends on your motivation and financial goals."
        }
      },
      {
        "@type": "Question",
        name: "Should I pay off high-interest debt first?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, the avalanche method focuses on paying high-interest debt first to reduce total interest paid over time."
        }
      },
      {
        "@type": "Question",
        name: "Should I save money while paying off debt?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most people build a small emergency fund first, then balance saving and debt payoff together to avoid taking on new debt."
        }
      }
    ]
  };

  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "BuddyMoney Debt Payoff Calculator",
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
          {/* HERO */}
          <section className="rounded-3xl border border-emerald-100 bg-white shadow-sm px-5 py-6 md:px-8 md:py-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-600 mb-2">
              BuddyMoney Tool
            </p>

            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
              Debt Payoff Calculator
            </h1>

            <p className="mt-3 text-sm md:text-base text-slate-600 max-w-3xl">
              Compare debt payoff strategies, estimate how long it will take to
              become debt-free, and choose the best plan for your situation.
            </p>

            <div className="mt-4 flex flex-wrap gap-3 text-xs">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 border border-emerald-100">
                📉 Snowball vs Avalanche
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 border border-emerald-100">
                Free • No login required
              </span>
            </div>
          </section>

          <ShareBar
            variant="top"
            label="Share this debt payoff calculator with a friend"
            title="I’m using BuddyMoney’s debt payoff calculator to plan getting out of debt."
          />

          {/* TOOL */}
          <DebtPayoff />

          {/* CONTENT */}
          <section className="rounded-3xl border border-slate-200 bg-white shadow-sm px-5 py-6 md:px-8 md:py-8 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Snowball vs Avalanche: What’s the difference?
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                The snowball method focuses on paying off your smallest debts
                first for quick wins. The avalanche method focuses on high-interest
                debt first to save money over time.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 border rounded-2xl bg-slate-50">
                <h3 className="font-semibold text-slate-900 mb-2">
                  Snowball Method
                </h3>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Pay smallest balances first</li>
                  <li>• Builds momentum quickly</li>
                  <li>• Great for motivation</li>
                </ul>
              </div>

              <div className="p-4 border rounded-2xl bg-slate-50">
                <h3 className="font-semibold text-slate-900 mb-2">
                  Avalanche Method
                </h3>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Pay highest interest first</li>
                  <li>• Minimizes total interest</li>
                  <li>• More efficient long-term</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Related BuddyMoney tools
              </h2>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                <Link to="/tools/emergency-fund" className="text-emerald-700 font-medium">
                  Emergency Fund Calculator →
                </Link>
                <Link to="/coach" className="text-emerald-700 font-medium">
                  Budget Coach →
                </Link>
              </div>
            </div>
          </section>

          <ShareBar
            variant="bottom"
            label="Share this debt payoff calculator with a friend"
            title="I’m using BuddyMoney’s debt payoff calculator to plan getting out of debt."
          />
        </div>
      </main>
    </>
  );
}
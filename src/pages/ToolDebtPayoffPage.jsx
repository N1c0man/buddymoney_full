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

  const title = "Debt Payoff Calculator | Snowball vs Avalanche | BuddyMoney";
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
          text: "Two popular strategies are the debt snowball (smallest balance first) and the debt avalanche (highest interest first). The best method depends on your motivation and financial goals.",
        },
      },
      {
        "@type": "Question",
        name: "Should I pay off high-interest debt first?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, the avalanche method focuses on paying high-interest debt first to reduce total interest paid over time.",
        },
      },
      {
        "@type": "Question",
        name: "Should I save money while paying off debt?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most people build a small emergency fund first, then balance saving and debt payoff together to avoid taking on new debt.",
        },
      },
    ],
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
      priceCurrency: "USD",
    },
    publisher: {
      "@type": "Organization",
      name: "BuddyMoney",
      url: "https://www.buddymoney.com",
    },
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

        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        <script type="application/ld+json">
          {JSON.stringify(softwareJsonLd)}
        </script>
      </Helmet>

      <main className="min-h-screen bg-gradient-to-b from-green-50 via-white to-emerald-50/40 pt-4 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <section className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-br from-brand-50 via-emerald-50 to-accent-100/70 shadow-soft px-5 py-7 md:px-8 md:py-8">
            <div className="pointer-events-none absolute -top-24 -right-10 h-64 w-64 rounded-full bg-emerald-200/50 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-8 h-64 w-64 rounded-full bg-sky-200/50 blur-3xl" />

            <div className="relative grid gap-6 md:grid-cols-[minmax(0,1.6fr)_minmax(0,0.9fr)] md:items-center">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
                  BuddyMoney Tool
                </p>

                <h1 className="mt-3 text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                  Debt Payoff Calculator
                </h1>

                <p className="mt-3 text-sm md:text-base text-slate-600 max-w-3xl">
                  Estimate how long it may take to become debt-free and see how
                  interest affects your payoff plan.
                </p>

                <div className="mt-4 flex flex-wrap gap-3 text-xs">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-emerald-700 border border-emerald-100 shadow-sm">
                    📉 Payoff timeline
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-emerald-700 border border-emerald-100 shadow-sm">
                    Free • No login required
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-slate-700 border border-slate-100 shadow-sm">
                    💳 Interest awareness
                  </span>
                </div>
              </div>

              <div className="rounded-2xl bg-white/90 border border-emerald-100 shadow-sm p-5">
                <p className="text-xs font-semibold text-slate-900">
                  Best used for:
                </p>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li>• Credit card balances</li>
                  <li>• Personal loans</li>
                  <li>• Planning extra payments</li>
                </ul>
              </div>
            </div>
          </section>

          <ShareBar
            variant="top"
            label="Share this debt payoff calculator with a friend"
            title="I’m using BuddyMoney’s debt payoff calculator to plan getting out of debt."
          />

          <DebtPayoff />

          <section className="rounded-3xl border border-slate-200 bg-white shadow-sm px-5 py-6 md:px-8 md:py-8 space-y-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                Snowball vs Avalanche: what’s the difference?
              </h2>
              <p className="mt-2 text-sm text-slate-600 max-w-3xl">
                The snowball method focuses on paying off your smallest debts
                first for quick wins. The avalanche method focuses on
                high-interest debt first to reduce total interest over time.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <InfoCard
                title="Snowball Method"
                items={[
                  "Pay smallest balances first",
                  "Builds momentum quickly",
                  "Great for motivation",
                ]}
              />

              <InfoCard
                title="Avalanche Method"
                items={[
                  "Pay highest interest first",
                  "Can reduce total interest",
                  "More efficient long-term",
                ]}
              />
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white shadow-sm px-5 py-6 md:px-8 md:py-8 space-y-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                Related BuddyMoney tools
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Debt payoff works best when it fits into your full money plan.
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <RelatedToolCard
                to="/tools/emergency-fund"
                title="Emergency Fund Calculator"
                description="Build a small cash cushion so surprise expenses do not create new debt."
              />
              <RelatedToolCard
                to="/tools/budget-tracker"
                title="Budget Tracker"
                description="Find room in your monthly budget for debt payments."
              />
              <RelatedToolCard
                to="/coach"
                title="Budget Coach"
                description="Get a friendly score and next-step suggestions for your money plan."
              />
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

function InfoCard({ title, items }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
      <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
      <ul className="text-sm text-slate-600 space-y-1">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}

function RelatedToolCard({ to, title, description }) {
  return (
    <Link
      to={to}
      className="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50 hover:shadow-md"
    >
      <span className="block font-semibold text-slate-900">{title}</span>
      <span className="mt-1 block text-sm text-slate-600">{description}</span>
      <span className="mt-3 inline-flex text-xs font-semibold text-emerald-700">
        Open tool →
      </span>
    </Link>
  );
}
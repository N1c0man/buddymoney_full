import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import EmergencyFund from "../tools/EmergencyFund";
import ShareBar from "../components/ShareBar";
import AppBottomNav from "../components/AppBottomNav";
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
  const ogImage =
    "https://www.buddymoney.com/icons/emergency-fund-3to6-hero.png";

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How much should I save in an emergency fund?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most people aim for 3 to 6 months of essential expenses, depending on job stability, income consistency, and household needs.",
        },
      },
      {
        "@type": "Question",
        name: "Is $1,000 enough for an emergency fund?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "$1,000 is a strong starter emergency fund, but many households should continue building toward 3 to 6 months of essential expenses.",
        },
      },
      {
        "@type": "Question",
        name: "What expenses should an emergency fund cover?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "An emergency fund should typically cover essential monthly expenses like housing, groceries, utilities, insurance, transportation, and minimum debt payments.",
        },
      },
    ],
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

      <main className="min-h-screen bg-gradient-to-b from-green-50 via-white to-emerald-50/40 pt-4 pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <section className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-br from-brand-50 via-emerald-50 to-accent-100/70 shadow-soft px-5 py-7 md:px-8 md:py-8">
            <div className="pointer-events-none absolute -top-24 -right-10 h-64 w-64 rounded-full bg-emerald-200/50 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-8 h-64 w-64 rounded-full bg-sky-200/50 blur-3xl" />

            <div className="relative grid gap-6 md:grid-cols-[minmax(0,1.6fr)_minmax(0,0.9fr)] md:items-center">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-emerald-700">
                  BuddyMoney Tool
                </p>

                <h1 className="mt-3 text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                  Emergency Fund Planner
                </h1>

                <p className="mt-3 text-sm md:text-base text-slate-600 max-w-3xl">
                  Estimate how much to save for emergencies based on your
                  monthly essentials and target months of coverage.
                </p>

                <div className="mt-4 flex flex-wrap gap-3 text-xs">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-emerald-700 border border-emerald-100 shadow-sm">
                    🛟 3–6 month planning
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-emerald-700 border border-emerald-100 shadow-sm">
                    Free • No login required
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-slate-700 border border-slate-100 shadow-sm">
                    💚 Safety net builder
                  </span>
                </div>
              </div>

              <div className="rounded-2xl bg-white/90 border border-emerald-100 shadow-sm p-5">
                <p className="text-xs font-semibold text-slate-900">
                  Best used for:
                </p>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li>• Planning a starter emergency fund</li>
                  <li>• Estimating 3–6 months of expenses</li>
                  <li>• Balancing savings with debt payoff</li>
                </ul>
              </div>
            </div>
          </section>

          <EmergencyFund />

          <section className="rounded-3xl border border-emerald-100 bg-emerald-50 p-5 shadow-sm md:p-6">
            <p className="text-sm font-semibold text-emerald-700">
              Backup plan idea
            </p>

            <h2 className="mt-2 text-xl font-bold text-slate-900">
              Still building your emergency fund?
            </h2>

            <p className="mt-2 text-sm text-slate-700">
              While you build savings, having the right credit card may help
              cover unexpected expenses responsibly — especially if it offers
              low fees, useful protections, or a 0% intro APR period.
            </p>

            <Link
              to="/tools/credit-cards"
              className="mt-4 inline-flex rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Compare helpful card options
            </Link>

            <p className="mt-3 text-xs text-slate-500">
              Use credit carefully. BuddyMoney may earn a commission from some
              card partners. This is educational information, not financial
              advice.
            </p>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white shadow-sm px-5 py-6 md:px-8 md:py-8 space-y-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                How to use this emergency fund calculator
              </h2>
              <p className="mt-2 text-sm md:text-base text-slate-600 max-w-3xl">
                Enter your monthly essential expenses and choose how many months
                of coverage you want. A common target is 3 to 6 months, but the
                right amount depends on income stability, household size, and
                risk tolerance.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <InfoCard
                title="Include essentials like:"
                items={[
                  "Rent or mortgage",
                  "Utilities",
                  "Groceries",
                  "Insurance",
                  "Transportation",
                  "Minimum debt payments",
                ]}
              />

              <InfoCard
                title="You may want more if:"
                items={[
                  "Your income changes month to month",
                  "You are self-employed",
                  "You support dependents",
                  "Expenses are hard to reduce quickly",
                  "Your job feels less predictable",
                ]}
              />
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white shadow-sm px-5 py-6 md:px-8 md:py-8 space-y-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                Related BuddyMoney guides
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Learn the strategy behind your emergency fund and how it fits
                into your larger money plan.
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <RelatedCard
                to="/blog/emergency-fund-basics"
                title="Emergency Fund Basics"
                description="Learn what an emergency fund is, how much you may need, and how to start."
              />
              <RelatedCard
                to="/blog/emergency-fund-3-to-6-months"
                title="Build a 3–6 Month Emergency Fund"
                description="A step-by-step guide to building a stronger cash cushion."
              />
              <RelatedCard
                to="/tools/budget-coach"
                title="Budget Coach"
                description="Estimate your monthly essentials and see where savings can fit."
              />
              <RelatedCard
                to="/tools/debt-payoff"
                title="Debt Payoff Planner"
                description="Balance emergency savings with a realistic debt payoff plan."
              />
            </div>
          </section>

          <ShareBar
            variant="bottom"
            label="Share this emergency fund calculator with a friend"
            title="I’m using BuddyMoney’s emergency fund calculator to plan my savings goal."
          />
        </div>
      </main>

      <AppBottomNav />
    </>
  );
}

function InfoCard({ title, items }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
      <h3 className="text-sm font-semibold text-slate-900 mb-2">{title}</h3>
      <ul className="space-y-1 text-sm text-slate-600">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}

function RelatedCard({ to, title, description }) {
  return (
    <Link
      to={to}
      className="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50 hover:shadow-md"
    >
      <span className="block font-semibold text-slate-900">{title}</span>
      <span className="mt-1 block text-sm text-slate-600">{description}</span>
      <span className="mt-3 inline-flex text-xs font-semibold text-emerald-700">
        Open →
      </span>
    </Link>
  );
}
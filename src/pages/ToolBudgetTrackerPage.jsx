import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import BudgetTracker from "../tools/BudgetTracker";
import ShareBar from "../components/ShareBar";
import AppBottomNav from "../components/AppBottomNav";
import { setCanonical } from "../utils/seo";

export default function ToolBudgetTrackerPage() {
  useEffect(() => {
    setCanonical("/tools/budget-tracker");
  }, []);

  const title =
    "Budget Calculator & Budget Tracker | Free Monthly Budget Tool | BuddyMoney";
  const description =
    "Use BuddyMoney’s free budget calculator and budget tracker to organize your monthly income, expenses, and spending categories in one simple place.";
  const pageUrl = "https://www.buddymoney.com/tools/budget-tracker";
  const ogImage = "https://www.buddymoney.com/icons/hero-tools.png";

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a budget tracker?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A budget tracker helps you organize your income and expenses so you can see where your money goes each month and make better spending decisions.",
        },
      },
      {
        "@type": "Question",
        name: "How do I start a monthly budget?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Start by listing your monthly income, fixed bills, variable expenses, savings goals, and debt payments. Then compare total income to total spending.",
        },
      },
      {
        "@type": "Question",
        name: "Should I budget and save for an emergency fund at the same time?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, many people use a budget to create room for emergency savings while also covering bills and debt payments.",
        },
      },
    ],
  };

  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "BuddyMoney Budget Tracker",
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
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
                  BuddyMoney Tool
                </p>

                <h1 className="mt-3 text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                  Monthly Budget Planner
                </h1>

                <p className="mt-3 text-sm md:text-base text-slate-600 max-w-3xl">
                  Track your monthly income and expenses, organize spending
                  categories, and see where your money is going. This free
                  budget tool is built to help you make clearer day-to-day money
                  decisions.
                </p>

                <div className="mt-4 flex flex-wrap gap-3 text-xs">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-emerald-700 border border-emerald-100 shadow-sm">
                    💰 Monthly budgeting
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-emerald-700 border border-emerald-100 shadow-sm">
                    Free • No login required
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-slate-700 border border-slate-100 shadow-sm">
                    📊 Income vs. expenses
                  </span>
                </div>
              </div>

              <div className="rounded-2xl bg-white/90 border border-emerald-100 shadow-sm p-5">
                <p className="text-xs font-semibold text-slate-900">
                  Best used for:
                </p>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li>• Setting up a monthly money plan</li>
                  <li>• Finding where spending is going</li>
                  <li>• Creating room for savings or debt payoff</li>
                </ul>
              </div>
            </div>
          </section>


          <BudgetTracker />

          <section className="rounded-3xl border border-indigo-100 bg-indigo-50 p-5 shadow-sm md:p-6">
            <p className="text-sm font-semibold text-indigo-700">
              Smart money move
            </p>

            <h2 className="mt-2 text-xl font-bold text-slate-900">
              Match your card to your spending
            </h2>

            <p className="mt-2 text-sm text-slate-700">
              If most of your monthly spending goes toward groceries, gas,
              dining, travel, or everyday bills, the right rewards card may help
              you get more value from money you already spend.
            </p>

            <Link
              to="/tools/credit-cards"
              className="mt-4 inline-flex rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Find cards by spending style
            </Link>

            <p className="mt-3 text-xs text-slate-500">
              Rewards are only helpful when balances are paid responsibly.
              BuddyMoney may earn a commission from some card partners.
            </p>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white shadow-sm px-5 py-6 md:px-8 md:py-8 space-y-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                How to use this budget tracker
              </h2>
              <p className="mt-2 text-sm text-slate-600 max-w-3xl">
                Start by entering your monthly income and core expenses. Then
                add flexible spending categories, savings, and debt payments so
                you can see whether your budget is balanced.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <InfoCard
                title="Include categories like:"
                items={[
                  "Housing and utilities",
                  "Groceries and transportation",
                  "Insurance and subscriptions",
                  "Savings contributions",
                  "Debt payments",
                ]}
              />

              <InfoCard
                title="A good budget can help you:"
                items={[
                  "Spot overspending quickly",
                  "Build an emergency fund",
                  "Plan debt payoff",
                  "Stay organized each month",
                  "Reduce money stress",
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
                Build a stronger plan by combining your budget with savings,
                debt payoff, and guided coaching.
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <RelatedToolCard
                to="/tools/emergency-fund"
                title="Emergency Fund Calculator"
                description="Estimate how much cash to keep set aside for surprise expenses."
              />
              <RelatedToolCard
                to="/tools/debt-payoff"
                title="Debt Payoff Calculator"
                description="Use your budget to create room for a faster debt payoff plan."
              />
              <RelatedToolCard
                to="/tools/budget-coach"
                title="Budget Coach"
                description="Get a friendlier guided budget score and next-step suggestions."
              />
            </div>
          </section>

          <ShareBar
            variant="bottom"
            label="Share this budget tracker with a friend"
            title="I’m using BuddyMoney’s budget tracker to organize my monthly money plan."
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
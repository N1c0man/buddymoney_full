import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import BudgetTracker from "../tools/BudgetTracker";
import ShareBar from "../components/ShareBar";
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
          text: "A budget tracker helps you organize your income and expenses so you can see where your money goes each month and make better spending decisions."
        }
      },
      {
        "@type": "Question",
        name: "How do I start a monthly budget?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Start by listing your monthly income, fixed bills, variable expenses, savings goals, and debt payments. Then compare total income to total spending."
        }
      },
      {
        "@type": "Question",
        name: "Should I budget and save for an emergency fund at the same time?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, many people use a budget to create room for emergency savings while also covering bills and debt payments."
        }
      }
    ]
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
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-600 mb-2">
              BuddyMoney Tool
            </p>

            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
              Budget Calculator & Budget Tracker
            </h1>

            <p className="mt-3 text-sm md:text-base text-slate-600 max-w-3xl">
              Track your monthly income and expenses, organize spending categories,
              and see where your money is going. This free budget tool is built
              to help you make clearer day-to-day money decisions.
            </p>

            <div className="mt-4 flex flex-wrap gap-3 text-xs">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 border border-emerald-100">
                💰 Monthly budgeting
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 border border-emerald-100">
                Free • No login required
              </span>
            </div>
          </section>

          <ShareBar
            variant="top"
            label="Share this budget tracker with a friend"
            title="I’m using BuddyMoney’s budget tracker to organize my monthly money plan."
          />

          <BudgetTracker />

          <section className="rounded-3xl border border-slate-200 bg-white shadow-sm px-5 py-6 md:px-8 md:py-8 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                How to use this budget tracker
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Start by entering your monthly income and core expenses. Then
                add flexible spending categories, savings, and debt payments so
                you can see whether your budget is balanced.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 border rounded-2xl bg-slate-50">
                <h3 className="font-semibold text-slate-900 mb-2">
                  Include categories like:
                </h3>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Housing and utilities</li>
                  <li>• Groceries and transportation</li>
                  <li>• Insurance and subscriptions</li>
                  <li>• Savings contributions</li>
                  <li>• Debt payments</li>
                </ul>
              </div>

              <div className="p-4 border rounded-2xl bg-slate-50">
                <h3 className="font-semibold text-slate-900 mb-2">
                  A good budget can help you:
                </h3>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Spot overspending quickly</li>
                  <li>• Build an emergency fund</li>
                  <li>• Plan debt payoff</li>
                  <li>• Stay organized each month</li>
                  <li>• Reduce money stress</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Related BuddyMoney tools
              </h2>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                <Link
                  to="/tools/emergency-fund"
                  className="text-emerald-700 font-medium hover:text-emerald-800"
                >
                  Emergency Fund Calculator →
                </Link>
                <Link
                  to="/tools/debt-payoff"
                  className="text-emerald-700 font-medium hover:text-emerald-800"
                >
                  Debt Payoff Calculator →
                </Link>
                <Link
                  to="/coach"
                  className="text-emerald-700 font-medium hover:text-emerald-800"
                >
                  Want more guidance? Try Budget Coach →
                </Link>
              </div>
            </div>
          </section>

          <ShareBar
            variant="bottom"
            label="Share this budget tracker with a friend"
            title="I’m using BuddyMoney’s budget tracker to organize my monthly money plan."
          />
        </div>
      </main>
    </>
  );
}
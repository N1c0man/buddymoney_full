import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { buildUrl } from "../utils/seo";

export default function AppDashboard() {
  const canonicalUrl = buildUrl("/app");

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6">
      <Helmet>
        <title>BuddyMoney App</title>
        <meta name="description" content="Quick access to your favorite BuddyMoney tools." />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      {/* Logo / Header */}
      <div className="text-center mb-6">
        <img
          src="/icons/BMlogo.png"
          alt="BuddyMoney"
          className="h-14 mx-auto mb-2"
        />
        <h1 className="text-xl font-bold text-slate-900">
          Smart Money Tools
        </h1>
        <p className="text-sm text-slate-600">
          Fast, simple tools to manage your money
        </p>
      </div>

      {/* Quick Tools */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-slate-800 mb-3">
          Quick Tools
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <Link
            to="/tools/tip-calculator"
            className="rounded-2xl bg-white p-5 shadow hover:shadow-md transition"
          >
            <div className="text-lg font-semibold">Tip Calculator</div>
            <p className="text-sm text-slate-500 mt-1">
              Calculate tips instantly
            </p>
          </Link>

          <Link
            to="/tools/bill-splitter"
            className="rounded-2xl bg-white p-5 shadow hover:shadow-md transition"
          >
            <div className="text-lg font-semibold">Split a Bill</div>
            <p className="text-sm text-slate-500 mt-1">
              Share costs with friends
            </p>
          </Link>
        </div>
      </div>

      {/* More Tools */}
      <div>
        <h2 className="text-lg font-semibold text-slate-800 mb-3">
          More Tools
        </h2>

        <div className="space-y-3">
          <Link
            to="/coach"
            className="block rounded-xl bg-white p-4 shadow hover:shadow-md transition"
          >
            Budget Coach
          </Link>

          <Link
            to="/tools/debt-payoff"
            className="block rounded-xl bg-white p-4 shadow hover:shadow-md transition"
          >
            Debt Payoff Estimator
          </Link>

          <Link
            to="/mortgage"
            className="block rounded-xl bg-white p-4 shadow hover:shadow-md transition"
          >
            Mortgage Payoff Calculator
          </Link>

          <Link
            to="/credit-cards"
            className="block rounded-xl bg-white p-4 shadow hover:shadow-md transition"
          >
            Credit Card Tools
          </Link>
        </div>
      </div>
    </div>
  );
}
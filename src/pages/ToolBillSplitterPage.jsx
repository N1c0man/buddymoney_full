import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import BillSplitter from "../tools/BillSplitter";
import AppBottomNav from "../components/AppBottomNav";
import { buildUrl } from "../utils/seo";

export default function ToolBillSplitterPage() {
  const canonicalUrl = buildUrl("/tools/bill-splitter");

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-4 pb-24 sm:py-6">
      <Helmet>
        <title>Bill Splitter & Tip Calculator | BuddyMoney</title>

        <meta
          name="description"
          content="Split a bill, add a tip, and see what each person owes with BuddyMoney's free bill splitter and tip calculator."
        />

        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <main className="mx-auto w-full max-w-3xl">
        <BillSplitter />

        <section className="mt-6 rounded-3xl border border-indigo-100 bg-indigo-50 p-5 shadow-sm">
          <p className="text-sm font-semibold text-indigo-700">
            Smart money move
          </p>

          <h2 className="mt-2 text-xl font-bold text-slate-900">
            Dining out often?
          </h2>

          <p className="mt-2 text-sm text-slate-700">
            If restaurants, takeout, or group meals are part of your regular
            spending, the right rewards card may help you earn more value from
            money you already spend.
          </p>

          <Link
            to="/tools/credit-cards"
            className="mt-4 inline-flex rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Find cards for dining rewards
          </Link>

          <p className="mt-3 text-xs text-slate-500">
            Rewards are only helpful when balances are paid responsibly.
            BuddyMoney may earn a commission from some card partners.
          </p>
        </section>
      </main>

      <AppBottomNav />
    </div>
  );
}
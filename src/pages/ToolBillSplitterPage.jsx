import React from "react";
import { Helmet } from "react-helmet";
import BillSplitter from "../tools/BillSplitter";
import { buildUrl } from "../utils/seo";
import { Link } from "react-router-dom";

export default function ToolBillSplitterPage() {
  const canonicalUrl = buildUrl("/tools/bill-splitter");

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <Helmet>
        <title>Bill Splitter | BuddyMoney</title>
        <meta
          name="description"
          content="Split a bill quickly with BuddyMoney's free bill splitter tool."
        />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <main className="mx-auto max-w-3xl">
        <section className="text-center mb-6">
          <p className="text-sm font-semibold text-sky-600 uppercase tracking-wide">
            BuddyMoney Tool
          </p>
          <h1 className="text-3xl font-bold text-slate-900 mt-2">
            Bill Splitter
          </h1>
          <p className="text-slate-600 mt-2">
            Split a bill with friends, family, or coworkers in seconds.
          </p>
        </section>

        <BillSplitter />

        <div className="mt-5 text-center">
          <Link
            to="/tools/tip-calculator"
            className="text-sm font-semibold text-sky-700 hover:text-sky-900"
          >
            Just need a quick tip? Open Tip Calculator →
          </Link>
        </div>
      </main>
    </div>
  );
}
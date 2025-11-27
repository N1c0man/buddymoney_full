// src/components/RelatedCreditCardGuides.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function RelatedCreditCardGuides() {
  return (
    <section
      aria-labelledby="related-credit-card-guides-heading"
      className="mt-10 rounded-3xl border border-emerald-100 bg-emerald-50/70 px-5 py-5 shadow-sm"
    >
      <p className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
        Credit Card Guides
        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
          New
        </span>
      </p>

      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
        <h2
          id="related-credit-card-guides-heading"
          className="text-base font-semibold text-slate-900"
        >
          Popular BuddyMoney credit card guides
        </h2>
        <p className="text-[12px] text-slate-600 max-w-sm">
          Learn how different cards work, then use the{" "}
          <Link
            to="/tools/credit-cards"
            className="font-semibold text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
          >
            Credit Card Finder
          </Link>{" "}
          to explore them in tool form.
        </p>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <article className="rounded-2xl bg-white/90 px-4 py-3 text-sm text-slate-800 border border-emerald-100">
          <Link
            to="/credit-cards/cash-back"
            className="font-semibold text-slate-900 hover:text-emerald-700"
          >
            Best cash back credit cards (preview)
          </Link>
          <p className="mt-1 text-[12px] text-slate-600">
            See how flat 2% cards compare to grocery, gas, and everyday cash
            back setups.
          </p>
        </article>

        <article className="rounded-2xl bg-white/90 px-4 py-3 text-sm text-slate-800 border border-emerald-100">
          <Link
            to="/credit-cards/bad-credit"
            className="font-semibold text-slate-900 hover:text-emerald-700"
          >
            Best cards for bad or rebuilding credit (preview)
          </Link>
          <p className="mt-1 text-[12px] text-slate-600">
            Understand secured cards, deposits, and how to use them as a
            stepping stone.
          </p>
        </article>

        <article className="rounded-2xl bg-white/90 px-4 py-3 text-sm text-slate-800 border border-emerald-100">
          <Link
            to="/credit-cards/travel"
            className="font-semibold text-slate-900 hover:text-emerald-700"
          >
            Best travel credit cards (preview)
          </Link>
          <p className="mt-1 text-[12px] text-slate-600">
            Learn the difference between flexible points, airline cards, and
            no-fee travel options.
          </p>
        </article>

        <article className="rounded-2xl bg-white/90 px-4 py-3 text-sm text-slate-800 border border-emerald-100">
          <Link
            to="/credit-cards/0-apr"
            className="font-semibold text-slate-900 hover:text-emerald-700"
          >
            Best 0% / intro APR cards (preview)
          </Link>
          <p className="mt-1 text-[12px] text-slate-600">
            See how balance transfer and purchase-only 0% intro offers typically
            work.
          </p>
        </article>

        <article className="rounded-2xl bg-white/90 px-4 py-3 text-sm text-slate-800 border border-emerald-100 sm:col-span-2">
          <Link
            to="/credit-cards/student"
            className="font-semibold text-slate-900 hover:text-emerald-700"
          >
            Best student credit cards (preview)
          </Link>
          <p className="mt-1 text-[12px] text-slate-600">
            Explore student-focused cards that help build credit with rewards
            built around real student spending.
          </p>
        </article>
      </div>
    </section>
  );
}

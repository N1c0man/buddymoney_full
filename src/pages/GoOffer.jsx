import React from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { AFFILIATES } from "../config/affiliates";

export default function GoOffer() {
  const { key } = useParams(); // /go/:key
  const a = AFFILIATES[key];

  if (!a) {
    return (
      <main className="pt-6 pb-16 bg-brand-50/40">
        <div className="max-w-3xl mx-auto px-4">
          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6">
            <h1 className="text-xl font-bold text-slate-900 mb-2">
              Offer not found
            </h1>
            <p className="text-sm text-slate-600 mb-4">
              Sorry — we couldn’t find that affiliate page.
            </p>
            <Link
              to="/"
              className="text-sm font-semibold text-emerald-700 hover:underline"
            >
              ← Back to BuddyMoney
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const headline = a.headline || `Learn more about ${a.brand}`;
  const subheadline = a.subheadline || "Here’s why BuddyMoney recommends it.";
  const bullets = Array.isArray(a.bullets) ? a.bullets : [];
  const bestFor = Array.isArray(a.bestFor) ? a.bestFor : [];
  const disclosure =
    a.disclosure ||
    "Affiliate disclosure: This link may earn BuddyMoney a commission at no extra cost to you.";

  return (
    <main className="pt-6 pb-16 bg-brand-50/40">
      <Helmet>
        <title>{`${a.brand} | BuddyMoney Recommended`}</title>
        <meta
          name="description"
          content={
            a.metaDescription ||
            `${a.brand} recommended by BuddyMoney. Learn why it may help you.`
          }
        />
        <meta name="robots" content="noindex,follow" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4">
        <div className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-brand-50 via-emerald-50 to-accent-100/70 shadow-soft overflow-hidden">
          <div className="p-6 md:p-8">
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-emerald-600">
              BuddyMoney Recommendation
            </p>

            <h1 className="mt-2 text-2xl md:text-3xl font-extrabold text-brand-900 leading-tight">
              {headline}
            </h1>

            <p className="mt-3 text-sm md:text-base text-brand-800/80 max-w-2xl">
              {subheadline}
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={a.outboundUrl || "#"}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 hover:shadow-md transition"
                aria-label={`${a.ctaText || `Visit ${a.brand}`} (affiliate link)`}
              >
                👉 {a.ctaText || `Visit ${a.brand}`}
              </a>

              <Link
                to="/tools"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-5 py-2.5 text-sm font-semibold text-emerald-700 hover:bg-white transition"
              >
                Explore BuddyMoney tools →
              </Link>
            </div>
<p className="mt-2 text-xs text-emerald-800/80">
  Takes a few minutes. No impact to your credit score.
</p>

            <p className="mt-4 text-xs text-emerald-800/90 italic">
              {disclosure}
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-slate-200 bg-white shadow-sm p-6 md:p-8">
          <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-500 mb-3">
            Why this can help
          </h2>

          {bullets.length > 0 ? (
            <ul className="grid gap-2 text-sm text-slate-700 list-disc pl-5">
              {bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-600">
              BuddyMoney recommends this because it’s simple, practical, and
              helps you see your progress clearly.
            </p>
          )}

          {bestFor.length > 0 && (
            <>
              <h3 className="mt-6 text-xs font-semibold tracking-[0.2em] uppercase text-slate-500 mb-3">
                Best for
              </h3>
              <ul className="grid gap-2 text-sm text-slate-700 list-disc pl-5">
                {bestFor.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

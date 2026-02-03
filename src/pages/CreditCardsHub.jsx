// src/pages/CreditCardsHub.jsx
import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import ShareBar from "../components/ShareBar";
import { setCanonical } from "../utils/seo"; //

const HUB_ITEMS = [
  {
    id: "finder",
    label: "Tool",
    title: "Credit Card Finder (Preview)",
    path: "/tools/credit-cards",
    badge: "Start here",
    description:
      "Filter sample cards by credit score, type, and annual fee. Compare a few side by side and get a feel for what’s out there.",
    highlight: "Preview cards • No credit score impact",
    tone: "tool",
  },
  {
    id: "bad-credit",
    label: "Guide",
    title: "Best Secured & Starter Cards for Bad or Fair Credit",
    path: "/credit-cards/bad-credit",
    badge: "Rebuilding credit",
    description:
      "See options designed for rebuilding or establishing credit, plus tips to avoid common traps with high-fee cards.",
    highlight: "Secured & starter cards explained",
    tone: "warm",
  },
  {
    id: "travel",
    label: "Guide",
    title: "Best Travel Credit Cards",
    path: "/credit-cards/travel",
    badge: "Travel & miles",
    description:
      "Compare cards that earn miles or points on travel and dining, with guidance on when annual fees make sense.",
    highlight: "Miles, points & no foreign transaction fees",
    tone: "cool",
  },
  {
    id: "intro-apr",
    label: "Guide",
    title: "Best 0% Intro APR & Balance Transfer Cards",
    path: "/credit-cards/0-apr",
    badge: "Debt strategy",
    description:
      "Learn how intro APR and balance transfer offers work, and when using them can help you pay down balances faster.",
    highlight: "Long 0% intro periods & key fine print",
    tone: "neutral",
  },
  {
    id: "student",
    label: "Guide",
    title: "Best Student Credit Cards",
    path: "/credit-cards/student",
    badge: "Students & first cards",
    description:
      "Find cards built for students and first-time cardholders, with rewards on everyday spending and credit-building tips.",
    highlight: "First card guidance for students",
    tone: "warm",
  },
];

export default function CreditCardsHub() {
  // Canonical for /credit-cards
  useEffect(() => {
    setCanonical("/credit-cards");
  }, []);

  // existing scroll-to-top effect
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const pageTitle =
    "Credit Card Guides (2026): Compare Cards for Bad Credit, Travel & 0% APR | BuddyMoney";
  const pageDescription =
    "Compare credit cards with beginner-friendly guides and a simple preview finder. Explore secured credit cards for bad or fair credit, travel rewards cards, and 0% intro APR / balance transfer options.";

  const schemaOrg = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": ["CollectionPage", "WebPage"],
      name: "Credit Card Guides (2026): Compare Cards for Bad Credit, Travel & 0% APR",
      url: "https://buddymoney.com/credit-cards",
      description: pageDescription,
      isAccessibleForFree: true,
      mainEntity: {
        "@type": "ItemList",
        itemListElement: HUB_ITEMS.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "WebPage",
            name: item.title,
            url: `https://buddymoney.com${item.path}`,
            description: item.description,
          },
        })),
      },
    };
  }, [pageDescription]);

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content="https://buddymoney.com/credit-cards" />
        <meta
          property="og:image"
          content="https://buddymoney.com/icons/buddymoney-og-default.png"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta
          name="twitter:image"
          content="https://buddymoney.com/icons/buddymoney-og-default.png"
        />

        {/* JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(schemaOrg)}
        </script>
      </Helmet>

      <main className="min-h-screen bg-gradient-to-b from-green-50 via-white to-emerald-50/40 pb-16 pt-4">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-6">
          {/* HERO */}
          <section className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-br from-brand-50 via-emerald-50 to-accent-100/70 shadow-soft h-[220px] md:h-[260px] lg:h-[300px]">
            <img
              src="/icons/hero-credit-cards-hub.png"
              alt="BuddyMoney credit card hub hero image"
              className="absolute inset-0 h-full w-full object-cover object-right"
              loading="eager"
            />

            <div className="absolute inset-0 bg-white/35 md:bg-white/20" />

            <div className="pointer-events-none absolute -top-24 -right-10 h-64 w-64 rounded-full bg-emerald-200/50 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-8 h-64 w-64 rounded-full bg-sky-200/50 blur-3xl" />

            <div className="relative px-5 py-6 md:px-8 md:py-7 h-full flex items-center">
              <div className="relative grid gap-6 md:grid-cols-[minmax(0,1.8fr)_minmax(0,1.2fr)] items-center w-full">
                <div className="space-y-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
                    BuddyMoney Credit Card Hub
                  </p>
                  <p className="mt-2 text-[12px] text-slate-700">
                    New to credit? Start here:{" "}
                    <Link
                      to="/blog/best-secured-credit-cards"
                      className="font-semibold text-emerald-700 underline underline-offset-2"
                    >
                      Best secured credit cards (2026)
                    </Link>
                  </p>

                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-brand-900 leading-tight">
                    Compare credit cards (secured, bad credit, travel & 0% APR) — all in one place.
                  </h1>

                  <p className="text-sm md:text-base text-brand-900/90 max-w-xl backdrop-blur-[1px]">
                    Start with a guide that matches your goal—rebuilding credit with secured cards,
                    earning rewards for travel, or using 0% intro APR to pay down balances. Plain
                    English, no jargon.
                  </p>


                  <ul className="mt-2 text-[12px] text-brand-800 space-y-1">
                    <li>✔ First-time card applicants</li>
                    <li>✔ Rebuilding or improving credit</li>
                    <li>✔ Comparing cards before applying</li>
                  </ul>

                  <div className="flex flex-wrap gap-2 text-[11px] mt-2">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-emerald-700 border border-emerald-100 shadow-sm">
                      🧭 Guides + a preview finder tool
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-slate-700 border border-slate-100 shadow-sm">
                      ✅ Fees, APR, rewards—explained simply
                    </span>
                  </div>
                </div>

                <div className="hidden md:block">
                  <div className="rounded-2xl bg-white/95 backdrop-blur-sm border border-emerald-100 shadow-soft px-5 py-4 text-sm text-slate-800 space-y-3">
                    <p className="text-xs font-semibold text-slate-700">
                      How to use this hub
                    </p>
                    <ol className="ml-4 list-decimal space-y-1 text-[12px]">
                      <li>Pick the guide that matches your current goal.</li>
                      <li>
                        Learn what to watch out for (fees, APRs, fine print).
                      </li>
                      <li>Use the finder to explore sample card lineups.</li>
                    </ol>
                    <p className="text-[11px] text-slate-500">
                      As partner offers go live, this hub becomes where education
                      and real card options meet.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Affiliate disclosure */}
          <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 px-4 py-3 text-[11px] text-emerald-900">
            <strong>Disclosure:</strong> BuddyMoney may earn compensation from
            partners when you click certain links or apply for products. This
            does not affect how we explain cards or tools. We focus on clarity,
            not commissions.
          </div>

          {/* Top share bar */}
          <ShareBar
            variant="top"
            label="Share this credit card hub with someone comparing cards"
            title="I’m using BuddyMoney’s credit card hub to understand my options before I apply."
          />

          {/* GRID */}
          <section className="rounded-3xl border border-slate-200 bg-white shadow-sm px-4 py-6 md:px-6 md:py-8 space-y-5">
            <header>
              <h2 className="text-sm font-semibold text-slate-900">
                Credit card guides & tools
              </h2>
              <p className="text-[11px] text-slate-500">
                Start with a guide, then use the finder when you&apos;re ready to
                explore specific cards.
              </p>
            </header>

            <div className="grid gap-4 md:grid-cols-2">
              {HUB_ITEMS.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`group relative flex flex-col justify-between rounded-2xl border px-4 py-4 shadow-sm transition
                    ${
                      item.id === "finder"
                        ? "border-emerald-400 bg-emerald-50/60 hover:bg-white"
                        : "border-slate-200 bg-slate-50/80 hover:border-emerald-400 hover:bg-white"
                    }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                        {item.label}
                      </p>
                      <h3 className="mt-1 text-sm font-semibold text-slate-900 group-hover:text-emerald-700">
                        {item.title}
                      </h3>
                    </div>
                    <span className="rounded-full bg-emerald-600 text-[10px] font-semibold text-white px-2.5 py-0.5 shadow-sm">
                      {item.badge}
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-slate-700">
                    {item.description}
                  </p>

                  {item.highlight && (
                    <p className="mt-3 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-medium text-emerald-800">
                      ⭐ {item.highlight}
                    </p>
                  )}

                  <span className="mt-2 inline-flex items-center text-[10px] text-slate-500">
                    Offers shown when available • Always review issuer terms
                  </span>

                  <span className="mt-3 inline-flex items-center text-[11px] font-semibold text-emerald-700">
                    Open{" "}
                    <span className="ml-1 transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </span>
                </Link>
              ))}
            </div>

            <p className="mt-4 text-[11px] text-slate-500">
              All content in this hub is for education only and is not financial
              advice. When live offers are available, always review the official
              issuer terms before applying.
            </p>
          </section>

          {/* Bottom share bar */}
          <ShareBar
            variant="bottom"
            label="Share this credit card hub with someone comparing cards"
            title="I’m using BuddyMoney’s credit card hub to learn about cards before I apply."
          />
        </div>
      </main>
    </>
  );
}

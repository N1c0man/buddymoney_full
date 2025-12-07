// src/pages/CreditCardsHub.jsx
import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import ShareBar from "../components/ShareBar";

const HUB_ITEMS = [
  {
    id: "finder",
    label: "Tool",
    title: "Credit Card Finder (Preview)",
    path: "/tools/credit-cards",
    badge: "Start here",
    description:
      "Filter sample cards by credit score, type, and annual fee. Compare a few side by side and get a feel for what’s out there.",
    highlight: "Interactive tool • Compare up to 3 cards",
    tone: "tool",
  },
  {
    id: "bad-credit",
    label: "Guide",
    title: "Best Credit Cards for Bad or Fair Credit",
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
  // If you later add a secured-only guide, you can slot it here.
];

export default function CreditCardsHub() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const pageTitle = "Credit Card Guides & Finder Hub | BuddyMoney";
  const pageDescription =
    "Explore BuddyMoney’s credit card guides and preview credit card finder. Learn about cards for bad credit, travel, 0% intro APR, and students—all in one place.";

  const schemaOrg = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Credit Card Guides & Finder Hub",
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
        <link rel="canonical" href="https://buddymoney.com/credit-cards" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta
          property="og:url"
          content="https://buddymoney.com/credit-cards"
        />
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
          <section className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-br from-brand-50 via-emerald-50 to-accent-100/70 px-5 py-7 md:px-8 md:py-9 shadow-soft">
            {/* soft blobs */}
            <div className="pointer-events-none absolute -top-24 -right-10 h-64 w-64 rounded-full bg-emerald-200/50 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-8 h-64 w-64 rounded-full bg-sky-200/50 blur-3xl" />

            <div className="relative grid gap-6 md:grid-cols-[minmax(0,1.7fr)_minmax(0,1.3fr)] items-center">
              <div className="space-y-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
                  BuddyMoney Credit Card Hub
                </p>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-brand-900 leading-tight">
                  One place for all your credit card research.
                </h1>
                <p className="text-sm md:text-base text-brand-800/85 max-w-xl">
                  Start with a high-level guide or jump straight into the
                  interactive finder. Everything here is written in plain
                  English, so you can understand how each type of card fits into
                  your bigger money plan.
                </p>
                <ul className="ml-4 list-disc text-[12px] text-slate-700 space-y-1">
                  <li>
                    Guides for bad credit, travel, 0% intro APR, and student
                    cards.
                  </li>
                  <li>
                    A preview credit card finder tool to explore sample card
                    lineups.
                  </li>
                  <li>
                    Education-first. No hype, no pressure—just information to
                    help you choose calmly.
                  </li>
                </ul>
              </div>

              <div className="relative">
                <div className="rounded-2xl bg-white/95 backdrop-blur-sm border border-emerald-100 shadow-soft px-5 py-4 text-sm text-slate-800 space-y-3">
                  <p className="text-xs font-semibold text-slate-700">
                    How to use this hub
                  </p>
                  <ol className="ml-4 list-decimal space-y-1 text-[12px]">
                    <li>Pick the guide that matches your current goal.</li>
                    <li>
                      Learn what to watch out for (fees, APRs, teaser offers).
                    </li>
                    <li>
                      When you&apos;re ready, use the finder to explore card
                      options.
                    </li>
                  </ol>
                  <p className="text-[11px] text-slate-500">
                    As partner offers go live, this hub will become the central
                    place where education and live card options meet.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Top share bar */}
          <ShareBar
            variant="top"
            label="Share this compare credit card tool with a friend"
            title="I’m using BuddyMoney’s credit card hub to understand my options before I apply."
          />

          {/* GRID OF GUIDES + TOOL */}
          <section className="rounded-3xl border border-slate-200 bg-white shadow-sm px-4 py-6 md:px-6 md:py-8 space-y-5">
            <header className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  Credit card guides & tools
                </h2>
                <p className="text-[11px] text-slate-500">
                  Start with a guide, then use the finder when you&apos;re ready
                  to explore specific cards.
                </p>
              </div>
            </header>

            <div className="grid gap-4 md:grid-cols-2">
              {HUB_ITEMS.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-4 shadow-sm transition hover:border-emerald-400 hover:bg:white"
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
                      <span aria-hidden="true">⭐</span>
                      <span>{item.highlight}</span>
                    </p>
                  )}

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
            label="Share this compare credit card tool with a friend"
            title="I’m using BuddyMoney’s credit card hub to learn about cards before I apply."
          />
        </div>
      </main>
    </>
  );
}

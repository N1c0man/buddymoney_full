// src/pages/CreditCardsHub.jsx
import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import ShareBar from "../components/ShareBar";
import { setCanonical } from "../utils/seo";

const HUB_ITEMS = [
  {
    id: "finder",
    label: "Tool",
    title: "Credit Card Finder",
    path: "/tools/credit-cards",
    badge: "Start here",
    description:
      "Explore credit cards by type, annual fee, and credit profile. Compare a few side by side and get a feel for what features matter most.",
    highlight: "Compare card types with beginner-friendly filters",
    tone: "tool",
  },
  {
    id: "bad-credit",
    label: "Guide",
    title: "Best Credit Cards for Bad or Rebuilding Credit",
    path: "/credit-cards/bad-credit",
    badge: "Rebuilding credit",
    description:
      "See options designed for rebuilding or establishing credit, plus tips to avoid common traps with high-fee cards.",
    highlight: "Secured and rebuilding options explained simply",
    tone: "warm",
  },
  {
    id: "cash-back",
    label: "Guide",
    title: "Best Cash Back Credit Cards",
    path: "/credit-cards/cash-back",
    badge: "Everyday rewards",
    description:
      "Compare flat-rate and category rewards cards and learn how to choose a cash back card that fits your real spending habits.",
    highlight: "Flat-rate vs. category rewards made clear",
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
    highlight: "Miles, points, perks, and foreign fees explained",
    tone: "cool",
  },
  {
    id: "intro-apr",
    label: "Guide",
    title: "Best 0% Intro APR Credit Cards",
    path: "/credit-cards/0-apr",
    badge: "Debt strategy",
    description:
      "Learn how intro APR and balance transfer offers work, and when using them can help you pay down balances faster.",
    highlight: "0% intro periods, transfer fees, and payoff strategy",
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
    highlight: "First-card guidance for students and thin credit files",
    tone: "warm",
  },
];

export default function CreditCardsHub() {
  useEffect(() => {
    setCanonical("/credit-cards");
    window.scrollTo(0, 0);
  }, []);

  const pageTitle =
    "Credit Card Guides (2026): Compare Cards for Bad Credit, Cash Back, Travel & 0% APR | BuddyMoney";
  const pageDescription =
    "Compare credit cards with beginner-friendly guides and a simple credit card finder. Explore cards for bad or rebuilding credit, cash back rewards, travel rewards, student cards, and 0% intro APR offers.";

  const schemaOrg = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": ["CollectionPage", "WebPage"],
      name: "Credit Card Guides (2026): Compare Cards for Bad Credit, Cash Back, Travel & 0% APR",
      url: "https://www.buddymoney.com/credit-cards",
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
            url: `https://www.buddymoney.com${item.path}`,
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
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://www.buddymoney.com/credit-cards" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta
          property="og:url"
          content="https://www.buddymoney.com/credit-cards"
        />
        <meta
          property="og:image"
          content="https://www.buddymoney.com/icons/buddymoney-og-default.png"
        />
        <meta property="og:site_name" content="BuddyMoney" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta
          name="twitter:image"
          content="https://www.buddymoney.com/icons/buddymoney-og-default.png"
        />

        <script type="application/ld+json">
          {JSON.stringify(schemaOrg)}
        </script>
      </Helmet>

      <main className="min-h-screen bg-gradient-to-b from-green-50 via-white to-emerald-50/40 pb-16 pt-4">
        <div className="mx-auto max-w-6xl space-y-6 px-4 sm:px-6 lg:px-8">
          <section className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-soft">
            <div className="relative min-h-[360px] md:min-h-[420px]">
              <img
                src="/icons/hero-credit-cards-hub.png"
                alt="BuddyMoney credit card hub hero image"
                className="absolute inset-0 h-full w-full object-cover object-center"
                loading="eager"
              />

              <div className="absolute inset-0 bg-white/45 md:bg-white/35" />
              <div className="pointer-events-none absolute inset-y-0 left-0 w-full bg-gradient-to-r from-white/88 via-white/70 to-white/10 md:w-[72%]" />

              <div className="relative z-10 flex min-h-[360px] items-center px-5 py-8 md:min-h-[420px] md:px-8 lg:px-10">
                <div className="max-w-2xl rounded-3xl bg-white/78 p-5 shadow-sm backdrop-blur-[2px] md:p-7">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
                    BuddyMoney Credit Card Hub
                  </p>

                  <p className="mt-2 text-[12px] text-slate-700">
                    New to credit? Start here:{" "}
                    <Link
                      to="/blog/best-secured-credit-cards/"
                      className="font-semibold text-emerald-700 underline underline-offset-2"
                    >
                      Best secured credit cards (2026)
                    </Link>
                  </p>

                  <h1 className="mt-3 text-3xl font-extrabold leading-tight text-brand-900 md:text-4xl">
                    Compare credit cards for rebuilding credit, cash back,
                    travel, 0% APR, and first-time applicants.
                  </h1>

                  <p className="mt-4 max-w-xl text-sm text-brand-900/90 md:text-base">
                    Use BuddyMoney’s credit card hub to learn the basics before
                    you apply. Explore beginner-friendly guides, compare common
                    card categories, and use our credit card finder to
                    understand how credit profile, annual fee, rewards, and
                    intro APR offers can affect your options.
                  </p>

                  <ul className="mt-4 space-y-1 text-[12px] text-brand-800">
                    <li>✔ First-time card applicants</li>
                    <li>✔ Rebuilding or improving credit</li>
                    <li>✔ Comparing realistic options before applying</li>
                  </ul>

                  <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
                    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white/90 px-3 py-1 text-emerald-700 shadow-sm">
                      🧭 Guides + credit card finder tool
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-100 bg-white/90 px-3 py-1 text-slate-700 shadow-sm">
                      ✅ Fees, APR, and rewards explained simply
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 px-4 py-3 text-[11px] text-emerald-900">
              <strong>Disclosure:</strong> BuddyMoney may earn compensation from
              partners when you click certain links or apply for products. This
              does not affect how we explain cards or tools. We focus on clarity,
              not commissions. <div className="mt-4 rounded-2xl border border-emerald-200 bg-white px-4 py-4 shadow-sm">
  <div className="flex items-start justify-between gap-3">
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
        Featured Card
      </p>
      <h3 className="mt-1 text-sm font-semibold text-slate-900">
        Featured beginner-friendly card placement
      </h3>
    </div>

    <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
      Reserved space
    </span>
  </div>
  <p className="mt-3 text-[13px] text-slate-700">
    This area is reserved for a featured credit card offer, beginner pick, or
    partner spotlight. It sits near the top of the hub so visitors can quickly
    see a recommended option before browsing the full guide list.
  </p>

  <ul className="mt-3 ml-4 list-disc space-y-1 text-[12px] text-slate-700">
    <li>Good placement for a future featured offer</li>
    <li>Works well for a beginner or rebuilding-credit pick</li>
    <li>Easy to swap later without changing the page layout</li>
  </ul>

  <div className="mt-4 flex flex-wrap gap-2">
    <Link
      to="/tools/credit-cards"
      className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-emerald-700"
    >
      Compare Cards
    </Link>

    <Link
      to="/credit-cards/bad-credit"
      className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
    >
      See Beginner Options
    </Link>
  </div>

  <p className="mt-3 text-[11px] text-slate-500">
    Placeholder block for now. Replace with a live featured card or partner
    offer later.
  </p>
</div>
            </div>
            
            <div className="rounded-2xl border border-emerald-100 bg-white px-5 py-4 text-sm text-slate-800 shadow-sm">
              <p className="text-xs font-semibold text-slate-700">
                How to use this hub
              </p>
              <ol className="ml-4 mt-2 list-decimal space-y-1 text-[12px]">
                <li>Pick the guide that matches your current goal.</li>
                <li>Learn what to watch for: fees, APRs, and fine print.</li>
                <li>Use the finder to compare categories and card features.</li>
              </ol>
              <p className="mt-3 text-[11px] text-slate-500">
                This hub is built to connect education, comparison tools, and
                smarter next steps before you apply.
              </p>
            </div>
          </section>

          <ShareBar
            variant="top"
            label="Share this credit card hub with someone comparing cards"
            title="I’m using BuddyMoney’s credit card hub to understand my options before I apply."
          />

          <section className="space-y-5 rounded-3xl border border-slate-200 bg-white px-4 py-6 shadow-sm md:px-6 md:py-8">
            <header>
              <h2 className="text-sm font-semibold text-slate-900">
                Credit card guides & tools
              </h2>
              <p className="text-[11px] text-slate-500">
                Start with a guide, then use the finder when you are ready to
                compare categories and features more closely.
              </p>
            </header>

            <div className="grid gap-4 md:grid-cols-2">
              {HUB_ITEMS.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`group relative flex flex-col justify-between rounded-2xl border px-4 py-4 shadow-sm transition ${
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
                    <span className="rounded-full bg-emerald-600 px-2.5 py-0.5 text-[10px] font-semibold text-white shadow-sm">
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
                    Educational content • Always review issuer terms
                  </span>

                  <span className="mt-3 inline-flex items-center text-[11px] font-semibold text-emerald-700">
                    Open
                    <span className="ml-1 transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <section className="space-y-4 rounded-3xl border border-slate-200 bg-white px-4 py-6 shadow-sm md:px-6 md:py-8">
            <h2 className="text-lg font-bold text-slate-900">
              How to choose a credit card without getting overwhelmed
            </h2>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4">
                <h3 className="mb-2 text-sm font-semibold text-slate-900">
                  Start with your goal
                </h3>
                <p className="text-xs text-slate-700">
                  Some people need a first card to build credit. Others want to
                  earn travel rewards, collect cash back, or transfer a balance
                  to a 0% intro APR card. The right card depends on what you are
                  trying to do first.
                </p>
              </div>

              <div className="rounded-2xl border border-sky-100 bg-sky-50/50 p-4">
                <h3 className="mb-2 text-sm font-semibold text-slate-900">
                  Watch the fee and APR details
                </h3>
                <p className="text-xs text-slate-700">
                  Rewards can look attractive, but annual fees, balance transfer
                  fees, penalty APRs, foreign transaction fees, and interest
                  charges matter just as much. Always review the issuer terms
                  before applying.
                </p>
              </div>

              <div className="rounded-2xl border border-amber-100 bg-amber-50/50 p-4">
                <h3 className="mb-2 text-sm font-semibold text-slate-900">
                  Compare before you apply
                </h3>
                <p className="text-xs text-slate-700">
                  Applying for multiple cards too quickly can make things messy.
                  It is usually better to compare a few realistic options, read
                  the fine print, and apply only when the card truly fits your
                  situation.
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-600">
              Looking for a practical starting point? Try the{" "}
              <Link
                to="/tools/credit-cards"
                className="font-semibold text-emerald-700 underline underline-offset-2"
              >
                Credit Card Finder
              </Link>{" "}
              or read our{" "}
              <Link
                to="/blog/best-secured-credit-cards/"
                className="font-semibold text-emerald-700 underline underline-offset-2"
              >
                secured credit cards guide
              </Link>{" "}
              for first-time and rebuilding-credit options.
            </p>
          </section>

          <section className="space-y-4 rounded-3xl border border-slate-200 bg-white px-4 py-6 shadow-sm md:px-6 md:py-8">
            <h2 className="text-lg font-bold text-slate-900">
              Tools that support smarter credit card choices
            </h2>

            <div className="grid gap-3 md:grid-cols-2">
              <Link
                to="/tools/credit-cards"
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-emerald-200 hover:bg-emerald-50"
              >
                <span className="block font-semibold text-slate-900">
                  Credit Card Finder
                </span>
                <span className="mt-1 block text-[13px] text-slate-600">
                  Compare card types, annual fees, and beginner-friendly
                  features in one place.
                </span>
              </Link>

              <Link
                to="/tools/budget-tracker"
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-emerald-200 hover:bg-emerald-50"
              >
                <span className="block font-semibold text-slate-900">
                  Budget Tracker
                </span>
                <span className="mt-1 block text-[13px] text-slate-600">
                  Match your spending habits to the kind of card that actually
                  fits your budget.
                </span>
              </Link>

              <Link
                to="/tools/debt-payoff"
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-emerald-200 hover:bg-emerald-50"
              >
                <span className="block font-semibold text-slate-900">
                  Debt Payoff Calculator
                </span>
                <span className="mt-1 block text-[13px] text-slate-600">
                  Helpful if you are comparing 0% APR offers against an existing
                  payoff strategy.
                </span>
              </Link>

              <Link
                to="/tools/emergency-fund"
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-emerald-200 hover:bg-emerald-50"
              >
                <span className="block font-semibold text-slate-900">
                  Emergency Fund Tool
                </span>
                <span className="mt-1 block text-[13px] text-slate-600">
                  Build a cash buffer so your credit card stays a tool instead
                  of a fallback.
                </span>
              </Link>
            </div>
          </section>

          <p className="text-center text-[11px] text-slate-500">
            All content in this hub is for education only and is not financial
            advice. When live offers are available, always review the official
            issuer terms before applying.
          </p>

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
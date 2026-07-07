// src/pages/CreditCardsHub.jsx
import React, { useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import ShareBar from "../components/ShareBar";
import { setCanonical } from "../utils/seo";

const HUB_ITEMS = [
  {
    id: "finder",
    label: "Tool",
    title: "Credit Card Finder",
    path: "/credit-cards/finder",
    badge: "Start here",
    description:
      "Explore credit cards by type, annual fee, and credit profile. Compare a few side by side and get a feel for what features matter most.",
    highlight: "Compare card types with beginner-friendly filters",
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
  },
];

const FAQ_ITEMS = [
  {
    question: "What is a secured credit card?",
    answer:
      "A secured credit card requires a refundable security deposit and is often used by people who are building credit for the first time or rebuilding after credit problems.",
  },
  {
    question: "Can a secured credit card help build credit?",
    answer:
      "Yes. If the card reports to the major credit bureaus, on-time payments and low balances can help build a stronger credit history over time.",
  },
  {
    question: "What credit card should beginners consider first?",
    answer:
      "Many beginners start with a secured card, student card, or starter card with low fees. The right option depends on your credit profile, spending habits, and ability to pay the balance on time.",
  },
  {
    question: "Are 0% intro APR credit cards good for debt payoff?",
    answer:
      "They can help if you have a clear payoff plan before the intro period ends. Always check balance transfer fees, the regular APR, and the final payoff date.",
  },
  {
    question: "Should I choose rewards or low fees?",
    answer:
      "For many beginners, low fees and responsible credit-building matter more than rewards. Rewards are helpful only if you pay the balance in full and avoid interest.",
  },
];

const INTENT_CONTENT = {
  dining: {
    eyebrow: "Dining Rewards",
    title: "Earn rewards on dining, takeout, coffee runs, and everyday spending.",
    description:
      "Coming from the tip calculator? Start with cards that may reward restaurant, takeout, and everyday purchases so your normal spending can work harder.",
    primaryCta: "See dining rewards cards →",
    secondaryCta: "Compare cash back cards →",
    secondaryPath: "/credit-cards/cash-back",
  },
  "low-interest": {
    eyebrow: "Lower Interest Strategy",
    title: "Compare 0% intro APR and low-interest card options.",
    description:
      "Coming from the debt payoff calculator? Focus on cards that may help reduce interest costs, especially if you have a clear payoff plan before the intro period ends.",
    primaryCta: "See low-interest options →",
    secondaryCta: "Learn about 0% APR cards →",
    secondaryPath: "/credit-cards/0-apr",
  },
  rewards: {
    eyebrow: "Rewards Match",
    title: "Maximize rewards on the spending you already do.",
    description:
      "Coming from the budget tracker? Look for cards that match your real monthly spending categories like groceries, gas, dining, travel, or everyday bills.",
    primaryCta: "Compare rewards cards →",
    secondaryCta: "See cash back cards →",
    secondaryPath: "/credit-cards/cash-back",
  },
  backup: {
    eyebrow: "Emergency Backup",
    title: "Find a practical card option to support your safety net.",
    description:
      "Coming from the emergency fund calculator? A credit card should not replace savings, but the right card may provide flexibility while you build your cash cushion.",
    primaryCta: "Compare flexible card options →",
    secondaryCta: "Build your emergency fund →",
    secondaryPath: "/tools/emergency-fund",
  },
  lifestyle: {
    eyebrow: "Everyday Spending",
    title: "Get more value from meals, group plans, and everyday purchases.",
    description:
      "Coming from the bill splitter? Compare cards that may reward common spending like dining, groceries, travel, and shared outings.",
    primaryCta: "Explore card options →",
    secondaryCta: "See cash back cards →",
    secondaryPath: "/credit-cards/cash-back",
  },
};

export default function CreditCardsHub() {
  const location = useLocation();

  const type = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("type");
  }, [location.search]);

  const activeIntent = INTENT_CONTENT[type] || null;

  useEffect(() => {
    setCanonical("/credit-cards");
    window.scrollTo(0, 0);
  }, []);

  const pageTitle =
    "Compare Credit Cards for Bad Credit (2026) | Secured, 0% APR & Starter Cards";
  const pageDescription =
    "Compare credit cards for bad credit, beginners, and rebuilding. Find secured cards, 0% APR offers, and starter cards in one place.";

  const heroEyebrow = activeIntent
    ? activeIntent.eyebrow
    : "BuddyMoney Credit Card Hub";

  const heroTitle = activeIntent
    ? activeIntent.title
    : "Compare credit cards for bad credit, rebuilding credit, 0% APR, rewards, and first-time applicants.";

  const heroDescription = activeIntent
    ? activeIntent.description
    : "Learn the basics before you apply. Explore beginner-friendly guides, compare common card categories, and use our credit card finder to understand credit profile, annual fee, rewards, and intro APR tradeoffs.";

  const primaryCta = activeIntent
    ? activeIntent.primaryCta
    : "Open Credit Card Finder →";

  const secondaryCta = activeIntent
    ? activeIntent.secondaryCta
    : "Start with secured cards →";

  const secondaryPath = activeIntent
    ? activeIntent.secondaryPath
    : "/blog/best-secured-credit-cards/";

  const schemaOrg = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": ["CollectionPage", "WebPage"],
      name: pageTitle,
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
  }, [pageTitle, pageDescription]);

  const faqSchema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    };
  }, []);

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

        <script type="application/ld+json">{JSON.stringify(schemaOrg)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-sky-50 pb-16 pt-4">
        <div className="mx-auto max-w-6xl space-y-6 px-4 sm:px-6 lg:px-8">
          <section className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm">
            <div className="relative min-h-[360px] md:min-h-[420px]">
              <img
                src="/icons/hero-credit-cards-hub.png"
                alt="BuddyMoney credit card hub hero image"
                className="absolute inset-0 h-full w-full object-cover object-center"
                loading="eager"
              />

              <div className="absolute inset-0 bg-white/45 md:bg-white/35" />
              <div className="pointer-events-none absolute inset-y-0 left-0 w-full bg-gradient-to-r from-white/90 via-white/70 to-white/10 md:w-[72%]" />

              <div className="relative z-10 flex min-h-[360px] items-center px-5 py-8 md:min-h-[420px] md:px-8 lg:px-10">
                <div className="max-w-2xl rounded-3xl bg-white/82 p-5 shadow-sm backdrop-blur-[2px] md:p-7">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
                    {heroEyebrow}
                  </p>

                  <h1 className="mt-3 text-3xl font-extrabold leading-tight text-brand-900 md:text-4xl">
                    {heroTitle}
                  </h1>

                  <p className="mt-4 max-w-xl text-sm text-brand-900/90 md:text-base">
                    {heroDescription}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
                    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white/90 px-3 py-1 text-emerald-700 shadow-sm">
                      🧭 Guides + finder tool
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-100 bg-white/90 px-3 py-1 text-slate-700 shadow-sm">
                      ✅ Fees, APR, and rewards explained simply
                    </span>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      to="/credit-cards/finder"
                      className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-700"
                    >
                      {primaryCta}
                    </Link>
                    <Link
                      to={secondaryPath}
                      className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-white px-5 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
                    >
                      {secondaryCta}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
            <div className="space-y-4">
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 px-4 py-3 text-xs text-emerald-900">
                <strong>Disclosure:</strong> BuddyMoney may earn compensation
                from partners when you click certain links or apply for
                products. This does not affect how we explain cards or tools.
                We focus on clarity, not commissions.
              </div>

              <div className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-white to-emerald-50/60 px-5 py-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
                      Featured Placement
                    </p>
                    <h3 className="mt-1 text-base font-semibold text-slate-900">
                      Future beginner-friendly card pick
                    </h3>
                  </div>

                  <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                    Reserved
                  </span>
                </div>

                <p className="mt-3 text-sm text-slate-700">
                  This area is reserved for a featured credit card offer,
                  beginner pick, or partner spotlight. It sits near the top of
                  the hub so visitors can quickly see a recommended option
                  before browsing the guide list.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    to="/credit-cards/finder"
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

                <p className="mt-3 text-xs text-slate-500">
                  Placeholder for now. Replace with a live featured card or
                  partner offer later.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white px-5 py-5 text-sm text-slate-800 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">
                How to use this hub
              </p>
              <ol className="ml-4 mt-3 list-decimal space-y-2 text-sm text-slate-600">
                <li>Pick the guide that matches your current goal.</li>
                <li>Learn what to watch for: fees, APRs, and fine print.</li>
                <li>Use the finder to compare categories and card features.</li>
              </ol>
              <p className="mt-4 text-xs text-slate-500">
                This hub connects education, comparison tools, and smarter next
                steps before you apply.
              </p>
            </div>
          </section>

          <ShareBar
            variant="top"
            label="Share this credit card hub with someone comparing cards"
            title="I’m using BuddyMoney’s credit card hub to understand my options before I apply."
          />

          <section className="space-y-5 rounded-3xl border border-emerald-100 bg-white px-4 py-6 shadow-sm md:px-6 md:py-8">
            <header>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
                Credit card basics
              </p>
              <h2 className="mt-1 text-xl font-bold text-slate-900">
                Compare credit cards before you apply
              </h2>
            </header>

            <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-3 text-sm leading-relaxed text-slate-700">
                <p>
                  Credit cards can help you build credit, earn rewards, manage
                  short-term purchases, or reduce interest with an intro APR
                  offer. The best choice depends on your current credit profile,
                  your spending habits, and whether you plan to carry a balance.
                </p>

                <p>
                  If you are building or rebuilding credit, start with cards
                  that are easier to qualify for and focus on low fees, on-time
                  payments, and keeping balances low. If you already have good
                  credit, cash back, travel rewards, and 0% intro APR cards may
                  be worth comparing more closely.
                </p>

                <p>
                  A smart credit card strategy also depends on your full money
                  picture. Before applying, compare your budget, debt payoff
                  plan, and emergency savings so the card supports your goals
                  instead of becoming a financial fallback.
                </p>
              </div>

              <div className="rounded-3xl border border-emerald-100 bg-emerald-50/60 p-5">
                <h3 className="text-base font-semibold text-slate-900">
                  Quick credit card checklist
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  <li>✅ Know your credit profile before applying.</li>
                  <li>✅ Compare annual fees, APR, rewards, and deposits.</li>
                  <li>✅ Avoid cards with confusing or excessive fees.</li>
                  <li>✅ Pay on time and keep utilization low.</li>
                  <li>✅ Use tools to match the card to your budget.</li>
                </ul>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <Link
                to="/credit-cards/finder"
                className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 transition hover:bg-emerald-100"
              >
                <span className="block text-sm font-semibold text-slate-900">
                  Compare card types
                </span>
                <span className="mt-1 block text-xs text-slate-600">
                  Use the finder to compare beginner-friendly categories.
                </span>
              </Link>

              <Link
                to="/tools/debt-payoff"
                className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-emerald-200 hover:bg-emerald-50"
              >
                <span className="block text-sm font-semibold text-slate-900">
                  Plan debt payoff
                </span>
                <span className="mt-1 block text-xs text-slate-600">
                  Compare 0% APR offers with your payoff timeline.
                </span>
              </Link>

              <Link
                to="/tools/budget-tracker"
                className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-emerald-200 hover:bg-emerald-50"
              >
                <span className="block text-sm font-semibold text-slate-900">
                  Match your budget
                </span>
                <span className="mt-1 block text-xs text-slate-600">
                  Choose cards that fit your real monthly spending.
                </span>
              </Link>
            </div>
          </section>

          <section className="space-y-5 rounded-3xl border border-slate-200 bg-white px-4 py-6 shadow-sm md:px-6 md:py-8">
            <header>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
                Rebuilding credit
              </p>
              <h2 className="mt-1 text-xl font-bold text-slate-900">
                Secured credit cards can be a strong starting point
              </h2>
            </header>

            <div className="space-y-3 text-sm leading-relaxed text-slate-700">
              <p>
                Secured credit cards are often used by people who are new to
                credit or rebuilding after missed payments, collections, or a
                thin credit file. They usually require a refundable deposit, and
                the credit limit is often tied to that deposit.
              </p>

              <p>
                The most important features are simple fees, credit bureau
                reporting, a clear graduation path, and a card issuer that makes
                it easy to manage payments. Rewards are nice, but rebuilding
                credit usually starts with consistency.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/blog/best-secured-credit-cards/"
                className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-700"
              >
                Read secured cards guide →
              </Link>

              <Link
                to="/credit-cards/bad-credit"
                className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-white px-5 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
              >
                Compare rebuilding cards →
              </Link>
            </div>
          </section>

          <section className="space-y-5 rounded-3xl border border-slate-200 bg-white px-4 py-6 shadow-sm md:px-6 md:py-8">
            <header>
              <h2 className="text-lg font-bold text-slate-900">
                Credit card guides & tools
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Start with a guide, then use the finder when you are ready to
                compare categories and features more closely.
              </p>
            </header>

            <div className="grid gap-4 md:grid-cols-2">
              {HUB_ITEMS.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`group flex flex-col justify-between rounded-3xl border p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                    item.id === "finder"
                      ? "border-emerald-200 bg-gradient-to-br from-emerald-50 to-sky-50 hover:bg-white"
                      : "border-slate-200 bg-white hover:border-emerald-200"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                        {item.label}
                      </p>
                      <h3 className="mt-1 text-base font-semibold text-slate-900 group-hover:text-emerald-700">
                        {item.title}
                      </h3>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                      {item.badge}
                    </span>
                  </div>

                  <p className="mt-3 text-sm text-slate-700">
                    {item.description}
                  </p>

                  {item.highlight && (
                    <p className="mt-4 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800">
                      ⭐ {item.highlight}
                    </p>
                  )}

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="text-xs text-slate-500">
                      Educational content
                    </span>
                    <span className="text-xs font-semibold text-emerald-700">
                      Open →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="space-y-4 rounded-3xl border border-slate-200 bg-white px-4 py-6 shadow-sm md:px-6 md:py-8">
            <h2 className="text-lg font-bold text-slate-900">
              How to choose a credit card without getting overwhelmed
            </h2>

            <div className="grid gap-4 md:grid-cols-3">
              <InfoCard
                title="Start with your goal"
                text="Some people need a first card to build credit. Others want travel rewards, cash back, or a 0% intro APR strategy."
                tone="emerald"
              />
              <InfoCard
                title="Watch fees and APR"
                text="Rewards can look attractive, but annual fees, transfer fees, penalty APRs, and interest charges matter just as much."
                tone="sky"
              />
              <InfoCard
                title="Compare before applying"
                text="It is usually better to compare a few realistic options, read the fine print, and apply only when the card truly fits."
                tone="amber"
              />
            </div>

            <p className="text-sm text-slate-600">
              Looking for a practical starting point? Try the{" "}
              <Link
                to="/credit-cards/finder"
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
              </Link>
              .
            </p>
          </section>

          <section className="space-y-4 rounded-3xl border border-slate-200 bg-white px-4 py-6 shadow-sm md:px-6 md:py-8">
            <h2 className="text-lg font-bold text-slate-900">
              Tools that support smarter credit card choices
            </h2>

            <div className="grid gap-3 md:grid-cols-2">
              <SupportTool
                to="/credit-cards/finder"
                title="Credit Card Finder"
                text="Compare card types, annual fees, and beginner-friendly features in one place."
              />
              <SupportTool
                to="/tools/budget-tracker"
                title="Budget Tracker"
                text="Match your spending habits to the kind of card that actually fits your budget."
              />
              <SupportTool
                to="/tools/debt-payoff"
                title="Debt Payoff Calculator"
                text="Helpful if you are comparing 0% APR offers against an existing payoff strategy."
              />
              <SupportTool
                to="/tools/emergency-fund"
                title="Emergency Fund Tool"
                text="Build a cash buffer so your credit card stays a tool instead of a fallback."
              />
            </div>
          </section>

          <section className="space-y-4 rounded-3xl border border-slate-200 bg-white px-4 py-6 shadow-sm md:px-6 md:py-8">
            <h2 className="text-lg font-bold text-slate-900">
              Credit card FAQs
            </h2>

            <div className="space-y-3">
              {FAQ_ITEMS.map((item) => (
                <div
                  key={item.question}
                  className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4"
                >
                  <h3 className="text-sm font-semibold text-slate-900">
                    {item.question}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <p className="text-center text-xs text-slate-500">
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

function InfoCard({ title, text, tone }) {
  const tones = {
    emerald: "border-emerald-100 bg-emerald-50/50",
    sky: "border-sky-100 bg-sky-50/50",
    amber: "border-amber-100 bg-amber-50/50",
  };

  return (
    <div className={`rounded-2xl border p-4 ${tones[tone] || tones.emerald}`}>
      <h3 className="mb-2 text-sm font-semibold text-slate-900">{title}</h3>
      <p className="text-xs text-slate-700">{text}</p>
    </div>
  );
}

function SupportTool({ to, title, text }) {
  return (
    <Link
      to={to}
      className="rounded-2xl border border-slate-200 bg-white px-4 py-4 transition hover:border-emerald-200 hover:bg-emerald-50"
    >
      <span className="block font-semibold text-slate-900">{title}</span>
      <span className="mt-1 block text-sm text-slate-600">{text}</span>
    </Link>
  );
}
// src/pages/BestTravelCards.jsx
import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import ShareBar from "../components/ShareBar";
import { setCanonical } from "../utils/seo";

// Sample travel rewards cards (preview mode – no affiliate links yet)
const TRAVEL_CARDS = [
  {
    id: "travel-flex-premium",
    name: "Travel Flex Premium",
    issuer: "Global Rewards Bank",
    annualFee: 95,
    bonus:
      "Earn 60,000 bonus points after you spend $4,000 in the first 3 months.",
    rewards:
      "2x points on travel and dining, 1x on everything else. Points redeemable for travel through issuer portal.",
    introApr: "0% intro APR on balance transfers for 12 months.",
    regularApr: "21.99%–28.99% variable APR.",
    foreignFees: "No foreign transaction fees",
    bestFor: "Frequent travelers who want flexible points and lounge-lite perks.",
    perks: [
      "Travel accident insurance",
      "Trip delay and lost luggage coverage",
      "Auto rental collision damage waiver",
    ],
  },
  {
    id: "no-fee-travel-intro",
    name: "No-Fee Travel Intro",
    issuer: "Everyday Miles Bank",
    annualFee: 0,
    bonus:
      "Earn 20,000 bonus miles after you spend $1,000 in the first 3 months.",
    rewards:
      "1.5x miles on all purchases. Simple structure, easy to understand.",
    introApr: "0% intro APR on purchases for 12 months.",
    regularApr: "20.99%–27.99% variable APR.",
    foreignFees: "3% foreign transaction fee",
    bestFor: "New travelers who want miles without paying an annual fee.",
    perks: [
      "Basic travel and purchase protection",
      "Simple flat-rate earning on everything",
      "Redemptions toward travel statement credits",
    ],
  },
  {
    id: "airline-loyalty-plus",
    name: "Airline Loyalty Plus",
    issuer: "Skyline Airlines (Co-branded)",
    annualFee: 99,
    bonus:
      "Earn 50,000 bonus miles after you spend $2,000 in the first 3 months.",
    rewards:
      "2x miles on purchases with Skyline Airlines, 1x miles on all other purchases.",
    introApr: "N/A",
    regularApr: "22.99%–29.99% variable APR.",
    foreignFees: "No foreign transaction fees",
    bestFor: "People loyal to one airline who regularly check bags and fly often.",
    perks: [
      "First checked bag free on qualifying flights",
      "Priority boarding for cardholders",
      "Discounts on in-flight purchases",
    ],
  },
];

export default function BestTravelCards() {
  const title = "Best Travel Credit Cards (Preview) | BuddyMoney";
  const description =
    "See how different types of travel credit cards work using BuddyMoney’s preview guide—flexible travel points, no-fee travel cards, and airline loyalty cards—before live offers go into the Credit Card Finder.";
  const pageUrl =
    typeof window !== "undefined"
      ? window.location.href
      : "https://buddymoney.com/credit-cards/travel";

  // ✅ Canonical for /credit-cards/travel
  useEffect(() => {
    setCanonical("/credit-cards/travel");
  }, []);

  // JSON-LD structured data (ItemList of sample travel cards)
  const jsonLd = useMemo(() => {
    const items = TRAVEL_CARDS.map((card, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "FinancialProduct",
        name: card.name,
        description: card.rewards,
        provider: {
          "@type": "BankOrCreditUnion",
          name: card.issuer,
        },
        feesAndCommissionsSpecification:
          card.annualFee === 0
            ? "No annual fee; travel rewards card."
            : `$${card.annualFee.toLocaleString()} annual fee; travel rewards card.`,
      },
    }));

    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Best travel credit cards (preview)",
      description,
      itemListElement: items,
    };
  }, [description]);

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index,follow" />
        <link
          rel="canonical"
          href="https://buddymoney.com/credit-cards/travel"
        />

        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={pageUrl} />
        <meta
          property="og:image"
          content="https://buddymoney.com/icons/buddymoney-og-default.png"
        />
        <meta property="og:site_name" content="BuddyMoney" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta
          name="twitter:image"
          content="https://buddymoney.com/icons/buddymoney-og-default.png"
        />

        {/* JSON-LD */}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <main className="min-h-screen bg-gradient-to-b from-green-50 via-white to-emerald-50/40 pb-16 pt-4">
        <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
          {/* Top share snippet */}
          <ShareBar
            variant="top"
            title="I’m reading BuddyMoney’s guide to the best travel credit cards."
          />

          {/* Header */}
          <header className="space-y-3 rounded-3xl border border-emerald-100 bg-white/90 px-5 py-6 shadow-sm">
            <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Credit Cards
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                Preview guide
              </span>
            </p>
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Best travel credit cards (preview)
            </h1>
            <p className="text-sm text-slate-700 sm:text-base">
              Travel cards can help you stretch your trips further—but only if
              you match the{" "}
              <span className="font-semibold text-slate-900">
                right card to your travel style
              </span>
              . This guide uses{" "}
              <span className="font-semibold text-slate-900">sample cards</span>{" "}
              to explain the differences between flexible travel points, airline
              cards, and no-fee travel options. Once partner offers are live,
              we&apos;ll plug real cards into the{" "}
              <Link
                to="/tools/credit-cards"
                className="font-semibold text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
              >
                BuddyMoney Credit Card Finder
              </Link>
              .
            </p>
            <p className="text-[11px] text-slate-500">
              Educational only • Not financial advice • Always check the
              official issuer&apos;s terms, perks, and fees before you apply.
            </p>
          </header>

          {/* Intro: how to think about travel cards */}
          <section className="space-y-4 rounded-3xl border border-slate-200 bg-white px-5 py-6 text-sm text-slate-800 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              How to choose a travel card without getting overwhelmed
            </h2>
            <p>
              Travel cards usually trade{" "}
              <span className="font-semibold">higher annual fees</span> for{" "}
              <span className="font-semibold">stronger perks</span>—like lounge
              access, trip protections, and free checked bags. The key is to
              make sure you&apos;re getting{" "}
              <span className="font-semibold">
                more value back than you&apos;re paying in fees
              </span>
              .
            </p>
            <ul className="ml-5 list-disc space-y-1">
              <li>
                <span className="font-semibold">Flexible travel cards</span> are
                great if you fly different airlines or book through portals.
              </li>
              <li>
                <span className="font-semibold">Airline cards</span> shine if
                you&apos;re loyal to one airline and value bags + boarding perks.
              </li>
              <li>
                <span className="font-semibold">No-fee travel cards</span> work
                well if you travel occasionally and want simple miles.
              </li>
            </ul>
          </section>

          {/* Sample travel card line-up */}
          <section className="space-y-4 rounded-3xl border border-slate-200 bg-white px-5 py-6 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              Sample travel card line-up
            </h2>
            <p className="text-sm text-slate-700">
              These are{" "}
              <span className="font-semibold">example cards</span> to show you
              the tradeoffs between different travel setups. They aren&apos;t
              real products, but they closely mirror common travel card
              patterns.
            </p>

            <div className="mt-3 space-y-4">
              {TRAVEL_CARDS.map((card) => (
                <article
                  key={card.id}
                  className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-4 text-sm text-slate-800"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">
                        {card.name}
                      </h3>
                      <p className="text-[12px] text-slate-500">
                        {card.issuer} •{" "}
                        {card.annualFee === 0
                          ? "No annual fee"
                          : `$${card.annualFee.toLocaleString()} annual fee`}
                      </p>
                    </div>
                    <p className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
                      Best for: {card.bestFor}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[13px] font-medium text-slate-900">
                      {card.bonus}
                    </p>
                    <p className="text-[13px] text-slate-700">
                      Rewards: {card.rewards}
                    </p>
                  </div>

                  <dl className="grid gap-2 rounded-xl bg-white px-3 py-2 text-[12px] text-slate-700 sm:grid-cols-3">
                    <div>
                      <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                        Intro APR
                      </dt>
                      <dd className="mt-1">{card.introApr}</dd>
                    </div>
                    <div>
                      <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                        Regular APR
                      </dt>
                      <dd className="mt-1">{card.regularApr}</dd>
                    </div>
                    <div>
                      <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                        Foreign fees
                      </dt>
                      <dd className="mt-1">{card.foreignFees}</dd>
                    </div>
                  </dl>

                  <ul className="ml-4 list-disc space-y-1 text-[12px] text-slate-700">
                    {card.perks.map((perk, idx) => (
                      <li key={idx}>{perk}</li>
                    ))}
                  </ul>

                  <p className="text-[11px] text-slate-500">
                    Not a real product. For illustration only — actual card
                    terms, fees, and travel protections vary by issuer and can
                    change at any time.
                  </p>
                </article>
              ))}
            </div>
          </section>

          {/* Quick tip box */}
          <section className="space-y-3 rounded-3xl border border-sky-100 bg-sky-50/80 px-5 py-5 text-[13px] text-slate-800 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">
              Quick travel card rule of thumb
            </h2>
            <p>
              If you don&apos;t travel at least a few times a year, a{" "}
              <span className="font-semibold">no-fee travel card</span> or a{" "}
              <span className="font-semibold">strong cash back card</span> may
              beat a premium travel card once you factor in the annual fee.
            </p>
          </section>

          {/* CTA: move into the Credit Card Finder */}
          <section className="rounded-3xl border border-emerald-100 bg-emerald-600 px-5 py-5 text-white shadow-sm">
            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold">
                  Ready to explore travel cards in one place?
                </h2>
                <p className="text-sm text-emerald-50">
                  Use BuddyMoney&apos;s Credit Card Finder (in preview mode) to
                  browse cards by credit score, annual fee, and rewards type —
                  including travel-focused options.
                </p>
              </div>
              <Link
                to="/tools/credit-cards"
                className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-emerald-700 shadow hover:bg-emerald-50"
              >
                Open Credit Card Finder →
              </Link>
            </div>
          </section>

          {/* Bottom share snippet */}
          <ShareBar
            variant="bottom"
            label="Share this guide"
            title="I’m reading BuddyMoney’s guide to the best travel credit cards."
          />
        </div>
      </main>
    </>
  );
}

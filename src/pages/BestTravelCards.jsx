// src/pages/BestTravelCards.jsx
import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import ShareBar from "../components/ShareBar";
import { setCanonical } from "../utils/seo";

// Sample travel rewards cards (educational examples)
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
  const title = "Best Travel Credit Cards (2026 Guide) | BuddyMoney";
  const description =
    "Learn how travel credit cards work, compare flexible travel points, airline cards, and no-fee options, and see what to watch for before choosing a travel card.";
  const canonicalUrl = "https://www.buddymoney.com/credit-cards/travel";
  const ogImage =
    "https://www.buddymoney.com/icons/buddymoney-og-default.png";

  useEffect(() => {
    setCanonical("/credit-cards/travel");
  }, []);

  const jsonLd = useMemo(() => {
    const items = TRAVEL_CARDS.map((card, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "FinancialProduct",
        name: card.name,
        description: `${card.rewards} Best for: ${card.bestFor}`,
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
      name: "Best travel credit cards",
      description,
      itemListElement: items,
    };
  }, [description]);

  const faqSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the best kind of travel credit card?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The best travel card depends on how you travel. Flexible points cards fit people who want options, airline cards fit loyal flyers, and no-fee travel cards can work well for occasional travelers.",
          },
        },
        {
          "@type": "Question",
          name: "Are travel credit cards worth the annual fee?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "They can be worth it if the value of the points, protections, checked bag benefits, or travel perks is greater than the annual fee. If you do not travel often, a no-fee travel card or strong cash back card may be a better fit.",
          },
        },
        {
          "@type": "Question",
          name: "Should I choose a travel card or a cash back card?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Choose a travel card if you value travel-specific rewards and perks. Choose a cash back card if you want simpler rewards with fewer restrictions and you do not travel enough to justify travel fees or program rules.",
          },
        },
        {
          "@type": "Question",
          name: "What should I compare before applying for a travel card?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Compare annual fees, foreign transaction fees, redemption flexibility, transfer partners, intro bonuses, travel protections, and whether you will actually use the perks enough to justify the card.",
          },
        },
      ],
    }),
    []
  );

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content="BuddyMoney" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />

        {/* JSON-LD */}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <main className="min-h-screen bg-gradient-to-b from-green-50 via-white to-emerald-50/40 pb-16 pt-4">
        <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
          <ShareBar
            variant="top"
            title="I’m reading BuddyMoney’s guide to the best travel credit cards."
          />

          <header className="space-y-4 rounded-3xl border border-emerald-100 bg-white/90 px-5 py-6 shadow-sm">
            <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Credit Cards
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                Beginner guide
              </span>
            </p>

            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Best travel credit cards
            </h1>

            <p className="text-sm text-slate-700 sm:text-base">
              Travel cards can be powerful, but only when you match the{" "}
              <span className="font-semibold text-slate-900">
                right rewards structure to your travel style
              </span>
              . Some people do best with flexible travel points, some benefit
              more from airline loyalty perks, and others are better off with a
              simple no-fee travel card.
            </p>

            <p className="text-sm text-slate-700 sm:text-base">
              This BuddyMoney guide explains the differences between flexible
              travel cards, airline cards, and lighter no-fee options so you
              can compare them more clearly before you apply. You can also
              browse more card types in the{" "}
              <Link
                to="/tools/credit-cards"
                className="font-semibold text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
              >
                BuddyMoney Credit Card Finder
              </Link>
              .
            </p>

            <p className="text-[11px] text-slate-500">
              Educational guide only • Card offers, fees, travel protections,
              and bonus terms can change • BuddyMoney updates this page
              regularly, and new cards may be added over time • Always verify
              current issuer details before applying.
            </p>
          </header>

          <section className="space-y-4 rounded-3xl border border-slate-200 bg-white px-5 py-6 text-sm text-slate-800 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              How to choose a travel card without getting overwhelmed
            </h2>
            <p>
              Travel cards often trade{" "}
              <span className="font-semibold">higher annual fees</span> for{" "}
              <span className="font-semibold">stronger perks</span>, like better
              bonus categories, trip protections, lounge benefits, free checked
              bags, or more flexible travel redemptions.
            </p>
            <p>
              The real question is whether you will get{" "}
              <span className="font-semibold">
                more value back than you pay in fees
              </span>
              .
            </p>
            <ul className="ml-5 list-disc space-y-1">
              <li>
                <span className="font-semibold">Flexible travel cards</span> can
                work well if you want broader redemption options.
              </li>
              <li>
                <span className="font-semibold">Airline cards</span> make more
                sense if you are loyal to one airline and use the perks often.
              </li>
              <li>
                <span className="font-semibold">No-fee travel cards</span> fit
                occasional travelers who want simpler rewards.
              </li>
            </ul>
          </section>

          <section className="space-y-4 rounded-3xl border border-slate-200 bg-white px-5 py-6 text-sm text-slate-800 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              What to compare before you apply
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <h3 className="text-sm font-semibold text-slate-900">
                  Annual fee versus real value
                </h3>
                <p className="mt-1 text-[13px] text-slate-700">
                  A bigger fee only makes sense if you actually use the perks,
                  points, or protections enough to come out ahead.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <h3 className="text-sm font-semibold text-slate-900">
                  Foreign transaction fees
                </h3>
                <p className="mt-1 text-[13px] text-slate-700">
                  If you travel internationally, foreign fees can quietly erase
                  a lot of your rewards value.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <h3 className="text-sm font-semibold text-slate-900">
                  Redemption flexibility
                </h3>
                <p className="mt-1 text-[13px] text-slate-700">
                  Some cards work best through issuer portals, while others are
                  stronger if you prefer one airline or hotel brand.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <h3 className="text-sm font-semibold text-slate-900">
                  Travel protections
                </h3>
                <p className="mt-1 text-[13px] text-slate-700">
                  Compare things like trip delay coverage, rental car coverage,
                  baggage protections, and purchase protections.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4 rounded-3xl border border-slate-200 bg-white px-5 py-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-base font-semibold text-slate-900">
                Sample travel card line-up
              </h2>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                Educational examples
              </span>
            </div>

            <p className="text-sm text-slate-700">
              These examples show common travel card patterns, including
              flexible points cards, no-fee travel cards, and airline loyalty
              cards. BuddyMoney may expand this page with additional cards and
              comparisons over time.
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

          <section className="space-y-3 rounded-3xl border border-sky-100 bg-sky-50/80 px-5 py-5 text-[13px] text-slate-800 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">
              Quick travel card rule of thumb
            </h2>
            <p>
              If you only travel occasionally, a{" "}
              <span className="font-semibold">no-fee travel card</span> or even
              a{" "}
              <Link
                to="/credit-cards/cash-back"
                className="font-semibold underline underline-offset-2 hover:text-slate-950"
              >
                strong cash back card
              </Link>{" "}
              may beat a premium travel card once you factor in the annual fee.
            </p>
          </section>

          <section className="space-y-3 rounded-3xl border border-amber-100 bg-amber-50/80 px-5 py-5 text-[13px] text-amber-900 shadow-sm">
            <h2 className="text-sm font-semibold text-amber-900">
              Travel rewards work best when your money basics are solid
            </h2>
            <p>
              A travel card can be rewarding, but only if you avoid paying
              interest and use the perks enough to justify the costs.
            </p>
            <p>
              Use the{" "}
              <Link
                to="/tools/budget-tracker"
                className="font-semibold underline underline-offset-2 hover:text-amber-950"
              >
                Budget Tracker
              </Link>{" "}
              to plan for travel spending, the{" "}
              <Link
                to="/tools/emergency-fund"
                className="font-semibold underline underline-offset-2 hover:text-amber-950"
              >
                Emergency Fund Tool
              </Link>{" "}
              to avoid turning trips into debt, or the{" "}
              <Link
                to="/tools/debt-payoff"
                className="font-semibold underline underline-offset-2 hover:text-amber-950"
              >
                Debt Payoff Calculator
              </Link>{" "}
              if rewards are competing with existing balances.
            </p>
          </section>

          <section className="space-y-4 rounded-3xl border border-slate-200 bg-white px-5 py-6 text-sm text-slate-800 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              Related tools and guides
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                to="/tools/credit-cards"
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-emerald-200 hover:bg-emerald-50"
              >
                <span className="block font-semibold text-slate-900">
                  Credit Card Finder
                </span>
                <span className="mt-1 block text-[13px] text-slate-600">
                  Explore cards by annual fee, rewards type, and card category.
                </span>
              </Link>

              <Link
                to="/credit-cards/cash-back"
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-emerald-200 hover:bg-emerald-50"
              >
                <span className="block font-semibold text-slate-900">
                  Best Cash Back Credit Cards
                </span>
                <span className="mt-1 block text-[13px] text-slate-600">
                  Compare travel rewards against simple everyday cash back.
                </span>
              </Link>

              <Link
                to="/credit-cards/0-apr"
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-emerald-200 hover:bg-emerald-50"
              >
                <span className="block font-semibold text-slate-900">
                  Best 0% Intro APR Credit Cards
                </span>
                <span className="mt-1 block text-[13px] text-slate-600">
                  Helpful if financing flexibility matters more than travel perks.
                </span>
              </Link>

              <Link
                to="/credit-cards/student"
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-emerald-200 hover:bg-emerald-50"
              >
                <span className="block font-semibold text-slate-900">
                  Best Student Credit Cards
                </span>
                <span className="mt-1 block text-[13px] text-slate-600">
                  A better fit for lighter travel and newer credit histories.
                </span>
              </Link>
            </div>
          </section>

          <section className="rounded-3xl border border-emerald-100 bg-emerald-600 px-5 py-5 text-white shadow-sm">
            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold">
                  Ready to compare travel cards in one place?
                </h2>
                <p className="text-sm text-emerald-50">
                  Use BuddyMoney&apos;s Credit Card Finder to browse cards by
                  annual fee, rewards type, and travel focus — including
                  travel-friendly options.
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
export const AFFILIATES = {
  smartcredit: {
    // Core identifiers
    key: "smartcredit",
    brand: "SmartCredit",

    // Internal routing
    goPath: "/go/smartcredit",

    // Affiliate destination (replace with CJ / Impact URL when ready)
    outboundUrl: "https://www.smartcredit.com",

    // Callout usage (inline components)
    tipTitle: "See your full credit picture in one place",
    ctaText: "View your credit overview →",

    // /go page — above the fold
    headline: "See your full credit picture in one simple dashboard",
    subheadline:
      "Track your credit score, balances, utilization, and changes in one place — without digging through multiple accounts.",

    // /go page — value bullets
    bullets: [
      "See your credit score and changes over time",
      "Monitor balances, utilization, and due dates",
      "Get alerts for important credit activity",
      "Spot potential issues early while rebuilding credit",
    ],

    // /go page — qualification (boosts trust & conversions)
    bestFor: [
      "Paying down credit card debt",
      "Rebuilding or improving your credit score",
      "Wanting visibility without logging into multiple accounts",
      "Preferring a simple dashboard over complex reports",
    ],

    // SEO (optional but recommended)
    metaDescription:
      "SmartCredit helps you monitor your credit score, balances, and activity in one simple dashboard. Recommended by BuddyMoney.",

    // Compliance
    disclosure:
      "Affiliate disclosure: This link may earn BuddyMoney a commission at no extra cost to you. We only recommend tools we believe are genuinely useful for managing money more confidently.",
  },

  wallethub: {
    key: "wallethub",
    brand: "WalletHub",
    goPath: "/go/wallethub",
    outboundUrl: "https://www.kqzyfj.com/click-101601912-16952385",
    headline: "Easily monitor and grow your net worth in one place",
    subheadline:
      "WalletHub Premium helps you track net worth, credit, and financial progress with simple insights.",
    ctaText: "View your WalletHub overview →",
    disclosure:
      "Affiliate disclosure: This link may earn BuddyMoney a commission at no extra cost to you.",
  },

  // Future affiliates will be easy:
  // fiverr: {
  //   key: "fiverr",
  //   brand: "Fiverr",
  //   goPath: "/go/fiverr",
  //   outboundUrl: "https://www.fiverr.com/...",
  //   tipTitle: "Turn skills into income",
  //   ctaText: "Explore Fiverr gigs →",
  //   headline: "...",
  //   bullets: [...],
  //   bestFor: [...],
  // },
};

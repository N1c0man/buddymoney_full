import React, { useEffect } from "react";
import BudgetCoach from "../components/BudgetCoach";

export default function BudgetCoachPage() {
  useEffect(() => {
    const description =
      "Ask the BuddyMoney Budget Coach for simple, friendly help with budgeting, saving, debt payoff, and emergency funds.";

    // <title>
    document.title = "AI Budget Coach | BuddyMoney";

    // <meta name="description">
    let meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", description);
    } else {
      meta = document.createElement("meta");
      meta.name = "description";
      meta.content = description;
      document.head.appendChild(meta);
    }

    // JSON-LD (WebPage + FAQ-style info about the coach)
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "AI Budget Coach | BuddyMoney",
      "url": "https://buddymoney.com/coach",
      "description": description,
      "publisher": {
        "@type": "Organization",
        "name": "BuddyMoney",
        "url": "https://buddymoney.com"
      },
      "mainEntity": {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the AI Budget Coach?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "The AI Budget Coach is a friendly tool that helps you understand budgeting, saving, debt payoff, and financial planning in simple terms."
            }
          },
          {
            "@type": "Question",
            "name": "Is the AI Budget Coach free to use?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Yes, the AI Budget Coach on BuddyMoney is completely free to use."
            }
          }
        ]
      }
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    // cleanup on unmount
    return () => {
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="pt-2 lg:pt-4 pb-16">
      <BudgetCoach />
    </div>
  );
}

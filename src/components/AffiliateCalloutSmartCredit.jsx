import React from "react";
import AffiliateCallout from "./AffiliateCallout";
import { AFFILIATES } from "../config/affiliates";

export default function AffiliateCalloutSmartCredit({
  variant = "full",
  intent = "general",
}) {
  const a = AFFILIATES.smartcredit;

  const ctaByIntent = {
    debt: "View your credit overview while paying down debt →",
    rebuild: "View your credit overview while rebuilding →",
    cards: "View your credit overview before applying →",
    general: a.ctaText || "View your credit overview →",
  };

  const ctaText =
    variant === "full"
      ? ctaByIntent[intent] || a.ctaText || "View your credit overview →"
      : "Learn more about SmartCredit →";

  return (
    <AffiliateCallout
      variant={variant}
      to={a.goPath}
      tipTitle={a.tipTitle}
      ctaText={ctaText}
      body={
        <>
          Want an easy way to see all your balances, APRs, due dates, and score
          changes in one dashboard? <strong>{a.brand}</strong> gives you a clear
          view of your accounts and credit score so you can track progress while
          you rebuild or pay down debt.
        </>
      }
    />
  );
}

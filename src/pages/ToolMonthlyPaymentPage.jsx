import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import AppBottomNav from "../components/AppBottomNav";
import MonthlyPaymentCalculator from "../tools/MonthlyPaymentCalculator";
import { setCanonical } from "../utils/seo";

export default function ToolMonthlyPaymentPage() {
  useEffect(() => {
    setCanonical("/tools/monthly-payment-calculator");
  }, []);

  const title =
    "Monthly Payment Calculator | Free Loan Payment Tool | BuddyMoney";
  const description =
    "Use BuddyMoney's free Monthly Payment Calculator to estimate loan payments, total interest, and total repayment cost.";

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index,follow" />
      </Helmet>

      <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white px-4 pb-24 pt-6">
        <div className="mx-auto max-w-3xl space-y-5">
          <section className="rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
              BuddyMoney Tool
            </p>
            <h1 className="mt-2 text-2xl font-extrabold text-slate-900">
              Monthly Loan Payment Calculator
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Estimate a monthly payment before taking on a loan, financing a
              purchase, or comparing options.
            </p>
          </section>

          <MonthlyPaymentCalculator />
        </div>
      </main>

      <AppBottomNav />
    </>
  );
}
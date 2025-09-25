import React from "react";
import BudgetTracker from "../tools/BudgetTracker";
import SavingsGoal from "../tools/SavingsGoal";
import DebtPayoff from "../tools/DebtPayoff";
import BillSplitter from "../tools/BillSplitter";
import EmergencyFund from "../tools/EmergencyFund";
import NetWorth from "../tools/NetWorth";

export default function Tools() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12 space-y-10">
      <h1 className="text-3xl font-bold text-brand-900 mb-2">Free Tools</h1>
      <BudgetTracker />
      <SavingsGoal />
      <DebtPayoff />
      <BillSplitter />
      <EmergencyFund />
      <NetWorth />
    </section>
  );
}

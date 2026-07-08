import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";
import AppBottomNav from "./components/AppBottomNav";
import ROUTES from "./routePaths.json";

import Home from "./pages/Home";
import Tools from "./pages/Tools";
import About from "./pages/About";
import BudgetCoachPage from "./pages/BudgetCoach";
import MortgagePayoff from "./pages/MortgagePayoff";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import AffiliateDisclosure from "./pages/AffiliateDisclosure";
import AppDashboard from "./pages/AppDashboard";
import NotFound from "./pages/NotFound";

import ToolEmergencyFundPage from "./pages/ToolEmergencyFundPage";
import ToolDebtPayoffPage from "./pages/ToolDebtPayoffPage";
import ToolBudgetTrackerPage from "./pages/ToolBudgetTrackerPage";
import ToolBillSplitterPage from "./pages/ToolBillSplitterPage";
import ToolMonthlyPaymentPage from "./pages/ToolMonthlyPaymentPage";
import SavingsGoalPlanner from "./pages/SavingsGoalPlanner";
import NetWorthTracker from "./pages/NetWorthTracker";

import BlogList from "./blog/BlogList";
import BlogPost from "./blog/BlogPost";

import MainLayout from "./layouts/MainLayout";

import CreditCardFinder from "./tools/CreditCardFinder";
import CreditCardsHub from "./pages/CreditCardsHub";

import BestCashBackCards from "./pages/BestCashBackCards";
import BestBadCreditCards from "./pages/BestBadCreditCards";
import BestTravelCards from "./pages/BestTravelCards";
import BestIntroAprCards from "./pages/BestIntroAprCards";
import BestStudentCards from "./pages/BestStudentCards";

import GoOffer from "./pages/GoOffer";

export default function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Arial, sans-serif",
          textAlign: "center",
          color: "#1e3a8a",
          background: "#ffffff",
          padding: "24px",
        }}
      >
        <img
          src="/icons/icon-192x192.png"
          alt="BuddyMoney Owl"
          width="96"
          height="96"
          style={{ marginBottom: "20px" }}
        />

        <h1 style={{ margin: 0 }}>BuddyMoney</h1>

        <p style={{ marginTop: "12px", maxWidth: "320px" }}>
          Simple tools to help you budget, save, and pay off debt.
        </p>
      </div>
    );
  }

  const isAppOnlyRoute =
    location.pathname === "/app" ||
    location.pathname.startsWith("/app/tools") ||
    location.pathname.startsWith("/app/learn");

  if (isAppOnlyRoute) {
    return (
      <>
        <ScrollToTop />

        <Routes>
          <Route path="/app" element={<AppDashboard />} />

          <Route path="/app/tools" element={<Navigate to="/app" replace />} />

          <Route
            path="/app/learn"
            element={
              <>
                <BlogList />
                <AppBottomNav />
              </>
            }
          />

                    <Route
            path="/app/learn/:slug"
            element={
              <>
                <BlogPost />
                <AppBottomNav />
              </>
            }
          />

          <Route
            path="/app/tools/budget-coach"
            element={
              <>
                <BudgetCoachPage />
                <AppBottomNav />
              </>
            }
          />

          <Route
            path="/app/tools/mortgage-payoff"
            element={
              <>
                <MortgagePayoff />
                <AppBottomNav />
              </>
            }
          />

          <Route
            path="/app/tools/credit-cards"
            element={<CreditCardFinder showAppBottomNav />}
          />

          <Route
            path="/app/tools/monthly-payment-calculator"
            element={<ToolMonthlyPaymentPage />}
          />

          <Route
            path="/app/tools/emergency-fund"
            element={<ToolEmergencyFundPage />}
          />

          <Route
            path="/app/tools/debt-payoff"
            element={<ToolDebtPayoffPage />}
          />

          <Route
            path="/app/tools/budget-tracker"
            element={<ToolBudgetTrackerPage />}
          />

          <Route
            path="/app/tools/bill-splitter"
            element={<ToolBillSplitterPage />}
          />

          <Route
            path="/app/tools/tip-calculator"
            element={<Navigate to="/app/tools/bill-splitter" replace />}
          />

          <Route
            path="/app/tools/savings-goal"
            element={<SavingsGoalPlanner />}
          />

          <Route path="/app/tools/net-worth" element={<NetWorthTracker />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
    );
  }

  return (
    <MainLayout>
      <ScrollToTop />

      <Routes>
        <Route path={ROUTES.home} element={<Home />} />

        <Route path={ROUTES.tools} element={<Tools />} />
        <Route path="/tools/budget-coach" element={<BudgetCoachPage />} />
        <Route path="/tools/mortgage-payoff" element={<MortgagePayoff />} />
        <Route path="/tools/credit-cards" element={<CreditCardFinder />} />

        <Route
          path="/tools/monthly-payment-calculator"
          element={<ToolMonthlyPaymentPage />}
        />

        <Route
          path="/tools/emergency-fund"
          element={<ToolEmergencyFundPage />}
        />

        <Route path="/tools/debt-payoff" element={<ToolDebtPayoffPage />} />

        <Route
          path="/tools/budget-tracker"
          element={<ToolBudgetTrackerPage />}
        />

        <Route path="/tools/bill-splitter" element={<ToolBillSplitterPage />} />

        <Route
          path="/tools/tip-calculator"
          element={<Navigate to="/tools/bill-splitter" replace />}
        />

        <Route path="/tools/savings-goal" element={<SavingsGoalPlanner />} />
        <Route path="/tools/net-worth" element={<NetWorthTracker />} />

        <Route path={ROUTES.about} element={<About />} />
        <Route path={ROUTES.coach} element={<BudgetCoachPage />} />
        <Route path={ROUTES.mortgage} element={<MortgagePayoff />} />

        <Route path={ROUTES.creditCardsHub} element={<CreditCardsHub />} />
        <Route path="/credit-cards/finder" element={<CreditCardFinder />} />

        <Route
          path={ROUTES.creditCardsCashBack}
          element={<BestCashBackCards />}
        />
        <Route
          path={ROUTES.creditCardsBadCredit}
          element={<BestBadCreditCards />}
        />
        <Route path={ROUTES.creditCardsTravel} element={<BestTravelCards />} />
        <Route
          path={ROUTES.creditCardsZeroApr}
          element={<BestIntroAprCards />}
        />
        <Route path={ROUTES.creditCardsStudent} element={<BestStudentCards />} />

        <Route path={ROUTES.blogList} element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />

        <Route path="/go/:key" element={<GoOffer />} />

        <Route path={ROUTES.privacy} element={<Privacy />} />
        <Route path={ROUTES.terms} element={<Terms />} />
        <Route
          path={ROUTES.affiliateDisclosure}
          element={<AffiliateDisclosure />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
}
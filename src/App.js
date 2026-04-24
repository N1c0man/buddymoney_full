import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Components
import ScrollToTop from "./components/ScrollToTop";
import ROUTES from "./routePaths.json";

// Pages
import Home from "./pages/Home";
import Tools from "./pages/Tools";
import About from "./pages/About";
import BudgetCoachPage from "./pages/BudgetCoach"; // Coach page
import MortgagePayoff from "./pages/MortgagePayoff";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import AffiliateDisclosure from "./pages/AffiliateDisclosure";
import AppDashboard from "./pages/AppDashboard";

// ⭐ NEW: Standalone tool pages
import ToolEmergencyFundPage from "./pages/ToolEmergencyFundPage";
import ToolDebtPayoffPage from "./pages/ToolDebtPayoffPage";
import ToolBudgetTrackerPage from "./pages/ToolBudgetTrackerPage";
import ToolBillSplitterPage from "./pages/ToolBillSplitterPage";
import ToolTipCalculatorPage from "./pages/ToolTipCalculatorPage";

// Blog system
import BlogList from "./blog/BlogList";
import BlogPost from "./blog/BlogPost";

// Layout
import MainLayout from "./layouts/MainLayout";

// ⭐ Credit Card Finder Tool
import CreditCardFinder from "./tools/CreditCardFinder";
import CreditCardsHub from "./pages/CreditCardsHub";

// ⭐ Credit Card Supporting Guides
import BestCashBackCards from "./pages/BestCashBackCards";
import BestBadCreditCards from "./pages/BestBadCreditCards";
import BestTravelCards from "./pages/BestTravelCards";
import BestIntroAprCards from "./pages/BestIntroAprCards";
import BestStudentCards from "./pages/BestStudentCards";

// ⭐ Affiliate Callout masked redirect page
import GoOffer from "./pages/GoOffer";

export default function App() {
  const location = useLocation();
  const isAppRoute = location.pathname === "/app";

  if (isAppRoute) {
    return (
      <>
        <ScrollToTop />
        <Routes>
          <Route path="/app" element={<AppDashboard />} />
        </Routes>
      </>
    );
  }

  return (
    <MainLayout>
      {/* 🌟 Global scroll-to-top on route change */}
      <ScrollToTop />

      <Routes>
        {/* Main pages */}
        <Route path={ROUTES.home} element={<Home />} />
        <Route path={ROUTES.tools} element={<Tools />} />
        <Route path={ROUTES.about} element={<About />} />

        {/* Mobile app landing */}
        <Route path="/app" element={<AppDashboard />} />

        {/* Tools */}
        <Route path={ROUTES.coach} element={<BudgetCoachPage />} />
        <Route path={ROUTES.mortgage} element={<MortgagePayoff />} />
        <Route path={ROUTES.creditCardTool} element={<CreditCardFinder />} />

        {/* ⭐ NEW: Standalone Tool Pages */}
        <Route
          path="/tools/emergency-fund"
          element={<ToolEmergencyFundPage />}
        />
        <Route
          path="/tools/debt-payoff"
          element={<ToolDebtPayoffPage />}
        />
        <Route
          path="/tools/budget-tracker"
          element={<ToolBudgetTrackerPage />}
        />
        <Route
          path="/tools/bill-splitter"
          element={<ToolBillSplitterPage />}
        />
        <Route
        path="/tools/tip-calculator"
        element={<ToolTipCalculatorPage />}
        />

        {/* Credit card supporting guides */}
        <Route path={ROUTES.creditCardsHub} element={<CreditCardsHub />} />
        <Route path={ROUTES.creditCardsCashBack} element={<BestCashBackCards />} />
        <Route path={ROUTES.creditCardsBadCredit} element={<BestBadCreditCards />} />
        <Route path={ROUTES.creditCardsTravel} element={<BestTravelCards />} />
        <Route path={ROUTES.creditCardsZeroApr} element={<BestIntroAprCards />} />
        <Route path={ROUTES.creditCardsStudent} element={<BestStudentCards />} />

        {/* Blog */}
        <Route path={ROUTES.blogList} element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />

        {/* Affiliate redirect routes */}
        <Route path="/go/:key" element={<GoOffer />} />

        {/* Legal */}
        <Route path={ROUTES.privacy} element={<Privacy />} />
        <Route path={ROUTES.terms} element={<Terms />} />
        <Route
          path={ROUTES.affiliateDisclosure}
          element={<AffiliateDisclosure />}
        />
      </Routes>
    </MainLayout>
  );
}
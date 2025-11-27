import React from "react";
import { Routes, Route } from "react-router-dom";

// Components
import ScrollToTop from "./components/ScrollToTop";

// Pages
import Home from "./pages/Home";
import Tools from "./pages/Tools";
import About from "./pages/About";
import BudgetCoachPage from "./pages/BudgetCoach"; // Coach page
import MortgagePayoff from "./pages/MortgagePayoff";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import AffiliateDisclosure from "./pages/AffiliateDisclosure"; // <-- added

// Blog system
import BlogList from "./blog/BlogList";
import BlogPost from "./blog/BlogPost";

// Layout
import MainLayout from "./layouts/MainLayout";

// ⭐ New: Credit Card Finder Tool
import CreditCardFinder from "./tools/CreditCardFinder";

// ⭐ New: Credit Card Supporting Guides
import BestCashBackCards from "./pages/BestCashBackCards";
import BestBadCreditCards from "./pages/BestBadCreditCards";
import BestTravelCards from "./pages/BestTravelCards";
import BestIntroAprCards from "./pages/BestIntroAprCards";
import BestStudentCards from "./pages/BestStudentCards";

export default function App() {
  return (
    <MainLayout>
      {/* 🌟 Global scroll-to-top on route change */}
      <ScrollToTop />

      <Routes>
        {/* Main pages */}
        <Route path="/" element={<Home />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/about" element={<About />} />

        {/* Tools */}
        <Route path="/coach" element={<BudgetCoachPage />} />
        <Route path="/mortgage" element={<MortgagePayoff />} />
        <Route path="/tools/credit-cards" element={<CreditCardFinder />} />

        {/* Credit card supporting guides */}
        <Route
          path="/credit-cards/cash-back"
          element={<BestCashBackCards />}
        />
        <Route
          path="/credit-cards/bad-credit"
          element={<BestBadCreditCards />}
        />
        <Route path="/credit-cards/travel" element={<BestTravelCards />} />
        <Route path="/credit-cards/0-apr" element={<BestIntroAprCards />} />
        <Route path="/credit-cards/student" element={<BestStudentCards />} />

        {/* Blog */}
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />

        {/* Legal */}
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route
          path="/affiliate-disclosure"
          element={<AffiliateDisclosure />}
        />{" "}
        {/* <-- added */}
      </Routes>
    </MainLayout>
  );
}

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

// Blog system
import BlogList from "./blog/BlogList";
import BlogPost from "./blog/BlogPost";

// Layout
import MainLayout from "./layouts/MainLayout";

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

        {/* Blog */}
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />

        {/* Legal */}
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </MainLayout>
  );
}

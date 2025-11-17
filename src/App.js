import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Tools from "./pages/Tools";
import About from "./pages/About";
import BudgetCoachPage from "./pages/BudgetCoach"; // ✅ New import for the Coach
import MortgagePayoff from "./pages/MortgagePayoff";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";


// ✅ Blog system imports
import BlogList from "./blog/BlogList";
import BlogPost from "./blog/BlogPost";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          {/* Existing pages */}
          <Route path="/" element={<Home />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/about" element={<About />} />

          {/* ✅ Budget Coach route */}
          <Route path="/coach" element={<BudgetCoachPage />} />
<Route path="/mortgage" element={<MortgagePayoff />} />

          {/* Blog routes */}
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/Privacy" element={<Privacy />} />
<Route path="/terms" element={<Terms />} />

        </Routes>
      </main>
      <Footer />
    </div>
  );
}

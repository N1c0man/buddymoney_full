// src/layouts/MainLayout.jsx
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      {/* NAVBAR – rendered directly so its sticky + z-index work correctly */}
      <Navbar />

      {/* MAIN CONTENT */}
      <main className="flex-1">
        <div className="mx-auto w-full max-w-5xl px-4 py-8 lg:py-10">
          {children}
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

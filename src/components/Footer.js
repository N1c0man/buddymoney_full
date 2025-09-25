import React from "react";
export default function Footer() {
  return (
    <footer className="bg-white border-t mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500">© {new Date().getFullYear()} BuddyMoney. All rights reserved.</p>
        <div className="text-sm text-gray-500">Finance tools for beginners • Made with ❤</div>
      </div>
    </footer>
  );
}

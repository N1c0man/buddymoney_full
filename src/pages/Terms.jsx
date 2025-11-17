import React from "react";

export default function Terms() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-green-700">Terms of Service</h1>

      <p className="mb-4">
        Welcome to <strong>BuddyMoney</strong>. By accessing or using our website, you agree to the following terms.
        Please read them carefully.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Use of Our Tools</h2>
      <p className="mb-4">
        Our financial tools are provided for educational and informational purposes only. 
        They do not constitute financial advice. Always consult a licensed financial professional before making major financial decisions.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. User Responsibilities</h2>
      <p className="mb-4">
        You agree not to misuse our services or attempt to disrupt the site’s functionality. 
        Unauthorized use or data scraping is prohibited.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Disclaimer</h2>
      <p className="mb-4">
        BuddyMoney makes no guarantees of accuracy. All calculations and outputs are estimates based on provided inputs.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Changes</h2>
      <p className="mb-4">
        We reserve the right to modify these Terms at any time. Continued use of the site means you accept the updated Terms.
      </p>

      <p className="mt-8 text-sm text-gray-500">
        Last updated: November 12, 2025
      </p>
    </div>
  );
}

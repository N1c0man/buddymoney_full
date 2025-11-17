import React, { useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // null | "loading" | "success" | "error"

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("https://api.convertkit.com/v3/forms/8691578/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: "McvWFEgnB4zbCZlpXleGog",
          email: email
        }),
      });

      const data = await response.json();
      if (data.subscription || data.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-8 text-center max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-brand-900 mb-2">
        Join the BuddyMoney Newsletter 💌
      </h2>
      <p className="text-gray-600 mb-6">
        Get weekly financial tips, new tools, and money insights—straight to your inbox.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 justify-center"
      >
        <input
          type="email"
          required
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-brand-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-brand-700 transition disabled:opacity-50"
        >
          {status === "loading" ? "Submitting..." : "Subscribe"}
        </button>
      </form>

      {/* ✅ Success Popup */}
      {status === "success" && (
        <div className="mt-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative animate-fade-in">
          🎉 You're subscribed! Check your inbox for a confirmation.
        </div>
      )}

      {/* ❌ Error Message */}
      {status === "error" && (
        <div className="mt-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative animate-fade-in">
          Oops! Something went wrong. Please try again later.
        </div>
      )}
    </div>
  );
}

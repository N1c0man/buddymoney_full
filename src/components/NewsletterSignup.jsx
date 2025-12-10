import React, { useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // null | "loading" | "success" | "error"

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch(
        "https://api.convertkit.com/v3/forms/8691578/subscribe",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            api_key: "McvWFEgnB4zbCZlpXleGog",
            email: email,
          }),
        }
      );

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
    <div className="max-w-2xl mx-auto">
      <div className="relative overflow-hidden bg-gradient-to-r from-green-50 via-white to-blue-50 shadow-xl rounded-2xl border border-green-100 px-6 py-8 sm:px-10 sm:py-10">
        {/* Soft glow background */}
        <div className="pointer-events-none absolute inset-0 opacity-60 mix-blend-soft-light bg-[radial-gradient(circle_at_top,_#bbf7d0,_transparent_55%),_radial-gradient(circle_at_bottom,_#bfdbfe,_transparent_55%)]" />

        <div className="relative">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 border border-green-100 px-3 py-1 mb-4 text-xs font-medium text-green-700 shadow-sm">
            <span className="text-lg">📬</span>
            <span>Free weekly money tips</span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-900 mb-2">
            Join the BuddyMoney Newsletter
          </h2>

          <p className="text-sm sm:text-base text-gray-600 mb-6">
            Get one friendly email each week with simple money moves, new tools,
            and clear ideas to help you budget, save, and pay off debt—without
            the jargon.
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center"
          >
            <div className="flex-1">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="Enter your best email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm sm:text-base shadow-sm bg-white/80 backdrop-blur focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 placeholder:text-gray-400"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex justify-center items-center px-6 py-3 rounded-xl bg-brand-600 text-white font-semibold text-sm sm:text-base shadow-md hover:bg-brand-700 hover:shadow-lg active:scale-[0.98] transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Submitting..." : "Get the tips"}
            </button>
          </form>

          {/* Tiny reassurance line */}
          <p className="mt-3 text-xs text-gray-400 text-left">
            Emails are sent from{" "}
            <span className="font-mono">newsletter@buddymoney.com</span>. No
            spam. Unsubscribe in one click anytime.
          </p>

          {/* Success */}
          {status === "success" && (
            <div className="mt-5 flex items-start gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800 shadow-sm">
              <span className="text-lg">🎉</span>
              <p>
                You&apos;re in! Check your inbox for a quick confirmation and
                your first BuddyMoney tip.
              </p>
            </div>
          )}

          {/* Error */}
          {status === "error" && (
            <div className="mt-5 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 shadow-sm">
              <span className="text-lg">⚠️</span>
              <p>
                Oops, something went wrong. Please double-check your email or
                try again in a moment.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

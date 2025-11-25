import React from "react";

export default function Terms() {
  return (
    <main className="pt-2 lg:pt-4 pb-16">
      <div className="max-w-3xl mx-auto rounded-3xl border border-slate-200 bg-white shadow-sm px-4 py-6 md:px-6 md:py-8">

        <header className="mb-6">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-emerald-500 mb-3">
            Terms of Service
          </p>

          <h1 className="text-3xl font-bold text-slate-900 mb-3">
            Terms of Service
          </h1>

          <p className="text-sm md:text-base text-slate-600">
            Welcome to <strong>BuddyMoney</strong>. By accessing or using our
            website, you agree to the following terms. Please read them carefully.
          </p>
        </header>

        <div className="space-y-6 text-sm md:text-base text-slate-700 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              1. Use of Our Tools
            </h2>
            <p>
              Our financial tools are provided for educational and informational
              purposes only. They do not constitute financial advice. Always
              consult a licensed financial professional before making major
              financial decisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              2. User Responsibilities
            </h2>
            <p>
              You agree not to misuse our services or attempt to disrupt the
              site’s functionality. Unauthorized use, automated scraping, or
              reverse engineering of our tools is prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              3. Disclaimer
            </h2>
            <p>
              BuddyMoney makes no guarantees of accuracy. All calculations and
              outputs are estimates based on the information you provide and may
              not reflect your exact financial situation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              4. Changes to These Terms
            </h2>
            <p>
              We may update these Terms from time to time. Continued use of the
              site after changes are posted means you accept the updated Terms.
            </p>
          </section>

          <p className="text-xs text-slate-500 mt-8">
            Last updated: November 12, 2025
          </p>
        </div>

      </div>
    </main>
  );
}

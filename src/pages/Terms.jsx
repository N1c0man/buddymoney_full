import React, { useEffect } from "react";
import { setCanonical } from "../utils/seo";

export default function Terms() {
  useEffect(() => {
    setCanonical("/terms");

    const description =
      "Read the BuddyMoney Terms of Service. Learn the rules for using BuddyMoney finance tools, app features, educational content, and credit card comparison resources.";

    document.title = "Terms of Service | BuddyMoney";

    let meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", description);
    } else {
      meta = document.createElement("meta");
      meta.name = "description";
      meta.content = description;
      document.head.appendChild(meta);
    }

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "TermsOfService",
      name: "Terms of Service | BuddyMoney",
      url: "https://www.buddymoney.com/terms",
      description,
      publisher: {
        "@type": "Organization",
        name: "BuddyMoney",
        url: "https://www.buddymoney.com",
      },
      inLanguage: "en",
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

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
            Welcome to <strong>BuddyMoney</strong>. By using our website, app
            experience, progressive web app, tools, calculators, guides, or
            credit card comparison resources, you agree to these Terms of
            Service.
          </p>
        </header>

        <div className="space-y-6 text-sm md:text-base text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              1. Educational Use Only
            </h2>
            <p>
              BuddyMoney provides educational tools, calculators, guides, and
              comparison resources. We are not a bank, lender, credit card
              issuer, financial advisor, tax advisor, or legal advisor. Nothing
              on BuddyMoney should be treated as personalized financial advice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              2. Use of Our Tools
            </h2>
            <p>
              Our budgeting, debt payoff, emergency fund, mortgage, tip, bill
              splitting, and credit card tools are provided for informational
              purposes only. Calculations are estimates based on the information
              you enter and may not reflect your exact financial situation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              3. No Guarantee of Results
            </h2>
            <p>
              BuddyMoney does not guarantee savings, debt payoff results, credit
              approval, credit score improvement, card eligibility, rewards
              value, or financial outcomes. You are responsible for reviewing
              official terms and making decisions that fit your situation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              4. Credit Card and Partner Offers
            </h2>
            <p>
              BuddyMoney may display educational credit card information,
              sample cards, partner offers, affiliate links, or sponsored
              placements. Offers may change at any time. Always review the
              official issuer terms, fees, APRs, rewards rules, disclosures, and
              eligibility requirements before applying.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              5. App and Local Device Features
            </h2>
            <p>
              BuddyMoney may use browser storage or localStorage to remember
              tool inputs, preferences, or calculator results on your device.
              You can clear this information through your browser or app
              settings. You should not enter sensitive information such as bank
              passwords, Social Security numbers, or full credit card numbers
              into BuddyMoney tools.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              6. User Responsibilities
            </h2>
            <p>
              You agree to use BuddyMoney lawfully and responsibly. You may not
              misuse the site or app, interfere with functionality, attempt to
              access systems without permission, scrape content at scale,
              reverse engineer tools, or use BuddyMoney for fraudulent or
              harmful activity.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              7. Third-Party Links
            </h2>
            <p>
              BuddyMoney may link to third-party websites, financial
              institutions, advertisers, app stores, or partner services. We do
              not control those third parties and are not responsible for their
              content, terms, privacy policies, products, or decisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              8. Intellectual Property
            </h2>
            <p>
              BuddyMoney content, branding, designs, text, tools, and other
              materials are owned by BuddyMoney or used with permission. You may
              use BuddyMoney for personal, non-commercial purposes, but you may
              not copy, resell, or redistribute our content or tools without
              permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              9. Availability and Updates
            </h2>
            <p>
              We may update, change, pause, or discontinue any BuddyMoney
              feature, tool, route, app experience, or content at any time. We
              may also correct errors or update information without notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              10. Limitation of Liability
            </h2>
            <p>
              BuddyMoney is provided “as is” and “as available.” To the fullest
              extent allowed by law, BuddyMoney is not liable for losses,
              damages, financial decisions, missed payments, denied
              applications, incorrect estimates, or other outcomes related to
              your use of our tools, content, links, or app experience.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              11. Changes to These Terms
            </h2>
            <p>
              We may update these Terms from time to time. Changes will be
              posted on this page with a new “Last updated” date. Continued use
              of BuddyMoney after updates means you accept the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              12. Contact
            </h2>
            <p>
              If you have questions about these Terms, contact BuddyMoney at{" "}
              <a
                href="mailto:support@buddymoney.com"
                className="font-semibold text-emerald-700 underline underline-offset-2"
              >
                support@buddymoney.com
              </a>
              .
            </p>
          </section>

          <p className="text-xs text-slate-500 mt-8">
            Last updated: May 19, 2026
          </p>
        </div>
      </div>
    </main>
  );
}
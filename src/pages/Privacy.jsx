import React, { useEffect } from "react";
import { setCanonical } from "../utils/seo";

export default function Privacy() {
  useEffect(() => {
    setCanonical("/privacy");

    const description =
      "Read the BuddyMoney Privacy Policy. Learn how BuddyMoney handles app data, localStorage, analytics, affiliate links, and financial tool usage.";

    document.title = "Privacy Policy | BuddyMoney";

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
      "@type": "PrivacyPolicy",
      name: "Privacy Policy | BuddyMoney",
      url: "https://www.buddymoney.com/privacy",
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
            Privacy Policy
          </p>

          <h1 className="text-3xl font-bold text-slate-900 mb-3">
            Privacy Policy
          </h1>

          <p className="text-sm md:text-base text-slate-600">
            At <strong>BuddyMoney</strong>, your privacy matters. This Privacy
            Policy explains how we collect, use, store, and protect information
            when you use BuddyMoney through our website, mobile app experience,
            progressive web app, or finance tools.
          </p>
        </header>

        <div className="space-y-6 text-sm md:text-base text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              1. Information We Collect
            </h2>
            <p>
              BuddyMoney may collect basic information you choose to provide,
              such as your name or email address when you subscribe to updates,
              contact us, or sign up for future features. We may also collect
              general usage information such as pages visited, device type,
              browser type, app interactions, and performance data to help
              improve BuddyMoney.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              2. Financial Tool Inputs
            </h2>
            <p>
              BuddyMoney offers tools such as budget calculators, debt payoff
              calculators, emergency fund calculators, tip calculators, bill
              splitters, and credit card comparison tools. Information you enter
              into these tools is used to calculate estimates and improve your
              experience. BuddyMoney does not require users to create an account
              to use most financial planning tools. Unless a future feature
              clearly asks you to submit information, tool inputs are generally
              processed locally within your browser or app experience and are not
              transmitted to BuddyMoney's servers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              3. Local Storage and App Data
            </h2>
            <p>
              BuddyMoney may use localStorage or similar on-device storage to
              save tool inputs, preferences, or calculator results on your own
              device. This helps the app remember your information between
              sessions on your own device. LocalStorage data stays on your device
              unless you clear your browser or app data. BuddyMoney does not use
              localStorage to collect, transmit, or store sensitive financial
              account information, account credentials, banking passwords, or
              other sensitive authentication information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              4. How We Use Information
            </h2>
            <p>
              We use information to provide BuddyMoney tools, improve app
              performance, respond to inquiries, send requested updates, improve
              educational content, detect technical issues, and understand which
              features are useful.{" "}
              <span className="font-semibold">We do not sell your personal data.</span>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              5. Cookies and Analytics
            </h2>
            <p>
              BuddyMoney may use cookies, analytics tools, or similar
              technologies to understand site and app usage, improve performance,
              and measure engagement. You can control cookies through your
              browser settings. If analytics tools are added or changed, they
              will be used to improve BuddyMoney and not to sell your personal
              information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              6. Affiliate Links and Third-Party Offers
            </h2>
            <p>
              BuddyMoney may include links to third-party financial products,
              credit card providers, advertisers, or affiliate partners. If you
              click a partner link or apply through a third-party site, that
              third party may collect information under its own privacy policy.
              BuddyMoney may earn compensation from some partner links, but we
              aim to keep our tools and educational content clear and helpful.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              7. Third-Party Websites
            </h2>
            <p>
              BuddyMoney may link to websites, financial institutions, app
              stores, advertisers, or other third-party services. We are not
              responsible for the privacy practices, terms, or content of those
              third-party websites. Always review their policies before
              providing personal or financial information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              8. Children’s Privacy
            </h2>
            <p>
              BuddyMoney is intended for general audiences and is not designed
              for children under 13. We do not knowingly collect personal
              information from children under 13. If you believe a child has
              provided personal information, please contact us so we can review
              and remove it if appropriate.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              9. Data Security
            </h2>
            <p>
              We use reasonable safeguards to help protect information. However,
              no website, app, or internet transmission can be guaranteed to be
              completely secure. You should avoid entering sensitive personal
              information, bank login details, Social Security numbers, or full
              credit card numbers into BuddyMoney tools.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              10. Your Choices
            </h2>
            <p>
              You can unsubscribe from emails, clear cookies, clear browser or
              app storage, or stop using BuddyMoney at any time. You may also
              contact us with privacy-related questions or requests.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              11. Financial Disclaimer
            </h2>
            <p>
              BuddyMoney provides educational tools and estimates only. We are
              not a bank, lender, credit card issuer, financial advisor, tax
              advisor, or legal advisor. Results from calculators and comparison
              tools are estimates and should not be treated as financial advice.
              Always review official terms and consider speaking with a
              qualified professional before making financial decisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              12. Updates to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will
              be posted on this page with a new “Last updated” date. Continued
              use of BuddyMoney after updates means you accept the revised
              policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              13. Contact
            </h2>
            <p>
              If you have questions about this Privacy Policy, you can contact
              BuddyMoney at{" "}
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
            Last updated: July 15, 2026
          </p>
        </div>
      </div>
    </main>
  );
}
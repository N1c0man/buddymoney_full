import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { setCanonical } from "../utils/seo";

export default function AffiliateDisclosure() {
  useEffect(() => {
    document.title = "Affiliate Disclosure | BuddyMoney";

    const content =
      "Learn how BuddyMoney uses affiliate links, educational finance content, advertising, and partner relationships across our website and app experience.";

    let metaDescription = document.querySelector(
      'meta[name="description"]'
    );

    if (metaDescription) {
      metaDescription.setAttribute("content", content);
    } else {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      metaDescription.content = content;
      document.head.appendChild(metaDescription);
    }

    setCanonical("/affiliate-disclosure");

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Affiliate Disclosure | BuddyMoney",
      url: "https://www.buddymoney.com/affiliate-disclosure",
      description: content,
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
    <main
      className="min-h-screen bg-gradient-to-b from-green-50 via-white to-emerald-50/40"
      itemScope
      itemType="https://schema.org/WebPage"
    >
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Back link */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center text-sm text-green-700 hover:text-green-800"
          >
            <span className="mr-1">←</span> Back to BuddyMoney
          </Link>
        </div>

        {/* Header */}
        <header className="mb-8">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-emerald-500 mb-3">
            Affiliate Disclosure
          </p>

          <h1
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
            itemProp="headline"
          >
            Affiliate Disclosure
          </h1>

          <p
            className="mt-3 text-base text-slate-600 leading-relaxed"
            itemProp="description"
          >
            Transparency matters to us. This page explains how BuddyMoney earns
            revenue and how affiliate links, educational finance content,
            advertising, and partner relationships work across our website and
            app experience.
          </p>
        </header>

        <section className="space-y-8 text-slate-700 text-base leading-relaxed bg-white/70 border border-emerald-100 rounded-2xl shadow-sm p-6 sm:p-8">
          {/* Why this page exists */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Why you&apos;re seeing this disclosure
            </h2>

            <p>
              BuddyMoney is a free personal finance resource that provides
              budgeting tools, calculators, educational guides, and app-based
              finance experiences designed to help people make more informed
              money decisions.
            </p>

            <p className="mt-3">
              BuddyMoney may be accessed through our website, mobile-friendly
              app experience, or progressive web app (PWA). To keep these tools
              free to use, we may earn compensation when users click certain
              links, view advertising, or apply for financial products through
              partner websites.
            </p>

            <p className="mt-3">
              The U.S. Federal Trade Commission (FTC) and many advertising and
              affiliate partners require us to clearly disclose these
              relationships. This page is our plain-language explanation of how
              that works.
            </p>
          </div>

          {/* How affiliate links work */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              How affiliate links work on BuddyMoney
            </h2>

            <p>
              Some links on BuddyMoney are <strong>affiliate links</strong>.
              That means:
            </p>

            <ul className="mt-3 list-disc list-inside space-y-1">
              <li>
                If you click an affiliate link and sign up, apply, or complete
                a qualifying action, BuddyMoney may earn a commission or
                referral fee.
              </li>

              <li>
                This compensation is paid by the company,{" "}
                <strong>not by you</strong>. Using our links generally does not
                increase your cost.
              </li>

              <li>
                In some situations, affiliate links may include promotional
                bonuses, rewards, or introductory offers from the provider.
              </li>
            </ul>
          </div>

          {/* Types of partners */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Types of partners we may work with
            </h2>

            <p>
              BuddyMoney may work with companies and networks such as:
            </p>

            <ul className="mt-3 list-disc list-inside space-y-1">
              <li>Credit card issuers and comparison platforms</li>
              <li>Personal loan and debt consolidation providers</li>
              <li>Banking apps and budgeting tools</li>
              <li>Savings, investing, and brokerage platforms</li>
              <li>Insurance or finance-related service providers</li>
              <li>Advertising and analytics networks</li>
            </ul>

            <p className="mt-3">
              We only consider partnerships that we believe may be relevant or
              potentially useful to BuddyMoney users.
            </p>
          </div>

          {/* Editorial independence */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Our approach to recommendations
            </h2>

            <p>
              Compensation from partners may influence{" "}
              <em>where</em> certain products or offers appear on BuddyMoney
              (for example, in featured sections or highlighted placements).
            </p>

            <p className="mt-3">
              However, our goal is to create tools and educational resources
              that are genuinely useful, beginner-friendly, and transparent.
            </p>

            <p className="mt-3">
              We aim to explain financial concepts in plain language and help
              users compare options thoughtfully before making decisions.
            </p>
          </div>

          {/* Educational use only */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Educational information only
            </h2>

            <p>
              BuddyMoney provides educational tools, calculators, guides, and
              comparison content only. We are not a bank, lender, broker,
              financial advisor, investment advisor, tax advisor, or legal
              advisor.
            </p>

            <p className="mt-3">
              Credit card approvals, interest rates, annual fees, rewards,
              promotional offers, and account terms are determined solely by the
              financial institution or provider — not by BuddyMoney.
            </p>

            <p className="mt-3">
              Offers and product details may change without notice. Users should
              always review official provider terms carefully before applying
              for any financial product.
            </p>

            <p className="mt-3">
              Nothing on BuddyMoney should be interpreted as personalized
              financial, legal, tax, or investment advice.
            </p>
          </div>

          {/* Ads / Adsense */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Advertising and display ads
            </h2>

            <p>
              BuddyMoney may display advertising through networks such as Google
              AdSense or other advertising partners.
            </p>

            <p className="mt-3">
              These ads may be personalized or targeted based on browsing
              behavior, app activity, general location, or device information,
              depending on your settings and applicable privacy controls.
            </p>

            <p className="mt-3">
              Advertising revenue helps support hosting, development, app
              improvements, content creation, and the continued availability of
              BuddyMoney’s free tools and resources.
            </p>
          </div>

          {/* No extra cost */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              No extra cost to you
            </h2>

            <p>
              Using BuddyMoney affiliate links generally does{" "}
              <strong>not increase your price</strong>.
            </p>

            <p className="mt-3">
              In some situations, users may even receive special promotional
              offers, welcome bonuses, or discounts through affiliate partners.
            </p>
          </div>

          {/* Third-party responsibility */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Third-party websites and services
            </h2>

            <p>
              When you leave BuddyMoney and visit a partner or advertiser
              website, you are subject to that third party’s own terms, privacy
              policies, disclosures, and product conditions.
            </p>

            <p className="mt-3">
              BuddyMoney is not responsible for third-party approvals, denials,
              rates, product changes, website behavior, or account decisions.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Questions about this disclosure?
            </h2>

            <p>
              If you have questions about how BuddyMoney earns revenue or how
              affiliate relationships are presented, please contact us.
            </p>

            <p className="mt-3">
              We value transparency and are always open to feedback from our
              users.
            </p>

            <p className="mt-3">
              Contact:{" "}
              <a
                href="mailto:support@buddymoney.com"
                className="font-semibold text-emerald-700 underline underline-offset-2"
              >
                support@buddymoney.com
              </a>
            </p>
          </div>

          {/* Last updated */}
          <p className="text-xs text-slate-500">
            Last updated: May 19, 2026
          </p>

          {/* Final disclaimer */}
          <p className="text-xs text-slate-500 border-t border-slate-200 pt-4">
            This Affiliate Disclosure is provided for transparency and general
            educational purposes only. BuddyMoney does not provide financial,
            legal, tax, or investment advice. Always review official provider
            terms before applying for financial products.
          </p>
        </section>
      </div>
    </main>
  );
}
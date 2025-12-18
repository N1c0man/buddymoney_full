import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { setCanonical } from "../utils/seo";

export default function AffiliateDisclosure() {
  // SEO: title + meta description + canonical
  useEffect(() => {
    document.title = "Affiliate Disclosure | BuddyMoney";

    const content =
      "Learn how BuddyMoney uses affiliate links and advertising, how we earn compensation, and why transparency matters for our free money tools and guides.";

    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", content);
    } else {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      metaDescription.content = content;
      document.head.appendChild(metaDescription);
    }

    // ✅ Canonical URL for /affiliate-disclosure
    setCanonical("/affiliate-disclosure");
  }, []);

  return (
    <main
      className="min-h-screen bg-gradient-to-b from-green-50 via-white to-emerald-50/40"
      itemScope
      itemType="https://schema.org/WebPage"
    >
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Breadcrumb / Back link */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center text-sm text-green-700 hover:text-green-800"
          >
            <span className="mr-1">←</span> Back to BuddyMoney
          </Link>
        </div>

        {/* Page heading */}
        <header className="mb-8">
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
            revenue and how affiliate links and advertising work on this site.
          </p>
        </header>

        <section className="space-y-8 text-slate-700 text-base leading-relaxed bg-white/70 border border-emerald-100 rounded-2xl shadow-sm p-6 sm:p-8">
          {/* Why this page exists */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Why you&apos;re seeing this disclosure
            </h2>
            <p>
              BuddyMoney is a free resource that provides tools, calculators,
              and educational content to help you make more confident money
              decisions. To keep the site free to use, we sometimes earn
              compensation when you click on certain links or sign up for
              products we mention.
            </p>
            <p className="mt-3">
              The U.S. Federal Trade Commission (FTC) and many of our partners
              require that we clearly disclose these relationships. This page is
              our plain-language explanation of how that works.
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
                If you click an affiliate link and sign up or apply for a
                product, we may earn a commission or referral fee.
              </li>
              <li>
                This compensation is paid by the company,{" "}
                <strong>not by you</strong>. You don&apos;t pay anything extra.
              </li>
              <li>
                In many cases, you may even receive a special bonus or promo for
                using our link.
              </li>
            </ul>
          </div>

          {/* Types of partners */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Types of partners we may work with
            </h2>
            <p>Over time, BuddyMoney may partner with companies such as:</p>
            <ul className="mt-3 list-disc list-inside space-y-1">
              <li>Credit card issuers and comparison sites</li>
              <li>Personal loan and debt consolidation providers</li>
              <li>Banking apps and budgeting tools</li>
              <li>Brokerages, savings, and investing platforms</li>
              <li>Other financial products and services</li>
            </ul>
            <p className="mt-3">
              We only consider partnerships with companies that we believe are
              relevant to our audience and may be helpful for certain
              situations.
            </p>
          </div>

          {/* Editorial independence */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Our approach to recommendations
            </h2>
            <p>
              Compensation from partners may influence <em>where</em> a product
              appears on the site (for example, in a featured section), but it
              does not change our core goal:
            </p>
            <p className="mt-3">
              <strong>
                We aim to highlight tools and products that we genuinely believe
                can help our readers.
              </strong>
            </p>
            <p className="mt-3">
              However, nothing on BuddyMoney should be considered personalized
              financial advice. Everyone&apos;s situation is different. Before
              applying for any financial product, you should carefully review
              the terms and consider whether it&apos;s right for you, and
              consider speaking with a qualified professional if needed.
            </p>
          </div>

          {/* Ads / Adsense */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Advertising and display ads
            </h2>
            <p>
              In addition to affiliate links, BuddyMoney may display ads from
              networks such as Google AdSense or other advertising partners.
              These ads may be targeted based on your browsing behavior or other
              factors, depending on your settings and consent.
            </p>
            <p className="mt-3">
              Display ads help support the costs of running this site (hosting,
              development, design, and content creation) while keeping the tools
              and articles free for you to use.
            </p>
          </div>

          {/* No extra cost */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              No extra cost to you
            </h2>
            <p>
              Using our affiliate links{" "}
              <strong>never increases your price</strong>. In many cases,
              you&apos;ll see the same pricing you would get by going directly
              to the company&apos;s website — or occasionally a better
              promotional offer.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Questions about this disclosure?
            </h2>
            <p>
              If you have any questions about how BuddyMoney earns money, or if
              you see a link that you believe should be disclosed differently,
              please reach out. We take transparency seriously and are always
              open to feedback.
            </p>
            <p className="mt-3">
              You can contact us using the information provided on our{" "}
              <Link
                to="/about"
                className="text-green-700 font-semibold hover:text-green-800"
              >
                About
              </Link>{" "}
              page.
            </p>
          </div>

          {/* Last note */}
          <p className="text-xs text-slate-500 mt-4">
            This Affiliate Disclosure is provided for transparency and general
            information only and is not legal or financial advice.
          </p>
        </section>
      </div>
    </main>
  );
}

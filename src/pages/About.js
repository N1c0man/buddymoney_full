import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { setCanonical } from "../utils/seo";

export default function About() {
  // SEO: title + meta description + JSON-LD + canonical
  useEffect(() => {
    document.title =
      "About BuddyMoney | Simple Tools for Better Money Decisions";

    const content =
      "Learn what BuddyMoney is about — simple money tools, friendly guides, no jargon. Budgeting, debt payoff, savings, emergency fund planning and more.";

    // Meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", content);
    } else {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      metaDescription.content = content;
      document.head.appendChild(metaDescription);
    }

    // ✅ Canonical URL for /about
    useEffect(() => {
    setCanonical("/about");
    }, []);


    // 🔧 JSON-LD structured data for AboutPage
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "About BuddyMoney",
      url: "https://buddymoney.com/about",
      description: content,
      publisher: {
        "@type": "Organization",
        name: "BuddyMoney",
        url: "https://buddymoney.com",
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://buddymoney.com/about",
      },
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
        {/* Page Heading */}
        <header className="mb-8 text-center" itemProp="mainEntity">
          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase text-emerald-500 mb-3"
            itemProp="about"
          >
            About BuddyMoney
          </p>

          <h1
            className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3"
            itemProp="headline"
          >
            Your Friendly Money Companion
          </h1>

          <p
            className="text-base text-slate-600 leading-relaxed max-w-lg mx-auto"
            itemProp="description"
          >
            BuddyMoney helps beginners grow confident with money using simple tools,
            clear guides, and a supportive tone — no jargon, no judgment.
          </p>
        </header>

        {/* Main Content Card */}
        <section
          className="bg-white/70 border border-emerald-100 rounded-2xl shadow-sm p-6 sm:p-8 space-y-6"
          itemScope
          itemType="https://schema.org/Article"
        >
          {/* Intro */}
          <div
            className="space-y-4 text-slate-700 leading-relaxed"
            itemProp="articleBody"
          >
            <p>
              Money can feel overwhelming, especially when every website sounds like
              it’s written for experts. BuddyMoney was built for real people — anyone
              who wants practical steps, clear numbers, and tools that make the
              complicated feel simple.
            </p>

            <p>
              Our mission is to remove stress from everyday money decisions. Whether
              you're budgeting your first paycheck, paying off debt, or building your
              emergency fund, BuddyMoney gives you clarity and confidence through easy
              calculators and friendly education.
            </p>
          </div>

          {/* Our Mission graphic */}
          <div
            className="flex items-center gap-4 p-4 rounded-xl bg-emerald-50 border border-emerald-100"
            itemScope
            itemType="https://schema.org/Organization"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
              <span className="text-2xl" aria-hidden="true">
                🌱
              </span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Our Mission
              </h2>
              <p
                className="text-sm text-slate-700 leading-relaxed"
                itemProp="missionStatement"
              >
                To make money feel less scary and more doable — one simple tool,
                one clear explanation, and one small step at a time.
              </p>
            </div>
          </div>

          {/* Why BuddyMoney Exists */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">
              Why BuddyMoney Exists
            </h2>
            <p className="text-slate-700 leading-relaxed">
              We believe everyone deserves access to financial tools that are simple,
              beautiful, and easy to understand. No hidden motives. No complicated
              jargon. Just clear guidance and helpful calculators that empower you to
              take the next step forward.
            </p>
          </div>

          {/* What BuddyMoney Offers */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              What You’ll Find Here
            </h2>

            <div className="grid sm:grid-cols-2 gap-4 text-slate-700 text-sm">
              {/* Tools */}
              <div
                className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 flex items-start gap-3"
                itemScope
                itemType="https://schema.org/Service"
              >
                <div className="mt-0.5 h-8 w-8 flex items-center justify-center rounded-full bg-white shadow-sm">
                  <span className="text-lg">📊</span>
                </div>
                <div>
                  <h3
                    className="font-semibold text-slate-900 mb-1"
                    itemProp="name"
                  >
                    Easy Tools
                  </h3>
                  <p itemProp="description">
                    Budgeting, debt payoff, savings, emergency fund, and more.
                  </p>
                </div>
              </div>

              {/* Guides */}
              <div
                className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 flex items-start gap-3"
                itemScope
                itemType="https://schema.org/CreativeWork"
              >
                <div className="mt-0.5 h-8 w-8 flex items-center justify-center rounded-full bg-white shadow-sm">
                  <span className="text-lg">📚</span>
                </div>
                <div>
                  <h3
                    className="font-semibold text-slate-900 mb-1"
                    itemProp="name"
                  >
                    Friendly Guides
                  </h3>
                  <p itemProp="description">
                    Simple explanations written for everyday people, not experts.
                  </p>
                </div>
              </div>

              {/* Blog */}
              <div
                className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 flex items-start gap-3"
                itemScope
                itemType="https://schema.org/Blog"
              >
                <div className="mt-0.5 h-8 w-8 flex items-center justify-center rounded-full bg-white shadow-sm">
                  <span className="text-lg">📝</span>
                </div>
                <div>
                  <h3
                    className="font-semibold text-slate-900 mb-1"
                    itemProp="name"
                  >
                    Blog & Tips
                  </h3>
                  <p itemProp="description">
                    Actionable insights you can start using today.
                  </p>
                </div>
              </div>

              {/* Supportive Tone */}
              <div
                className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 flex items-start gap-3"
                itemScope
                itemType="https://schema.org/CreativeWork"
              >
                <div className="mt-0.5 h-8 w-8 flex items-center justify-center rounded-full bg-white shadow-sm">
                  <span className="text-lg">🤝</span>
                </div>
                <div>
                  <h3
                    className="font-semibold text-slate-900 mb-1"
                    itemProp="name"
                  >
                    Supportive Tone
                  </h3>
                  <p itemProp="description">
                    No shame. No confusion. Just clarity and help.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Get in Touch */}
          <div itemScope itemType="https://schema.org/ContactPage">
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Get in Touch
            </h2>
            <p className="text-slate-700" itemProp="description">
              We always love hearing from our readers. If you have suggestions or want
              to reach out, you can contact us using the email provided on the{" "}
              <Link
                to="/affiliate-disclosure"
                className="text-green-700 font-medium hover:text-green-800"
                itemProp="url"
              >
                Affiliate Disclosure
              </Link>{" "}
              page.
            </p>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-slate-500 mt-4 leading-relaxed">
            BuddyMoney does not provide financial, legal, or tax advice. All tools and
            content are for educational and planning purposes only. Please consult a
            qualified professional for personalized guidance.
          </p>
        </section>

        {/* CTA Banner */}
        <section className="mt-8">
          <div className="rounded-2xl bg-emerald-600 text-white px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
            <div>
              <h2 className="text-lg font-semibold">
                Ready to start exploring your money?
              </h2>
              <p className="text-sm text-emerald-50">
                Try our free calculators and tools to see your numbers more clearly.
              </p>
            </div>
            <Link
              to="/tools"
              className="inline-flex items-center justify-center rounded-full bg-white text-emerald-700 font-semibold text-sm px-5 py-2 shadow hover:bg-emerald-50 transition"
              itemProp="url"
            >
              Explore our Tools →
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

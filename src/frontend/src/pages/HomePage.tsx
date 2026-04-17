import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, CheckCircle } from "lucide-react";
import AboutSection from "../components/AboutSection";
import HeroSection from "../components/HeroSection";
import HowItWorksSection from "../components/HowItWorksSection";
import LeadCTASection from "../components/LeadCTASection";
import PropertyShowcase from "../components/PropertyShowcase";
import ServicesSection from "../components/ServicesSection";
import TestimonialsSection from "../components/TestimonialsSection";
import WhyUsSection from "../components/WhyUsSection";
import { properties } from "../data/properties";

const TRUST_ITEMS = [
  "Verified Listings",
  "Transparent Deals",
  "Local Experts (Bopal)",
  "End-to-End Support",
];

const CATEGORIES = [
  { label: "Buy", value: "buy", icon: "🏠" },
  { label: "Rent", value: "rent", icon: "🔑" },
  { label: "Sell", value: "sell", icon: "📋" },
  { label: "Invest", value: "invest", icon: "📈" },
];

export default function HomePage() {
  const navigate = useNavigate();
  const showcaseProperties = properties.slice(0, 12);

  return (
    <div>
      {/* ── Hero ── */}
      <HeroSection />

      {/* ── Trust Bar ── */}
      <section
        className="border-b border-border/40"
        style={{ background: "var(--surface-2)" }}
        data-ocid="trust_bar.section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {TRUST_ITEMS.map((item, i) => (
              <span
                key={item}
                className="flex items-center gap-2 text-sm font-body text-foreground"
              >
                <CheckCircle
                  size={15}
                  className="shrink-0"
                  style={{ color: "var(--cyan)" }}
                />
                <span className="font-medium">{item}</span>
                {i < TRUST_ITEMS.length - 1 && (
                  <span className="hidden sm:inline text-border ml-2">|</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quick Navigation ── */}
      <section
        className="border-b border-border/40 py-10"
        style={{ background: "var(--surface-3)" }}
        data-ocid="quick_nav.section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display font-bold text-xl sm:text-2xl text-foreground mb-2">
            What are you looking for?
          </h2>
          <p className="font-body text-sm text-muted-foreground mb-6">
            Choose a category to find the right properties
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.map((cat) => (
              <button
                type="button"
                key={cat.value}
                onClick={() =>
                  void navigate({
                    to: "/properties",
                    search: { category: cat.value } as Record<string, string>,
                  })
                }
                className="flex items-center gap-2 px-6 py-3 rounded-full font-body text-sm font-semibold transition-smooth min-w-[100px] justify-center"
                style={{
                  border: "1px solid rgba(58,134,255,0.25)",
                  color: "var(--cyan)",
                }}
                data-ocid={`quick_nav.${cat.value}_button`}
              >
                <span className="text-base">{cat.icon}</span> {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Property Showcase ── */}
      <PropertyShowcase properties={showcaseProperties} />

      {/* ── Why Us ── */}
      <WhyUsSection />

      {/* ── Services ── */}
      <ServicesSection />

      {/* ── How It Works ── */}
      <HowItWorksSection />

      {/* ── Testimonials ── */}
      <TestimonialsSection />

      {/* ── About ── */}
      <AboutSection />

      {/* ── Lead CTA ── */}
      <LeadCTASection />

      {/* ── View All Properties CTA ── */}
      <section
        className="py-10 border-t border-border/30"
        style={{ background: "var(--surface-1)" }}
        data-ocid="view_all.section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-muted-foreground text-sm">
            Looking for more options? Browse our full property listings.
          </p>
          <button
            type="button"
            onClick={() => void navigate({ to: "/properties" })}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-display font-semibold text-sm transition-smooth"
            style={{
              border: "1px solid rgba(58,134,255,0.3)",
              color: "var(--cyan)",
            }}
            data-ocid="view_all.browse_button"
          >
            Browse All Properties <ArrowRight size={15} />
          </button>
        </div>
      </section>
    </div>
  );
}

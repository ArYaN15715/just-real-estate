import { ArrowRight, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const SERVICES = [
  {
    id: "buy",
    title: "Buy Property",
    tagline: "Find your perfect home",
    desc: "We shortlist only properties that match your real needs and budget — no pressure, no time-wasting. From first visit to final registration, we guide every step.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&q=80&auto=format&fit=crop",
    cta: "Start Your Search",
    accent: "#3a86ff",
  },
  {
    id: "sell",
    title: "Sell Property",
    tagline: "Get the right price",
    desc: "Transparent valuations, genuine buyers, and fair negotiations. We don't inflate numbers — we deliver real deals that close smoothly.",
    image:
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=900&q=80&auto=format&fit=crop",
    cta: "List Your Property",
    accent: "#f5a623",
  },
  {
    id: "rent",
    title: "Rental Assistance",
    tagline: "Verified tenants & landlords",
    desc: "Both sides vetted, documentation handled, zero disputes. We make rentals in South Bopal simple and trustworthy.",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=80&auto=format&fit=crop",
    cta: "Explore Rentals",
    accent: "#3a86ff",
  },
  {
    id: "invest",
    title: "Investment Guidance",
    tagline: "Honest ROI, real returns",
    desc: "We provide real data on price trends, yield estimates, and growth corridors — no inflated promises, just facts that help you invest confidently.",
    image:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=900&q=80&auto=format&fit=crop",
    cta: "Explore Opportunities",
    accent: "#f5a623",
  },
  {
    id: "consult",
    title: "Property Consultation",
    tagline: "Expert guidance, zero pressure",
    desc: "Not sure where to start? A 20-minute call with our experts clarifies your options, budget range, and best areas in South Bopal.",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80&auto=format&fit=crop",
    cta: "Book a Free Call",
    accent: "#3a86ff",
  },
];

const WHATSAPP_URL =
  "https://wa.me/919876543210?text=Hi%20Just%20Real%20Estate%2C%20I%27d%20like%20to%20know%20more%20about%20your%20services";

export default function ServicesSection() {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState<number | null>(0);

  const current = SERVICES[active];

  return (
    <section
      className="relative py-28 overflow-hidden"
      style={{ background: "var(--surface-1)" }}
      data-ocid="services.section"
    >
      <div
        className="pointer-events-none absolute top-0 right-0 w-[600px] h-[600px] opacity-10 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse, rgba(58,134,255,0.3) 0%, transparent 70%)",
          transform: "translate(30%, -30%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="inline-block text-xs font-body font-semibold tracking-widest uppercase mb-4 px-3 py-1 rounded-full"
            style={{
              color: "var(--gold)",
              background: "rgba(245,166,35,0.1)",
              border: "1px solid rgba(245,166,35,0.2)",
            }}
          >
            What We Do
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4">
            Services Built for You
          </h2>
          <p className="font-body text-muted-foreground text-base max-w-xl mx-auto">
            Simple services, clear benefits — designed around your needs
          </p>
        </motion.div>

        {/* Desktop: Split layout */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_1.5fr] gap-10 items-center">
          {/* Left: Service list */}
          <div className="flex flex-col gap-2">
            {SERVICES.map((s, i) => (
              <motion.button
                key={s.id}
                type="button"
                onClick={() => setActive(i)}
                whileHover={{ x: 6 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="relative text-left px-6 py-5 rounded-xl transition-smooth group"
                style={{
                  background:
                    active === i ? "rgba(58,134,255,0.08)" : "transparent",
                  border:
                    active === i
                      ? "1px solid rgba(58,134,255,0.25)"
                      : "1px solid transparent",
                }}
                data-ocid={`services.item.${i + 1}`}
              >
                {active === i && (
                  <motion.div
                    layoutId="service-indicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full"
                    style={{ background: s.accent }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className="font-display font-semibold text-base transition-smooth"
                      style={{
                        color:
                          active === i ? "var(--cyan)" : "var(--foreground)",
                      }}
                    >
                      {s.title}
                    </p>
                    <p className="font-body text-sm text-muted-foreground mt-0.5">
                      {s.tagline}
                    </p>
                  </div>
                  <motion.div
                    animate={{
                      x: active === i ? 4 : 0,
                      opacity: active === i ? 1 : 0.4,
                    }}
                    transition={{ duration: 0.25 }}
                  >
                    <ArrowRight
                      size={18}
                      style={{ color: active === i ? s.accent : undefined }}
                    />
                  </motion.div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Right: Dynamic panel */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-cinematic">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.04, x: 24 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.97, x: -16 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <img
                  src={current.image}
                  alt={current.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(10,14,26,0.92) 0%, rgba(10,14,26,0.3) 50%, transparent 100%)",
                  }}
                />

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.4 }}
                    className="font-body text-xs font-semibold tracking-widest uppercase mb-2"
                    style={{ color: current.accent }}
                  >
                    {current.tagline}
                  </motion.p>
                  <motion.h3
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.45 }}
                    className="font-display font-bold text-2xl text-white mb-3"
                  >
                    {current.title}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.27, duration: 0.45 }}
                    className="font-body text-sm leading-relaxed mb-5"
                    style={{ color: "rgba(255,255,255,0.75)" }}
                  >
                    {current.desc}
                  </motion.p>
                  <motion.a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.34, duration: 0.4 }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-body text-sm font-semibold transition-smooth"
                    style={{
                      background: current.accent,
                      color: "#0a0e1a",
                    }}
                    data-ocid={`services.cta.${active + 1}`}
                  >
                    {current.cta} <ArrowRight size={15} />
                  </motion.a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile: Accordion */}
        <div className="lg:hidden flex flex-col gap-3">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.id}
              className="glass rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              data-ocid={`services.mobile.item.${i + 1}`}
            >
              <button
                type="button"
                className="w-full text-left px-5 py-4 flex items-center justify-between"
                onClick={() => setExpanded(expanded === i ? null : i)}
              >
                <div>
                  <p className="font-display font-semibold text-sm text-foreground">
                    {s.title}
                  </p>
                  <p className="font-body text-xs text-muted-foreground">
                    {s.tagline}
                  </p>
                </div>
                <motion.div
                  animate={{ rotate: expanded === i ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <ChevronDown size={16} className="text-muted-foreground" />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {expanded === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5">
                      <div className="aspect-video rounded-xl overflow-hidden mb-4">
                        <img
                          src={s.image}
                          alt={s.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
                        {s.desc}
                      </p>
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-body text-sm font-semibold"
                        style={{ background: s.accent, color: "#0a0e1a" }}
                      >
                        {s.cta} <ArrowRight size={14} />
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

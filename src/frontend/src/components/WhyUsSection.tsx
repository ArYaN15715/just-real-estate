import { CheckCircle2, Lightbulb, MessageSquare, Shield } from "lucide-react";
import { type Variants, motion } from "motion/react";

const WHY_ITEMS = [
  {
    icon: Shield,
    title: "No Hidden Charges",
    desc: "Every cost is disclosed upfront. What you see is what you pay — always.",
    color: "#3a86ff",
    glow: "rgba(58, 134, 255, 0.4)",
  },
  {
    icon: Lightbulb,
    title: "Genuine Advice",
    desc: "We recommend what suits you, not what earns us more commission.",
    color: "#f5a623",
    glow: "rgba(245, 166, 35, 0.4)",
  },
  {
    icon: CheckCircle2,
    title: "Verified Listings",
    desc: "All properties are physically inspected and legally verified before listing.",
    color: "#3a86ff",
    glow: "rgba(58, 134, 255, 0.4)",
  },
  {
    icon: MessageSquare,
    title: "Clear Communication",
    desc: "Plain language, no jargon. You'll always know exactly what's happening.",
    color: "#f5a623",
    glow: "rgba(245, 166, 35, 0.4)",
  },
];

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.1,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

export default function WhyUsSection() {
  return (
    <section
      className="relative py-28 overflow-hidden"
      style={{ background: "var(--surface-2)" }}
      id="why-us"
      data-ocid="why_us.section"
    >
      {/* Background glow blob */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(ellipse, rgba(58,134,255,0.25) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
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
              color: "var(--cyan)",
              background: "rgba(58,134,255,0.1)",
              border: "1px solid rgba(58,134,255,0.2)",
            }}
          >
            Our Promise
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4">
            Why Just Real Estate
          </h2>
          <p className="font-body text-muted-foreground text-base max-w-xl mx-auto">
            We built our reputation on four unbreakable commitments
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {WHY_ITEMS.map((w, i) => (
            <motion.div
              key={w.title}
              variants={item}
              whileHover={{ scale: 1.03, y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative group glass rounded-2xl p-7 flex flex-col gap-5 cursor-default"
              style={{ border: "1px solid rgba(58,134,255,0.1)" }}
              data-ocid={`why_us.item.${i + 1}`}
            >
              {/* Glow border on hover */}
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
                style={{
                  boxShadow: `0 0 0 1.5px ${w.color}, 0 0 24px ${w.glow}`,
                  borderRadius: "1rem",
                }}
              />

              {/* Icon */}
              <motion.div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: `${w.color}18`,
                  border: `1px solid ${w.color}30`,
                }}
                whileHover={{ rotate: [0, -8, 8, 0], scale: 1.15 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <w.icon size={22} style={{ color: w.color }} />
              </motion.div>

              <div>
                <h3 className="font-display font-semibold text-base text-foreground mb-2">
                  {w.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {w.desc}
                </p>
              </div>

              {/* Bottom line accent */}
              <motion.div
                className="absolute bottom-0 left-6 right-6 h-px rounded-full"
                initial={{ scaleX: 0, opacity: 0 }}
                whileHover={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.35 }}
                style={{
                  background: `linear-gradient(90deg, transparent, ${w.color}, transparent)`,
                  transformOrigin: "center",
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

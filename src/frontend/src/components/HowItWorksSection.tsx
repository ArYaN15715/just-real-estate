import { KeyRound, LayoutGrid, MapPin, MessageCircle } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

const STEPS = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Share Requirements",
    desc: "A quick call or WhatsApp message. Tell us your budget, location, and property type — no lengthy forms.",
    color: "#3a86ff",
  },
  {
    number: "02",
    icon: LayoutGrid,
    title: "Curated Options",
    desc: "We handpick only what fits. You get 3–5 shortlisted properties — not 50 random ones to sift through.",
    color: "#f5a623",
  },
  {
    number: "03",
    icon: MapPin,
    title: "Visit & Experience",
    desc: "We arrange and accompany all site visits. Our comparison tool helps you decide without confusion.",
    color: "#3a86ff",
  },
  {
    number: "04",
    icon: KeyRound,
    title: "Move In",
    desc: "Documentation, registration, and handover — all guided step by step. No surprises, no hidden steps.",
    color: "#f5a623",
  },
];

const stepVariant = {
  hidden: { opacity: 0, y: 48 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.18, duration: 0.7, ease: "easeOut" as const },
  }),
};

const lineVariant = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 1.2, delay: 0.3, ease: "easeOut" as const },
  },
};

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
      style={{ background: "var(--surface-2)" }}
      id="how-it-works"
      data-ocid="how_it_works.section"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(58,134,255,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
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
            The Process
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4">
            How It Works
          </h2>
          <p className="font-body text-muted-foreground text-base max-w-xl mx-auto">
            Four clear steps — from first conversation to keys in hand
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-[56px] left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] h-px overflow-hidden">
            <div
              className="w-full h-full"
              style={{ background: "rgba(58,134,255,0.12)" }}
            />
            <motion.div
              className="absolute inset-0 h-full origin-left"
              variants={lineVariant}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              style={{
                background:
                  "linear-gradient(90deg, var(--cyan) 0%, var(--gold) 50%, var(--cyan) 100%)",
                opacity: 0.5,
              }}
            />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                className="relative flex flex-col items-center lg:items-start text-center lg:text-left gap-5"
                variants={stepVariant}
                custom={i}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                data-ocid={`how_it_works.step.${i + 1}`}
              >
                {/* Number bubble */}
                <motion.div
                  className="relative z-10 flex flex-col items-center"
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center shadow-elevated"
                    style={{
                      background: `linear-gradient(135deg, ${step.color}20, ${step.color}08)`,
                      border: `2px solid ${step.color}40`,
                    }}
                  >
                    <step.icon size={22} style={{ color: step.color }} />
                  </div>
                  {/* Step number badge */}
                  <div
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center"
                    style={{
                      background: step.color,
                      fontSize: "9px",
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      color: "#0a0e1a",
                    }}
                  >
                    {step.number}
                  </div>
                </motion.div>

                {/* Content card */}
                <div
                  className="glass rounded-2xl p-6 w-full"
                  style={{ border: `1px solid ${step.color}18` }}
                >
                  {/* Large background number */}
                  <div
                    className="font-display font-black text-6xl leading-none mb-3 select-none"
                    style={{ color: `${step.color}10` }}
                  >
                    {step.number}
                  </div>
                  <h3 className="font-display font-semibold text-base text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

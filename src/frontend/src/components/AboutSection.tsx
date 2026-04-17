import { ArrowRight } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 500, suffix: "+", label: "Properties Sold", accent: "#3a86ff" },
  { value: 1000, suffix: "+", label: "Families Helped", accent: "#f5a623" },
  { value: 5, suffix: "+", label: "Years Active", accent: "#3a86ff" },
  { value: 100, suffix: "%", label: "Transparent", accent: "#f5a623" },
];

const WHATSAPP_URL =
  "https://wa.me/919876543210?text=Hi%20Just%20Real%20Estate%2C%20I%27m%20interested%20in%20learning%20more%20about%20your%20services";

function CountUp({
  target,
  suffix,
  started,
}: { target: number; suffix: string; started: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
      style={{ background: "var(--surface-1)" }}
      data-ocid="about.section"
    >
      {/* Background text depth layer */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-display font-black text-[20vw] leading-none uppercase tracking-widest whitespace-nowrap"
          style={{ color: "rgba(58,134,255,0.025)", letterSpacing: "0.3em" }}
        >
          TRUST
        </span>
      </div>

      {/* Glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse, rgba(58,134,255,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Editorial text */}
          <div>
            <motion.span
              className="inline-block text-xs font-body font-semibold tracking-widest uppercase mb-5 px-3 py-1 rounded-full"
              style={{
                color: "var(--cyan)",
                background: "rgba(58,134,255,0.1)",
                border: "1px solid rgba(58,134,255,0.2)",
              }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Our Story
            </motion.span>

            <motion.h2
              className="font-display font-black text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.1,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <span className="text-foreground">Built on </span>
              <span className="text-glow-cyan" style={{ color: "var(--cyan)" }}>
                Trust.
              </span>
              <br />
              <span className="text-foreground">Driven by </span>
              <span className="text-glow-gold" style={{ color: "var(--gold)" }}>
                Clarity.
              </span>
            </motion.h2>

            <motion.p
              className="font-body text-base text-muted-foreground leading-relaxed mb-8 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              At Just Real Estate, we believe property decisions should be
              simple and stress-free. We built our practice on one principle:
              give every client the same honest advice we'd give our own family.
            </motion.p>

            <motion.p
              className="font-body text-base text-muted-foreground leading-relaxed mb-10 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.28, duration: 0.6 }}
            >
              No hidden games. No inflated valuations. No pressure tactics. Just
              real guidance, transparent numbers, and genuine care for your
              future.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.36, duration: 0.6 }}
            >
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="button-gold inline-flex items-center gap-2 px-6 py-3 rounded-xl font-display font-semibold text-sm"
                data-ocid="about.contact_button"
              >
                Talk to Us <ArrowRight size={15} />
              </a>
            </motion.div>
          </div>

          {/* Right: Stats grid */}
          <div className="grid grid-cols-2 gap-5">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="glass rounded-2xl p-7 text-center"
                initial={{ opacity: 0, scale: 0.88, y: 24 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.12,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ scale: 1.04, y: -4 }}
                data-ocid={`about.stat.${i + 1}`}
              >
                <div
                  className="font-display font-black text-4xl sm:text-5xl mb-2 tabular-nums"
                  style={{ color: stat.accent }}
                >
                  <CountUp
                    target={stat.value}
                    suffix={stat.suffix}
                    started={inView}
                  />
                </div>
                <p className="font-body text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

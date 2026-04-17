import { ArrowRight, MessageCircle } from "lucide-react";
import { motion, useAnimationFrame } from "motion/react";
import { useRef, useState } from "react";

const REQUIREMENT_OPTIONS = [
  { value: "buy", label: "Buy a Property" },
  { value: "sell", label: "Sell a Property" },
  { value: "rent", label: "Rent a Property" },
  { value: "invest", label: "Investment Guidance" },
  { value: "consult", label: "Free Consultation" },
];

const WA_BASE = "https://wa.me/919876543210?text=";

// Floating particle animation
function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  type Particle = {
    x: number;
    y: number;
    vx: number;
    vy: number;
    r: number;
    a: number;
    va: number;
  };

  const particlesRef = useRef<Particle[]>([]);

  useAnimationFrame(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    canvas.width = W;
    canvas.height = H;

    if (particlesRef.current.length === 0) {
      particlesRef.current = Array.from({ length: 30 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 1,
        a: Math.random(),
        va: (Math.random() - 0.5) * 0.005,
      }));
    }

    ctx.clearRect(0, 0, W, H);
    for (const p of particlesRef.current) {
      p.x = (p.x + p.vx + W) % W;
      p.y = (p.y + p.vy + H) % H;
      p.a = Math.max(0.05, Math.min(0.5, p.a + p.va));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(58, 134, 255, ${p.a})`;
      ctx.fill();
    }
  });

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

export default function LeadCTASection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [requirement, setRequirement] = useState("buy");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const reqLabel =
      REQUIREMENT_OPTIONS.find((o) => o.value === requirement)?.label ??
      requirement;
    const msg = `Hi Just Real Estate, my name is ${name}. Phone: ${phone}. I'm looking for: ${reqLabel}.`;
    window.open(`${WA_BASE}${encodeURIComponent(msg)}`, "_blank");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section
      className="relative py-28 overflow-hidden"
      style={{ background: "var(--surface-2)" }}
      data-ocid="lead.section"
    >
      {/* Particles */}
      <div className="absolute inset-0">
        <Particles />
      </div>

      {/* Gradient overlays */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(58,134,255,0.07) 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(58,134,255,0.3), transparent)",
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="inline-flex items-center gap-2 text-xs font-body font-semibold tracking-widest uppercase mb-5 px-4 py-1.5 rounded-full"
            style={{
              color: "var(--gold)",
              background: "rgba(245,166,35,0.1)",
              border: "1px solid rgba(245,166,35,0.25)",
            }}
            animate={{
              boxShadow: [
                "0 0 0 rgba(245,166,35,0)",
                "0 0 20px rgba(245,166,35,0.2)",
                "0 0 0 rgba(245,166,35,0)",
              ],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Get in Touch
          </motion.div>

          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight mb-5">
            Ready to Find Your
            <br />
            <span className="text-glow-cyan" style={{ color: "var(--cyan)" }}>
              Perfect Property?
            </span>
          </h2>
          <p className="font-body text-muted-foreground text-base max-w-xl mx-auto">
            Share your requirement — we'll respond within the hour with honest
            answers and zero pressure.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="glass-lg rounded-2xl p-8 sm:p-10"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          data-ocid="lead.form"
        >
          <div className="grid sm:grid-cols-2 gap-5 mb-5">
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label
                className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                htmlFor="lead-name"
              >
                Your Name
              </label>
              <input
                id="lead-name"
                type="text"
                required
                placeholder="e.g. Priya Mehta"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl font-body text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-smooth"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(58,134,255,0.2)",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.border =
                    "1px solid rgba(58,134,255,0.5)";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(58,134,255,0.08)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.border =
                    "1px solid rgba(58,134,255,0.2)";
                  e.currentTarget.style.boxShadow = "none";
                }}
                data-ocid="lead.name_input"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-2">
              <label
                className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                htmlFor="lead-phone"
              >
                Phone Number
              </label>
              <input
                id="lead-phone"
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl font-body text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-smooth"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(58,134,255,0.2)",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.border =
                    "1px solid rgba(58,134,255,0.5)";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(58,134,255,0.08)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.border =
                    "1px solid rgba(58,134,255,0.2)";
                  e.currentTarget.style.boxShadow = "none";
                }}
                data-ocid="lead.phone_input"
              />
            </div>
          </div>

          {/* Requirement */}
          <div className="flex flex-col gap-2 mb-7">
            <span className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              I&apos;m Looking To&hellip;
            </span>
            <div className="flex flex-wrap gap-2">
              {REQUIREMENT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setRequirement(opt.value)}
                  className="px-4 py-2 rounded-lg font-body text-sm transition-smooth"
                  style={{
                    background:
                      requirement === opt.value
                        ? "rgba(58,134,255,0.15)"
                        : "rgba(255,255,255,0.04)",
                    border:
                      requirement === opt.value
                        ? "1px solid rgba(58,134,255,0.45)"
                        : "1px solid rgba(58,134,255,0.12)",
                    color:
                      requirement === opt.value
                        ? "var(--cyan)"
                        : "var(--muted-foreground)",
                  }}
                  data-ocid={`lead.requirement.${opt.value}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <motion.button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-display font-bold text-sm transition-smooth"
              style={{ background: "#25d366", color: "#0a0e1a" }}
              whileHover={{
                scale: 1.03,
                boxShadow:
                  "0 0 32px rgba(37,211,102,0.4), 0 8px 24px rgba(0,0,0,0.3)",
              }}
              whileTap={{ scale: 0.97 }}
              data-ocid="lead.submit_button"
            >
              <MessageCircle size={18} />
              Send on WhatsApp
              <ArrowRight size={15} />
            </motion.button>

            {submitted && (
              <motion.p
                className="font-body text-sm text-emerald-400"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                data-ocid="lead.success_state"
              >
                ✓ Opening WhatsApp...
              </motion.p>
            )}

            <p className="font-body text-xs text-muted-foreground sm:ml-auto text-center sm:text-right">
              No spam. No pressure. Just honest answers.
            </p>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

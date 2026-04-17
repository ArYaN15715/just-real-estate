import { ChevronDown, Users } from "lucide-react";
import {
  AnimatePresence,
  motion,
  stagger,
  useAnimate,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

const TRUST_STATS = [
  { label: "500+ Properties" },
  { label: "South Bopal Experts" },
  { label: "Trusted by 1000+ Families" },
];

const HEADLINE_WORDS = ["Real", "Estate.", "Reimagined."];

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [showActivity, setShowActivity] = useState(false);
  const [ripples, setRipples] = useState<
    { id: number; x: number; y: number }[]
  >([]);
  const [scope, animate] = useAnimate();

  // Parallax transforms from mouse
  const bgX = useTransform(mouseX, [-1, 1], ["-15px", "15px"]);
  const bgY = useTransform(mouseY, [-1, 1], ["-10px", "10px"]);
  const fgX = useTransform(mouseX, [-1, 1], ["8px", "-8px"]);
  const fgY = useTransform(mouseY, [-1, 1], ["5px", "-5px"]);

  // Slow zoom-in on mount via CSS animation trigger
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Show live activity badge after 2s
    const timer = setTimeout(() => setShowActivity(true), 2000);

    // Staggered headline animation
    if (scope.current) {
      void animate(
        ".hero-word",
        { opacity: [0, 1], y: [40, 0] },
        { duration: 0.7, delay: stagger(0.18), ease: [0.25, 0.1, 0.25, 1] },
      );
    }

    return () => clearTimeout(timer);
  }, [animate, scope]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const xNorm = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const yNorm = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    mouseX.set(xNorm);
    mouseY.set(yNorm);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleCTAClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Ripple effect
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(
      () => setRipples((prev) => prev.filter((r) => r.id !== id)),
      600,
    );

    // Smooth scroll to properties
    const target =
      document.getElementById("properties") ??
      document.querySelector("[data-ocid='recently_added.section']");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative h-screen min-h-[680px] flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-ocid="hero.section"
      aria-label="Hero — Real Estate Reimagined"
    >
      {/* ── Background image with parallax + slow zoom ── */}
      <motion.div
        className="absolute inset-[-30px]"
        style={{ x: bgX, y: bgY }}
        transition={{ type: "spring", stiffness: 60, damping: 20 }}
      >
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=90"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center"
          style={{
            willChange: "transform",
            transform: mounted ? "scale(1.0)" : "scale(1.1)",
            transition: "transform 8000ms cubic-bezier(0.25, 0.1, 0.25, 1)",
          }}
        />
      </motion.div>

      {/* ── Depth gradient overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(10,14,26,0.95) 0%, rgba(10,14,26,0.55) 40%, rgba(10,14,26,0.25) 70%, rgba(10,14,26,0.45) 100%)",
        }}
      />
      {/* Side vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(10,14,26,0.6) 100%)",
        }}
      />

      {/* ── Foreground depth elements ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ x: fgX, y: fgY }}
        transition={{ type: "spring", stiffness: 80, damping: 25 }}
      >
        {/* Ambient glow blobs */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(100,160,255,0.06) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
      </motion.div>

      {/* ── Live Activity Badge ── */}
      <AnimatePresence>
        {showActivity && (
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute top-6 right-6 z-20 flex items-center gap-2 px-4 py-2.5 rounded-full"
            style={{
              background: "rgba(10,14,26,0.75)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(0,212,255,0.3)",
              boxShadow: "0 0 20px rgba(0,212,255,0.1)",
            }}
            data-ocid="hero.live_activity_badge"
          >
            <span className="relative flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ background: "#00d4ff" }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ background: "#00d4ff" }}
              />
            </span>
            <Users size={13} className="text-white/70" />
            <span
              className="text-xs font-body font-medium"
              style={{ color: "rgba(255,255,255,0.85)" }}
            >
              24 people browsing now
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main Content ── */}
      <div
        ref={scope}
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto"
      >
        {/* Eyebrow tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-body font-semibold tracking-widest uppercase"
          style={{
            background: "rgba(0,212,255,0.08)",
            border: "1px solid rgba(0,212,255,0.25)",
            color: "#00d4ff",
            backdropFilter: "blur(8px)",
          }}
          data-ocid="hero.eyebrow_badge"
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#00d4ff" }}
          />
          South Bopal · Ahmedabad
        </motion.div>

        {/* Headline — word-by-word stagger */}
        <h1
          className="font-display font-bold leading-none tracking-tight mb-6 select-none"
          style={{
            fontSize: "clamp(3.5rem, 9vw, 7.5rem)",
            color: "#ffffff",
            letterSpacing: "-0.02em",
          }}
          data-ocid="hero.headline"
        >
          <span className="flex flex-wrap justify-center gap-x-[0.25em]">
            {HEADLINE_WORDS.map((word, i) => (
              <span
                key={word}
                className="hero-word inline-block"
                style={{
                  opacity: 0,
                  color: i === 2 ? "#00d4ff" : "#ffffff",
                  textShadow: i === 2 ? "0 0 40px rgba(0,212,255,0.4)" : "none",
                }}
              >
                {word}
              </span>
            ))}
          </span>
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-body text-xl sm:text-2xl mb-10 max-w-lg leading-relaxed"
          style={{ color: "rgba(255,255,255,0.55)" }}
          data-ocid="hero.subheadline"
        >
          Experience property like never before.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.6,
            delay: 1.2,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          data-ocid="hero.cta_wrapper"
        >
          <button
            type="button"
            onClick={handleCTAClick}
            className="relative overflow-hidden font-display font-bold text-base tracking-widest uppercase px-10 py-4 rounded-full transition-all duration-300"
            style={{
              background: "rgba(10,14,26,0.6)",
              border: "1.5px solid rgba(0,212,255,0.7)",
              color: "#00d4ff",
              backdropFilter: "blur(12px)",
              boxShadow:
                "0 0 24px rgba(0,212,255,0.2), inset 0 0 24px rgba(0,212,255,0.05)",
              letterSpacing: "0.15em",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 0 40px rgba(0,212,255,0.5), inset 0 0 32px rgba(0,212,255,0.12)";
              (e.currentTarget as HTMLButtonElement).style.transform =
                "scale(1.06)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 0 24px rgba(0,212,255,0.2), inset 0 0 24px rgba(0,212,255,0.05)";
              (e.currentTarget as HTMLButtonElement).style.transform =
                "scale(1)";
            }}
            data-ocid="hero.explore_button"
            aria-label="Explore properties"
          >
            {/* Ripples */}
            {ripples.map((r) => (
              <span
                key={r.id}
                className="pointer-events-none absolute rounded-full animate-ping"
                style={{
                  left: r.x - 12,
                  top: r.y - 12,
                  width: 24,
                  height: 24,
                  background: "rgba(0,212,255,0.4)",
                  animationDuration: "0.6s",
                  animationIterationCount: 1,
                }}
              />
            ))}
            Explore Now
          </button>
        </motion.div>

        {/* Trust Bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-12 flex flex-wrap justify-center gap-0 rounded-full overflow-hidden"
          style={{
            background: "rgba(10,14,26,0.65)",
            backdropFilter: "blur(14px)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
          data-ocid="hero.trust_bar"
        >
          {TRUST_STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="flex items-center gap-2 px-5 py-3"
              style={{
                borderRight:
                  i < TRUST_STATS.length - 1
                    ? "1px solid rgba(255,255,255,0.1)"
                    : "none",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: "#00d4ff" }}
              />
              <span
                className="text-sm font-body font-medium whitespace-nowrap"
                style={{ color: "rgba(255,255,255,0.75)" }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
        data-ocid="hero.scroll_indicator"
        aria-hidden="true"
      >
        <span
          className="text-xs font-body tracking-widest uppercase"
          style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.18em" }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 1.8,
            ease: "easeInOut",
          }}
          style={{ color: "rgba(0,212,255,0.6)" }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}

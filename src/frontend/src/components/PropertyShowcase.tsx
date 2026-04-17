import { useNavigate } from "@tanstack/react-router";
import {
  Bed,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Maximize2,
  Users,
} from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useComparison } from "../context/ComparisonContext";
import type { Property } from "../types/property";

interface Props {
  properties: Property[];
}

const LIVE_VIEWERS = [7, 12, 4, 9, 15, 3, 11, 6, 8, 14, 5, 10, 13, 2, 7];

export default function PropertyShowcase({ properties: props }: Props) {
  const navigate = useNavigate();
  const {
    addToComparison,
    removeFromComparison,
    isInComparison,
    comparisonList,
  } = useComparison();
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
  const [activeIndex, setActiveIndex] = useState(0);
  const [hintVisible, setHintVisible] = useState(true);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Hide scroll hint after 3s
  useEffect(() => {
    const t = setTimeout(() => setHintVisible(false), 3000);
    return () => clearTimeout(t);
  }, []);

  // Track active panel from scroll position
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    setActiveIndex(Math.min(idx, props.length - 1));
    if (el.scrollLeft > 60) setHintVisible(false);
  }, [props.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollTo = useCallback((dir: "prev" | "next") => {
    const el = scrollRef.current;
    if (!el) return;
    const w = el.clientWidth;
    el.scrollBy({ left: dir === "next" ? w : -w, behavior: "smooth" });
  }, []);

  const handleCompare = (p: Property) => {
    if (isInComparison(p.id)) removeFromComparison(p.id);
    else addToComparison(p);
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#06080f] py-0"
      data-ocid="property_showcase.section"
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center pt-16 pb-10 px-4"
      >
        <p
          className="font-body text-xs tracking-[0.25em] uppercase mb-3"
          style={{ color: "var(--cyan)" }}
        >
          Curated Selection
        </p>
        <h2 className="font-display font-bold text-3xl sm:text-5xl text-foreground mb-3">
          Featured{" "}
          <span className="relative inline-block">
            Properties
            <motion.span
              className="absolute -bottom-1 left-0 h-[3px] rounded-full"
              style={{
                background: "var(--cyan)",
                boxShadow: "0 0 12px var(--cyan-glow)",
              }}
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : { width: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          </span>
        </h2>
        <p className="font-body text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
          Scroll through handpicked properties — each verified and ready
        </p>
      </motion.div>

      {/* Scroll container */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            height: "88vh",
            minHeight: 520,
          }}
          data-ocid="property_showcase.list"
        >
          {props.map((p, i) => (
            <Panel
              key={p.id}
              property={p}
              index={i}
              totalIndex={i}
              viewers={LIVE_VIEWERS[i % LIVE_VIEWERS.length]}
              isHovered={hoveredIdx === i}
              onHover={() => setHoveredIdx(i)}
              onLeave={() => setHoveredIdx(null)}
              onCompare={() => handleCompare(p)}
              inComparison={isInComparison(p.id)}
              comparisonFull={
                comparisonList.length >= 3 && !isInComparison(p.id)
              }
              isInView={isInView}
              onViewDetails={() => void navigate({ to: `/properties/${p.id}` })}
            />
          ))}
        </div>

        {/* Arrow Controls */}
        <button
          type="button"
          aria-label="Previous property"
          onClick={() => scrollTo("prev")}
          disabled={activeIndex === 0}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full glass flex items-center justify-center transition-smooth disabled:opacity-30 disabled:pointer-events-none hover:scale-110"
          style={{ boxShadow: "0 0 20px rgba(58,134,255,0.25)" }}
          data-ocid="property_showcase.prev_button"
        >
          <ChevronLeft size={22} className="text-foreground" />
        </button>
        <button
          type="button"
          aria-label="Next property"
          onClick={() => scrollTo("next")}
          disabled={activeIndex === props.length - 1}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full glass flex items-center justify-center transition-smooth disabled:opacity-30 disabled:pointer-events-none hover:scale-110"
          style={{ boxShadow: "0 0 20px rgba(58,134,255,0.25)" }}
          data-ocid="property_showcase.next_button"
        >
          <ChevronRight size={22} className="text-foreground" />
        </button>

        {/* Scroll hint */}
        <AnimatePresence>
          {hintVisible && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-2 glass-sm rounded-full pointer-events-none"
            >
              <motion.span
                animate={{ x: [0, 6, 0] }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 1.4,
                  ease: "easeInOut",
                }}
                className="text-sm"
                style={{ color: "var(--cyan)" }}
              >
                ›
              </motion.span>
              <span className="font-body text-xs text-muted-foreground tracking-wide">
                Swipe to explore
              </span>
              <motion.span
                animate={{ x: [0, 6, 0] }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 1.4,
                  ease: "easeInOut",
                  delay: 0.2,
                }}
                className="text-sm"
                style={{ color: "var(--cyan)" }}
              >
                ›
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Dot indicators */}
      <div
        className="flex justify-center gap-2 py-6"
        data-ocid="property_showcase.indicators"
      >
        {props.map((p, i) => (
          <button
            key={p.id}
            type="button"
            aria-label={`Go to property ${i + 1}`}
            onClick={() => {
              scrollRef.current?.scrollTo({
                left: i * (scrollRef.current?.clientWidth ?? 0),
                behavior: "smooth",
              });
            }}
            className="transition-smooth"
            data-ocid={`property_showcase.dot.${i + 1}`}
          >
            <span
              className="block rounded-full transition-smooth"
              style={{
                width: i === activeIndex ? 24 : 8,
                height: 8,
                background:
                  i === activeIndex ? "var(--cyan)" : "rgba(255,255,255,0.2)",
                boxShadow:
                  i === activeIndex ? "0 0 8px var(--cyan-glow)" : "none",
              }}
            />
          </button>
        ))}
      </div>

      {/* View All CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-center pb-16"
      >
        <button
          type="button"
          onClick={() => void navigate({ to: "/properties" })}
          className="group inline-flex items-center gap-2 font-body font-semibold text-base transition-smooth"
          style={{ color: "var(--cyan)" }}
          data-ocid="property_showcase.view_all_button"
        >
          View All Properties
          <ChevronRight
            size={18}
            className="transition-smooth group-hover:translate-x-1"
          />
          <span
            className="absolute -bottom-px left-0 h-px w-0 group-hover:w-full transition-smooth"
            style={{ background: "var(--cyan)" }}
          />
        </button>
      </motion.div>
    </section>
  );
}

/* ─── Single Panel ─────────────────────────────────────────────────── */
interface PanelProps {
  property: Property;
  index: number;
  totalIndex: number;
  viewers: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onCompare: () => void;
  inComparison: boolean;
  comparisonFull: boolean;
  isInView: boolean;
  onViewDetails: () => void;
}

function Panel({
  property: p,
  index,
  viewers,
  isHovered,
  onHover,
  onLeave,
  onCompare,
  inComparison,
  comparisonFull,
  isInView,
  onViewDetails,
}: PanelProps) {
  return (
    <motion.div
      className="relative shrink-0 snap-start snap-always overflow-hidden"
      style={{
        width: "100vw",
        minWidth: "80vw",
        height: "100%",
        cursor: "default",
      }}
      initial={{ opacity: 0, x: 80 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 80 }}
      transition={{
        duration: 0.7,
        delay: Math.min(index * 0.08, 0.4),
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      data-ocid={`property_showcase.item.${index + 1}`}
    >
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        animate={{
          scale: isHovered ? 1.06 : 1,
          filter: isHovered ? "blur(3px)" : "blur(0px)",
        }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <img
          src={p.imageUrl}
          alt={p.title}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </motion.div>

      {/* Dark gradient overlay — stronger at bottom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(6,8,15,0.25) 0%, rgba(6,8,15,0.4) 40%, rgba(6,8,15,0.85) 80%, rgba(6,8,15,0.97) 100%)",
        }}
      />
      {/* Side gradients to blend into next panel */}
      <div
        className="absolute inset-y-0 right-0 w-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(6,8,15,0.5))",
        }}
      />

      {/* Live viewers badge */}
      <div className="absolute top-6 left-6 z-10 flex items-center gap-2 px-3 py-1.5 glass-sm rounded-full">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0" />
        <Users size={12} className="text-foreground/70" />
        <span className="font-body text-xs text-foreground/80">
          {viewers} viewing
        </span>
      </div>

      {/* Recently Added badge */}
      {p.isRecentlyAdded && (
        <div
          className="absolute top-6 right-6 z-10 px-3 py-1 rounded-full font-body text-xs font-semibold tracking-wide"
          style={{
            background: "rgba(58,134,255,0.18)",
            border: "1px solid rgba(58,134,255,0.45)",
            color: "var(--cyan)",
            boxShadow: "0 0 12px rgba(58,134,255,0.25)",
          }}
        >
          Recently Added
        </div>
      )}

      {/* Property badge (if any) */}
      {p.badge && !p.isRecentlyAdded && (
        <div className="absolute top-6 right-6 z-10 px-3 py-1 glass-sm rounded-full font-body text-xs font-semibold text-foreground/80">
          {p.badge}
        </div>
      )}

      {/* Glass card — bottom */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-10 mx-4 mb-6 sm:mx-10 sm:mb-10 sm:max-w-xl rounded-2xl p-5 sm:p-7"
        style={{
          background: isHovered
            ? "rgba(10, 14, 26, 0.88)"
            : "rgba(10, 14, 26, 0.78)",
          backdropFilter: "blur(20px) saturate(1.5)",
          WebkitBackdropFilter: "blur(20px) saturate(1.5)",
          border: isHovered
            ? "1px solid rgba(58,134,255,0.35)"
            : "1px solid rgba(58,134,255,0.15)",
          boxShadow: isHovered
            ? "0 8px 40px rgba(0,0,0,0.6), 0 0 32px rgba(58,134,255,0.15)"
            : "0 4px 24px rgba(0,0,0,0.5)",
          transition: "all 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        animate={{ y: isHovered ? -6 : 0 }}
        transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Property name */}
        <motion.h3
          className="font-display font-bold text-xl sm:text-2xl text-foreground leading-tight mb-2"
          animate={{ y: isHovered ? -2 : 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
        >
          {p.title}
        </motion.h3>

        {/* Price */}
        <motion.p
          className="font-display font-bold text-2xl sm:text-3xl mb-3"
          style={{
            color: "var(--cyan)",
            textShadow: isHovered ? "0 0 16px rgba(58,134,255,0.4)" : "none",
            transition: "text-shadow 0.4s ease",
          }}
          animate={{ y: isHovered ? -2 : 0 }}
          transition={{ duration: 0.35, delay: 0.07 }}
        >
          {p.price}
        </motion.p>

        {/* Meta row */}
        <motion.div
          className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mb-5"
          animate={{ y: isHovered ? -2 : 0 }}
          transition={{ duration: 0.35, delay: 0.09 }}
        >
          <span className="flex items-center gap-1.5 font-body text-sm text-muted-foreground">
            <MapPin size={13} style={{ color: "var(--cyan)" }} />
            {p.location}
          </span>
          {p.bedrooms > 0 && (
            <span className="flex items-center gap-1.5 font-body text-sm text-muted-foreground">
              <Bed size={13} style={{ color: "var(--cyan)" }} />
              {p.bedrooms} BHK
            </span>
          )}
          <span className="flex items-center gap-1.5 font-body text-sm text-muted-foreground">
            <Maximize2 size={13} style={{ color: "var(--cyan)" }} />
            {p.areaLabel}
          </span>
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex gap-3 flex-wrap"
          animate={{ y: isHovered ? -2 : 0 }}
          transition={{ duration: 0.35, delay: 0.11 }}
        >
          <button
            type="button"
            onClick={onViewDetails}
            className="button-premium px-5 py-2.5 rounded-lg font-body font-semibold text-sm transition-smooth"
            style={{
              background: "var(--cyan)",
              color: "#06080f",
              boxShadow: "0 0 16px rgba(58,134,255,0.3)",
            }}
            data-ocid={`property_showcase.view_details_button.${index + 1}`}
          >
            View Details
          </button>
          <button
            type="button"
            onClick={onCompare}
            disabled={comparisonFull}
            className="px-5 py-2.5 rounded-lg font-body font-semibold text-sm transition-smooth glass-sm disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              color: inComparison ? "var(--cyan)" : "rgba(255,255,255,0.75)",
              border: inComparison
                ? "1px solid rgba(58,134,255,0.5)"
                : "1px solid rgba(255,255,255,0.15)",
              boxShadow: inComparison
                ? "0 0 12px rgba(58,134,255,0.2)"
                : "none",
            }}
            data-ocid={`property_showcase.compare_button.${index + 1}`}
          >
            {inComparison ? "✓ Added" : "+ Compare"}
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

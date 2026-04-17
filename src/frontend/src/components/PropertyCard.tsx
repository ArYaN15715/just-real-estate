import { useNavigate } from "@tanstack/react-router";
import { Bed, Eye, GitCompare, MapPin, Square } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Property } from "../types/property";

export interface PropertyCardProps {
  property: Property;
  index: number;
  onCompare: () => void;
  inComparison: boolean;
  comparisonFull: boolean;
  showFeaturedBadge?: boolean;
}

// Stable per-session viewer count per property
const viewerCounts: Record<string, number> = {};
function getViewerCount(id: string): number {
  if (!viewerCounts[id]) {
    viewerCounts[id] = Math.floor(Math.random() * 12) + 1;
  }
  return viewerCounts[id];
}

export function PropertyCard({
  property: p,
  index,
  onCompare,
  inComparison,
  comparisonFull,
  showFeaturedBadge = false,
}: PropertyCardProps) {
  const navigate = useNavigate();
  const [imgLoaded, setImgLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const viewers = getViewerCount(p.id);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete) setImgLoaded(true);
  }, []);

  const handleViewDetails = () => {
    void navigate({ to: "/properties/$id", params: { id: p.id } });
  };

  return (
    <motion.div
      className="group relative rounded-2xl overflow-hidden flex flex-col card-hover"
      style={{
        background: "rgba(14, 18, 32, 0.85)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(58,134,255,0.14)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      data-ocid={`property.item.${index}`}
    >
      {/* Image section — 60% height */}
      <button
        type="button"
        className="relative w-full text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 overflow-hidden"
        style={{ height: "220px" }}
        onClick={handleViewDetails}
        aria-label={`View details for ${p.title}`}
      >
        {/* Skeleton shimmer */}
        <AnimatePresence>
          {!imgLoaded && (
            <motion.div
              className="absolute inset-0 z-10"
              style={{ background: "rgba(14,18,32,0.9)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(58,134,255,0.08) 50%, transparent 100%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 1.6s ease-in-out infinite",
                }}
              />
              <div
                className="absolute bottom-4 left-4 right-4 h-3 rounded-full opacity-20"
                style={{ background: "rgba(58,134,255,0.3)" }}
              />
              <div
                className="absolute bottom-10 left-4 w-1/2 h-3 rounded-full opacity-10"
                style={{ background: "rgba(58,134,255,0.3)" }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.img
          ref={imgRef}
          src={p.imageUrl}
          alt={p.title}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.06 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
        />

        {/* Gradient overlay on image */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(10,14,26,0.85) 100%)",
          }}
        />

        {/* Live activity badge */}
        <motion.div
          className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold"
          style={{
            background: "rgba(14,18,32,0.82)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(200,200,200,0.9)",
          }}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + index * 0.05, duration: 0.4 }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-red-400"
            style={{ animation: "pulse-soft 2s ease-in-out infinite" }}
          />
          {viewers} viewing
        </motion.div>

        {/* Badges top-left */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {p.isRecentlyAdded && (
            <span
              className="text-[10px] px-2.5 py-1 rounded-full font-bold tracking-wide"
              style={{
                background: "rgba(58,134,255,0.2)",
                border: "1px solid rgba(58,134,255,0.5)",
                color: "#3a86ff",
                boxShadow: "0 0 10px rgba(58,134,255,0.3)",
              }}
            >
              Recently Added
            </span>
          )}
          {showFeaturedBadge && p.isFeatured && !p.isRecentlyAdded && (
            <span
              className="text-[10px] px-2.5 py-1 rounded-full font-bold tracking-wide"
              style={{
                background: "rgba(245,166,35,0.2)",
                border: "1px solid rgba(245,166,35,0.45)",
                color: "#f5a623",
                boxShadow: "0 0 10px rgba(245,166,35,0.25)",
              }}
            >
              Featured
            </span>
          )}
          {p.badge &&
            !p.isRecentlyAdded &&
            !(showFeaturedBadge && p.isFeatured) && (
              <span
                className="text-[10px] px-2.5 py-1 rounded-full font-bold tracking-wide"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  color: "rgba(220,220,220,0.9)",
                }}
              >
                {p.badge}
              </span>
            )}
        </div>

        {/* In-comparison indicator */}
        {inComparison && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              border: "2px solid rgba(58,134,255,0.6)",
              borderRadius: "0",
            }}
          />
        )}
      </button>

      {/* Glass info overlay (bottom section) */}
      <div
        className="flex flex-col flex-1 p-4 gap-2.5"
        style={{
          background: "rgba(10,14,26,0.6)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Title */}
        <button
          type="button"
          className="text-left text-sm font-bold leading-snug line-clamp-2 transition-colors duration-200"
          style={{
            color: "rgba(240,244,255,0.95)",
            fontFamily: "var(--font-display)",
          }}
          onClick={handleViewDetails}
          data-ocid={`property.title_link.${index}`}
        >
          {p.title}
        </button>

        {/* Price */}
        <div
          className="text-lg font-black tracking-tight"
          style={{
            color: "#3a86ff",
            textShadow: "0 0 16px rgba(58,134,255,0.45)",
            fontFamily: "var(--font-display)",
          }}
        >
          {p.price}
        </div>

        {/* Meta row */}
        <div
          className="flex flex-wrap gap-x-3 gap-y-1 text-xs"
          style={{ color: "rgba(140,150,180,0.9)" }}
        >
          <span className="flex items-center gap-1">
            <Square size={10} className="shrink-0" />
            {p.areaLabel}
          </span>
          {p.bedrooms > 0 && (
            <span className="flex items-center gap-1">
              <Bed size={10} className="shrink-0" />
              {p.bedrooms} BHK
            </span>
          )}
          <span className="flex items-center gap-1">
            <MapPin size={10} className="shrink-0" />
            {p.location}
          </span>
        </div>

        {/* Actions */}
        <div className="mt-auto pt-1.5 flex gap-2">
          {/* View Details */}
          <motion.button
            type="button"
            onClick={handleViewDetails}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all duration-300"
            style={{
              background:
                "linear-gradient(135deg, rgba(58,134,255,0.9) 0%, rgba(30,90,220,0.9) 100%)",
              color: "#fff",
              boxShadow: isHovered ? "0 0 18px rgba(58,134,255,0.4)" : "none",
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            data-ocid={`property.view_details_button.${index}`}
          >
            <Eye size={12} />
            View Details
          </motion.button>

          {/* Compare */}
          <motion.button
            type="button"
            onClick={onCompare}
            disabled={comparisonFull}
            title={
              comparisonFull
                ? "Max 3 properties"
                : inComparison
                  ? "Remove from compare"
                  : "Add to compare"
            }
            className="flex items-center justify-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-300"
            style={
              inComparison
                ? {
                    background: "rgba(58,134,255,0.18)",
                    border: "1px solid rgba(58,134,255,0.5)",
                    color: "#3a86ff",
                  }
                : comparisonFull
                  ? {
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "rgba(140,150,180,0.4)",
                      cursor: "not-allowed",
                    }
                  : {
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.14)",
                      color: "rgba(200,210,230,0.8)",
                    }
            }
            whileHover={!comparisonFull ? { scale: 1.05 } : {}}
            whileTap={!comparisonFull ? { scale: 0.95 } : {}}
            data-ocid={`property.compare_button.${index}`}
          >
            <GitCompare size={12} />
            {inComparison ? "Added" : "Compare"}
          </motion.button>
        </div>
      </div>

      {/* Hover glow border */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ border: "1px solid transparent" }}
        animate={{
          borderColor: isHovered
            ? "rgba(58,134,255,0.35)"
            : "rgba(58,134,255,0.14)",
          boxShadow: isHovered
            ? "0 0 32px rgba(58,134,255,0.12), inset 0 0 20px rgba(58,134,255,0.04)"
            : "none",
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

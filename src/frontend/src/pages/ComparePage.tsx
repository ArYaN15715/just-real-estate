import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  GitCompare,
  MapPin,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useComparison } from "../context/ComparisonContext";
import type { Property } from "../types/property";

const COMPARE_ROWS: Array<{
  label: string;
  key: keyof Property | "amenities_list";
  isPrimary?: boolean;
}> = [
  { label: "Price", key: "price", isPrimary: true },
  { label: "Area", key: "areaLabel", isPrimary: true },
  { label: "Bedrooms", key: "bedrooms" },
  { label: "Location", key: "location" },
  { label: "Type", key: "type" },
  { label: "Category", key: "category" },
  { label: "Amenities", key: "amenities_list" },
];

const WHATSAPP_BASE =
  "https://wa.me/919876543210?text=Hi%2C%20I%20am%20interested%20in%20";

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
  exit: { opacity: 0, scale: 0.9, y: -10, transition: { duration: 0.3 } },
};

export default function ComparePage() {
  const navigate = useNavigate();
  const { comparisonList, removeFromComparison, clearComparison } =
    useComparison();

  const slots = [0, 1, 2];

  return (
    <div
      className="bg-background min-h-screen bg-cinematic"
      data-ocid="compare.page"
    >
      {/* ─── HEADER ─── */}
      <div className="relative overflow-hidden border-b border-white/8">
        {/* Glow backdrop */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-40 rounded-full"
            style={{
              background:
                "radial-gradient(ellipse, rgba(58,134,255,0.12) 0%, transparent 70%)",
              filter: "blur(30px)",
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-end justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-xl glass flex items-center justify-center">
                  <GitCompare size={16} className="text-primary" />
                </div>
                <span className="text-xs font-body text-muted-foreground uppercase tracking-widest">
                  Comparison Tool
                </span>
              </div>
              <h1 className="font-display font-black text-3xl sm:text-4xl text-foreground mb-2">
                Property{" "}
                <span className="text-primary text-glow-cyan">Comparison</span>
              </h1>
              <p className="font-body text-muted-foreground text-sm">
                Compare up to 3 properties side by side
                {comparisonList.length > 0 && (
                  <span className="ml-2 text-primary font-semibold">
                    — {comparisonList.length} selected
                  </span>
                )}
              </p>
            </div>

            <AnimatePresence>
              {comparisonList.length > 0 && (
                <motion.button
                  type="button"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearComparison}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-red-400/20 text-red-400 text-sm font-body hover:bg-red-400/10 transition-smooth"
                  data-ocid="compare.clear_button"
                >
                  <Trash2 size={13} />
                  Clear All
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* ─── EMPTY STATE ─── */}
        {comparisonList.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center py-24 text-center"
            data-ocid="compare.empty_state"
          >
            {/* Icon ring */}
            <div className="relative mb-8">
              <div
                className="w-24 h-24 rounded-3xl glass-lg flex items-center justify-center shadow-cinematic"
                style={{ boxShadow: "0 0 40px rgba(58,134,255,0.15)" }}
              >
                <BarChart3 size={40} className="text-primary" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-xl glass flex items-center justify-center">
                <GitCompare size={14} className="text-accent" />
              </div>
            </div>

            <h2 className="font-display font-black text-2xl sm:text-3xl text-foreground mb-3">
              Nothing to compare yet
            </h2>
            <p className="font-body text-muted-foreground text-sm mb-8 max-w-xs leading-relaxed">
              Browse properties and hit{" "}
              <span className="text-primary font-medium">"Add to Compare"</span>{" "}
              on any listing. You can compare up to 3 at once.
            </p>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                onClick={() => void navigate({ to: "/properties" })}
                className="button-premium bg-primary text-primary-foreground font-body px-6 gap-2 glow-subtle"
                data-ocid="compare.browse_button"
              >
                Browse Properties
                <ArrowRight size={15} />
              </Button>
            </motion.div>
          </motion.div>
        ) : (
          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            {/* ── PROPERTY CARD HEADERS ── */}
            <div
              className="grid gap-4 mb-8 min-w-[560px]"
              style={{
                gridTemplateColumns: "160px repeat(3, minmax(200px, 1fr))",
              }}
            >
              {/* Label col header — comparison icon */}
              <div className="flex items-end pb-2">
                <span className="text-xs font-body text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                  <GitCompare size={12} /> Properties
                </span>
              </div>

              <AnimatePresence mode="popLayout">
                {slots.map((i) => {
                  const p = comparisonList[i];
                  return (
                    <motion.div
                      key={p ? p.id : `empty-${i}`}
                      variants={cardVariants}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                      layout
                      data-ocid={`compare.slot.${i + 1}`}
                    >
                      {p ? (
                        <div className="relative glass rounded-2xl overflow-hidden border border-white/12 shadow-elevated group hover:border-primary/25 transition-smooth">
                          {/* Remove button */}
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeFromComparison(p.id)}
                            className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full glass-sm border border-white/15 flex items-center justify-center text-muted-foreground hover:text-red-400 hover:border-red-400/30 transition-smooth"
                            aria-label={`Remove ${p.title}`}
                            data-ocid={`compare.remove_button.${i + 1}`}
                          >
                            <X size={12} />
                          </motion.button>

                          {/* Property image */}
                          <div className="relative h-40 img-zoom overflow-hidden">
                            <img
                              src={p.imageUrl}
                              alt={p.title}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                            <div className="absolute bottom-3 left-3">
                              <p className="font-display font-black text-lg text-white">
                                {p.price}
                              </p>
                            </div>
                          </div>

                          {/* Card body */}
                          <div className="p-4">
                            <p className="font-display font-semibold text-sm text-foreground line-clamp-2 mb-2 pr-3">
                              {p.title}
                            </p>
                            <p className="text-xs font-body text-muted-foreground flex items-center gap-1 mb-3">
                              <MapPin size={10} /> {p.location}
                            </p>
                            <a
                              href={`${WHATSAPP_BASE}${encodeURIComponent(p.title)}%20-%20${encodeURIComponent(p.price)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              data-ocid={`compare.enquire_button.${i + 1}`}
                            >
                              <button
                                type="button"
                                className="w-full py-2 rounded-xl text-xs font-body font-bold text-white transition-smooth"
                                style={{
                                  background:
                                    "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                                  boxShadow: "0 0 14px rgba(37,211,102,0.2)",
                                }}
                              >
                                Enquire on WhatsApp
                              </button>
                            </a>
                          </div>
                        </div>
                      ) : (
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => void navigate({ to: "/properties" })}
                          className="w-full h-full min-h-[280px] rounded-2xl border-2 border-dashed border-white/12 flex flex-col items-center justify-center gap-3 text-muted-foreground hover:border-primary/30 hover:text-primary transition-smooth glass-sm"
                          data-ocid={`compare.add_slot.${i + 1}`}
                        >
                          <div className="w-10 h-10 rounded-xl glass flex items-center justify-center">
                            <Plus size={18} />
                          </div>
                          <span className="font-body text-sm">
                            Add Property
                          </span>
                        </motion.button>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* ── COMPARISON TABLE ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="rounded-2xl border border-white/10 overflow-hidden shadow-elevated"
              data-ocid="compare.table"
              style={{ minWidth: "560px" }}
            >
              {COMPARE_ROWS.map((row, rowIdx) => (
                <div
                  key={row.label}
                  className={`grid gap-0 border-b border-white/6 last:border-b-0 ${
                    rowIdx % 2 === 0 ? "bg-card/60" : "bg-secondary/40"
                  }`}
                  style={{
                    gridTemplateColumns: "160px repeat(3, minmax(200px, 1fr))",
                  }}
                >
                  {/* Label */}
                  <div className="px-5 py-4 flex items-center border-r border-white/6">
                    <span
                      className={`font-body text-xs font-semibold uppercase tracking-wider ${row.isPrimary ? "text-primary" : "text-muted-foreground"}`}
                    >
                      {row.label}
                    </span>
                  </div>

                  {/* Values */}
                  {slots.map((i) => {
                    const p = comparisonList[i];
                    if (!p) {
                      return (
                        <div
                          key={i}
                          className="px-5 py-4 flex items-center border-r border-white/5 last:border-r-0"
                        >
                          <span className="text-muted-foreground/40 text-sm">
                            —
                          </span>
                        </div>
                      );
                    }

                    let value: React.ReactNode;

                    if (row.key === "amenities_list") {
                      value = (
                        <div className="flex flex-col gap-1.5">
                          {p.amenities.map((a) => (
                            <span
                              key={a}
                              className="flex items-center gap-1.5 text-xs font-body text-foreground/80"
                            >
                              <CheckCircle2
                                size={11}
                                className="text-primary shrink-0"
                              />
                              {a}
                            </span>
                          ))}
                        </div>
                      );
                    } else if (row.key === "bedrooms") {
                      value = (
                        <span className="font-body text-sm text-foreground">
                          {p.bedrooms === 0 ? "N/A" : `${p.bedrooms} BHK`}
                        </span>
                      );
                    } else if (row.key === "price") {
                      value = (
                        <span className="font-display font-black text-base text-cyan-300 text-glow-cyan">
                          {p.price}
                        </span>
                      );
                    } else if (row.key === "areaLabel") {
                      value = (
                        <span className="font-body text-sm font-semibold text-foreground">
                          {p.areaLabel}
                        </span>
                      );
                    } else {
                      const raw = p[row.key as keyof Property];
                      value = (
                        <span className="font-body text-sm text-foreground/80 capitalize">
                          {typeof raw === "boolean"
                            ? raw
                              ? "Yes"
                              : "No"
                            : String(raw)}
                        </span>
                      );
                    }

                    return (
                      <div
                        key={i}
                        className="px-5 py-4 flex items-start border-r border-white/5 last:border-r-0"
                        data-ocid={`compare.cell.${row.label.toLowerCase()}.${i + 1}`}
                      >
                        {value}
                      </div>
                    );
                  })}
                </div>
              ))}
            </motion.div>

            {/* ── ADD MORE ── */}
            {comparisonList.length < 3 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6 text-center"
              >
                <button
                  type="button"
                  onClick={() => void navigate({ to: "/properties" })}
                  className="inline-flex items-center gap-1.5 text-sm font-body text-muted-foreground hover:text-primary transition-smooth"
                  data-ocid="compare.add_more_button"
                >
                  <Plus size={13} />
                  Add more properties to compare
                </button>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  ArrowRight,
  GitCompare,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useMemo, useRef, useState } from "react";
import { PropertyCard } from "../components/PropertyCard";
import { useComparison } from "../context/ComparisonContext";
import { properties } from "../data/properties";
import type {
  BudgetFilter,
  FilterState,
  PropertyCategory,
  PropertyType,
} from "../types/property";
import { filterProperties } from "../utils/filters";

const LOCATIONS = ["all", "South Bopal", "Bopal", "Shela", "Ambli"];
const TYPES: Array<PropertyType | "all"> = [
  "all",
  "flat",
  "villa",
  "plot",
  "commercial",
];
const BUDGETS: Array<{ value: BudgetFilter; label: string }> = [
  { value: "any", label: "Any Budget" },
  { value: "under-25l", label: "Under ₹25L" },
  { value: "25-50l", label: "₹25–50L" },
  { value: "50-75l", label: "₹50–75L" },
  { value: "75l-1cr", label: "₹75L–1 Cr" },
  { value: "above-1cr", label: "Above ₹1 Cr" },
];
const CATEGORIES: Array<{
  value: PropertyCategory | "all";
  label: string;
  icon: string;
}> = [
  { value: "all", label: "All", icon: "✦" },
  { value: "buy", label: "Buy", icon: "🏠" },
  { value: "rent", label: "Rent", icon: "🔑" },
  { value: "sell", label: "Sell", icon: "💰" },
  { value: "invest", label: "Invest", icon: "📈" },
];
const DEFAULT_FILTERS: FilterState = {
  category: "all",
  budget: "any",
  location: "all",
  type: "all",
};

function hasActiveFilters(f: FilterState) {
  return (
    f.category !== "all" ||
    f.budget !== "any" ||
    f.location !== "all" ||
    f.type !== "all"
  );
}

export default function PropertiesPage() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/properties" });
  const {
    addToComparison,
    removeFromComparison,
    isInComparison,
    comparisonList,
    clearComparison,
  } = useComparison();

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const initialCategory =
    search.category && CATEGORIES.some((c) => c.value === search.category)
      ? (search.category as FilterState["category"])
      : "all";

  const [filters, setFilters] = useState<FilterState>({
    ...DEFAULT_FILTERS,
    category: initialCategory,
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filtered = useMemo(
    () => filterProperties(properties, filters),
    [filters],
  );
  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };
  const clearFilters = () => setFilters(DEFAULT_FILTERS);
  const filtersActive = hasActiveFilters(filters);

  return (
    <div
      className="min-h-screen"
      style={{
        background: "var(--surface-1)",
        paddingBottom: comparisonList.length > 0 ? "90px" : "0",
      }}
      data-ocid="properties.page"
    >
      {/* ── CINEMATIC HERO STRIP ── */}
      <div
        ref={heroRef}
        className="relative overflow-hidden"
        style={{ height: "40vh", minHeight: "280px" }}
      >
        {/* Parallax background */}
        <motion.div
          className="absolute inset-0"
          style={{
            y: heroY,
            backgroundImage:
              "url(https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=90)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Cinematic overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,14,26,0.55) 0%, rgba(10,14,26,0.4) 40%, rgba(10,14,26,0.88) 100%)",
          }}
        />
        {/* Cyan tint radial */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 50% -20%, rgba(58,134,255,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Hero content */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            className="flex items-center gap-2 mb-4 text-xs font-semibold tracking-widest uppercase"
            style={{ color: "rgba(58,134,255,0.9)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Sparkles size={12} />
            {filtered.length} Verified Properties
          </motion.div>

          <motion.h1
            className="font-display font-black text-4xl sm:text-5xl md:text-6xl leading-none mb-4"
            style={{ color: "rgba(240,244,255,0.97)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Find Your{" "}
            <span
              style={{
                color: "#3a86ff",
                textShadow:
                  "0 0 32px rgba(58,134,255,0.5), 0 0 64px rgba(58,134,255,0.2)",
              }}
            >
              Perfect
            </span>
            <br />
            Property
          </motion.h1>

          <motion.p
            className="text-sm sm:text-base max-w-md"
            style={{ color: "rgba(170,180,210,0.85)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            Curated listings across South Bopal, Bopal, Shela &amp; Ambli
          </motion.p>
        </motion.div>
      </div>

      {/* ── STICKY GLASS FILTER BAR ── */}
      <div
        className="sticky top-0 z-30 w-full"
        style={{
          background: "rgba(10,14,26,0.88)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(58,134,255,0.12)",
          boxShadow: "0 4px 32px rgba(0,0,0,0.4)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Category pills */}
          <div
            className="flex gap-2 overflow-x-auto py-3 scrollbar-hide"
            data-ocid="properties.category_tabs"
          >
            {CATEGORIES.map((c) => (
              <motion.button
                key={c.value}
                type="button"
                onClick={() =>
                  updateFilter("category", c.value as FilterState["category"])
                }
                className="shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
                style={
                  filters.category === c.value
                    ? {
                        background: "rgba(58,134,255,0.2)",
                        border: "1px solid rgba(58,134,255,0.5)",
                        color: "#3a86ff",
                        boxShadow: "0 0 12px rgba(58,134,255,0.25)",
                      }
                    : {
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "rgba(180,190,220,0.8)",
                      }
                }
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                data-ocid={`properties.category_tab.${c.value}`}
              >
                <span>{c.icon}</span>
                {c.label}
              </motion.button>
            ))}
          </div>

          {/* Filters row */}
          <div className="flex flex-wrap gap-2 items-center pb-3">
            {/* Desktop dropdowns */}
            <div className="hidden sm:flex flex-wrap gap-2 items-center flex-1">
              <div className="[&_.select-trigger]:glass-sm [&_.select-trigger]:border-white/10 [&_.select-trigger]:text-xs">
                <Select
                  value={filters.budget}
                  onValueChange={(v) =>
                    updateFilter("budget", v as BudgetFilter)
                  }
                >
                  <SelectTrigger
                    className="w-36 text-xs font-medium h-8"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "rgba(200,210,230,0.9)",
                    }}
                    data-ocid="properties.budget_select"
                  >
                    <SelectValue placeholder="Budget" />
                  </SelectTrigger>
                  <SelectContent>
                    {BUDGETS.map((b) => (
                      <SelectItem
                        key={b.value}
                        value={b.value}
                        className="text-xs"
                      >
                        {b.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Select
                value={filters.location}
                onValueChange={(v) => updateFilter("location", v)}
              >
                <SelectTrigger
                  className="w-36 text-xs font-medium h-8"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "rgba(200,210,230,0.9)",
                  }}
                  data-ocid="properties.location_select"
                >
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {LOCATIONS.map((l) => (
                    <SelectItem key={l} value={l} className="text-xs">
                      {l === "all" ? "All Locations" : l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={filters.type}
                onValueChange={(v) =>
                  updateFilter("type", v as PropertyType | "all")
                }
              >
                <SelectTrigger
                  className="w-32 text-xs font-medium h-8"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "rgba(200,210,230,0.9)",
                  }}
                  data-ocid="properties.type_select"
                >
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {TYPES.map((t) => (
                    <SelectItem
                      key={t}
                      value={t}
                      className="text-xs capitalize"
                    >
                      {t === "all"
                        ? "All Types"
                        : t.charAt(0).toUpperCase() + t.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {filtersActive && (
                <motion.button
                  type="button"
                  onClick={clearFilters}
                  className="flex items-center gap-1 text-xs font-medium transition-colors duration-200"
                  style={{ color: "rgba(58,134,255,0.8)" }}
                  whileHover={{ scale: 1.05 }}
                  data-ocid="properties.clear_filters_button"
                >
                  <X size={11} />
                  Clear
                </motion.button>
              )}
            </div>

            {/* Mobile filter toggle */}
            <div className="flex sm:hidden items-center gap-2 flex-1">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1.5 text-xs h-7"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(200,210,230,0.9)",
                }}
                onClick={() => setShowMobileFilters((v) => !v)}
                data-ocid="properties.mobile_filters_toggle"
              >
                <SlidersHorizontal size={12} />
                Filters
                {filtersActive && (
                  <span
                    className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold"
                    style={{ background: "#3a86ff", color: "#fff" }}
                  >
                    ✓
                  </span>
                )}
              </Button>
              {filtersActive && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs"
                  style={{ color: "rgba(58,134,255,0.8)" }}
                  data-ocid="properties.mobile_clear_filters_button"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Results count */}
            <div
              className="ml-auto flex items-center gap-1.5 text-xs"
              style={{ color: "rgba(140,150,180,0.8)" }}
            >
              <Search size={11} />
              <span data-ocid="properties.results_count">
                <strong style={{ color: "rgba(220,230,255,0.9)" }}>
                  {filtered.length}
                </strong>{" "}
                {filtered.length === 1 ? "property" : "properties"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {showMobileFilters && (
          <motion.div
            className="sm:hidden fixed inset-0 z-40 flex items-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              className="absolute inset-0 w-full h-full"
              style={{ background: "rgba(0,0,0,0.6)", cursor: "default" }}
              onClick={() => setShowMobileFilters(false)}
              aria-label="Close filters"
            />
            <motion.div
              className="relative w-full rounded-t-3xl p-6 flex flex-col gap-4"
              style={{
                background: "rgba(14,18,32,0.97)",
                backdropFilter: "blur(24px)",
                border: "1px solid rgba(58,134,255,0.15)",
                borderBottom: "none",
              }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              data-ocid="properties.mobile_filters_panel"
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-sm font-bold"
                  style={{
                    color: "rgba(240,244,255,0.97)",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  Filter Properties
                </span>
                <button
                  type="button"
                  onClick={() => setShowMobileFilters(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    color: "rgba(200,210,230,0.7)",
                  }}
                  data-ocid="properties.close_filters_button"
                >
                  <X size={14} />
                </button>
              </div>

              {[
                {
                  label: "Budget",
                  key: "budget" as const,
                  options: BUDGETS.map((b) => ({
                    value: b.value,
                    label: b.label,
                  })),
                  ocid: "properties.mobile_budget_select",
                },
                {
                  label: "Location",
                  key: "location" as const,
                  options: LOCATIONS.map((l) => ({
                    value: l,
                    label: l === "all" ? "All Locations" : l,
                  })),
                  ocid: "properties.mobile_location_select",
                },
                {
                  label: "Type",
                  key: "type" as const,
                  options: TYPES.map((t) => ({
                    value: t,
                    label:
                      t === "all"
                        ? "All Types"
                        : t.charAt(0).toUpperCase() + t.slice(1),
                  })),
                  ocid: "properties.mobile_type_select",
                },
              ].map(({ label, key, options, ocid }) => (
                <div key={key} className="flex flex-col gap-1.5">
                  <label
                    htmlFor={`mobile-filter-${key}`}
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "rgba(140,150,180,0.7)" }}
                  >
                    {label}
                  </label>
                  <Select
                    value={filters[key] as string}
                    onValueChange={(v) => {
                      if (key === "budget")
                        updateFilter("budget", v as BudgetFilter);
                      else if (key === "type")
                        updateFilter("type", v as PropertyType | "all");
                      else updateFilter("location", v);
                    }}
                  >
                    <SelectTrigger
                      className="text-sm h-10"
                      id={`mobile-filter-${key}`}
                      data-ocid={ocid}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {options.map((o) => (
                        <SelectItem
                          key={o.value}
                          value={o.value}
                          className="text-sm"
                        >
                          {o.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}

              <Button
                className="w-full mt-2 font-bold"
                style={{ background: "#3a86ff", color: "#fff" }}
                onClick={() => setShowMobileFilters(false)}
              >
                Apply Filters
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── PROPERTY GRID ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {filtered.length === 0 ? (
          <motion.div
            className="flex flex-col items-center justify-center py-28 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            data-ocid="properties.empty_state"
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mb-6 text-3xl"
              style={{
                background: "rgba(58,134,255,0.08)",
                border: "1px solid rgba(58,134,255,0.2)",
                boxShadow: "0 0 40px rgba(58,134,255,0.1)",
              }}
            >
              🔍
            </div>
            <h3
              className="text-xl font-black mb-2"
              style={{
                color: "rgba(240,244,255,0.97)",
                fontFamily: "var(--font-display)",
              }}
            >
              No properties found
            </h3>
            <p
              className="text-sm mb-6 max-w-xs"
              style={{ color: "rgba(140,150,180,0.8)" }}
            >
              Try adjusting your filters to discover more listings.
            </p>
            <motion.button
              type="button"
              onClick={clearFilters}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold"
              style={{
                background: "rgba(58,134,255,0.15)",
                border: "1px solid rgba(58,134,255,0.35)",
                color: "#3a86ff",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-ocid="properties.empty_clear_filters_button"
            >
              Clear All Filters
              <ArrowRight size={14} />
            </motion.button>
          </motion.div>
        ) : (
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            data-ocid="properties.list"
          >
            {filtered.map((p, i) => {
              const inCompare = isInComparison(p.id);
              const maxReached = comparisonList.length >= 3 && !inCompare;
              return (
                <motion.div
                  key={p.id}
                  data-ocid={`properties.item.${i + 1}`}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.5,
                    delay: (i % 3) * 0.08,
                    ease: "easeOut",
                  }}
                >
                  <PropertyCard
                    property={p}
                    index={i + 1}
                    onCompare={() =>
                      inCompare
                        ? removeFromComparison(p.id)
                        : addToComparison(p)
                    }
                    inComparison={inCompare}
                    comparisonFull={maxReached}
                  />
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── COMPARISON FLOATING BAR ── */}
      <AnimatePresence>
        {comparisonList.length > 0 && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50"
            style={{
              background: "rgba(10,14,26,0.94)",
              backdropFilter: "blur(20px)",
              borderTop: "1px solid rgba(58,134,255,0.25)",
              boxShadow: "0 -8px 40px rgba(0,0,0,0.5)",
            }}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            data-ocid="properties.comparison_bar"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <GitCompare
                  size={16}
                  style={{ color: "#3a86ff" }}
                  className="shrink-0"
                />
                <div className="flex items-center gap-2 overflow-hidden">
                  {comparisonList.map((prop) => (
                    <div
                      key={prop.id}
                      className="flex items-center gap-1.5 shrink-0"
                    >
                      <img
                        src={prop.imageUrl}
                        alt={prop.title}
                        className="w-8 h-8 object-cover rounded-lg"
                        style={{ border: "1px solid rgba(58,134,255,0.3)" }}
                      />
                      <span
                        className="text-xs font-medium max-w-[72px] truncate hidden sm:block"
                        style={{ color: "rgba(200,210,230,0.85)" }}
                      >
                        {prop.title.split("—")[0].trim()}
                      </span>
                    </div>
                  ))}
                </div>
                <span
                  className="text-xs shrink-0 ml-1"
                  style={{ color: "rgba(140,150,180,0.6)" }}
                >
                  {comparisonList.length}/3
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={clearComparison}
                  className="text-xs font-medium transition-colors"
                  style={{ color: "rgba(140,150,180,0.7)" }}
                  data-ocid="properties.comparison_clear_button"
                >
                  Clear
                </button>
                <motion.button
                  type="button"
                  onClick={() => void navigate({ to: "/compare" })}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold"
                  style={{
                    background:
                      "linear-gradient(135deg, #3a86ff 0%, #1e5adc 100%)",
                    color: "#fff",
                    boxShadow: "0 0 16px rgba(58,134,255,0.4)",
                  }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  data-ocid="properties.compare_now_button"
                >
                  Compare Now
                  <ArrowRight size={12} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Bath,
  BedDouble,
  Building2,
  Car,
  CheckCircle2,
  ChevronRight,
  Dumbbell,
  Eye,
  GitCompare,
  Home,
  MapPin,
  Phone,
  Play,
  Ruler,
  ShieldCheck,
  Sparkles,
  Star,
  Trees,
  Wifi,
  Zap,
} from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useComparison } from "../context/ComparisonContext";
import { properties } from "../data/properties";

const WHATSAPP_BASE =
  "https://wa.me/919876543210?text=Hi%2C%20I%20am%20interested%20in%20";

// Amenity → icon map
const amenityIcons: Record<string, React.ReactNode> = {
  "Covered Parking": <Car size={13} />,
  "Car Parking": <Car size={13} />,
  "Visitor Parking": <Car size={13} />,
  "Open Parking": <Car size={13} />,
  "Double Parking": <Car size={13} />,
  "Dedicated Parking": <Car size={13} />,
  "3-Car Garage": <Car size={13} />,
  "24/7 Security": <ShieldCheck size={13} />,
  "CCTV Security": <ShieldCheck size={13} />,
  "Security Guard": <ShieldCheck size={13} />,
  CCTV: <ShieldCheck size={13} />,
  "Gym & Pool": <Dumbbell size={13} />,
  "Gym Access": <Dumbbell size={13} />,
  Gym: <Dumbbell size={13} />,
  "Power Backup": <Zap size={13} />,
  Generator: <Zap size={13} />,
  Lift: <Building2 size={13} />,
  "Swimming Pool": <Bath size={13} />,
  "Olympic Pool": <Bath size={13} />,
  "Private Garden": <Trees size={13} />,
  "Rooftop Garden": <Trees size={13} />,
  "Home Automation": <Wifi size={13} />,
  "Smart Home": <Wifi size={13} />,
  "NA Approved": <CheckCircle2 size={13} />,
  "Clear Title": <CheckCircle2 size={13} />,
  "Fully Furnished": <Home size={13} />,
  "Semi-Furnished": <Home size={13} />,
  "EV Charging": <Zap size={13} />,
  Concierge: <Star size={13} />,
  "Sky Lounge": <Sparkles size={13} />,
};

const getAmenityIcon = (amenity: string) =>
  amenityIcons[amenity] ?? <CheckCircle2 size={13} />;

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

// Fake viewer count using property id seed
function getViewerCount(id: string) {
  const seed = id.charCodeAt(id.length - 1);
  return 6 + (seed % 11); // 6-16
}

export default function PropertyDetailPage() {
  const { id } = useParams({ from: "/properties/$id" });
  const navigate = useNavigate();
  const {
    addToComparison,
    removeFromComparison,
    isInComparison,
    comparisonList,
  } = useComparison();

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const property = properties.find((p) => p.id === id);
  const [ctaVisible, setCtaVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setCtaVisible(true), 400);
    return () => clearTimeout(timer);
  }, []);

  if (!property) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex flex-col items-center justify-center gap-6 bg-background"
        data-ocid="property_detail.not_found"
      >
        <div className="w-20 h-20 rounded-2xl glass flex items-center justify-center text-4xl">
          🏠
        </div>
        <h2 className="font-display font-bold text-2xl text-foreground">
          Property Not Found
        </h2>
        <p className="font-body text-muted-foreground text-sm">
          This listing may have been removed or doesn't exist.
        </p>
        <Button
          onClick={() => void navigate({ to: "/properties" })}
          className="button-premium bg-primary text-primary-foreground"
          data-ocid="property_detail.not_found.back_button"
        >
          Browse Properties
        </Button>
      </motion.div>
    );
  }

  const whatsappMsg = `${WHATSAPP_BASE}${encodeURIComponent(property.title)}%20-%20${encodeURIComponent(property.price)}`;
  const inComparison = isInComparison(property.id);
  const comparisonFull = comparisonList.length >= 3 && !inComparison;
  const viewers = getViewerCount(property.id);

  const similar = properties
    .filter(
      (p) =>
        p.id !== property.id &&
        (p.type === property.type || p.location === property.location),
    )
    .slice(0, 3);

  const stats = [
    { label: "Price", val: property.price, highlight: true },
    { label: "Area", val: property.areaLabel },
    ...(property.bedrooms > 0
      ? [{ label: "Bedrooms", val: `${property.bedrooms} BHK` }]
      : []),
    {
      label: "Type",
      val: property.type.charAt(0).toUpperCase() + property.type.slice(1),
    },
    { label: "Location", val: property.location },
  ];

  return (
    <div
      className="bg-background min-h-screen"
      data-ocid="property_detail.page"
    >
      {/* ─── CINEMATIC HERO ─── */}
      <div
        ref={heroRef}
        className="relative h-[78vh] min-h-[520px] overflow-hidden"
        data-ocid="property_detail.hero"
      >
        {/* Parallax image */}
        <motion.div
          className="absolute inset-0 parallax-slow"
          style={{ y: heroY }}
        >
          <img
            src={property.imageUrl}
            alt={property.title}
            className="w-full h-full object-cover scale-110"
          />
        </motion.div>

        {/* Gradient overlay — deep dark at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050810] via-[#050810]/50 to-[#050810]/10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050810]/40 to-transparent pointer-events-none" />

        {/* Top bar — back + badges */}
        <div className="absolute top-0 left-0 right-0 px-4 sm:px-8 pt-5 flex items-start justify-between z-20">
          <motion.button
            type="button"
            onClick={() => window.history.back()}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center gap-2 glass-sm rounded-full px-4 py-2 text-sm font-body text-foreground hover:text-primary transition-smooth group"
            data-ocid="property_detail.back_button"
          >
            <ArrowLeft
              size={14}
              className="group-hover:-translate-x-0.5 transition-smooth"
            />
            Back
          </motion.button>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap gap-2 justify-end"
          >
            {property.isRecentlyAdded && (
              <span className="glass-sm rounded-full px-3 py-1 text-xs font-body font-semibold text-cyan-300 border border-cyan-400/30 flex items-center gap-1.5">
                <Sparkles size={11} className="text-cyan-400" />
                Recently Added
              </span>
            )}
            {property.isFeatured && (
              <span
                className="rounded-full px-3 py-1 text-xs font-body font-semibold text-amber-300 border border-amber-400/30 flex items-center gap-1.5"
                style={{ background: "rgba(245,166,35,0.12)" }}
              >
                <Star size={11} className="text-amber-400 fill-amber-400" />
                Featured
              </span>
            )}
            {property.badge && (
              <span className="glass rounded-full px-3 py-1 text-xs font-body font-semibold text-foreground">
                {property.badge}
              </span>
            )}
          </motion.div>
        </div>

        {/* Live Activity badge */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="absolute top-14 sm:top-5 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="glass-sm rounded-full px-4 py-2 flex items-center gap-2.5 border border-white/10 shadow-cinematic">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
            </span>
            <span className="text-xs font-body text-foreground/90">
              <Eye size={11} className="inline mr-1 text-muted-foreground" />
              <strong className="text-foreground">{viewers}</strong> people
              viewing right now
            </span>
          </div>
        </motion.div>

        {/* Hero title block */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute bottom-0 left-0 right-0 px-4 sm:px-8 pb-8 z-10"
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
            className="flex items-center gap-1.5 text-xs font-body text-muted-foreground mb-2"
          >
            <MapPin size={11} /> {property.location}
            <ChevronRight size={11} />
            <span className="capitalize">{property.type}</span>
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7, ease: "easeOut" }}
            className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight max-w-3xl text-glow-cyan"
          >
            {property.title}
          </motion.h1>

          {/* Stats bar — glassmorphism pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6, ease: "easeOut" }}
            className="mt-5 inline-flex flex-wrap gap-3 sm:gap-0 sm:flex-nowrap glass rounded-2xl px-1 py-1 shadow-elevated border border-white/10"
            data-ocid="property_detail.stats_bar"
          >
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-col items-center px-4 sm:px-5 py-2 sm:py-3 ${
                  i < stats.length - 1 ? "sm:border-r sm:border-white/10" : ""
                }`}
              >
                <span className="text-[10px] font-body text-muted-foreground uppercase tracking-wider mb-0.5">
                  {s.label}
                </span>
                <span
                  className={`font-display font-bold text-sm sm:text-base ${
                    s.highlight
                      ? "text-cyan-300 text-glow-cyan"
                      : "text-foreground"
                  }`}
                >
                  {s.val}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid lg:grid-cols-5 gap-10">
          {/* ── LEFT ── */}
          <div className="lg:col-span-3 flex flex-col gap-10">
            {/* Gallery strip — extra images with zoom */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex gap-3 overflow-x-auto pb-2"
              style={{ scrollSnapType: "x mandatory" }}
              data-ocid="property_detail.gallery"
            >
              {[
                { src: property.imageUrl, label: "Main view" },
                {
                  src: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=800&q=75",
                  label: "Living room",
                },
                {
                  src: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=75",
                  label: "Kitchen",
                },
                {
                  src: "https://images.unsplash.com/photo-1556020685-ae41abfc9365?auto=format&fit=crop&w=800&q=75",
                  label: "Bedroom",
                },
              ].map(({ src, label }, i) => (
                <div
                  key={label}
                  className="shrink-0 w-48 h-28 rounded-xl overflow-hidden img-zoom cursor-pointer border border-white/8"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <img
                    src={src}
                    alt={`View ${i + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {i === 3 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl">
                      <Play size={20} className="text-white" />
                    </div>
                  )}
                </div>
              ))}
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display font-bold text-xl text-foreground mb-4 flex items-center gap-2">
                <span className="w-1 h-5 rounded-full bg-primary inline-block" />
                About This Property
              </h2>
              <p className="font-body text-base text-muted-foreground leading-relaxed">
                {property.description}
              </p>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  {
                    icon: <Ruler size={15} />,
                    label: "Size",
                    val: property.areaLabel,
                  },
                  ...(property.bedrooms > 0
                    ? [
                        {
                          icon: <BedDouble size={15} />,
                          label: "Bedrooms",
                          val: `${property.bedrooms} BHK`,
                        },
                      ]
                    : []),
                  {
                    icon: <Building2 size={15} />,
                    label: "Type",
                    val:
                      property.type.charAt(0).toUpperCase() +
                      property.type.slice(1),
                  },
                  {
                    icon: <MapPin size={15} />,
                    label: "Location",
                    val: property.location,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="glass-sm rounded-xl p-3 flex items-center gap-3"
                  >
                    <span className="text-primary">{item.icon}</span>
                    <div>
                      <div className="text-[10px] font-body text-muted-foreground uppercase tracking-wider">
                        {item.label}
                      </div>
                      <div className="font-display font-semibold text-sm text-foreground truncate">
                        {item.val}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Amenities */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="font-display font-bold text-xl text-foreground mb-4 flex items-center gap-2">
                <span className="w-1 h-5 rounded-full bg-accent inline-block" />
                Amenities
              </h3>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex flex-wrap gap-2.5"
                data-ocid="property_detail.amenities"
              >
                {property.amenities.map((a) => (
                  <motion.span
                    key={a}
                    variants={itemVariants}
                    className="glass-sm flex items-center gap-2 rounded-full px-4 py-2 text-xs font-body font-medium text-foreground border border-white/10 hover:border-primary/30 hover:text-primary transition-smooth cursor-default"
                  >
                    <span className="text-primary">{getAmenityIcon(a)}</span>
                    {a}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            {/* Trust bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass rounded-2xl p-4 flex flex-wrap gap-4 sm:gap-6 justify-center border border-white/10"
            >
              {[
                "Verified Listing",
                "No Hidden Charges",
                "Genuine Advice",
                "Legal Clarity",
              ].map((t) => (
                <span
                  key={t}
                  className="flex items-center gap-1.5 text-xs font-body text-muted-foreground"
                >
                  <CheckCircle2 size={13} className="text-primary shrink-0" />
                  {t}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Sticky CTA Card ── */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={
                ctaVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }
              }
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="sticky top-24 flex flex-col gap-4"
            >
              <div
                className="glass-lg rounded-2xl p-6 shadow-cinematic border border-white/12"
                data-ocid="property_detail.cta_card"
              >
                {/* Price */}
                <div className="mb-5">
                  <div className="text-xs font-body text-muted-foreground uppercase tracking-widest mb-1">
                    Listed Price
                  </div>
                  <div className="font-display font-black text-3xl text-cyan-300 text-glow-cyan">
                    {property.price}
                  </div>
                  <div className="flex items-center gap-1 text-xs font-body text-muted-foreground mt-1">
                    <MapPin size={10} /> {property.location} ·{" "}
                    {property.areaLabel}
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <a
                  href={whatsappMsg}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="property_detail.whatsapp_button"
                >
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-body font-bold text-sm text-white mb-3 transition-smooth pulse-wa"
                    style={{
                      background:
                        "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                      boxShadow:
                        "0 0 24px rgba(37,211,102,0.35), 0 4px 16px rgba(0,0,0,0.4)",
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="currentColor"
                      role="img"
                      aria-hidden="true"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.535 5.858L0 24l6.335-1.521C8.003 23.45 9.958 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.882 0-3.646-.51-5.163-1.4l-.369-.219-3.758.903.946-3.663-.242-.381A9.955 9.955 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                    </svg>
                    Enquire on WhatsApp
                  </button>
                </a>

                {/* Call CTA */}
                <a
                  href="tel:+919876543210"
                  data-ocid="property_detail.call_button"
                >
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-body font-semibold text-sm text-foreground mb-4 glass border border-white/15 hover:border-primary/40 hover:text-primary transition-smooth"
                  >
                    <Phone size={14} />
                    Call Now
                  </button>
                </a>

                {/* Divider */}
                <div className="h-px bg-white/8 mb-4" />

                {/* Compare toggle */}
                <button
                  type="button"
                  onClick={() =>
                    inComparison
                      ? removeFromComparison(property.id)
                      : addToComparison(property)
                  }
                  disabled={comparisonFull}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-body font-medium transition-smooth ${
                    inComparison
                      ? "bg-primary/15 text-primary border border-primary/30 hover:bg-primary/25"
                      : comparisonFull
                        ? "opacity-40 cursor-not-allowed glass border border-white/10 text-muted-foreground"
                        : "glass border border-white/12 text-foreground hover:border-primary/30 hover:text-primary"
                  }`}
                  data-ocid="property_detail.compare_button"
                >
                  <GitCompare size={14} />
                  {inComparison
                    ? "Remove from Compare"
                    : comparisonFull
                      ? "Compare Full (max 3)"
                      : "Add to Compare"}
                </button>

                {comparisonList.length > 0 && (
                  <button
                    type="button"
                    onClick={() => void navigate({ to: "/compare" })}
                    className="w-full text-center text-xs font-body text-primary hover:text-primary/80 transition-smooth mt-2 flex items-center justify-center gap-1"
                    data-ocid="property_detail.view_compare_button"
                  >
                    View Comparison ({comparisonList.length}/3)
                    <ChevronRight size={11} />
                  </button>
                )}
              </div>

              {/* Mini trust card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={ctaVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="glass-sm rounded-xl p-4 border border-white/10 text-center"
              >
                <p className="text-xs font-body text-muted-foreground leading-relaxed">
                  <ShieldCheck size={12} className="inline mr-1 text-primary" />
                  This listing is verified by Just Real Estate.{" "}
                  <span className="text-foreground">
                    No hidden charges, no false promises.
                  </span>
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ── SIMILAR PROPERTIES ── */}
        {similar.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16"
            data-ocid="property_detail.similar_section"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-bold text-2xl text-foreground flex items-center gap-2">
                <span className="w-1 h-6 rounded-full bg-primary inline-block" />
                Similar Properties
              </h3>
              <button
                type="button"
                onClick={() => void navigate({ to: "/properties" })}
                className="text-sm font-body text-muted-foreground hover:text-primary transition-smooth flex items-center gap-1"
                data-ocid="property_detail.view_all_button"
              >
                View All <ChevronRight size={14} />
              </button>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {similar.map((p, i) => (
                <motion.div
                  key={p.id}
                  variants={itemVariants}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  onClick={() =>
                    void navigate({
                      to: "/properties/$id",
                      params: { id: p.id },
                    })
                  }
                  className="group glass rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-primary/25 transition-smooth shadow-card hover:shadow-elevated"
                  data-ocid={`property_detail.similar.item.${i + 1}`}
                >
                  {/* Image */}
                  <div className="relative h-44 overflow-hidden img-zoom">
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    {p.isRecentlyAdded && (
                      <span className="absolute top-3 left-3 glass-sm rounded-full px-2.5 py-1 text-[10px] font-body font-semibold text-cyan-300 border border-cyan-400/25">
                        Recently Added
                      </span>
                    )}
                    <div className="absolute bottom-3 left-3">
                      <p className="font-display font-black text-lg text-white">
                        {p.price}
                      </p>
                    </div>
                  </div>
                  {/* Card body */}
                  <div className="p-4">
                    <p className="font-display font-semibold text-sm text-foreground line-clamp-2 mb-1 group-hover:text-primary transition-smooth">
                      {p.title}
                    </p>
                    <p className="text-xs font-body text-muted-foreground flex items-center gap-1">
                      <MapPin size={10} /> {p.location} · {p.areaLabel}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* ── MOBILE STICKY CTA ── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 lg:hidden glass-lg border-t border-white/10 px-4 py-3 flex gap-3"
        data-ocid="property_detail.mobile_cta"
      >
        <a
          href={whatsappMsg}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1"
          data-ocid="property_detail.mobile_whatsapp_button"
        >
          <button
            type="button"
            className="w-full py-3 rounded-xl font-body font-bold text-sm text-white flex items-center justify-center gap-2"
            style={{
              background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
              boxShadow: "0 0 16px rgba(37,211,102,0.3)",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width="15"
              height="15"
              fill="currentColor"
              role="img"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.535 5.858L0 24l6.335-1.521C8.003 23.45 9.958 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.882 0-3.646-.51-5.163-1.4l-.369-.219-3.758.903.946-3.663-.242-.381A9.955 9.955 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
            </svg>
            WhatsApp
          </button>
        </a>
        <a
          href="tel:+919876543210"
          className="flex-1"
          data-ocid="property_detail.mobile_call_button"
        >
          <button
            type="button"
            className="w-full py-3 rounded-xl font-body font-semibold text-sm text-foreground glass border border-white/15 flex items-center justify-center gap-2"
          >
            <Phone size={14} /> Call
          </button>
        </a>
        <button
          type="button"
          onClick={() =>
            inComparison
              ? removeFromComparison(property.id)
              : addToComparison(property)
          }
          disabled={comparisonFull}
          className={`flex-none py-3 px-4 rounded-xl font-body font-semibold text-xs transition-smooth ${
            inComparison
              ? "bg-primary/20 text-primary border border-primary/30"
              : "glass border border-white/15 text-muted-foreground"
          }`}
          data-ocid="property_detail.mobile_compare_button"
        >
          <GitCompare size={15} />
        </button>
      </div>
      {/* Bottom padding for mobile sticky bar */}
      <div className="h-20 lg:hidden" />
    </div>
  );
}

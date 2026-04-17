import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Compass, GitCompare, Menu, Phone, X } from "lucide-react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useComparison } from "../../context/ComparisonContext";

const WHATSAPP_URL =
  "https://wa.me/919876543210?text=Hi%2C%20I%20am%20interested%20in%20a%20property%20in%20South%20Bopal.%20Please%20guide%20me.";
const PHONE_URL = "tel:+919876543210";

const NAV_LINKS = [
  { label: "Properties", href: "/properties" },
  { label: "Why Us", href: "/#why-us" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Contact", href: "/contact" },
];

const WHATSAPP_ICON = (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const { comparisonList } = useComparison();
  const navigate = useNavigate();
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  // Hide/show nav on scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 20);
      if (currentY > lastScrollY.current + 8 && currentY > 120) {
        setHidden(true);
      } else if (currentY < lastScrollY.current - 4) {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith("/#")) {
      const hash = href.slice(1);
      if (pathname !== "/") {
        void navigate({ to: "/" });
        setTimeout(() => {
          document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
        }, 120);
      } else {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-animated-gradient">
      {/* Glassmorphism Floating Nav */}
      <motion.header
        data-ocid="nav.header"
        animate={{
          y: hidden && !menuOpen ? -80 : 0,
          opacity: hidden && !menuOpen ? 0 : 1,
        }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        className="fixed top-0 left-0 right-0 z-[500] px-3 pt-3"
      >
        <div
          className={`max-w-7xl mx-auto rounded-2xl transition-all duration-500 ${
            scrolled
              ? "glass shadow-cinematic"
              : "bg-transparent border border-transparent"
          }`}
        >
          <div className="h-16 px-5 flex items-center justify-between gap-4">
            {/* Logo */}
            <Link
              to="/"
              className="flex flex-col leading-tight min-w-0 shrink-0 group"
              data-ocid="nav.logo_link"
            >
              <div className="flex items-center gap-1.5">
                {/* Glyph */}
                <div
                  className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, #3a86ff 0%, #60a5fa 100%)",
                    boxShadow: "0 0 12px rgba(58, 134, 255, 0.5)",
                  }}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M6 1L11 4.5V7.5L6 11L1 7.5V4.5L6 1Z"
                      fill="white"
                      fillOpacity="0.9"
                    />
                    <path
                      d="M6 3.5L8.5 5.25V7.5L6 9.25L3.5 7.5V5.25L6 3.5Z"
                      fill="white"
                      fillOpacity="0.4"
                    />
                  </svg>
                </div>
                <span
                  className="font-display font-bold text-base tracking-tight text-foreground group-hover:text-primary transition-colors duration-200"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  Just Real Estate
                </span>
              </div>
              <span className="text-muted-foreground text-[10px] font-body pl-8">
                South Bopal, Ahmedabad
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav
              className="hidden md:flex items-center gap-7"
              aria-label="Main navigation"
            >
              {NAV_LINKS.map((link) =>
                link.href.startsWith("/#") ? (
                  <button
                    type="button"
                    key={link.label}
                    onClick={() => handleNavClick(link.href)}
                    className="nav-link text-sm font-body font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 focus-visible:outline-none"
                    data-ocid={`nav.${link.label.toLowerCase().replace(/\s/g, "_")}_link`}
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="nav-link text-sm font-body font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                    data-ocid={`nav.${link.label.toLowerCase().replace(/\s/g, "_")}_link`}
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2.5">
              {comparisonList.length > 0 && (
                <motion.button
                  type="button"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  onClick={() => void navigate({ to: "/compare" })}
                  className="relative hidden sm:flex items-center gap-1.5 text-xs font-body font-semibold glass rounded-full px-3 py-1.5 text-primary hover:glow-primary transition-all duration-200"
                  aria-label={`Compare ${comparisonList.length} properties`}
                  data-ocid="nav.compare_button"
                >
                  <GitCompare size={13} />
                  <span>Compare</span>
                  <span
                    className="absolute -top-1.5 -right-1.5 text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold leading-none"
                    style={{ background: "#f5a623", color: "#0a0e1a" }}
                  >
                    {comparisonList.length}
                  </span>
                </motion.button>
              )}

              {/* Talk to Expert CTA */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="nav.talk_to_expert_button"
                className="hidden sm:block"
              >
                <motion.div
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className="button-premium px-4 py-2 rounded-xl text-sm font-body font-semibold text-foreground"
                  style={{
                    background:
                      "linear-gradient(135deg, #3a86ff 0%, #2563eb 100%)",
                    boxShadow: "0 0 16px rgba(58, 134, 255, 0.3)",
                    color: "#fff",
                  }}
                >
                  Talk to Expert
                </motion.div>
              </a>

              {/* Mobile Hamburger */}
              <motion.button
                type="button"
                className="md:hidden relative w-9 h-9 flex items-center justify-center rounded-xl glass text-foreground"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                data-ocid="nav.mobile_menu_toggle"
                whileTap={{ scale: 0.92 }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {menuOpen ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: -45, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 45, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      <X size={18} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="open"
                      initial={{ rotate: 45, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -45, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      <Menu size={18} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>

          {/* Mobile Drawer */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                key="mobile-menu"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="md:hidden overflow-hidden"
                data-ocid="nav.mobile_menu"
              >
                <div className="px-5 pb-5 pt-1 flex flex-col gap-1 border-t border-border/30">
                  {NAV_LINKS.map((link, i) =>
                    link.href.startsWith("/#") ? (
                      <motion.button
                        type="button"
                        key={link.label}
                        initial={{ x: -16, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.06, duration: 0.25 }}
                        onClick={() => handleNavClick(link.href)}
                        className="text-sm font-body font-medium text-muted-foreground hover:text-foreground text-left py-2.5 px-3 rounded-xl hover:bg-muted/30 transition-colors"
                        data-ocid={`nav.mobile_${link.label.toLowerCase().replace(/\s/g, "_")}_link`}
                      >
                        {link.label}
                      </motion.button>
                    ) : (
                      <motion.div
                        key={link.label}
                        initial={{ x: -16, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.06, duration: 0.25 }}
                      >
                        <Link
                          to={link.href}
                          onClick={() => setMenuOpen(false)}
                          className="block text-sm font-body font-medium text-muted-foreground hover:text-foreground py-2.5 px-3 rounded-xl hover:bg-muted/30 transition-colors"
                          data-ocid={`nav.mobile_${link.label.toLowerCase().replace(/\s/g, "_")}_link`}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    ),
                  )}
                  {comparisonList.length > 0 && (
                    <motion.div
                      initial={{ x: -16, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{
                        delay: NAV_LINKS.length * 0.06,
                        duration: 0.25,
                      }}
                    >
                      <Link
                        to="/compare"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2 text-sm font-body font-semibold text-primary py-2.5 px-3 rounded-xl hover:bg-primary/5 transition-colors"
                        data-ocid="nav.mobile_compare_link"
                      >
                        <GitCompare size={14} />
                        Compare ({comparisonList.length})
                      </Link>
                    </motion.div>
                  )}
                  <motion.div
                    initial={{ x: -16, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: (NAV_LINKS.length + 1) * 0.06,
                      duration: 0.25,
                    }}
                    className="mt-2"
                  >
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-body font-semibold transition-all"
                      style={{
                        background:
                          "linear-gradient(135deg, #3a86ff 0%, #2563eb 100%)",
                        color: "#fff",
                        boxShadow: "0 0 16px rgba(58, 134, 255, 0.3)",
                      }}
                      data-ocid="nav.mobile_talk_expert_button"
                    >
                      {WHATSAPP_ICON}
                      Talk to Expert
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer
        className="mt-auto"
        data-ocid="footer.section"
        style={{ background: "var(--surface-2)" }}
      >
        <div
          className="border-t"
          style={{ borderColor: "rgba(58, 134, 255, 0.12)" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, #3a86ff 0%, #60a5fa 100%)",
                    boxShadow: "0 0 12px rgba(58, 134, 255, 0.5)",
                  }}
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M6 1L11 4.5V7.5L6 11L1 7.5V4.5L6 1Z"
                      fill="white"
                      fillOpacity="0.9"
                    />
                    <path
                      d="M6 3.5L8.5 5.25V7.5L6 9.25L3.5 7.5V5.25L6 3.5Z"
                      fill="white"
                      fillOpacity="0.4"
                    />
                  </svg>
                </div>
                <h3 className="font-display font-bold text-base text-foreground">
                  Just Real Estate
                </h3>
              </div>
              <p className="text-muted-foreground text-sm font-body leading-relaxed mb-3">
                Easy Solutions, Beyond Sales. Honest advice. Verified
                properties. Smooth decisions.
              </p>
              <p className="text-muted-foreground/60 text-xs font-body">
                South Bopal, Ahmedabad, Gujarat 380058
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display font-semibold text-xs mb-4 text-muted-foreground uppercase tracking-widest">
                Quick Links
              </h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Properties", href: "/properties" },
                  { label: "Compare", href: "/compare" },
                  { label: "Contact Us", href: "/contact" },
                ].map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.href}
                      className="text-sm font-body text-muted-foreground hover:text-primary transition-colors duration-200 nav-link inline-block"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-display font-semibold text-xs mb-4 text-muted-foreground uppercase tracking-widest">
                Contact
              </h4>
              <ul className="space-y-2.5 text-sm font-body text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span style={{ color: "#3a86ff" }}>📞</span> +91 98765 43210
                </li>
                <li className="flex items-center gap-2">
                  <span style={{ color: "#3a86ff" }}>✉️</span>{" "}
                  hello@justrealestate.in
                </li>
                <li className="flex items-center gap-2">
                  <span style={{ color: "#3a86ff" }}>🕐</span> Mon–Sat: 9:00 AM
                  – 7:00 PM
                </li>
              </ul>
            </div>

            {/* Office Hours */}
            <div>
              <h4 className="font-display font-semibold text-xs mb-4 text-muted-foreground uppercase tracking-widest">
                Office Hours
              </h4>
              <p className="text-sm font-body text-muted-foreground leading-relaxed">
                Monday – Saturday
                <br />
                9:00 AM – 7:00 PM
                <br />
                <br />
                Sunday:
                <br />
                By Appointment
              </p>
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(58, 134, 255, 0.08)" }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
              <p className="text-xs font-body text-muted-foreground/50">
                © {new Date().getFullYear()} Just Real Estate. All rights
                reserved.
              </p>
              <p className="text-xs font-body text-muted-foreground/40">
                Built with love using{" "}
                <a
                  href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-muted-foreground/60 transition-colors"
                >
                  caffeine.ai
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button — desktop */}
      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[400] hidden sm:flex items-center justify-center w-[52px] h-[52px] rounded-full"
        style={{
          background: "linear-gradient(135deg, #25D366 0%, #1ebe5d 100%)",
          boxShadow: "0 0 0 0 rgba(37, 211, 102, 0.5)",
        }}
        data-ocid="floating.whatsapp_button"
        whileHover={{
          scale: 1.12,
          boxShadow: "0 0 24px rgba(37, 211, 102, 0.6)",
        }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [
            "0 0 0 0 rgba(37, 211, 102, 0.5)",
            "0 0 0 14px rgba(37, 211, 102, 0)",
          ],
        }}
        transition={{
          boxShadow: {
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeOut",
          },
          scale: { duration: 0.2 },
        }}
        aria-label="Chat on WhatsApp"
      >
        <span className="sr-only">Chat on WhatsApp</span>
        <div style={{ color: "#fff" }}>{WHATSAPP_ICON}</div>
      </motion.a>

      {/* Mobile Sticky Bottom Bar */}
      <div
        className="sm:hidden fixed bottom-0 left-0 right-0 z-[400]"
        data-ocid="mobile.sticky_cta"
        style={{
          background: "rgba(10, 14, 26, 0.92)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(58, 134, 255, 0.15)",
        }}
      >
        <div className="flex items-stretch" style={{ borderTop: "none" }}>
          {/* Call */}
          <motion.a
            href={PHONE_URL}
            whileTap={{ backgroundColor: "rgba(58, 134, 255, 0.15)" }}
            className="flex-1 flex flex-col items-center justify-center gap-1 py-3 px-1 text-foreground active:bg-primary/10"
            data-ocid="mobile.call_button"
            aria-label="Call us"
          >
            <Phone size={18} style={{ color: "#3a86ff" }} />
            <span className="text-[10px] font-body font-semibold text-muted-foreground">
              Call
            </span>
          </motion.a>

          {/* WhatsApp — primary */}
          <motion.a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.97 }}
            className="flex-[1.6] flex flex-col items-center justify-center gap-1 py-3 px-2"
            style={{
              background: "linear-gradient(135deg, #25D366 0%, #1ebe5d 100%)",
              boxShadow: "0 0 16px rgba(37, 211, 102, 0.3)",
            }}
            data-ocid="mobile.whatsapp_cta_button"
            aria-label="Chat on WhatsApp"
          >
            <div style={{ color: "#fff" }}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <span
              className="text-[10px] font-body font-bold"
              style={{ color: "#fff" }}
            >
              WhatsApp
            </span>
          </motion.a>

          {/* Explore */}
          <motion.a
            href="/properties"
            whileTap={{ backgroundColor: "rgba(245, 166, 35, 0.12)" }}
            className="flex-1 flex flex-col items-center justify-center gap-1 py-3 px-1 active:bg-accent/10"
            data-ocid="mobile.explore_button"
            aria-label="Explore properties"
          >
            <Compass size={18} style={{ color: "#f5a623" }} />
            <span className="text-[10px] font-body font-semibold text-muted-foreground">
              Explore
            </span>
          </motion.a>
        </div>
      </div>
    </div>
  );
}

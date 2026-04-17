import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  BadgeCheck,
  ChevronDown,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const WHATSAPP_BASE = "https://wa.me/919876543210";

const faqs = [
  {
    q: "Do you charge any hidden fees?",
    a: "Absolutely not. We believe in 100% transparent pricing. Every charge is clearly communicated upfront — no surprises at any stage of the deal.",
  },
  {
    q: "How quickly will you respond after I submit?",
    a: "We typically respond within 2–4 hours on working days. For urgent queries, WhatsApp is the fastest way to reach us.",
  },
  {
    q: "Can I trust the property listings on your site?",
    a: "Every listing is personally verified by our team before being published. We only show properties with clear titles and honest documentation.",
  },
  {
    q: "What areas do you cover?",
    a: "We specialise in South Bopal, Bopal, Shela, and Ambli — the fastest-growing residential zones in Ahmedabad's west corridor.",
  },
];

const trustSignals = [
  {
    icon: Shield,
    label: "No Hidden Charges",
    detail: "Every fee disclosed upfront",
    color: "#3a86ff",
  },
  {
    icon: BadgeCheck,
    label: "Genuine Advice",
    detail: "We tell you what's right, not what's profitable for us",
    color: "#f5a623",
  },
  {
    icon: Zap,
    label: "Quick Response",
    detail: "Hear from us within 2–4 hours",
    color: "#3a86ff",
  },
];

const contactInfo = [
  {
    icon: Phone,
    title: "+91 98765 43210",
    sub: "Mon–Sat, 9am–7pm",
    href: "tel:+919876543210",
  },
  {
    icon: MapPin,
    title: "Our Office",
    sub: "G-12, Bhesan Complex, South Bopal, Ahmedabad – 380058",
    href: "https://maps.google.com/?q=South+Bopal+Ahmedabad",
  },
  {
    icon: Clock,
    title: "Office Hours",
    sub: "Mon–Sat: 9:00 AM – 7:00 PM",
    href: undefined,
  },
];

// Premium input field
function GlassInput({
  id,
  label,
  required,
  placeholder,
  type = "text",
  value,
  onChange,
  ocid,
}: {
  id: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  ocid: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="flex flex-col gap-1.5">
      <Label
        htmlFor={id}
        className="text-xs font-semibold uppercase tracking-wider"
        style={{ color: "rgba(140,150,180,0.8)" }}
      >
        {label}
        {required && (
          <span style={{ color: "#3a86ff", marginLeft: "4px" }}>*</span>
        )}
      </Label>
      <div className="relative">
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          required={required}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="h-11 text-sm transition-all duration-200"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: focused
              ? "1px solid rgba(58,134,255,0.6)"
              : "1px solid rgba(255,255,255,0.1)",
            color: "rgba(240,244,255,0.95)",
            boxShadow: focused ? "0 0 12px rgba(58,134,255,0.2)" : "none",
            outline: "none",
          }}
          data-ocid={ocid}
        />
      </div>
    </div>
  );
}

export default function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [requirement, setRequirement] = useState("Buy Property");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [reqFocused, setReqFocused] = useState(false);
  const [msgFocused, setMsgFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const text = encodeURIComponent(
      `Hi Just Real Estate, I'm ${name} and I'm interested in ${requirement}. My phone is ${phone}.${
        message ? ` Additional details: ${message}` : ""
      }`,
    );
    setTimeout(() => {
      window.open(`${WHATSAPP_BASE}?text=${text}`, "_blank");
    }, 1200);
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--surface-1)" }}
      data-ocid="contact.page"
    >
      {/* ── CINEMATIC HERO ── */}
      <div
        className="relative overflow-hidden"
        style={{
          minHeight: "320px",
          paddingTop: "80px",
          paddingBottom: "80px",
        }}
      >
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=2000&q=90)",
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,14,26,0.75) 0%, rgba(10,14,26,0.65) 40%, rgba(10,14,26,0.92) 100%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 50% -10%, rgba(58,134,255,0.14) 0%, transparent 70%)",
          }}
        />

        {/* Content */}
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center z-10">
          <motion.div
            className="flex items-center justify-center gap-2 mb-5 text-xs font-semibold tracking-widest uppercase"
            style={{ color: "rgba(58,134,255,0.85)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles size={12} />
            Get In Touch
          </motion.div>

          <motion.h1
            className="font-black text-4xl sm:text-5xl md:text-6xl leading-tight mb-5"
            style={{
              color: "rgba(240,244,255,0.97)",
              fontFamily: "var(--font-display)",
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Let's Find Your{" "}
            <span
              style={{
                color: "#3a86ff",
                textShadow:
                  "0 0 32px rgba(58,134,255,0.5), 0 0 64px rgba(58,134,255,0.2)",
              }}
            >
              Property
            </span>
          </motion.h1>

          <motion.p
            className="text-sm sm:text-base max-w-md mx-auto"
            style={{ color: "rgba(160,170,200,0.85)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            No pressure. No confusion. Just honest guidance to help you decide
            right.
          </motion.p>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* ─── FORM CARD ─── */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="rounded-2xl p-6 sm:p-8"
              style={{
                background: "rgba(14,18,32,0.85)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(58,134,255,0.14)",
                boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
              }}
              data-ocid="contact.form_card"
            >
              <h2
                className="font-black text-xl mb-1"
                style={{
                  color: "rgba(240,244,255,0.97)",
                  fontFamily: "var(--font-display)",
                }}
              >
                Get a Call Back
              </h2>
              <p
                className="text-xs mb-6"
                style={{ color: "rgba(140,150,180,0.7)" }}
              >
                We'll guide you step by step.
              </p>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    className="flex flex-col items-center justify-center py-10 gap-5 text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    data-ocid="contact.success_state"
                  >
                    <motion.div
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{
                        background: "rgba(37,211,102,0.12)",
                        border: "1px solid rgba(37,211,102,0.3)",
                        boxShadow: "0 0 32px rgba(37,211,102,0.15)",
                      }}
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        damping: 12,
                        stiffness: 200,
                        delay: 0.1,
                      }}
                    >
                      <MessageCircle
                        className="w-8 h-8"
                        style={{ color: "#25D366" }}
                      />
                    </motion.div>
                    <div>
                      <h3
                        className="font-black text-lg mb-1"
                        style={{
                          color: "rgba(240,244,255,0.97)",
                          fontFamily: "var(--font-display)",
                        }}
                      >
                        Opening WhatsApp…
                      </h3>
                      <p
                        className="text-sm"
                        style={{ color: "rgba(140,150,180,0.8)" }}
                      >
                        A chat should open shortly. If not,{" "}
                        <a
                          href={`${WHATSAPP_BASE}?text=${encodeURIComponent(
                            `Hi Just Real Estate, I'm ${name} interested in ${requirement}. Phone: ${phone}.`,
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: "#3a86ff",
                            textDecoration: "underline",
                          }}
                        >
                          click here
                        </a>
                        .
                      </p>
                    </div>
                    <motion.button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="px-5 py-2 rounded-xl text-sm font-semibold transition-colors"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        color: "rgba(200,210,230,0.8)",
                      }}
                      whileHover={{ scale: 1.04 }}
                      data-ocid="contact.reset_button"
                    >
                      Submit Another Query
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    data-ocid="contact.form"
                  >
                    <GlassInput
                      id="name"
                      label="Your Name"
                      required
                      placeholder="e.g. Rahul Mehta"
                      value={name}
                      onChange={setName}
                      ocid="contact.name_input"
                    />

                    <GlassInput
                      id="phone"
                      label="Phone Number"
                      type="tel"
                      required
                      placeholder="e.g. 98765 43210"
                      value={phone}
                      onChange={setPhone}
                      ocid="contact.phone_input"
                    />

                    {/* Requirement select */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="requirement"
                        className="text-xs font-semibold uppercase tracking-wider"
                        style={{ color: "rgba(140,150,180,0.8)" }}
                      >
                        What are you looking for?{" "}
                        <span style={{ color: "#3a86ff" }}>*</span>
                      </label>
                      <select
                        id="requirement"
                        value={requirement}
                        onChange={(e) => setRequirement(e.target.value)}
                        required
                        onFocus={() => setReqFocused(true)}
                        onBlur={() => setReqFocused(false)}
                        className="flex h-11 w-full rounded-xl px-3 py-2 text-sm transition-all duration-200"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: reqFocused
                            ? "1px solid rgba(58,134,255,0.6)"
                            : "1px solid rgba(255,255,255,0.1)",
                          color: "rgba(240,244,255,0.95)",
                          boxShadow: reqFocused
                            ? "0 0 12px rgba(58,134,255,0.2)"
                            : "none",
                          outline: "none",
                        }}
                        data-ocid="contact.requirement_select"
                      >
                        <option
                          style={{ background: "#0d1221", color: "#e0e8ff" }}
                        >
                          Buy Property
                        </option>
                        <option
                          style={{ background: "#0d1221", color: "#e0e8ff" }}
                        >
                          Sell Property
                        </option>
                        <option
                          style={{ background: "#0d1221", color: "#e0e8ff" }}
                        >
                          Rental
                        </option>
                        <option
                          style={{ background: "#0d1221", color: "#e0e8ff" }}
                        >
                          Investment
                        </option>
                        <option
                          style={{ background: "#0d1221", color: "#e0e8ff" }}
                        >
                          General Query
                        </option>
                      </select>
                    </div>

                    {/* Message textarea */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="message"
                        className="text-xs font-semibold uppercase tracking-wider"
                        style={{ color: "rgba(140,150,180,0.8)" }}
                      >
                        Additional Details{" "}
                        <span
                          className="normal-case"
                          style={{ color: "rgba(140,150,180,0.5)" }}
                        >
                          (optional)
                        </span>
                      </label>
                      <Textarea
                        id="message"
                        placeholder="e.g. Looking for a 2 BHK under ₹60L near Bopal…"
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onFocus={() => setMsgFocused(true)}
                        onBlur={() => setMsgFocused(false)}
                        className="text-sm resize-none transition-all duration-200"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: msgFocused
                            ? "1px solid rgba(58,134,255,0.6)"
                            : "1px solid rgba(255,255,255,0.1)",
                          color: "rgba(240,244,255,0.95)",
                          boxShadow: msgFocused
                            ? "0 0 12px rgba(58,134,255,0.2)"
                            : "none",
                          outline: "none",
                        }}
                        data-ocid="contact.message_textarea"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold tracking-wide"
                      style={{
                        background:
                          "linear-gradient(135deg, #25D366 0%, #1aaa52 100%)",
                        color: "#fff",
                        boxShadow: "0 0 20px rgba(37,211,102,0.3)",
                      }}
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 0 30px rgba(37,211,102,0.45)",
                      }}
                      whileTap={{ scale: 0.98 }}
                      data-ocid="contact.submit_button"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Get a Call Back via WhatsApp
                    </motion.button>

                    <p
                      className="text-center text-xs"
                      style={{ color: "rgba(120,130,160,0.7)" }}
                    >
                      No spam. No pressure. Just honest guidance.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ─── RIGHT SIDEBAR ─── */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Contact info card */}
            <motion.div
              className="rounded-2xl p-5"
              style={{
                background: "rgba(14,18,32,0.82)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(58,134,255,0.12)",
              }}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3
                className="font-bold text-sm mb-4"
                style={{
                  color: "rgba(240,244,255,0.97)",
                  fontFamily: "var(--font-display)",
                }}
              >
                Reach Us Directly
              </h3>

              {/* WhatsApp CTA */}
              <motion.a
                href={WHATSAPP_BASE}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold mb-4"
                style={{
                  background:
                    "linear-gradient(135deg, #25D366 0%, #1aaa52 100%)",
                  color: "#fff",
                  boxShadow: "0 0 18px rgba(37,211,102,0.25)",
                }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 0 28px rgba(37,211,102,0.4)",
                }}
                whileTap={{ scale: 0.97 }}
                data-ocid="contact.whatsapp_button"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </motion.a>

              <div className="space-y-3">
                {contactInfo.map(({ icon: Icon, title, sub, href }) => (
                  <div key={title} className="flex items-start gap-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        background: "rgba(58,134,255,0.1)",
                        border: "1px solid rgba(58,134,255,0.18)",
                      }}
                    >
                      <Icon className="w-4 h-4" style={{ color: "#3a86ff" }} />
                    </div>
                    <div className="min-w-0">
                      {href ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-semibold transition-colors hover:underline"
                          style={{ color: "rgba(230,238,255,0.9)" }}
                        >
                          {title}
                        </a>
                      ) : (
                        <p
                          className="text-sm font-semibold"
                          style={{ color: "rgba(230,238,255,0.9)" }}
                        >
                          {title}
                        </p>
                      )}
                      <p
                        className="text-xs leading-relaxed"
                        style={{ color: "rgba(130,140,170,0.8)" }}
                      >
                        {sub}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Trust signal cards */}
            <div className="flex flex-col gap-3">
              {trustSignals.map(({ icon: Icon, label, detail, color }, i) => (
                <motion.div
                  key={label}
                  className="flex items-start gap-3 rounded-xl px-4 py-3"
                  style={{
                    background: "rgba(14,18,32,0.75)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(58,134,255,0.1)",
                  }}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  whileHover={{
                    borderColor: "rgba(58,134,255,0.25)",
                    background: "rgba(20,26,44,0.8)",
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      background: `${color}18`,
                      border: `1px solid ${color}35`,
                    }}
                  >
                    <Icon className="w-4 h-4" style={{ color }} />
                  </div>
                  <div>
                    <p
                      className="text-sm font-bold"
                      style={{
                        color: "rgba(230,238,255,0.9)",
                        fontFamily: "var(--font-display)",
                      }}
                    >
                      {label}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "rgba(130,140,170,0.8)" }}
                    >
                      {detail}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── FAQ SECTION ── */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "rgba(58,134,255,0.8)" }}
            >
              Common Questions
            </p>
            <h2
              className="font-black text-2xl sm:text-3xl"
              style={{
                color: "rgba(240,244,255,0.97)",
                fontFamily: "var(--font-display)",
              }}
            >
              Honest Answers
            </h2>
          </div>

          <div
            className="max-w-2xl mx-auto flex flex-col gap-3"
            data-ocid="contact.faq_list"
          >
            {faqs.map((faq, idx) => (
              <motion.div
                key={faq.q}
                className="rounded-2xl overflow-hidden"
                style={{
                  background: "rgba(14,18,32,0.82)",
                  backdropFilter: "blur(16px)",
                  border:
                    openFaq === idx
                      ? "1px solid rgba(58,134,255,0.28)"
                      : "1px solid rgba(58,134,255,0.1)",
                  boxShadow:
                    openFaq === idx ? "0 0 20px rgba(58,134,255,0.08)" : "none",
                }}
                animate={{
                  borderColor:
                    openFaq === idx
                      ? "rgba(58,134,255,0.28)"
                      : "rgba(58,134,255,0.1)",
                }}
                transition={{ duration: 0.2 }}
                data-ocid={`contact.faq_item.${idx + 1}`}
              >
                <button
                  type="button"
                  className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left transition-colors"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  aria-expanded={openFaq === idx}
                  data-ocid={`contact.faq_toggle.${idx + 1}`}
                >
                  <span
                    className="text-sm font-semibold"
                    style={{
                      color:
                        openFaq === idx
                          ? "rgba(240,244,255,0.97)"
                          : "rgba(200,210,235,0.85)",
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: openFaq === idx ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0"
                  >
                    <ChevronDown
                      className="w-4 h-4"
                      style={{
                        color:
                          openFaq === idx ? "#3a86ff" : "rgba(140,150,180,0.6)",
                      }}
                    />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {openFaq === idx && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <div
                        className="px-5 pb-5"
                        style={{
                          borderTop: "1px solid rgba(58,134,255,0.1)",
                          paddingTop: "12px",
                        }}
                      >
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: "rgba(140,150,180,0.9)" }}
                        >
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

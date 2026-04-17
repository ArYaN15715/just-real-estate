import { Quote, Star } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

const TESTIMONIALS = [
  {
    name: "Priya Mehta",
    location: "South Bopal",
    role: "Homeowner",
    text: "Genuine services and smooth experience. No hidden charges as promised. The team was transparent from day one and made our flat purchase completely stress-free.",
    rating: 5,
    avatar: "PM",
  },
  {
    name: "Rahul Shah",
    location: "Bopal",
    role: "Investor",
    text: "Best response and guidance. They understood exactly what we needed — shortlisted only 4 properties and we closed on the first site visit. Remarkable efficiency.",
    rating: 5,
    avatar: "RS",
  },
  {
    name: "Anita Kumar",
    location: "Shela",
    role: "First-time Buyer",
    text: "Great people with strong values. Made our property search stress-free. They were always available on WhatsApp and never once tried to push a wrong decision.",
    rating: 5,
    avatar: "AK",
  },
  {
    name: "Vivek Desai",
    location: "Ambli",
    role: "Seller",
    text: "Transparent process from start to finish. No surprises at all. Sold my 2BHK in under 3 weeks — better price than I expected.",
    rating: 5,
    avatar: "VD",
  },
  {
    name: "Sneha Patel",
    location: "South Bopal",
    role: "Rental Client",
    text: "Found a perfect 3BHK rental within a week. The team verified everything upfront — no surprises, no hidden costs. Highly recommend for anyone in Bopal area.",
    rating: 5,
    avatar: "SP",
  },
  {
    name: "Kiran Joshi",
    location: "Ghuma",
    role: "NRI Investor",
    text: "As an NRI, I needed someone trustworthy to manage the purchase. Just Real Estate handled everything — documentation, site visits, and coordination flawlessly.",
    rating: 5,
    avatar: "KJ",
  },
];

const INTERVAL = 4000;

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = TESTIMONIALS.length;

  const stopTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  const startTimer = useCallback(() => {
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, INTERVAL);
  }, [total]);

  useEffect(() => {
    if (!paused) startTimer();
    return stopTimer;
  }, [paused, startTimer, stopTimer]);

  const goTo = (idx: number) => {
    setCurrent(idx);
    stopTimer();
    if (!paused) startTimer();
  };

  // Visible range: current ± 2 (show 3 at once on large screens)
  const getOffset = (idx: number) => {
    let diff = idx - current;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  return (
    <section
      className="relative py-28 overflow-hidden"
      style={{ background: "var(--surface-3)" }}
      data-ocid="testimonials.section"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(58,134,255,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="inline-block text-xs font-body font-semibold tracking-widest uppercase mb-4 px-3 py-1 rounded-full"
            style={{
              color: "var(--cyan)",
              background: "rgba(58,134,255,0.1)",
              border: "1px solid rgba(58,134,255,0.2)",
            }}
          >
            Client Stories
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4">
            What Our Clients Say
          </h2>
          <p className="font-body text-muted-foreground text-base max-w-lg mx-auto">
            Real words from people who found their home with us
          </p>
        </motion.div>

        {/* Carousel */}
        <div
          className="relative flex items-center justify-center"
          style={{ height: "340px" }}
        >
          {TESTIMONIALS.map((t, i) => {
            const offset = getOffset(i);
            const isActive = offset === 0;
            const isVisible = Math.abs(offset) <= 2;

            if (!isVisible) return null;

            return (
              <motion.div
                key={t.name}
                className="absolute glass rounded-2xl p-7 flex flex-col gap-4 cursor-pointer"
                style={{
                  width: isActive ? "420px" : "340px",
                  maxWidth: "calc(100vw - 64px)",
                  zIndex: isActive ? 10 : 5 - Math.abs(offset),
                }}
                animate={{
                  x: offset * (window.innerWidth < 768 ? 260 : 370),
                  scale: isActive ? 1 : 0.87,
                  opacity: isActive ? 1 : 0.5,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={() => goTo(i)}
                data-ocid={`testimonials.item.${i + 1}`}
              >
                {/* Quote icon */}
                <Quote
                  size={28}
                  className="opacity-20 shrink-0"
                  style={{ color: "var(--cyan)" }}
                />

                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={`star-${t.name}-${j}`}
                      size={13}
                      fill="#f5a623"
                      className="text-accent"
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="font-body text-sm leading-relaxed text-foreground/85 flex-1 line-clamp-3">
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 mt-auto">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-display font-bold shrink-0"
                    style={{
                      background: "rgba(58,134,255,0.15)",
                      border: "1px solid rgba(58,134,255,0.3)",
                      color: "var(--cyan)",
                    }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-display font-semibold text-sm text-foreground">
                      {t.name}
                    </p>
                    <p className="font-body text-xs text-muted-foreground">
                      {t.role} &middot; {t.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Navigation dots */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.name}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className="transition-smooth rounded-full"
              style={{
                width: current === i ? "24px" : "8px",
                height: "8px",
                background:
                  current === i ? "var(--cyan)" : "rgba(58,134,255,0.25)",
              }}
              data-ocid={`testimonials.dot.${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

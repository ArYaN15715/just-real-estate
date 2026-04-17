import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Dot follows instantly
  const dotX = useSpring(rawX, { stiffness: 800, damping: 35 });
  const dotY = useSpring(rawY, { stiffness: 800, damping: 35 });

  // Ring follows with spring delay
  const ringX = useSpring(rawX, { stiffness: 180, damping: 22 });
  const ringY = useSpring(rawY, { stiffness: 180, damping: 22 });

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px), (pointer: coarse)");
    setIsMobile(mq.matches);
    const handleMqChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handleMqChange);
    return () => mq.removeEventListener("change", handleMqChange);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleLeave = () => setIsVisible(false);
    const handleEnter = () => setIsVisible(true);

    const handleOverChange = (e: MouseEvent) => {
      const target = e.target as Element;
      const clickable = target.closest(
        "a, button, [role='button'], input, textarea, select, label, [data-cursor='pointer']",
      );
      setIsHovering(!!clickable);
      setIsPointer(!!clickable);
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);
    document.addEventListener("mouseover", handleOverChange);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
      document.removeEventListener("mouseover", handleOverChange);
    };
  }, [isMobile, isVisible, rawX, rawY]);

  if (isMobile) return null;

  return (
    <>
      {/* Ring — outer follower */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[99999] rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovering ? 56 : 40,
          height: isHovering ? 56 : 40,
          opacity: isVisible ? 1 : 0,
          borderColor: isPointer
            ? "rgba(245, 166, 35, 0.8)"
            : "rgba(58, 134, 255, 0.55)",
          boxShadow: isPointer
            ? "0 0 12px rgba(245, 166, 35, 0.4)"
            : "0 0 8px rgba(58, 134, 255, 0.3)",
        }}
        transition={{ duration: 0.22, ease: "easeOut" }}
      />

      {/* Dot — inner precise */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[100000] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovering ? 6 : 10,
          height: isHovering ? 6 : 10,
          opacity: isVisible ? 1 : 0,
          backgroundColor: isPointer ? "#f5a623" : "#3a86ff",
          boxShadow: isPointer
            ? "0 0 10px rgba(245, 166, 35, 0.9)"
            : "0 0 10px rgba(58, 134, 255, 0.9)",
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      />
    </>
  );
}

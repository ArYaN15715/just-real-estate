import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0%" }}
      className="fixed top-0 left-0 right-0 z-[9999] h-[2px]"
      aria-hidden="true"
      data-ocid="scroll.progress_bar"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      {/* Main cyan bar */}
      <div
        className="w-full h-full"
        style={{
          background:
            "linear-gradient(90deg, #3a86ff 0%, #60a5fa 60%, #f5a623 100%)",
          boxShadow:
            "0 0 12px rgba(58, 134, 255, 0.8), 0 0 4px rgba(58, 134, 255, 1)",
        }}
      />
    </motion.div>
  );
}

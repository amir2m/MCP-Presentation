'use client';

import { motion, useScroll, useSpring } from 'motion/react';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-l from-[#6366F1] via-[#818CF8] to-[#22D3EE] origin-right z-50 pointer-events-none shadow-[0_0_12px_rgba(34,211,238,0.5)]"
    />
  );
}


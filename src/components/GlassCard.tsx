import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({
  children,
  className = "",
  hover = true,
}: GlassCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      animate={prefersReducedMotion ? false : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={
        hover && !prefersReducedMotion
          ? {
              scale: 1.03,
              boxShadow:
                "0 0 40px rgba(0,242,255,0.12), inset 0 0 0 1px rgba(255,255,255,0.12)",
            }
          : undefined
      }
      className={`
        relative
        bg-glass
        backdrop-blur-glass
        rounded-2xl
        border border-white/10
        shadow-[0_20px_60px_rgba(0,0,0,0.6)]
        p-6
        overflow-hidden
        ${className}
      `}
    >
      {/* Inner highlight */}
      <div className="absolute inset-0 pointer-events-none rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-transparent" />

      {/* Neon edge glow */}
      <div className="absolute pointer-events-none -inset-px rounded-2xl bg-gradient-to-br from-neonBlue/40 via-electricViolet/20 to-transparent opacity-40" />

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

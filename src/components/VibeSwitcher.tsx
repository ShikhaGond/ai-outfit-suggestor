import { motion } from "framer-motion";
import type { Vibe } from "../types";

const vibes: Vibe[] = ["Corporate Sleek", "Streetwear", "Weekend Casual"];

interface VibeSwitcherProps {
  vibe: Vibe;
  setVibe: (vibe: Vibe) => void;
}

export function VibeSwitcher({ vibe, setVibe }: VibeSwitcherProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Style preference"
      className="relative flex flex-wrap gap-1 p-1 border bg-glass border-white/10 rounded-xl"
    >
      {vibes.map((item) => {
        const isActive = vibe === item;

        return (
          <button
            key={item}
            role="radio"
            aria-checked={isActive}
            onClick={() => setVibe(item)}
            className="
              relative
              flex-1
              min-w-[110px]
              z-10
              py-2
              text-xs sm:text-sm
              font-medium
              text-white
            "
          >
            {isActive && (
              <motion.div
                layoutId="activeVibe"
                className="absolute inset-0 rounded-lg bg-white/15"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}

            <motion.span
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.96 }}
              className="relative z-10"
            >
              {item}
            </motion.span>
          </button>
        );
      })}
    </div>
  );
}

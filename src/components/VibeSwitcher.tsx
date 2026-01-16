import { motion } from "framer-motion";
import type { Vibe } from "../types";

const vibes: Vibe[] = [
  "Corporate Sleek",
  "Streetwear",
  "Weekend Casual",
];

interface VibeSwitcherProps {
  vibe: Vibe;
  setVibe: (vibe: Vibe) => void;
}

export function VibeSwitcher({ vibe, setVibe }: VibeSwitcherProps) {
  return (
    <div className="relative flex p-1 border bg-glass border-white/10 rounded-xl">
      {vibes.map((item) => {
        const isActive = vibe === item;

        return (
          <button
            key={item}
            onClick={() => setVibe(item)}
            className="absolute inset-0 bg-white/15 rounded-lg shadow-[0_0_20px_rgba(255,255,255,0.15)]"

          >
            {/* Active background pill */}
            {isActive && (
              <motion.div
                layoutId="activeVibe"
                className="absolute inset-0 rounded-lg bg-white/15"
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                }}
              />
            )}

            {/* Label */}
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

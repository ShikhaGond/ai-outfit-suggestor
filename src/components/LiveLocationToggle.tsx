import { motion } from "framer-motion";

interface LiveLocationToggleProps {
  enabled: boolean;
  onToggle: (value: boolean) => void;
}

export function LiveLocationToggle({
  enabled,
  onToggle,
}: LiveLocationToggleProps) {
  return (
    <button
      aria-pressed={enabled}
      aria-label="Toggle live location"
      onClick={() => onToggle(!enabled)}
      className="flex items-center justify-between w-full gap-3 p-3 border rounded-xl bg-glass border-white/10"
    >
      <span className="text-sm text-white/80">
        Use live location
      </span>

      <motion.div
        layout
        className={`w-10 h-6 rounded-full p-1 ${
          enabled ? "bg-neonBlue" : "bg-white/20"
        }`}
      >
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className={`w-4 h-4 rounded-full bg-black ${
            enabled ? "ml-auto" : ""
          }`}
        />
      </motion.div>
    </button>
  );
}

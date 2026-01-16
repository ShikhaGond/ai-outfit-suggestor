import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useState } from "react";
import { copyToClipboard } from "../utils/copyToClipboard";
import { Toast } from "./Toast";

interface OutfitListProps {
  outfits: string[];
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function OutfitList({ outfits }: OutfitListProps) {
  const [showToast, setShowToast] = useState(false);

  if (!outfits.length) return null;

  const handleCopy = async () => {
    await copyToClipboard(outfits.join("\n"));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1800);
  };

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleCopy}
          className="self-start px-3 py-1 text-xs transition rounded-lg bg-white/10 text-white/80 hover:bg-white/20"
        >
          Copy outfits
        </motion.button>

        {outfits.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            className="p-4 border bg-glass backdrop-blur-glass border-white/10 rounded-xl"
          >
            {item}
          </motion.div>
        ))}
      </motion.div>

      <Toast message="Copied to clipboard" visible={showToast} />
    </>
  );
}

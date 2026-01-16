import { motion, AnimatePresence } from "framer-motion";

interface ToastProps {
  message: string;
  visible: boolean;
}

export function Toast({ message, visible }: ToastProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed z-50 px-4 py-2 text-sm text-white -translate-x-1/2 border shadow-lg  bottom-6 left-1/2 bg-glass backdrop-blur-glass border-white/10 rounded-xl"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

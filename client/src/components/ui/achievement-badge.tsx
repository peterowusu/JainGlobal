import { motion, AnimatePresence } from "framer-motion";
import { Award, Trophy, Star, Zap } from "lucide-react";

interface AchievementBadgeProps {
  show: boolean;
  title: string;
  type?: "bronze" | "silver" | "gold" | "platinum";
}

const badgeConfig = {
  bronze: { icon: Star, color: "from-amber-600 to-amber-800", glow: "shadow-amber-500/50" },
  silver: { icon: Award, color: "from-gray-300 to-gray-500", glow: "shadow-gray-400/50" },
  gold: { icon: Trophy, color: "from-yellow-400 to-yellow-600", glow: "shadow-yellow-500/50" },
  platinum: { icon: Zap, color: "from-cyan-400 to-blue-600", glow: "shadow-cyan-500/50" },
};

export function AchievementBadge({ show, title, type = "gold" }: AchievementBadgeProps) {
  const config = badgeConfig[type];
  const Icon = config.icon;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ scale: 0, rotate: -180, y: 100 }}
          animate={{ scale: 1, rotate: 0, y: 0 }}
          exit={{ scale: 0, opacity: 0, y: -100 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
          className="fixed bottom-8 right-8 z-50"
        >
          <div className={`bg-gradient-to-br ${config.color} p-6 rounded-2xl shadow-2xl ${config.glow}`}>
            <div className="flex items-center gap-4">
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Icon className="text-white w-12 h-12" />
              </motion.div>
              <div>
                <p className="text-white font-bold text-lg">Achievement Unlocked!</p>
                <p className="text-white/90 text-sm">{title}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

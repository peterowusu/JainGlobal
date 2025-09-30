import { motion } from "framer-motion";
import { InteractiveMap } from "@/components/ui/interactive-map";

export function GlobalPresenceSection() {
  return (
    <section id="global-presence" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            International Presence
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Strategic offices across major financial centers to capture global opportunities
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <InteractiveMap />
        </motion.div>
      </div>
    </section>
  );
}

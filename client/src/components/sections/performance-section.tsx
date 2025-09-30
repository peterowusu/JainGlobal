import { motion } from "framer-motion";
import { PerformanceChart } from "@/components/ui/performance-chart";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Shield, TrendingDown, Globe } from "lucide-react";

const metrics = [
  {
    title: "Assets Under Management",
    value: "$12.9B",
    icon: TrendingUp,
    color: "primary",
  },
  {
    title: "Sharpe Ratio",
    value: "1.87",
    icon: Shield,
    color: "secondary",
  },
  {
    title: "Max Drawdown",
    value: "-3.1%",
    icon: TrendingDown,
    color: "accent",
  },
  {
    title: "Products Traded",
    value: "2,500+",
    icon: Globe,
    color: "primary",
  },
];

export function PerformanceSection() {
  return (
    <section id="performance" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Benchmarks & Performance
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Consistent outperformance across key metrics and benchmark comparisons
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Performance Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <PerformanceChart />
          </motion.div>

          {/* Key Metrics */}
          <div className="space-y-6">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              
              return (
                <motion.div
                  key={metric.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4 }}
                  data-testid={`metric-card-${index}`}
                >
                  <Card className="bg-muted glass-effect hover-lift">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-lg font-semibold text-foreground">
                            {metric.title}
                          </h4>
                          <p className={`text-3xl font-bold text-${metric.color} mt-2`}>
                            {metric.value}
                          </p>
                        </div>
                        <div className={`bg-${metric.color}/20 rounded-full p-4`}>
                          <Icon className={`text-${metric.color} text-2xl`} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { motion } from "framer-motion";

interface ChartData {
  label: string;
  value: number;
  color: string;
}

const performanceData: ChartData[] = [
  { label: "Jain Global", value: 12.5, color: "hsl(43, 96%, 56%)" },
  { label: "HFRI Index", value: 8.3, color: "hsl(217, 91%, 60%)" },
  { label: "S&P 500", value: 6.7, color: "hsl(159, 100%, 36%)" },
];

export function PerformanceChart() {
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);
  const maxValue = Math.max(...performanceData.map(d => d.value));

  return (
    <div className="bg-muted rounded-xl p-6 glass-effect">
      <h3 className="text-xl font-bold text-foreground mb-6">Cumulative Returns vs Benchmarks</h3>
      
      <div className="relative h-64 flex items-end justify-around pb-8">
        {performanceData.map((data, index) => {
          const height = (data.value / maxValue) * 100;
          
          return (
            <div key={data.label} className="relative group flex flex-col items-center">
              {/* Tooltip */}
              <motion.div
                className={`absolute bottom-full mb-2 bg-background text-foreground text-xs rounded px-2 py-1 whitespace-nowrap transition-opacity ${
                  hoveredBar === data.label ? 'opacity-100' : 'opacity-0'
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: hoveredBar === data.label ? 1 : 0,
                  y: hoveredBar === data.label ? 0 : 10
                }}
                data-testid={`chart-tooltip-${index}`}
              >
                {data.label}: +{data.value}%
              </motion.div>

              {/* Bar */}
              <motion.div
                className="w-16 rounded-t cursor-pointer transition-all duration-300"
                style={{ 
                  backgroundColor: data.color,
                  height: `${height}%`
                }}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ 
                  opacity: 0.8,
                  scale: 1.05
                }}
                onMouseEnter={() => setHoveredBar(data.label)}
                onMouseLeave={() => setHoveredBar(null)}
                data-testid={`chart-bar-${index}`}
              />
              
              {/* Label */}
              <div className="mt-2 text-xs text-muted-foreground text-center">
                {data.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex justify-center mt-4 gap-6 flex-wrap">
        {performanceData.map((data) => (
          <div key={data.label} className="flex items-center gap-2">
            <div 
              className="w-4 h-4 rounded"
              style={{ backgroundColor: data.color }}
            ></div>
            <span className="text-sm text-muted-foreground">{data.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

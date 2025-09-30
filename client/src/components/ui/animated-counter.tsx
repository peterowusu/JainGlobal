import { useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface AnimatedCounterProps {
  value: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({ value, duration = 2000, className = "" }: AnimatedCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    // Strip commas and extract clean number from value string
    const cleanValue = value.replace(/,/g, '');
    const numMatch = cleanValue.match(/[\d.]+/);
    if (!numMatch) {
      setDisplayValue(value);
      return;
    }

    const targetNum = parseFloat(numMatch[0]);
    const prefix = cleanValue.substring(0, cleanValue.indexOf(numMatch[0]));
    const suffix = cleanValue.substring(cleanValue.indexOf(numMatch[0]) + numMatch[0].length);
    
    const startTime = Date.now();
    const isDecimal = numMatch[0].includes(".");
    const decimalPlaces = isDecimal ? numMatch[0].split(".")[1].length : 0;

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = targetNum * easeOutQuart;
      
      let formattedNum: string;
      if (isDecimal) {
        formattedNum = current.toFixed(decimalPlaces);
      } else {
        // Add commas for thousands if original had them
        const num = Math.floor(current);
        formattedNum = value.includes(',') 
          ? num.toLocaleString('en-US') 
          : num.toString();
      }
      
      setDisplayValue(`${prefix}${formattedNum}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
}

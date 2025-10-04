import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useSound } from "@/hooks/use-sound";
import { TrendingUp, Award, RefreshCw } from "lucide-react";
import Confetti from "react-confetti";
import { AchievementBadge } from "@/components/ui/achievement-badge";

interface Strategy {
  name: string;
  color: string;
  allocation: number;
}

export function PortfolioAllocationGame() {
  const [strategies, setStrategies] = useState<Strategy[]>([
    { name: "Equities", color: "bg-blue-500", allocation: 25 },
    { name: "Credit", color: "bg-green-500", allocation: 25 },
    { name: "Macro", color: "bg-purple-500", allocation: 25 },
    { name: "Systematic", color: "bg-orange-500", allocation: 25 },
  ]);
  
  const [showResult, setShowResult] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const { playClickSound, playSuccessSound } = useSound();

  const totalAllocation = strategies.reduce((sum, s) => sum + s.allocation, 0);
  const isValid = totalAllocation === 100;

  const handleAllocationChange = (index: number, value: number[]) => {
    const newStrategies = [...strategies];
    newStrategies[index].allocation = value[0];
    setStrategies(newStrategies);
    setShowResult(false);
  };

  const getRiskScore = () => {
    // Calculate risk score based on diversification (lower is better)
    const maxAllocation = Math.max(...strategies.map(s => s.allocation));
    if (maxAllocation > 60) return { score: "High Risk", color: "text-red-500", message: "Consider more diversification!" };
    if (maxAllocation > 40) return { score: "Moderate", color: "text-yellow-500", message: "Good balance, could improve!" };
    return { score: "Well Balanced", color: "text-green-500", message: "Excellent diversification!" };
  };

  const handleSubmit = () => {
    playClickSound();
    if (!isValid) return;
    
    const risk = getRiskScore();
    setShowResult(true);
    
    if (risk.score === "Well Balanced") {
      playSuccessSound();
      setShowConfetti(true);
      setShowBadge(true);
      setTimeout(() => setShowConfetti(false), 3000);
      setTimeout(() => setShowBadge(false), 5000);
    }
  };

  const handleReset = () => {
    playClickSound();
    setStrategies([
      { name: "Equities", color: "bg-blue-500", allocation: 25 },
      { name: "Credit", color: "bg-green-500", allocation: 25 },
      { name: "Macro", color: "bg-purple-500", allocation: 25 },
      { name: "Systematic", color: "bg-orange-500", allocation: 25 },
    ]);
    setShowResult(false);
  };

  const riskScore = getRiskScore();

  return (
    <div className="space-y-6">
      {showConfetti && (
        <Confetti
          width={typeof window !== 'undefined' ? window.innerWidth : 300}
          height={typeof window !== 'undefined' ? window.innerHeight : 200}
          recycle={false}
          numberOfPieces={200}
          gravity={0.2}
        />
      )}
      
      <AchievementBadge 
        show={showBadge} 
        title="Portfolio Master!" 
        type="gold" 
      />

      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-primary mb-2 flex items-center justify-center gap-2">
          <Award className="text-primary" />
          Portfolio Allocation Challenge
        </h3>
        <p className="text-muted-foreground">
          Allocate 100% across strategies. Aim for balanced diversification!
        </p>
      </div>

      {/* Portfolio Visualization */}
      <div className="h-8 w-full rounded-full overflow-hidden flex">
        {strategies.map((strategy, idx) => (
          <motion.div
            key={strategy.name}
            className={`${strategy.color} h-full flex items-center justify-center text-white text-xs font-semibold`}
            style={{ width: `${strategy.allocation}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${strategy.allocation}%` }}
            transition={{ duration: 0.3 }}
          >
            {strategy.allocation > 10 && `${strategy.allocation}%`}
          </motion.div>
        ))}
      </div>

      {/* Sliders */}
      <div className="space-y-4">
        {strategies.map((strategy, idx) => (
          <div key={strategy.name} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-foreground flex items-center gap-2">
                <div className={`w-3 h-3 rounded ${strategy.color}`}></div>
                {strategy.name}
              </span>
              <span className="text-sm font-bold text-primary">{strategy.allocation}%</span>
            </div>
            <Slider
              value={[strategy.allocation]}
              onValueChange={(value) => handleAllocationChange(idx, value)}
              max={100}
              step={5}
              className="cursor-pointer"
            />
          </div>
        ))}
      </div>

      {/* Total Allocation */}
      <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
        <span className="font-semibold text-foreground">Total Allocation:</span>
        <span className={`font-bold text-xl ${isValid ? 'text-green-500' : 'text-red-500'}`}>
          {totalAllocation}%
        </span>
      </div>

      {/* Result */}
      {showResult && isValid && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-card rounded-lg border-2 border-primary"
        >
          <div className="text-center">
            <p className="text-lg font-semibold mb-2">
              Risk Profile: <span className={riskScore.color}>{riskScore.score}</span>
            </p>
            <p className="text-muted-foreground">{riskScore.message}</p>
          </div>
        </motion.div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          onClick={handleSubmit}
          disabled={!isValid}
          className="flex-1"
          data-testid="submit-allocation"
        >
          <TrendingUp className="mr-2 h-4 w-4" />
          Analyze Portfolio
        </Button>
        <Button
          onClick={handleReset}
          variant="outline"
          className="flex-1"
          data-testid="reset-allocation"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </div>
    </div>
  );
}

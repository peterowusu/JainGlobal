import { useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Trophy, TrendingUp, TrendingDown, DollarSign, ArrowUpDown } from "lucide-react";
import Confetti from "react-confetti";
import { AchievementBadge } from "@/components/ui/achievement-badge";

interface StrategyGameProps {
  strategyId: string;
  open: boolean;
  onClose: () => void;
  onComplete: (points: number) => void;
}

// Stock data for Fundamental Equities game
const stocks = [
  { name: "TechCorp", pe: 15, growth: 12, price: 50, undervalued: true },
  { name: "RetailCo", pe: 35, growth: 5, price: 80, undervalued: false },
  { name: "BankCorp", pe: 8, growth: 8, price: 45, undervalued: true },
  { name: "EnergyInc", pe: 45, growth: 3, price: 120, undervalued: false },
];

// Bond data for Credit game
const bonds = [
  { name: "Corp A", yield: 5.5, rating: "AAA", risk: "Low", good: true },
  { name: "Corp B", yield: 8.2, rating: "BBB", risk: "Medium", good: true },
  { name: "Corp C", yield: 12, rating: "CCC", risk: "High", good: false },
  { name: "Sovereign D", yield: 3.5, rating: "AA", risk: "Low", good: true },
];

// Commodity scenarios
const commodities = [
  { name: "Oil", price: 75, event: "OPEC cuts production", expectedChange: "up" },
  { name: "Gold", price: 1950, event: "Fed raises rates", expectedChange: "down" },
  { name: "Wheat", price: 650, event: "Drought in major regions", expectedChange: "up" },
];

export function StrategyGame({ strategyId, open, onClose, onComplete }: StrategyGameProps) {
  const [result, setResult] = useState<{ success: boolean; message: string; points: number } | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  
  // All game states at top level to avoid conditional hooks
  const [selectedStocks, setSelectedStocks] = useState<string[]>([]);
  const [spread, setSpread] = useState(0);
  const [selectedBonds, setSelectedBonds] = useState<string[]>([]);
  const [prediction, setPrediction] = useState<"up" | "down" | null>(null);
  const [trades, setTrades] = useState<{ [key: string]: "buy" | "sell" | null }>({});
  const [riskTolerance, setRiskTolerance] = useState(50);
  const [momentum, setMomentum] = useState(50);

  const resetGame = () => {
    setSelectedStocks([]);
    setSpread(0);
    setSelectedBonds([]);
    setPrediction(null);
    setTrades({});
    setRiskTolerance(50);
    setMomentum(50);
    setResult(null);
    setShowConfetti(false);
    setShowBadge(false);
  };

  const handleComplete = (success: boolean, message: string, points: number) => {
    setResult({ success, message, points });
    onComplete(points); // Always award points, not just on success
    
    if (success) {
      setShowConfetti(true);
      setShowBadge(true);
      setTimeout(() => setShowConfetti(false), 3000);
      setTimeout(() => setShowBadge(false), 5000);
    }
  };

  // Fundamental Equities: Stock Picking Game
  const renderEquitiesGame = () => {

    const handleStockSelect = (stockName: string) => {
      if (selectedStocks.includes(stockName)) {
        setSelectedStocks(selectedStocks.filter(s => s !== stockName));
      } else {
        setSelectedStocks([...selectedStocks, stockName]);
      }
    };

    const handleSubmit = () => {
      const undervaluedPicked = selectedStocks.filter(name => 
        stocks.find(s => s.name === name)?.undervalued
      ).length;
      
      const success = undervaluedPicked === 2 && selectedStocks.length === 2;
      const message = success 
        ? "Perfect! You identified both undervalued stocks based on P/E ratio and growth!" 
        : `You selected ${undervaluedPicked}/2 undervalued stocks. Look for low P/E ratios with strong growth!`;
      
      handleComplete(success, message, success ? 100 : undervaluedPicked * 30);
    };

    return (
      <div className="space-y-6">
        <p className="text-muted-foreground">Select the 2 undervalued stocks based on P/E ratio and growth rate:</p>
        
        <div className="grid grid-cols-2 gap-4">
          {stocks.map((stock) => (
            <Card
              key={stock.name}
              className={`p-4 cursor-pointer transition-all ${
                selectedStocks.includes(stock.name) ? "border-primary bg-primary/10" : ""
              }`}
              onClick={() => handleStockSelect(stock.name)}
              data-testid={`stock-${stock.name.toLowerCase()}`}
            >
              <h4 className="font-bold mb-2">{stock.name}</h4>
              <p className="text-sm text-muted-foreground">P/E Ratio: {stock.pe}</p>
              <p className="text-sm text-muted-foreground">Growth: {stock.growth}%</p>
              <p className="text-sm text-muted-foreground">Price: ${stock.price}</p>
            </Card>
          ))}
        </div>

        <Button onClick={handleSubmit} disabled={selectedStocks.length !== 2} data-testid="submit-equities">
          Analyze Portfolio
        </Button>
      </div>
    );
  };

  // Equity Arbitrage: Spread Trading Game
  const renderArbitrageGame = () => {
    const targetSpread = 2.5;

    const handleSubmit = () => {
      const diff = Math.abs(spread - targetSpread);
      const success = diff < 0.5;
      const message = success
        ? "Excellent! You identified the optimal spread for arbitrage!"
        : `Close! The ideal spread is $${targetSpread}. You were off by $${diff.toFixed(2)}`;
      
      handleComplete(success, message, success ? 100 : Math.max(0, 100 - Math.floor(diff * 20)));
    };

    return (
      <div className="space-y-6">
        <p className="text-muted-foreground">
          Two similar stocks: Stock A trades at $100, Stock B at $97.50. 
          Identify the spread to execute an arbitrage trade:
        </p>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-sm w-20">Spread: ${spread.toFixed(2)}</span>
            <Slider
              value={[spread]}
              onValueChange={(value) => setSpread(value[0])}
              max={5}
              step={0.1}
              className="flex-1"
            />
          </div>
          
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm">Current Spread: ${spread.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">Profit Potential: ${(spread * 10).toFixed(0)} per pair</p>
          </div>
        </div>

        <Button onClick={handleSubmit} data-testid="submit-arbitrage">
          Execute Trade
        </Button>
      </div>
    );
  };

  // Credit: Bond Evaluation Game
  const renderCreditGame = () => {
    const handleBondSelect = (bondName: string) => {
      if (selectedBonds.includes(bondName)) {
        setSelectedBonds(selectedBonds.filter(b => b !== bondName));
      } else if (selectedBonds.length < 2) {
        setSelectedBonds([...selectedBonds, bondName]);
      }
    };

    const handleSubmit = () => {
      const goodBonds = selectedBonds.filter(name => 
        bonds.find(b => b.name === name)?.good
      ).length;
      
      const success = goodBonds === 2 && selectedBonds.length === 2;
      const message = success
        ? "Perfect! You balanced yield and risk effectively!"
        : `You selected ${goodBonds}/2 optimal bonds. Avoid very high yields with poor ratings!`;
      
      handleComplete(success, message, success ? 100 : goodBonds * 40);
    };

    return (
      <div className="space-y-6">
        <p className="text-muted-foreground">Select 2 bonds that offer the best risk-adjusted returns:</p>
        
        <div className="grid grid-cols-2 gap-4">
          {bonds.map((bond) => (
            <Card
              key={bond.name}
              className={`p-4 cursor-pointer transition-all ${
                selectedBonds.includes(bond.name) ? "border-primary bg-primary/10" : ""
              }`}
              onClick={() => handleBondSelect(bond.name)}
              data-testid={`bond-${bond.name.toLowerCase().replace(' ', '-')}`}
            >
              <h4 className="font-bold mb-2">{bond.name}</h4>
              <p className="text-sm text-muted-foreground">Yield: {bond.yield}%</p>
              <p className="text-sm text-muted-foreground">Rating: {bond.rating}</p>
              <p className="text-sm text-muted-foreground">Risk: {bond.risk}</p>
            </Card>
          ))}
        </div>

        <Button onClick={handleSubmit} disabled={selectedBonds.length !== 2} data-testid="submit-credit">
          Evaluate Portfolio
        </Button>
      </div>
    );
  };

  // Rates & Macro: Interest Rate Prediction Game
  const renderMacroGame = () => {
    const scenario = "The Federal Reserve announces a 0.5% interest rate increase";
    const correctAnswer = "down";

    const handleSubmit = () => {
      const success = prediction === correctAnswer;
      const message = success
        ? "Correct! Higher rates typically decrease bond prices!"
        : "Not quite. Rising rates make existing bonds less attractive, pushing prices down.";
      
      handleComplete(success, message, success ? 100 : 0);
    };

    return (
      <div className="space-y-6">
        <div className="p-4 bg-muted rounded-lg">
          <p className="font-semibold mb-2">Scenario:</p>
          <p className="text-muted-foreground">{scenario}</p>
        </div>
        
        <p className="text-muted-foreground">What happens to bond prices?</p>
        
        <div className="flex gap-4">
          <Button
            variant={prediction === "up" ? "default" : "outline"}
            className="flex-1"
            onClick={() => setPrediction("up")}
            data-testid="predict-up"
          >
            <TrendingUp className="mr-2 h-4 w-4" /> Prices Rise
          </Button>
          <Button
            variant={prediction === "down" ? "default" : "outline"}
            className="flex-1"
            onClick={() => setPrediction("down")}
            data-testid="predict-down"
          >
            <TrendingDown className="mr-2 h-4 w-4" /> Prices Fall
          </Button>
        </div>

        <Button onClick={handleSubmit} disabled={!prediction} data-testid="submit-macro">
          Submit Prediction
        </Button>
      </div>
    );
  };

  // Commodities: Trading Simulator
  const renderCommoditiesGame = () => {
    const handleTrade = (commodity: string, action: "buy" | "sell") => {
      setTrades({ ...trades, [commodity]: action });
    };

    const handleSubmit = () => {
      let correct = 0;
      commodities.forEach(c => {
        if (c.expectedChange === "up" && trades[c.name] === "buy") correct++;
        if (c.expectedChange === "down" && trades[c.name] === "sell") correct++;
      });
      
      const success = correct === 3;
      const points = Math.floor((correct / 3) * 100); // Scale to 100 points
      const message = success
        ? "Excellent trading! You correctly predicted all market moves!"
        : `You got ${correct}/3 trades correct. Consider the impact of events on supply and demand!`;
      
      handleComplete(success, message, points);
    };

    return (
      <div className="space-y-6">
        <p className="text-muted-foreground">Predict the price movement based on market events:</p>
        
        <div className="space-y-4">
          {commodities.map((commodity) => (
            <Card key={commodity.name} className="p-4" data-testid={`commodity-${commodity.name.toLowerCase()}`}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-bold">{commodity.name}</h4>
                  <p className="text-sm text-muted-foreground">Current: ${commodity.price}</p>
                </div>
                <DollarSign className="text-primary" />
              </div>
              <p className="text-sm text-muted-foreground mb-3">Event: {commodity.event}</p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={trades[commodity.name] === "buy" ? "default" : "outline"}
                  onClick={() => handleTrade(commodity.name, "buy")}
                  data-testid={`buy-${commodity.name.toLowerCase()}`}
                >
                  Buy
                </Button>
                <Button
                  size="sm"
                  variant={trades[commodity.name] === "sell" ? "default" : "outline"}
                  onClick={() => handleTrade(commodity.name, "sell")}
                  data-testid={`sell-${commodity.name.toLowerCase()}`}
                >
                  Sell
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <Button onClick={handleSubmit} disabled={Object.keys(trades).length !== 3} data-testid="submit-commodities">
          Execute All Trades
        </Button>
      </div>
    );
  };

  // Quantitative: Algorithm Optimizer
  const renderQuantGame = () => {
    const optimalRisk = 35;
    const optimalMomentum = 65;

    const handleSubmit = () => {
      const riskDiff = Math.abs(riskTolerance - optimalRisk);
      const momentumDiff = Math.abs(momentum - optimalMomentum);
      const totalDiff = riskDiff + momentumDiff;
      
      const success = totalDiff < 20;
      const returns = Math.max(0, 15 - (totalDiff * 0.2)).toFixed(1);
      
      const message = success
        ? `Optimal parameters! Your algorithm achieves ${returns}% annual returns with controlled risk.`
        : `Close! Try risk ~35 and momentum ~65 for better risk-adjusted returns. Current: ${returns}% returns.`;
      
      handleComplete(success, message, success ? 100 : Math.max(0, 100 - totalDiff * 2));
    };

    const estimatedReturns = Math.max(0, 15 - (Math.abs(riskTolerance - optimalRisk) + Math.abs(momentum - optimalMomentum)) * 0.2).toFixed(1);

    return (
      <div className="space-y-6">
        <p className="text-muted-foreground">Optimize the trading algorithm parameters for maximum risk-adjusted returns:</p>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Risk Tolerance</span>
              <span className="text-sm font-mono">{riskTolerance}%</span>
            </div>
            <Slider
              value={[riskTolerance]}
              onValueChange={(value) => setRiskTolerance(value[0])}
              max={100}
              step={5}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Momentum Factor</span>
              <span className="text-sm font-mono">{momentum}%</span>
            </div>
            <Slider
              value={[momentum]}
              onValueChange={(value) => setMomentum(value[0])}
              max={100}
              step={5}
            />
          </div>
          
          <Card className="p-4 bg-muted">
            <div className="flex items-center justify-between">
              <span className="text-sm">Estimated Annual Returns:</span>
              <span className="text-lg font-bold text-primary">{estimatedReturns}%</span>
            </div>
          </Card>
        </div>

        <Button onClick={handleSubmit} data-testid="submit-quant">
          Run Backtest
        </Button>
      </div>
    );
  };

  const renderGameContent = () => {
    switch (strategyId) {
      case "fundamental-equities":
        return renderEquitiesGame();
      case "equity-arbitrage":
        return renderArbitrageGame();
      case "credit":
        return renderCreditGame();
      case "rates-macro":
        return renderMacroGame();
      case "commodities":
        return renderCommoditiesGame();
      case "quantitative":
        return renderQuantGame();
      default:
        return <p>Game not found</p>;
    }
  };

  const gameTitle = {
    "fundamental-equities": "Stock Picking Challenge",
    "equity-arbitrage": "Spread Trading Game",
    "credit": "Bond Evaluation Challenge",
    "rates-macro": "Macro Prediction Game",
    "commodities": "Commodity Trading Simulator",
    "quantitative": "Algorithm Optimizer",
  }[strategyId] || "Strategy Game";

  const handleClose = () => {
    resetGame();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
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
          title={`${gameTitle.split(' ')[0]} Master!`}
          type="gold" 
        />

        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy className="text-primary" />
            {gameTitle}
          </DialogTitle>
        </DialogHeader>

        {!result ? (
          renderGameContent()
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6 text-center py-8"
          >
            <div className={`text-4xl mb-4 ${result.success ? "text-green-400" : "text-yellow-400"}`}>
              {result.success ? "🎉" : "💡"}
            </div>
            <p className={`text-lg ${result.success ? "text-green-400" : "text-yellow-400"}`}>
              {result.message}
            </p>
            <div className="flex items-center justify-center gap-2 text-2xl font-bold">
              <span className="text-primary">+{result.points}</span>
              <span className="text-muted-foreground">points</span>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={resetGame} className="flex-1">
                Play Again
              </Button>
              <Button onClick={handleClose} className="flex-1">
                Close
              </Button>
            </div>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
}

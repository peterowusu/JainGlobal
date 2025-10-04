import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart, RefreshCw, Building, Globe, Fuel, Bot, ArrowRight, Gamepad2, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSound } from "@/hooks/use-sound";
import strategiesVideo from "@assets/3736384793-preview_1759209683934.mp4";
import Confetti from "react-confetti";
import { StrategyGame } from "@/components/ui/strategy-games";

const strategies = [
  {
    id: "fundamental-equity",
    title: "Fundamental Equity",
    aum: "30%",
    description: "Long-term investments in undervalued companies with strong growth potential",
    icon: BarChart,
    color: "primary",
  },
  {
    id: "equity-arbitrage",
    title: "Equity Arbitrage",
    aum: "20%", 
    description: "Exploiting price discrepancies between related equity securities",
    icon: RefreshCw,
    color: "secondary",
  },
  {
    id: "rates-macro",
    title: "Rates & Macro",
    aum: "15%",
    description: "Interest rate movements and macroeconomic trends to inform investment decisions",
    icon: Globe,
    color: "primary",
  },
  {
    id: "commodities",
    title: "Commodities",
    aum: "13%",
    description: "Physical goods and derivative contracts to capitalize on market fluctuations",
    icon: Fuel,
    color: "secondary",
  },
  {
    id: "credit",
    title: "Credit",
    aum: "12%",
    description: "Opportunities in corporate and sovereign debt markets",
    icon: Building,
    color: "primary",
  },
  {
    id: "systematic",
    title: "Systematic",
    aum: "12%",
    description: "Quantitative models and algorithms to identify trading opportunities",
    icon: Bot,
    color: "secondary",
  },
];

const quizQuestion = {
  question: "Which strategy focuses on exploiting price inefficiencies between related securities?",
  options: [
    { text: "A) Fundamental Equity", correct: false },
    { text: "B) Equity Arbitrage", correct: true },
    { text: "C) Credit", correct: false },
    { text: "D) Commodities", correct: false },
  ],
};

export function StrategiesSection() {
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [totalPoints, setTotalPoints] = useState(0);
  const { playClickSound, playHoverSound, playSuccessSound } = useSound();

  const handleQuizAnswer = (index: number) => {
    playClickSound();
    setQuizAnswer(index);
    setShowResult(true);
    
    if (quizQuestion.options[index].correct) {
      playSuccessSound();
      setShowConfetti(true);
      setTotalPoints(prev => prev + 50);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  };

  const handleOpenGame = (strategyId: string) => {
    playClickSound();
    setActiveGame(strategyId);
  };

  const handleGameComplete = (points: number) => {
    setTotalPoints(prev => prev + points);
  };

  return (
    <section id="strategies" className="relative py-20 overflow-hidden">
      {/* Confetti Effect */}
      {showConfetti && (
        <Confetti
          width={typeof window !== 'undefined' ? window.innerWidth : 300}
          height={typeof window !== 'undefined' ? window.innerHeight : 200}
          recycle={false}
          numberOfPieces={500}
          gravity={0.3}
        />
      )}
      
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={strategiesVideo} type="video/mp4" />
      </video>
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/70"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
              Investment Strategies
            </h2>
            {totalPoints > 0 && (
              <Badge variant="outline" className="text-lg px-4 py-2 bg-primary/20 border-primary">
                <Trophy className="h-4 w-4 mr-2 text-primary" />
                {totalPoints} pts
              </Badge>
            )}
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn through interactive games and challenges across global markets
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {strategies.map((strategy, index) => {
            const Icon = strategy.icon;
            
            return (
              <motion.div
                key={strategy.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                onMouseEnter={playHoverSound}
                data-testid={`strategy-card-${strategy.id}`}
              >
                <Card className="strategy-card bg-card glass-effect group h-full">
                  <CardContent className="p-6 text-center h-full flex flex-col">
                    <div className={`bg-${strategy.color}/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-${strategy.color}/30 transition-all duration-300`}>
                      <Icon className={`text-${strategy.color} text-2xl group-hover:scale-110 transition-transform duration-300`} />
                    </div>
                    
                    <div className="mb-3">
                      <h3 className="text-xl font-bold text-foreground">
                        {strategy.title}
                      </h3>
                      <Badge variant="outline" className="mt-2 bg-primary/10 text-primary border-primary/30">
                        {strategy.aum} AUM
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground flex-grow mb-4">
                      {strategy.description}
                    </p>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className={`w-full group-hover:bg-${strategy.color}/10 group-hover:border-${strategy.color} transition-all`}
                      onClick={() => handleOpenGame(strategy.id)}
                      data-testid={`play-game-${strategy.id}`}
                    >
                      <Gamepad2 className="h-4 w-4 mr-2" />
                      Play Game
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Strategy Quiz */}
        <motion.div
          className="bg-muted rounded-xl p-8 glass-effect"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-primary mb-4">Strategy Knowledge Quiz</h3>
            <p className="text-muted-foreground">Test your understanding of our investment approaches</p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="quiz-container">
              <p className="text-lg text-foreground mb-6">{quizQuestion.question}</p>
              
              <div className="space-y-3">
                {quizQuestion.options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={`quiz-option w-full text-left p-4 justify-start transition-all duration-300 ${
                      quizAnswer === index
                        ? option.correct
                          ? "bg-green-500/20 border-green-500 text-green-400"
                          : "bg-red-500/20 border-red-500 text-red-400"
                        : showResult && option.correct
                        ? "bg-green-500/20 border-green-500 text-green-400"
                        : "hover:bg-accent/20"
                    }`}
                    onClick={() => handleQuizAnswer(index)}
                    disabled={showResult}
                    data-testid={`quiz-option-${index}`}
                  >
                    {option.text}
                  </Button>
                ))}
              </div>
              
              {showResult && (
                <motion.div
                  className="mt-6 text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {quizAnswer !== null && quizQuestion.options[quizAnswer].correct ? (
                    <p className="text-green-400 font-semibold">🎉 Correct! Great job!</p>
                  ) : (
                    <p className="text-red-400 font-semibold">
                      Not quite. The correct answer is Equity Arbitrage - it focuses on exploiting price inefficiencies.
                    </p>
                  )}
                  
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setQuizAnswer(null);
                      setShowResult(false);
                    }}
                    data-testid="quiz-reset-btn"
                  >
                    Try Again
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Strategy Game Dialog */}
      {activeGame && (
        <StrategyGame
          strategyId={activeGame}
          open={!!activeGame}
          onClose={() => setActiveGame(null)}
          onComplete={handleGameComplete}
        />
      )}
    </section>
  );
}

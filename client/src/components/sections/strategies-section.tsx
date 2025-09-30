import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart, RefreshCw, Building, Globe, Fuel, Bot, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSound } from "@/hooks/use-sound";
import strategiesVideo from "@assets/3736384793-preview_1759209683934.mp4";
import Confetti from "react-confetti";

const strategies = [
  {
    id: "fundamental-equities",
    title: "Fundamental Equities",
    description: "Deep value analysis and long-term equity positions across global markets",
    icon: BarChart,
    color: "primary",
  },
  {
    id: "equity-arbitrage",
    title: "Equity Arbitrage", 
    description: "Market-neutral strategies exploiting price inefficiencies and spreads",
    icon: RefreshCw,
    color: "secondary",
  },
  {
    id: "credit",
    title: "Credit",
    description: "Corporate and sovereign credit opportunities across the capital structure",
    icon: Building,
    color: "primary",
  },
  {
    id: "rates-macro",
    title: "Rates & Macro",
    description: "Global macro and interest rate strategies across developed and emerging markets",
    icon: Globe,
    color: "secondary",
  },
  {
    id: "commodities",
    title: "Commodities",
    description: "Energy, metals, and agricultural commodity trading across physical and derivatives",
    icon: Fuel,
    color: "primary",
  },
  {
    id: "quantitative",
    title: "Quantitative",
    description: "Systematic and algorithmic strategies using advanced mathematical models",
    icon: Bot,
    color: "secondary",
  },
];

const quizQuestion = {
  question: "Which strategy focuses on exploiting price inefficiencies between related securities?",
  options: [
    { text: "A) Fundamental Equities", correct: false },
    { text: "B) Equity Arbitrage", correct: true },
    { text: "C) Credit", correct: false },
    { text: "D) Commodities", correct: false },
  ],
};

export function StrategiesSection() {
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { playClickSound, playHoverSound, playSuccessSound } = useSound();

  const handleQuizAnswer = (index: number) => {
    playClickSound();
    setQuizAnswer(index);
    setShowResult(true);
    
    if (quizQuestion.options[index].correct) {
      playSuccessSound();
      setShowConfetti(true);
      // Stop confetti after 5 seconds
      setTimeout(() => setShowConfetti(false), 5000);
    }
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
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Investment Strategies
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Diversified approach across six core strategies designed to generate alpha in all market conditions
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
                <Card className="strategy-card bg-card glass-effect cursor-pointer group h-full">
                  <CardContent className="p-6 text-center h-full flex flex-col">
                    <div className={`bg-${strategy.color}/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-${strategy.color}/30 transition-all duration-300`}>
                      <Icon className={`text-${strategy.color} text-2xl group-hover:scale-110 transition-transform duration-300`} />
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {strategy.title}
                    </h3>
                    
                    <p className="text-muted-foreground flex-grow">
                      {strategy.description}
                    </p>
                    
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className={`text-sm text-${strategy.color} font-semibold flex items-center justify-center gap-1`}>
                        Learn More <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
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
    </section>
  );
}

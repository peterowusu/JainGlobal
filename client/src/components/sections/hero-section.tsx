import { motion } from "framer-motion";
import { ChevronDown, Users, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ParticleBackground } from "@/components/ui/particle-background";
import { useSound } from "@/hooks/use-sound";
import heroVideo from "@assets/3765497499-preview_1759195304479.mp4";

export function HeroSection() {
  const { playClickSound, playHoverSound } = useSound();

  const scrollToSection = (sectionId: string) => {
    playClickSound();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/60"></div>
      
      <ParticleBackground />
      
      {/* Static particles */}
      <div className="particle" style={{ top: "20%", left: "10%", animationDelay: "0s" }}></div>
      <div className="particle" style={{ top: "60%", left: "80%", animationDelay: "1s" }}></div>
      <div className="particle" style={{ top: "30%", left: "60%", animationDelay: "2s" }}></div>
      <div className="particle" style={{ top: "80%", left: "20%", animationDelay: "3s" }}></div>
      
      <div className="text-center z-10 max-w-4xl mx-auto px-4">
        <motion.h1
          className="text-5xl md:text-7xl font-serif font-bold mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-foreground">Jain Global</span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-muted-foreground mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Multi-Strategy Global Hedge Fund
        </motion.p>

        <motion.p
          className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Delivering superior risk-adjusted returns through disciplined investment strategies and global market expertise
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <Button
            size="lg"
            className="px-8 py-4 text-lg font-semibold hover-lift hover:animate-glow transition-all duration-300"
            onClick={() => scrollToSection("who-we-are")}
            onMouseEnter={playHoverSound}
            data-testid="learn-about-us-btn"
          >
            <Users className="mr-2 h-5 w-5" />
            Learn About Us
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="px-8 py-4 text-lg font-semibold hover-lift border-secondary bg-secondary/10 hover:bg-secondary/20 text-secondary-foreground transition-all duration-300"
            onClick={() => scrollToSection("contact")}
            onMouseEnter={playHoverSound}
            data-testid="investor-access-btn"
          >
            <Handshake className="mr-2 h-5 w-5" />
            Investor Access
          </Button>
        </motion.div>
        
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <ChevronDown
            className="text-primary text-2xl opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
            onClick={() => scrollToSection("who-we-are")}
            data-testid="scroll-down-arrow"
          />
        </motion.div>
      </div>
    </section>
  );
}

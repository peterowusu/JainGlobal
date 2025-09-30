import { motion } from "framer-motion";
import { CustomCarousel } from "@/components/ui/carousel-custom";
import { Badge } from "@/components/ui/badge";
import { Users, Shield, Globe, ServerCog, ChartLine } from "lucide-react";
import { PortfolioAllocationGame } from "@/components/ui/portfolio-allocation-game";

export function WhoWeAreSection() {
  const slides = [
    // Slide 1: Bobby Jain
    <div key="bobby" className="bg-muted rounded-xl p-8 md:p-12 glass-effect hover-lift">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <img
          src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600"
          alt="Bobby Jain, Founder & CEO"
          className="rounded-xl shadow-lg w-full h-auto"
        />
        <div>
          <h3 className="text-3xl font-serif font-bold text-primary mb-4">Bobby Jain</h3>
          <p className="text-xl text-secondary mb-4">Founder & CEO</p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            With over 25 years of experience in global markets, Bobby founded Jain Global to deliver institutional-quality investment solutions. Previously served as Global Head of Systematic Trading at Millennium Management and holds an MBA from Wharton.
          </p>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="secondary" className="bg-primary/20 text-primary">
              25+ Years Experience
            </Badge>
            <Badge variant="secondary" className="bg-secondary/20 text-secondary">
              Wharton MBA
            </Badge>
          </div>
        </div>
      </div>
    </div>,

    // Slide 2: Leadership Team
    <div key="leadership" className="bg-muted rounded-xl p-8 md:p-12 glass-effect hover-lift">
      <h3 className="text-3xl font-serif font-bold text-primary mb-8 text-center">Leadership Pods</h3>
      <div className="grid md:grid-cols-3 gap-6">
        <motion.div 
          className="text-center"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <img
            src="https://images.unsplash.com/photo-1521790361543-f645cf042ec4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
            alt="Portfolio Management Team"
            className="rounded-lg mb-4 w-full h-48 object-cover"
          />
          <h4 className="text-xl font-semibold text-secondary mb-2">Portfolio Managers</h4>
          <p className="text-muted-foreground text-sm">
            Senior PMs with 15+ years experience across equity, credit, and macro strategies
          </p>
        </motion.div>
        
        <motion.div 
          className="text-center"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <img
            src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
            alt="Strategy Heads"
            className="rounded-lg mb-4 w-full h-48 object-cover"
          />
          <h4 className="text-xl font-semibold text-secondary mb-2">Strategy Heads</h4>
          <p className="text-muted-foreground text-sm">
            Specialized leaders driving innovation in quantitative and systematic approaches
          </p>
        </motion.div>
        
        <motion.div 
          className="text-center"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <img
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
            alt="Risk Management"
            className="rounded-lg mb-4 w-full h-48 object-cover"
          />
          <h4 className="text-xl font-semibold text-secondary mb-2">Risk Leadership</h4>
          <p className="text-muted-foreground text-sm">
            Dedicated risk professionals ensuring robust portfolio protection
          </p>
        </motion.div>
      </div>
    </div>,

    // Slide 3: Mission & Differentiators
    <div key="mission" className="bg-muted rounded-xl p-8 md:p-12 glass-effect hover-lift">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-serif font-bold text-primary mb-4">Mission & Differentiators</h3>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Delivering consistent alpha through disciplined risk management and innovative strategies
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <motion.div 
            className="flex items-start gap-4"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-primary/20 rounded-lg p-3">
              <ChartLine className="text-primary text-xl" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-2">Superior Returns</h4>
              <p className="text-muted-foreground">
                Consistent outperformance across market cycles through disciplined strategy execution
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-start gap-4"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-secondary/20 rounded-lg p-3">
              <Shield className="text-secondary text-xl" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-2">Risk Management</h4>
              <p className="text-muted-foreground">
                Advanced risk controls and portfolio construction methodologies
              </p>
            </div>
          </motion.div>
        </div>
        
        <div className="space-y-6">
          <motion.div 
            className="flex items-start gap-4"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-primary/20 rounded-lg p-3">
              <Globe className="text-primary text-xl" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-2">Global Reach</h4>
              <p className="text-muted-foreground">
                Multi-jurisdiction presence with local market expertise
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-start gap-4"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-secondary/20 rounded-lg p-3">
              <ServerCog className="text-secondary text-xl" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-2">Innovation</h4>
              <p className="text-muted-foreground">
                Cutting-edge technology and systematic approach to alpha generation
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>,

    // Slide 4: Portfolio Allocation Game
    <div key="game" className="bg-muted rounded-xl p-8 md:p-12 glass-effect hover-lift">
      <PortfolioAllocationGame />
    </div>,
  ];

  return (
    <section id="who-we-are" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Who We Are
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A team of seasoned professionals with decades of experience in global markets
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <CustomCarousel autoPlay={true} interval={8000}>
            {slides}
          </CustomCarousel>
        </motion.div>
      </div>
    </section>
  );
}

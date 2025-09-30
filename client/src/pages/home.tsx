import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/sections/hero-section";
import { WhoWeAreSection } from "@/components/sections/who-we-are-section";
import { StrategiesSection } from "@/components/sections/strategies-section";
import { PerformanceSection } from "@/components/sections/performance-section";
import { GlobalPresenceSection } from "@/components/sections/global-presence-section";
import { TargetAudienceSection } from "@/components/sections/target-audience-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <HeroSection />
      <WhoWeAreSection />
      <StrategiesSection />
      <PerformanceSection />
      <GlobalPresenceSection />
      <TargetAudienceSection />
      <ContactSection />
      
      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-serif font-bold text-primary mb-4">Jain Global</h3>
              <p className="text-muted-foreground">
                Multi-Strategy Global Hedge Fund delivering superior risk-adjusted returns through disciplined investment strategies.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#who-we-are" className="text-muted-foreground hover:text-primary transition-colors">Who We Are</a></li>
                <li><a href="#strategies" className="text-muted-foreground hover:text-primary transition-colors">Strategies</a></li>
                <li><a href="#performance" className="text-muted-foreground hover:text-primary transition-colors">Performance</a></li>
                <li><a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Risk Disclosures</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Form ADV</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <i className="fab fa-linkedin text-xl"></i>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <i className="fab fa-twitter text-xl"></i>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-muted-foreground">
              &copy; 2024 Jain Global LLC. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

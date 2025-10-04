import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import institutionalInvestorVideo from "@assets/3765088793-preview_1759271170526.mp4";
import financialAdvisorsVideo from "@assets/3754833691-preview_1759597722090.mp4";
import accreditedInvestorsVideo from "@assets/3712412343-preview_1759598514784.mp4";

const audienceData = {
  accredited: {
    title: "Accredited Investors",
    description: "High-net-worth individuals seeking sophisticated investment solutions with institutional-quality risk management and performance.",
    image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    video: accreditedInvestorsVideo,
    features: [
      "Minimum investment: $1M",
      "Quarterly liquidity terms", 
      "Dedicated client service",
      "Transparent reporting",
    ],
    color: "primary",
  },
  institutional: {
    title: "Institutional Investors",
    description: "Pension funds, endowments, and family offices requiring large-scale allocation solutions with rigorous due diligence standards.",
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    video: institutionalInvestorVideo,
    features: [
      "Minimum investment: $25M",
      "Customized terms available",
      "Enhanced reporting & analytics",
      "Direct access to portfolio managers",
    ],
    color: "secondary",
  },
  advisors: {
    title: "Financial Advisors",
    description: "Independent advisors and wealth management professionals seeking alternative investment solutions for their clients.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    video: financialAdvisorsVideo,
    features: [
      "Platform access available",
      "Educational resources",
      "Marketing support materials", 
      "Ongoing education & training",
    ],
    color: "accent",
  },
};

type AudienceType = keyof typeof audienceData;

export function TargetAudienceSection() {
  const [activeTab, setActiveTab] = useState<AudienceType>("accredited");

  return (
    <section className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Target Audience
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Serving sophisticated investors across multiple segments with tailored solutions
          </p>
        </motion.div>

        {/* Tabbed Interface */}
        <motion.div
          className="bg-muted rounded-xl glass-effect"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Tab Headers */}
          <div className="flex flex-wrap border-b border-border">
            {Object.entries(audienceData).map(([key, data], index) => (
              <Button
                key={key}
                variant="ghost"
                className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                  index === 0 ? "rounded-tl-xl" : ""
                } ${
                  index === Object.keys(audienceData).length - 1 ? "rounded-tr-xl" : ""
                } ${
                  activeTab === key
                    ? `bg-${data.color} text-${data.color}-foreground`
                    : "hover:bg-accent/20 text-muted-foreground"
                }`}
                onClick={() => setActiveTab(key as AudienceType)}
                data-testid={`tab-${key}`}
              >
                {data.title}
              </Button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-8">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 gap-8 items-center"
            >
              <div>
                <h3 className={`text-2xl font-bold text-${audienceData[activeTab].color} mb-4`}>
                  {audienceData[activeTab].title}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {audienceData[activeTab].description}
                </p>
                <ul className="space-y-3">
                  {audienceData[activeTab].features.map((feature, index) => (
                    <motion.li
                      key={index}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <CheckCircle className={`text-${audienceData[activeTab].color} h-5 w-5`} />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              {audienceData[activeTab].video ? (
                <motion.video
                  src={audienceData[activeTab].video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="rounded-xl shadow-lg w-full h-auto"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
              ) : (
                <motion.img
                  src={audienceData[activeTab].image}
                  alt={`${audienceData[activeTab].title} consultation`}
                  className="rounded-xl shadow-lg w-full h-auto"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

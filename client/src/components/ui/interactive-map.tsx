import { useState } from "react";
import { motion } from "framer-motion";

interface Office {
  id: string;
  name: string;
  region: string;
  address: string;
  focus: string;
  coordinates: { x: number; y: number };
}

const offices: Office[] = [
  {
    id: "nyc",
    name: "New York",
    region: "Headquarters",
    address: "9 West 57th Street, 39th Floor, New York, NY 10019",
    focus: "Global Strategy & Operations",
    coordinates: { x: 25, y: 50 },
  },
  {
    id: "london",
    name: "London",
    region: "European Hub",
    address: "Canary Wharf, London, E14 5AB",
    focus: "European Markets & Credit",
    coordinates: { x: 50, y: 33 },
  },
  {
    id: "hongkong",
    name: "Hong Kong",
    region: "Asia Pacific",
    address: "Central District, Hong Kong",
    focus: "Asian Equities & FX",
    coordinates: { x: 75, y: 50 },
  },
  {
    id: "singapore",
    name: "Singapore",
    region: "Southeast Asia",
    address: "Marina Bay Financial Centre, Singapore 018989",
    focus: "Quantitative Strategies",
    coordinates: { x: 70, y: 67 },
  },
  {
    id: "houston",
    name: "Houston",
    region: "Energy Hub",
    address: "Energy Corridor, Houston, TX 77056",
    focus: "Commodities & Energy",
    coordinates: { x: 30, y: 67 },
  },
];

export function InteractiveMap() {
  const [selectedOffice, setSelectedOffice] = useState<Office | null>(null);

  return (
    <div className="relative">
      <div className="bg-muted rounded-xl p-8 glass-effect mb-8">
        <div className="relative h-64 md:h-80 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg overflow-hidden">
          {/* Simplified world map background */}
          <div className="absolute inset-0 bg-gradient-to-br from-muted to-card opacity-50"></div>
          
          {/* Grid overlay */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(245, 158, 11, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(245, 158, 11, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          ></div>

          {/* Office pins */}
          {offices.map((office) => (
            <motion.div
              key={office.id}
              className="absolute map-pin"
              style={{
                left: `${office.coordinates.x}%`,
                top: `${office.coordinates.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedOffice(office)}
              data-testid={`map-pin-${office.id}`}
            >
              <div className="w-4 h-4 bg-primary rounded-full border-2 border-background shadow-lg pulse cursor-pointer"></div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-background/90 text-foreground text-xs font-semibold px-2 py-1 rounded shadow-lg whitespace-nowrap border border-primary/20">
                {office.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Office details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offices.map((office) => (
          <motion.div
            key={office.id}
            className={`office-card bg-card rounded-xl p-6 glass-effect hover-lift cursor-pointer transition-all duration-300 ${
              selectedOffice?.id === office.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedOffice(office)}
            whileHover={{ y: -4 }}
            data-testid={`office-card-${office.id}`}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-primary/20 rounded-full p-3">
                <i className="fas fa-building text-primary text-xl"></i>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">{office.name}</h3>
                <p className="text-muted-foreground">{office.region}</p>
              </div>
            </div>
            <div className="space-y-2 text-muted-foreground">
              <p className="text-sm">{office.address}</p>
              <p className="font-semibold text-primary text-sm">{office.focus}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

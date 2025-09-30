import { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Map as LeafletMap, Icon } from "leaflet";
import { motion } from "framer-motion";
import "leaflet/dist/leaflet.css";

interface Office {
  id: string;
  name: string;
  region: string;
  address: string;
  focus: string;
  coordinates: { lat: number; lng: number };
}

const offices: Office[] = [
  {
    id: "nyc",
    name: "New York",
    region: "Headquarters",
    address: "9 West 57th Street, 39th Floor, New York, NY 10019",
    focus: "Global Strategy & Operations",
    coordinates: { lat: 40.7649, lng: -73.9756 },
  },
  {
    id: "london",
    name: "London",
    region: "European Hub",
    address: "Canary Wharf, London, E14 5AB",
    focus: "European Markets & Credit",
    coordinates: { lat: 51.5055, lng: -0.0196 },
  },
  {
    id: "hongkong",
    name: "Hong Kong",
    region: "Asia Pacific",
    address: "Central District, Hong Kong",
    focus: "Asian Equities & FX",
    coordinates: { lat: 22.2783, lng: 114.1747 },
  },
  {
    id: "singapore",
    name: "Singapore",
    region: "Southeast Asia",
    address: "Marina Bay Financial Centre, Singapore 018989",
    focus: "Quantitative Strategies",
    coordinates: { lat: 1.2789, lng: 103.8508 },
  },
  {
    id: "houston",
    name: "Houston",
    region: "Energy Hub",
    address: "Energy Corridor, Houston, TX 77056",
    focus: "Commodities & Energy",
    coordinates: { lat: 29.7604, lng: -95.3698 },
  },
];

// Custom marker icon
const customIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export function InteractiveMap() {
  const [selectedOffice, setSelectedOffice] = useState<Office | null>(null);
  const mapRef = useRef<LeafletMap>(null);

  const handleOfficeClick = (office: Office) => {
    setSelectedOffice(office);
    if (mapRef.current) {
      mapRef.current.flyTo([office.coordinates.lat, office.coordinates.lng], 13, {
        duration: 1.5,
      });
    }
  };

  return (
    <div className="relative">
      <div className="bg-muted rounded-xl p-4 glass-effect mb-8">
        <MapContainer
          center={[30, 20]}
          zoom={2}
          style={{ height: "500px", width: "100%", borderRadius: "0.75rem" }}
          ref={mapRef}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {offices.map((office) => (
            <Marker
              key={office.id}
              position={[office.coordinates.lat, office.coordinates.lng]}
              icon={customIcon}
              eventHandlers={{
                click: () => handleOfficeClick(office),
              }}
            >
              <Popup>
                <div className="text-sm">
                  <h3 className="font-bold text-base mb-2">{office.name}</h3>
                  <p className="text-gray-600 text-xs mb-1">{office.region}</p>
                  <p className="text-gray-700 mb-2">{office.address}</p>
                  <p className="font-semibold text-primary text-xs">{office.focus}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Office details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offices.map((office) => (
          <motion.div
            key={office.id}
            className={`office-card bg-card rounded-xl p-6 glass-effect hover-lift cursor-pointer transition-all duration-300 ${
              selectedOffice?.id === office.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => handleOfficeClick(office)}
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

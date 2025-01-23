import React, { useState, useContext } from "react";
import { useDataSettings } from "./DataSettingsContext";
import { WalletContext } from "./WalletContext";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { DataCompletionCircle } from "./components/DataCompletionCircle";
import { AuthModal } from "./components/AuthModal";
import {
  CreditCard,
  Receipt,
  Car,
  MapPin,
  Globe,
  PlayCircle,
  Building2,
  DollarSign,
  ShoppingBag,
  Wallet,
} from "lucide-react";

interface Service {
  name: string;
  icon: React.ReactNode | string;
  connected: boolean;
  authFields?: string[];
  description?: string;
  price?: number;
}

interface Category {
  icon: React.ReactNode;
  services: Service[];
}

const categories: Record<string, Category> = {
  financial: {
    icon: <Wallet className="h-5 w-5 text-blue-600" />,
    services: [
      {
        name: "Bank Account",
        icon: <Building2 className="h-5 w-5 text-blue-600" />,
        connected: false,
        authFields: ["email", "password"],
      },
      {
        name: "Credit Score",
        icon: <CreditCard className="h-5 w-5 text-blue-600" />,
        connected: false,
        authFields: ["email", "password"],
        price: 5.99,
        description: "Access your credit score and history",
      },
      {
        name: "Investment Account",
        icon: <DollarSign className="h-5 w-5 text-blue-600" />,
        connected: false,
        authFields: ["email", "password"],
      },
    ],
  },
  shopping: {
    icon: <ShoppingBag className="h-5 w-5 text-blue-600" />,
    services: [
      {
        name: "Amazon",
        icon: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg",
        connected: false,
        authFields: ["email", "password"],
      },
      {
        name: "Walmart",
        icon: "https://upload.wikimedia.org/wikipedia/commons/1/14/Walmart_Spark.svg",
        connected: false,
        authFields: ["email", "password"],
      },
      {
        name: "Uploaded Receipts",
        icon: <Receipt className="h-5 w-5 text-blue-600" />,
        connected: false,
      },
    ],
  },
  location: {
    icon: <MapPin className="h-5 w-5 text-blue-600" />,
    services: [
      {
        name: "Google Maps",
        icon: "https://upload.wikimedia.org/wikipedia/commons/a/aa/Google_Maps_icon_%282020%29.svg",
        connected: false,
        authFields: ["email", "password"],
      },
      {
        name: "Uber",
        icon: <Car className="h-5 w-5 text-blue-600" />,
        connected: false,
        authFields: ["email", "password"],
      },
    ],
  },
  entertainment: {
    icon: <PlayCircle className="h-5 w-5 text-blue-600" />,
    services: [
      {
        name: "Netflix",
        icon: "https://upload.wikimedia.org/wikipedia/commons/7/75/Netflix_icon.svg",
        connected: false,
        authFields: ["email", "password"],
      },
      {
        name: "Amazon Prime",
        icon: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg",
        connected: false,
        authFields: ["email", "password"],
      },
    ],
  },
};

interface DataCategoryCardProps {
  category: string;
  services: Service[];
  icon: React.ReactNode;
  onToggle: (index: number) => void;
}

function DataCategoryCard({
  category,
  services,
  icon,
  onToggle,
}: DataCategoryCardProps) {
  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-50 rounded-lg">{icon}</div>
        <h3 className="text-lg font-semibold text-gray-900">{category}</h3>
      </div>
      <div className="space-y-3">
        {services.map((service, index) => (
          <div
            key={service.name}
            className={`p-3 border rounded-lg flex items-center justify-between cursor-pointer
              ${service.connected ? "border-green-200 bg-green-50" : "hover:border-blue-500"} 
              transition-colors`}
            onClick={() => onToggle(index)}
          >
            <div className="flex items-center gap-3">
              {typeof service.icon === "string" ? (
                <img
                  src={service.icon}
                  alt={service.name}
                  className="h-6 w-6"
                />
              ) : (
                service.icon
              )}
              <span className="font-medium text-gray-900">{service.name}</span>
            </div>
            <div
              className={`px-2 py-1 rounded-full text-sm ${service.connected ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}
            >
              {service.connected ? "Connected" : "Connect"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MyData() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const { balance, updateBalance } = useContext(WalletContext);
  const { dataSettings } = useDataSettings();

  const handleServiceToggle = (category: string, index: number) => {
    const service = categories[category].services[index];
    setSelectedService(service);
  };

  const handleConnect = () => {
    if (selectedService?.price) {
      updateBalance(-selectedService.price);
    }
    triggerConfetti();
    setSelectedService(null);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: {
        y: 0.6,
      },
    });
  };

  const enabledCount = Object.values(dataSettings).filter(Boolean).length;
  const totalCount = Object.keys(dataSettings).length;

  return (
    <div className="p-2 pb-8 md:p-8 bg-white w-full">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Data</h1>
        <p className="text-gray-600">
          Connect your data sources and start earning
        </p>
      </header>
      <DataCompletionCircle
        enabledCount={enabledCount}
        totalCount={totalCount}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(categories).map(([key, category]) => (
          <DataCategoryCard
            key={key}
            category={key.charAt(0).toUpperCase() + key.slice(1)}
            services={category.services}
            icon={category.icon}
            onToggle={(index) => handleServiceToggle(key, index)}
          />
        ))}
      </div>
      {selectedService && (
        <AuthModal
          service={{
            ...selectedService,
            description: selectedService.description || "No description available.",
          }}
          onClose={() => setSelectedService(null)}
          onConnect={handleConnect}
        />
      )}
    </div>
  );
}

import React from "react";
import ReactDOM from "react-dom/client"; // Updated for React 18+
import confetti from "canvas-confetti";
import { X } from "lucide-react"; // Make sure to import the X component
import "./index.css"; // Ensure this file exists and contains your global styles.

interface Service {
  name: string;
  icon: React.ReactNode;
  connected: boolean;
  authFields: string[];
  description?: string;
  price?: number;
}

interface SequentialAuthModalProps {
  services: Service[];
  onClose: () => void;
  onConnect: (serviceName: string, serviceIndex: number) => void;
  isOpen: boolean;
}

function SequentialAuthModal({
  services,
  onClose,
  onConnect,
  isOpen,
}: SequentialAuthModalProps) {
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [showSuccess, setShowSuccess] = React.useState<boolean>(false);

  // Filter unconnected services
  const unconnectedServices = services.filter((service) => !service.connected);
  const currentService = unconnectedServices[currentIndex];

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (error) {
      console.error("Confetti error:", error);
    }
  };

  const handleConnect = () => {
    if (!currentService) return;

    // Perform connection logic
    onConnect(currentService.name, currentIndex);
    triggerConfetti();

    // Show success modal and proceed to the next service
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      if (currentIndex < unconnectedServices.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        onClose();
      }
    }, 1500);
  };

  if (!isOpen || unconnectedServices.length === 0) return null;

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full text-center">
          <div className="mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Successfully Connected!
          </h3>
          <p className="text-gray-600">
            {currentIndex < unconnectedServices.length - 1
              ? "Moving to next service..."
              : "All services connected!"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">{`Connect to ${currentService.name}`}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <button
          onClick={handleConnect}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {`Connect ${currentService.name}`}
        </button>
      </div>
    </div>
  );
}

function App() {
  const mockServices: Service[] = [
    {
      name: "Service 1",
      icon: <span>🔧</span>,
      connected: false,
      authFields: ["username", "password"],
    },
    {
      name: "Service 2",
      icon: <span>⚙️</span>,
      connected: false,
      authFields: ["email", "password"],
    },
  ];

  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(true);

  const handleConnect = (serviceName: string, serviceIndex: number) => {
    console.log(`Connected to ${serviceName} at index ${serviceIndex}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <h1 className="text-2xl font-bold text-center mb-8">
        Sequential Auth App
      </h1>
      <SequentialAuthModal
        services={mockServices}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConnect={handleConnect}
      />
    </div>
  );
}

// Mount the App to the DOM using React 18's createRoot
const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

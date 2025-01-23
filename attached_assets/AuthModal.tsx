import React from "react";

const styles: Record<
  string,
  { button: string; focus: string; accent: string; text: string; border: string }
> = {
  Netflix: {
    button: "bg-red-500",
    focus: "focus:ring-red-500",
    accent: "text-red-500",
    text: "text-gray-700",
    border: "hover:border-red-500",
  },
  "Amazon Prime": {
    button: "bg-blue-500",
    focus: "focus:ring-blue-500",
    accent: "text-blue-500",
    text: "text-gray-700",
    border: "hover:border-blue-500",
  },
  default: {
    button: "bg-gray-500",
    focus: "focus:ring-gray-500",
    accent: "text-gray-600",
    text: "text-gray-600",
    border: "hover:border-gray-500",
  },
};

// Helper function to get the style for a service
function getServiceStyles(serviceName: string) {
  return styles[serviceName] || styles.default;
}

// Props interface for type safety
interface Service {
  name: string;
  description?: string;
}

interface AuthModalProps {
  service: Service;
  onClose: () => void;
  onConnect: () => void;
}

// AuthModal component
export function AuthModal({ service, onClose, onConnect }: AuthModalProps) {
  const serviceStyles = getServiceStyles(service.name);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Connect to {service.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            ✕
          </button>
        </div>

        {/* Service Description */}
        {service.description && (
          <p className="text-gray-600 mb-4">{service.description}</p>
        )}

        {/* Action Section */}
        <button
          onClick={onConnect}
          className={`px-4 py-2 w-full text-white font-medium rounded-lg ${serviceStyles.button} ${serviceStyles.focus}`}
        >
          Connect {service.name}
        </button>
      </div>
    </div>
  );
}

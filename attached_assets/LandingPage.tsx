import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Globe,
  PlayCircle,
  CreditCard,
  LineChart,
  Clock,
  DollarSign,
  Shield,
  X,
  Mail,
} from "lucide-react";

interface ToggleState {
  location: boolean;
  browsing: boolean;
  streaming: boolean;
  credit: boolean;
  financial: boolean;
}

interface ToggleItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onToggle: () => void;
}

interface StatsCardProps {
  value: string;
  label: string;
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FooterLinksProps {
  links: string[];
}

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function ToggleItem({ icon, label, isActive, onToggle }: ToggleItemProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
      <div className="flex items-center gap-3">
        <div className="text-blue-400">{icon}</div>
        <span className="text-white">{label}</span>
      </div>
      <button
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          isActive ? "bg-blue-600" : "bg-gray-600"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            isActive ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

function StatsCard({ value, label }: StatsCardProps) {
  return (
    <div className="text-center">
      <p className="text-4xl font-bold text-amber-500 mb-2">{value}</p>
      <p className="text-gray-400">{label}</p>
    </div>
  );
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-colors">
      <div className="text-blue-500 mb-4">{icon}</div>
      <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

function FooterLinks({ links }: FooterLinksProps) {
  return (
    <ul className="space-y-2">
      {links.map((link) => (
        <li key={link}>
          <a href="#" className="text-gray-400 hover:text-white">
            {link}
          </a>
        </li>
      ))}
    </ul>
  );
}

function SignupModal({ isOpen, onClose }: SignupModalProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      localStorage.setItem("isAuthenticated", "true");
      window.location.reload();
    }
  };

  const handleGoogleSignIn = () => {
    localStorage.setItem("isAuthenticated", "true");
    window.location.reload();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Create your account</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 px-4 py-2.5 rounded-md transition-colors group"
        >
          <div className="flex items-center justify-center w-5 h-5">
            {/* SVG for Google Icon */}
          </div>
          <span className="text-sm font-medium text-gray-700 tracking-wide">
            Continue with Google
          </span>
        </button>
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <div className="relative">
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Mail className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Get Started
          </button>
        </form>
      </div>
    </div>
  );
}

export function LandingPage() {
  const [showSignup, setShowSignup] = useState(false);
  const [calculatedEarnings, setCalculatedEarnings] = useState(1075.0);
  const [toggles, setToggles] = useState<ToggleState>({
    location: true,
    browsing: true,
    streaming: true,
    credit: true,
    financial: true,
  });

  const handleToggle = (key: keyof ToggleState) => {
    const baseEarnings = 1075.0;
    const earningsPerToggle = baseEarnings / 5;

    setToggles((prev) => {
      const newToggles = {
        ...prev,
        [key]: !prev[key],
      };
      const activeCount = Object.values(newToggles).filter(Boolean).length;
      setCalculatedEarnings(
        Number((earningsPerToggle * activeCount).toFixed(2))
      );
      return newToggles;
    });
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Landing page content */}
    </div>
  );
}

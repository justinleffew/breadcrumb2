import React, { useState } from "react";
import {
  Shield,
  Users,
  Filter,
  Lock,
  Zap,
  X,
  Check,
  ChevronDown,
} from "lucide-react";

interface BusinessInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  businessName: string;
  industry: string;
  companySize: string;
}

function BusinessInquiryModal({ isOpen, onClose }: BusinessInquiryModalProps) {
  const [formData, setFormData] = useState<FormData>({
    businessName: "",
    industry: "",
    companySize: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const industries = [
    "Technology",
    "Retail",
    "Healthcare",
    "Financial Services",
    "Manufacturing",
    "Education",
    "Real Estate",
    "Entertainment",
    "Other",
  ];

  const companySizes = [
    "1-10 employees",
    "11-50 employees",
    "51-200 employees",
    "201-500 employees",
    "501-1000 employees",
    "1000+ employees",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
  };

  if (!isOpen) return null;

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Thank you for your interest!
          </h3>
          <p className="text-gray-600 mb-6">
            Our team will be in touch with you shortly to discuss how Breadcrumb
            can help your business grow.
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Partner With Us</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Business Name
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              value={formData.businessName}
              onChange={(e) =>
                setFormData({ ...formData, businessName: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Industry
            </label>
            <select
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              value={formData.industry}
              onChange={(e) =>
                setFormData({ ...formData, industry: e.target.value })
              }
            >
              <option value="">Select an industry</option>
              {industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Size
            </label>
            <select
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              value={formData.companySize}
              onChange={(e) =>
                setFormData({ ...formData, companySize: e.target.value })
              }
            >
              <option value="">Select company size</option>
              {companySizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors mt-6"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export function Business() {
  const [showInquiryModal, setShowInquiryModal] = useState(false);

  return (
    <div className="w-full">
      <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Empower Your Customers and <span className="underline decoration-2">Your Bottom Line</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Join the world's first ethical data marketplace where businesses
              grow through transparency and customers earn from their data.
            </p>
            <button
              onClick={() => setShowInquiryModal(true)}
              className="px-8 py-4 bg-yellow-500 text-white rounded-lg text-lg font-semibold hover:bg-yellow-600 transform hover:scale-105 transition-all"
            >
              Partner with Breadcrmb
            </button>
          </div>
        </div>
      </div>
      <BusinessInquiryModal
        isOpen={showInquiryModal}
        onClose={() => setShowInquiryModal(false)}
      />
    </div>
  );
}

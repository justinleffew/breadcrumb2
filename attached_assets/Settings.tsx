import React, { useState } from "react";
import {
  User,
  Bell,
  Shield,
  Wallet,
  Database,
  Lock,
  Users,
  HelpCircle,
  ChevronRight,
  Mail,
  Key,
  Globe2,
  UserPlus,
  UserMinus,
  AlertTriangle,
} from "lucide-react";
import { useDataSettings } from "./DataSettingsContext";
import { TwoFactorModal } from "./components/TwoFactorModal";
import { PaymentMethodModal } from "./components/PaymentMethodModal";
import { AddRecoveryContactModal } from "./components/AddRecoveryContactModal";
import { RemoveRecoveryContactModal } from "./components/RemoveRecoveryContactModal";

type SettingsTab = "account" | "notifications" | "privacy" | "security" | "payments" | "support";

export function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("account");
  const [showTwoFactorModal, setShowTwoFactorModal] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showAddRecoveryModal, setShowAddRecoveryModal] = useState(false);
  const [showRemoveRecoveryModal, setShowRemoveRecoveryModal] = useState(false);
  const [recoveryContact, setRecoveryContact] = useState<{
    name: string;
    email: string;
    verifiedDate: string;
  } | null>(null);

  const { dataSettings, updateDataSettings } = useDataSettings();

  const tabs = [
    {
      id: "account",
      label: "Account",
      icon: <User size={20} />,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: <Bell size={20} />,
    },
    {
      id: "privacy",
      label: "Privacy",
      icon: <Shield size={20} />,
    },
    {
      id: "security",
      label: "Security",
      icon: <Lock size={20} />,
    },
    {
      id: "payments",
      label: "Payments",
      icon: <Wallet size={20} />,
    },
    {
      id: "support",
      label: "Support",
      icon: <HelpCircle size={20} />,
    },
  ] as const;

  const Toggle = ({
    enabled,
    onChange,
  }: {
    enabled: boolean;
    onChange: () => void;
  }) => (
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${enabled ? "bg-blue-600" : "bg-gray-200"}`}
      role="switch"
      aria-checked={enabled}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enabled ? "translate-x-6" : "translate-x-1"}`}
      />
    </button>
  );

  const SectionHeader = ({
    title,
    description,
  }: {
    title: string;
    description?: string;
  }) => (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      {description && (
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      )}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "account":
        return (
          <>
            <SectionHeader
              title="Profile Information"
              description="Manage your personal information and account settings"
            />
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  defaultValue="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  defaultValue="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  defaultValue="+1 (555) 123-4567"
                />
              </div>
              <div className="pt-4">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Save Changes
                </button>
              </div>
            </form>
          </>
        );

      case "notifications":
        return (
          <>
            <SectionHeader
              title="Notification Preferences"
              description="Control how you want to be notified about activity"
            />
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white border rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Earnings Updates</h3>
                  <p className="text-sm text-gray-500">
                    Get notified when you earn from data sharing
                  </p>
                </div>
                <Toggle enabled={true} onChange={() => {}} />
              </div>
              <div className="flex items-center justify-between p-4 bg-white border rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Email Notifications</h3>
                  <p className="text-sm text-gray-500">
                    Receive updates via email
                  </p>
                </div>
                <Toggle enabled={false} onChange={() => {}} />
              </div>
            </div>
          </>
        );

      case "privacy":
        return (
          <>
            <SectionHeader
              title="Privacy Settings"
              description="Control your data sharing preferences"
            />
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white border rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Location Data</h3>
                  <p className="text-sm text-gray-500">
                    Share location data with trusted partners
                  </p>
                </div>
                <Toggle
                  enabled={dataSettings.location}
                  onChange={() =>
                    updateDataSettings("location", !dataSettings.location)
                  }
                />
              </div>
            </div>
          </>
        );

      case "payments":
        return (
          <>
            <SectionHeader
              title="Payment Methods"
              description="Manage your payment and withdrawal options"
            />
            <button
              onClick={() => setShowPaymentModal(true)}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Payment Method
            </button>
            <PaymentMethodModal
              isOpen={showPaymentModal}
              onClose={() => setShowPaymentModal(false)}
            />
          </>
        );

      case "support":
        return (
          <>
            <SectionHeader title="Help & Support" description="Need help?" />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-2 pb-8 md:p-8 bg-white w-full min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
      </header>
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="tab-item"
          >
            {tab.label}
          </button>
        ))}
      </div>
      {renderTabContent()}
    </div>
  );
}

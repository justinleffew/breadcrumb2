import React, { useState, useContext } from "react";
import {
  MemoryRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import {
  LayoutDashboard,
  Wallet,
  Settings,
  BarChart3,
  HelpCircle,
  LogOut,
  DollarSign,
  Users as UsersIcon,
  Menu,
  Home,
  X,
} from "lucide-react";
import { Earnings } from "./Earnings";
import { MyData } from "./MyData";
import { Analytics } from "./Analytics";
import { Settings as SettingsPage } from "./Settings";
import { ErrorBoundary } from "./ErrorBoundary";
import { ToastProvider } from "./Toast";
import { LandingPage } from "./LandingPage";
import { LearnMore } from "./LearnMore";
import { Support } from "./Support";
import { WalletContext } from "./WalletContext";
import { DataSettingsProvider } from "./DataSettingsContext";
import { motion } from "framer-motion";
import { WalletProvider } from "./WalletContext";
import { Business } from "./Business";

// Define types for navigation and menu items
interface MenuItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { balance } = useContext(WalletContext);

  const menuItems: MenuItem[] = [
    { label: "Dashboard", path: "/", icon: <LayoutDashboard /> },
    { label: "My Data", path: "/my-data", icon: <Wallet /> },
    { label: "Earnings", path: "/earnings", icon: <DollarSign /> },
    { label: "Analytics", path: "/analytics", icon: <BarChart3 /> },
    { label: "Business", path: "/business", icon: <UsersIcon /> },
    { label: "Settings", path: "/settings", icon: <Settings /> },
    { label: "Support", path: "/support", icon: <HelpCircle /> },
  ];

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  return (
    <ErrorBoundary>
      <ToastProvider>
        <DataSettingsProvider>
          <WalletProvider>
            <Router>
              <div className="flex h-screen">
                {/* Sidebar */}
                <motion.nav
                  initial={{ x: -300 }}
                  animate={{ x: isSidebarOpen ? 0 : -300 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="fixed inset-y-0 left-0 w-64 bg-gray-900 text-white flex flex-col z-50 shadow-lg"
                >
                  <button
                    className="absolute top-4 right-4 text-white hover:text-gray-400"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <X className="h-6 w-6" />
                  </button>
                  <div className="px-6 py-4">
                    <h1 className="text-xl font-bold text-blue-500">
                      Sequential Auth App
                    </h1>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    {menuItems.map((item) => (
                      <button
                        key={item.label}
                        className={`flex items-center px-6 py-3 hover:bg-gray-800 ${
                          location.pathname === item.path ? "bg-gray-800" : ""
                        }`}
                        onClick={() => {
                          navigate(item.path);
                          setIsSidebarOpen(false);
                        }}
                      >
                        <span className="mr-3">{item.icon}</span>
                        {item.label}
                      </button>
                    ))}
                  </div>
                  <button
                    className="flex items-center px-6 py-3 hover:bg-red-700 text-red-500"
                    onClick={() => console.log("Logout")}
                  >
                    <LogOut className="mr-3" />
                    Logout
                  </button>
                </motion.nav>

                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                  <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
                    <button onClick={() => setIsSidebarOpen(true)}>
                      <Menu className="h-6 w-6" />
                    </button>
                    <h2 className="text-lg font-bold">
                      {location.pathname === "/"
                        ? "Dashboard"
                        : menuItems.find((item) => item.path === location.pathname)?.label ||
                          "Page"}
                    </h2>
                    <div>
                      Balance:{" "}
                      <span className="text-green-400 font-bold">
                        ${balance.toFixed(2)}
                      </span>
                    </div>
                  </header>
                  <main className="flex-1 overflow-y-auto p-4 bg-gray-100">
                    <Routes>
                      <Route path="/" element={<LandingPage />} />
                      <Route path="/my-data" element={<MyData />} />
                      <Route path="/earnings" element={<Earnings />} />
                      <Route path="/analytics" element={<Analytics />} />
                      <Route path="/business" element={<Business />} />
                      <Route path="/settings" element={<SettingsPage />} />
                      <Route path="/support" element={<Support />} />
                      <Route path="/learn-more" element={<LearnMore />} />
                    </Routes>
                  </main>
                </div>
              </div>
            </Router>
          </WalletProvider>
        </DataSettingsProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
};

export default App;

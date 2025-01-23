import React, { useContext } from "react";
import { Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { WalletContext } from "./WalletContext";
export function WalletBalance() {
  const { balance } = useContext(WalletContext);
  const navigate = useNavigate();
  return (
    <div className="fixed top-4 right-4 z-50 hidden lg:block">
      <div
        onClick={() => navigate("/earnings")}
        className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg shadow-lg p-4 cursor-pointer hover:shadow-xl transition-shadow"
      >
        <div className="flex items-center gap-3">
          <div className="bg-black/10 backdrop-blur-sm p-2 rounded-lg">
            <Wallet className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm text-white/80">Wallet Balance</p>
            <p className="text-lg font-semibold text-white">
              {balance.toFixed(2)} Breadcrumbs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

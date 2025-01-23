import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Mock data
const monthlyData = [
  { month: "Jan", referral: 520, personal: 125 },
  { month: "Feb", referral: 890, personal: 225 },
  { month: "Mar", referral: 1250, personal: 180 },
  { month: "Apr", referral: 1580, personal: 210 },
  { month: "May", referral: 2100, personal: 195 },
  { month: "Jun", referral: 2890, personal: 240 },
];

const giftCards = [
  {
    name: "Amazon",
    value: 25,
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
  {
    name: "Target",
    value: 25,
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Target_logo.svg",
  },
  {
    name: "Walmart",
    value: 25,
    image: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Walmart_logo.svg",
  },
];

function ReferralLinkSection() {
  const [referralLink, setReferralLink] = useState<string>("");

  const generateReferralLink = () => {
    const uniqueCode = Math.random().toString(36).substring(7);
    setReferralLink(`https://example.com/referral/${uniqueCode}`);
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow border">
      <h3>Referral Link</h3>
      {referralLink ? (
        <div>
          <input type="text" value={referralLink} readOnly />
          <button onClick={() => navigator.clipboard.writeText(referralLink)}>Copy</button>
        </div>
      ) : (
        <button onClick={generateReferralLink}>Generate Link</button>
      )}
    </div>
  );
}

function GiftCard({ card }: { card: { name: string; value: number; image: string } }) {
  return (
    <div className="border rounded-lg p-4 hover:border-blue-500 transition">
      <img src={card.image} alt={card.name} className="h-12 mx-auto" />
      <div className="mt-3 flex justify-between items-center">
        <span>{card.name}</span>
        <span>${card.value}</span>
      </div>
    </div>
  );
}

function EarningsChart({ data, selectedType }: { data: typeof monthlyData; selectedType: string }) {
  return (
    <ResponsiveContainer width="100%" height="300px">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        {selectedType !== "personal" && <Bar dataKey="referral" fill="#8884d8" />}
        {selectedType !== "referral" && <Bar dataKey="personal" fill="#82ca9d" />}
      </BarChart>
    </ResponsiveContainer>
  );
}

export function Earnings() {
  const [selectedType, setSelectedType] = useState("all");

  return (
    <div className="p-4">
      <h1>Earnings Overview</h1>
      <ReferralLinkSection />
      <EarningsChart data={monthlyData} selectedType={selectedType} />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        {giftCards.map((card) => (
          <GiftCard key={card.name} card={card} />
        ))}
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Users } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
} from "recharts";

interface DataAccessEntity {
  name: string;
  type: string;
  accessCount: number;
  earnings: number;
  lastAccessed: string;
  description: string;
}

interface DataAccessCardProps {
  entity: DataAccessEntity;
}

function DataAccessCard({ entity }: DataAccessCardProps) {
  return (
    <div className="bg-white p-3 md:p-4 rounded-lg border border-gray-200 flex flex-col md:flex-row gap-3 hover:border-blue-500 transition-colors hover:shadow-sm">
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap gap-2 items-center">
          <p className="text-gray-900 font-medium break-words">{entity.name}</p>
          <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-full shrink-0">
            {new Date(entity.lastAccessed).toLocaleDateString()}
          </span>
          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
            {entity.type}
          </span>
        </div>
        <p className="text-gray-500 text-sm mt-1">{entity.description}</p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <div className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full whitespace-nowrap">
            {entity.accessCount} accesses
          </div>
        </div>
      </div>
      <div className="flex items-center px-3 py-1 bg-emerald-50 rounded-full shrink-0 self-start md:self-center">
        <span className="text-emerald-600 font-medium text-lg">
          ${entity.earnings.toFixed(2)}
        </span>
      </div>
    </div>
  );
}

const referralData = [
  { month: "Jan", signups: 28 },
  { month: "Feb", signups: 35 },
  { month: "Mar", signups: 42 },
  { month: "Apr", signups: 39 },
  { month: "May", signups: 45 },
  { month: "Jun", signups: 52 },
  { month: "Jul", signups: 48 },
  { month: "Aug", signups: 56 },
  { month: "Sep", signups: 63 },
  { month: "Oct", signups: 58 },
  { month: "Nov", signups: 51 },
  { month: "Dec", signups: 46 },
];

export function Analytics() {
  const [selectedPeriod, setSelectedPeriod] = useState("thisMonth");

  return (
    <div className="p-2 pb-8 md:p-8 bg-white w-full">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics</h1>
        <p className="text-gray-600">Track your referral performance and data usage</p>
      </header>

      <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Users className="text-blue-600 h-5 w-5" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Referral Sign Ups</h2>
        </div>
        <div className="h-[400px] mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={referralData}>
              <defs>
                <linearGradient id="signupGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#60a5fa" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
              <XAxis dataKey="month" stroke="#666" tick={{ fill: "#666" }} />
              <YAxis stroke="#666" tick={{ fill: "#666" }} />
              <Tooltip
                contentStyle={{ backgroundColor: "white", border: "1px solid #e5e5e5" }}
                labelStyle={{ color: "#374151" }}
                formatter={(value) => [`${value} users`, "Sign Ups"]}
              />
              <Line
                type="monotone"
                dataKey="signups"
                stroke="url(#signupGradient)"
                strokeWidth={3}
                dot={{ fill: "#3b82f6", strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-between border-t pt-4">
          <div>
            <p className="text-sm text-gray-500">Total Sign Ups</p>
            <p className="text-2xl font-bold text-gray-900">563 Users</p>
          </div>
          <div className="text-sm text-gray-500">Last 12 months</div>
        </div>
      </div>
    </div>
  );
}

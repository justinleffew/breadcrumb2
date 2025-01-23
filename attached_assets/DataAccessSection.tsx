import React from "react";
import { DollarSign } from "lucide-react";
interface AccessHistoryItem {
  accessedBy: string;
  timestamp: string;
  earnings: string;
}
interface DataAccessSectionProps {
  accessHistory: AccessHistoryItem[];
}
export function DataAccessSection({ accessHistory }: DataAccessSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div className="p-4 space-y-3">
        {accessHistory.map((access, index) => (
          <div
            key={index}
            className="bg-white p-3 md:p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col md:flex-row gap-3 hover:border-blue-500 transition-all hover:shadow-md"
          >
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap gap-2 items-center">
                <p className="text-base font-medium tracking-tight text-gray-900 break-words">
                  {access.accessedBy}
                </p>
                <span className="text-xs font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded-full shrink-0">
                  {new Date(access.timestamp).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                Last accessed: {new Date(access.timestamp).toLocaleTimeString()}
              </p>
            </div>
            <div className="flex items-center space-x-2 bg-yellow-50 px-3 py-1 rounded-full shrink-0 self-start md:self-center">
              <DollarSign className="text-yellow-600 h-5 w-5" />
              <span className="text-yellow-600 font-semibold text-lg tracking-tight">
                {access.earnings}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

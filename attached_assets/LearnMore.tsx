import React, { useState } from "react";
import { Info, ChevronRight } from "lucide-react";

interface LearnMoreCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const themes: Record<number, { border: string; bg: string; text: string; hover: string }> = {
  0: {
    border: "border-blue-500",
    bg: "bg-blue-50",
    text: "text-blue-700",
    hover: "hover:bg-blue-100",
  },
  1: {
    border: "border-green-500",
    bg: "bg-green-50",
    text: "text-green-700",
    hover: "hover:bg-green-100",
  },
  2: {
    border: "border-yellow-500",
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    hover: "hover:bg-yellow-100",
  },
  3: {
    border: "border-red-500",
    bg: "bg-red-50",
    text: "text-red-700",
    hover: "hover:bg-red-100",
  },
};

export function LearnMore() {
  const cards = [
    {
      title: "How Your Data is Used",
      description:
        "Learn how companies use your data to generate insights and make money, and how you can benefit.",
      icon: <Info />,
    },
    {
      title: "Privacy & Security",
      description: "Understand how we ensure your data remains secure and private.",
      icon: <Info />,
    },
    {
      title: "Maximizing Your Earnings",
      description: "Explore tips on how to maximize your data earnings with minimal effort.",
      icon: <Info />,
    },
    {
      title: "Getting Started",
      description: "Learn how to sign up, connect your data, and start earning today.",
      icon: <Info />,
    },
  ];

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Learn More</h1>
        <p className="text-gray-600">
          Discover how Breadcrumb empowers you to earn from your data while keeping it secure.
        </p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {cards.map((card, index) => {
          const theme = themes[index % 4];
          return (
            <LearnMoreCard
              key={card.title}
              title={card.title}
              description={card.description}
              icon={card.icon}
              theme={theme}
            />
          );
        })}
      </div>
    </div>
  );
}

function LearnMoreCard({ title, description, icon, theme }: LearnMoreCardProps & { theme: any }) {
  return (
    <div
      className={`border-l-4 ${theme.border} rounded-lg shadow-md p-6 flex items-start gap-4 ${theme.bg} transition-colors ${theme.hover}`}
    >
      <div className="text-2xl">{icon}</div>
      <div>
        <h3 className={`text-lg font-bold ${theme.text}`}>{title}</h3>
        <p className="text-gray-700 mt-2">{description}</p>
        <button
          className={`mt-4 flex items-center gap-2 text-sm font-medium ${theme.text} underline`}
        >
          Learn More
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

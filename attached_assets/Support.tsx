import React, { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
export function Support() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    setIsSubmitted(true);
    setFormData({
      subject: "",
      message: "",
    });
    setTimeout(() => setIsSubmitted(false), 3000);
  };
  return (
    <div className="p-2 pb-8 md:p-8 bg-white w-full">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-2">
          Support
        </h1>
        <p className="text-base text-gray-600 leading-relaxed">
          Get help from our team
        </p>
      </header>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold tracking-tight text-gray-900 mb-2">
                Message Sent!
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                We'll get back to you as soon as possible.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium tracking-tight text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      subject: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  required
                  rows={6}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      message: e.target.value,
                    })
                  }
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
              >
                <Send className="h-4 w-4" />
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

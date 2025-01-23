import React, { useState, createContext, useContext } from "react";
import { CheckCircle } from "lucide-react";
interface Toast {
  message: string;
  duration?: number;
}
const ToastContext = createContext<{
  showToast: (toast: Toast) => void;
}>({
  showToast: () => {},
});
export function useToast() {
  return useContext(ToastContext);
}
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null);
  const showToast = ({ message, duration = 3000 }: Toast) => {
    setToast({
      message,
      duration,
    });
    setTimeout(() => setToast(null), duration);
  };
  return (
    <ToastContext.Provider
      value={{
        showToast,
      }}
    >
      {children}
      {toast && (
        <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
          <div className="bg-green-50 text-green-800 rounded-lg shadow-lg p-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <p>{toast.message}</p>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}

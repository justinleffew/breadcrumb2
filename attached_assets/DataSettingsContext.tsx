import React, { useState, createContext, useContext } from "react";
interface DataSettings {
  location: boolean;
  browsing: boolean;
}
interface DataSettingsContextType {
  dataSettings: DataSettings;
  updateDataSettings: (key: keyof DataSettings, value: boolean) => void;
}
const DataSettingsContext = createContext<DataSettingsContextType>({
  dataSettings: {
    location: false,
    browsing: false,
  },
  updateDataSettings: () => {},
});
export function DataSettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dataSettings, setDataSettings] = useState<DataSettings>({
    location: false,
    browsing: false,
  });
  const updateDataSettings = (key: keyof DataSettings, value: boolean) => {
    setDataSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  return (
    <DataSettingsContext.Provider
      value={{
        dataSettings,
        updateDataSettings,
      }}
    >
      {children}
    </DataSettingsContext.Provider>
  );
}
export function useDataSettings() {
  return useContext(DataSettingsContext);
}

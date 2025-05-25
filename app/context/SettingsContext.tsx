import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import useAPI from "~/hook/useAPI";
import { useAuthContext } from "./AuthContext";

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

interface SettingsContextType {
  error: string | null;
  fetchSettings: () => Promise<void>;
}

export const useSettingsContext = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettingsContext must be used within an AuthProvider");
  }
  return context;
};

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { accessToken, id } = useAuthContext();
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = async () => {
    try {
      const res: any = await useAPI("/profile/" + id, { json: { aceessToken: accessToken } });
      console.log(res);
    } catch (err: any) {
    } finally {
    }
  };

  useEffect(() => {
    if (id != undefined) {
      fetchSettings();
      console.log(id);
    }
  }, [id]);

  return (
    <SettingsContext
      value={{
        error,
        fetchSettings,
      }}
    >
      {children}
    </SettingsContext>
  );
};

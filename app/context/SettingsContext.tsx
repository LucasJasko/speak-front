import { createContext, useContext, useEffect, useLayoutEffect, useState, type ReactNode } from "react";
import useAPI from "~/hook/useAPI";
import { useAuthContext } from "./AuthContext";

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

interface SettingsContextType {
  theme: string | null;
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
  const { accessToken, id, isLoading, setIsLoading } = useAuthContext();
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState(null);

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const res: any = await useAPI("/profile/" + id, { json: { aceessToken: accessToken } });

      setTheme(res.theme_id);
      console.log(res);
    } catch (err: any) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetch(`../../app/styles/${theme}.css`)
      .then((res) => {
        res.json();
        console.log(res);
      })
      .then((data) => {
        console.log(data);
      });
  }, [theme]);

  useEffect(() => {
    if (id != undefined) {
      fetchSettings();
    }
  }, [id]);

  return (
    <SettingsContext
      value={{
        theme,
        error,
        fetchSettings,
      }}
    >
      {children}
    </SettingsContext>
  );
};

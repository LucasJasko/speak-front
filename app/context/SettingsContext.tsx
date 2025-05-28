import { createContext, useContext, useEffect, useLayoutEffect, useState, type ReactNode } from "react";
import useAPI from "~/hook/useAPI";
import { useAuthContext } from "./AuthContext";

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

interface SettingsContextType {
  picture: string;
  theme: string;
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
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [picture, setPicture] = useState<string>("");

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const res: any = await useAPI("/profile/" + id, { json: { aceessToken: accessToken } });
      setUserData(res);
      setName(res.profile_name);
      setSurname(res.profile_surname);
      setTheme(res.theme_id);
    } catch (err: any) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id != undefined) {
      fetchSettings();
    }
  }, [id]);

  useEffect(() => {
    if (theme != null) {
      const fetchStyle = async () => {
        let res = await fetch(`/assets/themes/${theme}.txt`);
        let data = await res.text();
        document.body.style = data;
      };

      fetchStyle();
    }
  }, [theme]);

  useEffect(() => {
    const fetchProfilePicture = async () => {
      const res: any = await useAPI(`/image/${id}-speak-profile-${surname.toLowerCase()}-${name.toLowerCase()}/profile_picture/${userData.profile_picture}`);
      setPicture(res);
    };
    if (surname != "" && name != "" && userData != null) {
      fetchProfilePicture();
    }
  }, [surname, name, userData]);

  return (
    <SettingsContext
      value={{
        theme,
        error,
        picture,
        fetchSettings,
      }}
    >
      {children}
    </SettingsContext>
  );
};

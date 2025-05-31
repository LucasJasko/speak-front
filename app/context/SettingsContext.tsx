import { createContext, useContext, useEffect, useLayoutEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import useAPI from "~/hook/useAPI";
import { useAuthContext } from "./AuthContext";

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export interface pictureSettings {
  id: any;
  surname: string;
  name: string;
  profilePicture: string;
}

interface SettingsContextType {
  name: string;
  surname: string;
  mail: string;
  password: string;
  theme: string;
  picture: string | undefined | Promise<string | undefined>;
  status: string;
  role: string;
  language: string;
  error: string | null;
  setName: Dispatch<SetStateAction<string>>;
  setSurname: Dispatch<SetStateAction<string>>;
  setMail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  setTheme: Dispatch<SetStateAction<string>>;
  setPicture: Dispatch<SetStateAction<string | undefined | Promise<string | undefined>>>;
  setStatus: Dispatch<SetStateAction<string>>;
  setRole: Dispatch<SetStateAction<string>>;
  setLanguage: Dispatch<SetStateAction<string>>;
  fetchSettings: () => Promise<void>;
  fetchProfilePicture: ({ id, surname, name, profilePicture }: pictureSettings) => Promise<string | undefined>;
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

  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [mail, setMail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [theme, setTheme] = useState<string>("");
  const [picture, setPicture] = useState<string | undefined | Promise<string | undefined>>("");

  const [status, setStatus] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [language, setLanguage] = useState<string>("");

  const [error, setError] = useState<string | null>(null);

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const res: any = await useAPI("/profile/" + id, { json: { accessToken } });
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

  const fetchProfilePicture = async ({ id, surname, name, profilePicture }: pictureSettings): Promise<string | undefined> => {
    try {
      const res: string = await useAPI(`/image/profile/${id}-speak-profile-${surname.toLowerCase()}-${name.toLowerCase()}/profile_picture/${profilePicture}`, {
        json: { accessToken: accessToken },
      });
      return res;
    } catch {
      return "";
    }
  };

  useEffect(() => {
    if (surname != "" && name != "" && userData != null) {
      fetchProfilePicture({
        id,
        surname,
        name,
        profilePicture: userData.profile_picture,
      }).then((fetchedPicture) => {
        setPicture(fetchedPicture);
      });
    }
  }, [surname, name, userData]);

  return (
    <SettingsContext
      value={{
        name,
        surname,
        mail,
        password,
        theme,
        status,
        role,
        language,
        picture,
        error,
        setName,
        setSurname,
        setMail,
        setPassword,
        setTheme,
        setPicture,
        setStatus,
        setRole,
        setLanguage,
        fetchSettings,
        fetchProfilePicture,
      }}
    >
      {children}
    </SettingsContext>
  );
};

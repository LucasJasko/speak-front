import { createContext, useContext, useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import { useAuthContext } from "./AuthContext";
import useAPI from "~/hook/useAPI";
import type { pictureProfileSettings } from "~/interfaces/PictureProfileSettings";
import type { pictureGroupSettings } from "~/interfaces/PictureGroupSettings";
import type { profileSettings } from "~/interfaces/ProfileSettings";
import type { ProfileGroup } from "~/interfaces/ProfileGroup";
import type { ProfileDm } from "~/interfaces/ProfileDm";
import type { SettingsContextType } from "~/interfaces/SettingsContextType";

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettingsContext = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettingsContext doit être utilisé à l'intérieur AuthProvider");
  }
  return context;
};

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { accessToken, id, setIsLoading } = useAuthContext();

  const [userData, setUserData] = useState<any>(null);
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [theme, setTheme] = useState<string>("");
  const [picture, setPicture] = useState<string | undefined | Promise<string | undefined>>("");
  const [b64Picture, setB64Picture] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [profileGroups, setProfileGroups] = useState<ProfileGroup[]>([]);
  const [profileDms, setProfileDms] = useState<ProfileDm[]>([]);

  const [mail, setMail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [error, setError] = useState<string | null>(null);

  const [activeLayout, setActiveLayout] = useState<string>("direct-message");
  const [lastActive, setLastActive] = useState("");

  const handleActiveLayout = (currentActive: string) => {
    setActiveLayout(currentActive);
    if (activeLayout != "profile" && activeLayout != "agenda" && activeLayout != "settings" && activeLayout != "addGroup") {
      setLastActive(activeLayout);
    }
  };

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const { data } = await useAPI<profileSettings>("/profile/" + id, { token: accessToken });
      setUserData(data);
      setName(data.name);
      setSurname(data.surname);
      setTheme(data.theme);
      setPicture(data.picture);
    } catch (err: any) {
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProfileGroups = async () => {
    try {
      const { data } = await useAPI<any>("/profile-groups/" + id, { token: accessToken });
      console.log(data);
      return data;
    } catch (err: any) {
      return err;
    }
  };

  const fetchProfilePicture = async ({ id, name, surname, picture }: pictureProfileSettings): Promise<string> => {
    try {
      const { data } = await useAPI<string>(`/image/profile/${id}-speak-profile-${surname.toLowerCase()}-${name.toLowerCase()}/profile_picture/${picture}`, {
        token: accessToken,
      });
      return data;
    } catch {
      return "";
    }
  };

  const fetchGroupPicture = async ({ id, name, picture }: pictureGroupSettings): Promise<string> => {
    try {
      const { data } = await useAPI<string>(`/image/group/${id}-speak-group-${name.toLowerCase()}/profile_picture/${picture}`, {
        token: accessToken,
      });
      return data;
    } catch {
      return "";
    }
  };

  const fetchProfileDms = async (id: any) => {
    try {
      const { data } = await useAPI<any>(`/dm/${id}`, { token: accessToken });
      return data;
    } catch {
      return "";
    }
  };

  useEffect(() => {
    if (id != undefined) {
      async function fetchGroups() {
        const groups = await fetchProfileGroups();
        setProfileGroups(groups);
      }
      async function fetchDms() {
        const dms = await fetchProfileDms(id);
        setProfileDms(dms);
      }
      fetchGroups();
      fetchDms();
      fetchSettings();
    }
  }, [id]);

  useEffect(() => {
    if (theme != null) {
      const fetchTheme = async () => {
        let res = await fetch(`/assets/themes/${theme}.txt`);
        let data = await res.text();
        document.body.style = data;
      };

      fetchTheme();
    }
  }, [theme]);

  useEffect(() => {
    if (surname != "" && name != "" && userData != null) {
      const applyPicture = async () => {
        const profilePicture = await fetchProfilePicture({
          id,
          surname,
          name,
          picture,
        });

        setB64Picture(profilePicture);
      };
      applyPicture();
    }
  }, [surname, name, userData]);

  return (
    <SettingsContext
      value={{
        profileGroups,
        b64Picture,
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
        profileDms,
        activeLayout,
        lastActive,
        handleActiveLayout,
        setProfileDms,
        setName,
        setSurname,
        setMail,
        setPassword,
        setTheme,
        setPicture,
        setStatus,
        setRole,
        setLanguage,
        setProfileGroups,
        fetchSettings,
        fetchProfilePicture,
        fetchGroupPicture,
      }}
    >
      {children}
    </SettingsContext>
  );
};
